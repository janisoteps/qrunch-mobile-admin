import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GetLocalStorageValue {
    (keyName: string):  Promise<string | null>
}

const getLocalStorageValue: GetLocalStorageValue = async (keyName) => {
    try {
        const value: string | null = await AsyncStorage.getItem(`@${keyName}`);

        if(value) {
            // value previously stored
            return value
        } else {
            return null
        }
    } catch(e) {
        console.log(`getLocalStorageValue ${e}`);

        return null
    }
}

export default getLocalStorageValue;
