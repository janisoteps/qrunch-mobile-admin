import os
import boto3
from dotenv import load_dotenv
import argparse
import json

load_dotenv()

parser = argparse.ArgumentParser(description='Input path and output path of product file')

parser.add_argument('--filename', dest='file_name', type=str, help='application file name')
args = parser.parse_args()

aws_access_key_id = os.getenv('S3_KEY_ID')
aws_secret_access_key = os.getenv('S3_KEY_SECRET')

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

s3 = session.resource('s3')

s3.meta.client.upload_file(
    Filename=args.file_name,
    Bucket="qr-assets",
    Key=f'app/builds/{args.file_name}',
    ExtraArgs={'ACL': "public-read"}
)

print('App file uploaded')

app_location_dict = {
    "android": f"https://qr-assets.s3.eu-central-1.amazonaws.com/app/builds/{args.file_name}",
    "ios": None
}

with open("app-location.json", "w") as outfile:
    json.dump(app_location_dict, outfile)

s3.meta.client.upload_file(
    Filename='app-location.json',
    Bucket="qr-assets",
    Key='app-location.json',
    ExtraArgs={'ContentType': "application/json", 'ACL': "public-read", 'ContentDisposition': 'inline'}
)

print('Done!')
