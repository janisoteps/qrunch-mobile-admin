interface TitleCase {
    (inputStr: string) : string
}

const titleCase: TitleCase = (inputStr) => {
    if (inputStr) {
        const wordArr = inputStr.toLowerCase().split(' ');
        const titleArr = wordArr.map(word => {
            return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
        });

        return titleArr.join(' ');
    } else {
        return ''
    }
}

export default titleCase;
