import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SetLocalStorageValue {
    (keyName: string, keyValue: string):  Promise<boolean>
}

const setLocalStorageValue: SetLocalStorageValue = async (keyName: string, keyValue: string) => {
    if (keyName.length > 0) {
        try {
            await AsyncStorage.setItem(`@${keyName}`, keyValue);

            return true
        } catch (e) {
            // saving error
            console.log(e)

            return false
        }
    } else {
        return false
    }
}

export default setLocalStorageValue;
