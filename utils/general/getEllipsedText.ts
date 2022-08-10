export interface GetEllipsedText {
    (inputText: string, outputLength: number): string
}

const getEllipsedText: GetEllipsedText = (inputText, outputLength) => {
    if (inputText.length > outputLength) {
        return `${inputText.substring(0, outputLength)}...`
    } else {
        return inputText
    }
};

export default getEllipsedText;
