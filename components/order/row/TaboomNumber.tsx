import {Image, View, Text} from "react-native";
import React from "react";

interface TaboomNumberProps {
    taboomNr: null | string,
    locationType: null | string,
    backgroundColor: string
}


export default function TaboomNumber(props: TaboomNumberProps) {

    if (props.taboomNr) {

        const taboomImgPathRestaurant = `./../../../assets/images/terrace.png`;
        const taboomImgPathHotel = `./../../../assets/images/room-service.png`;
        const taboomImgSrc = props.locationType === 'hotel'
            ? require(taboomImgPathHotel) : require(taboomImgPathRestaurant) ;

        return (
            <View
                style={{
                    marginRight: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: props.backgroundColor,
                }}
            >
                <View
                    style={{
                        padding: 5,
                        backgroundColor: props.backgroundColor,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={taboomImgSrc}
                        style={{
                            width: 50,
                            height: 50,
                            marginBottom: 5
                        }}
                    />

                    <View
                        style={{
                            padding: 5,
                            backgroundColor: 'rgb(45,39,39)',
                            borderRadius: 20,
                            paddingRight: 10,
                            paddingLeft: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                            }}
                        >
                            {props.taboomNr}
                        </Text>
                    </View>

                </View>
            </View>
        )
    } else {
        return null
    }
}
