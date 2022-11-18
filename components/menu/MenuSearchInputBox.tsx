import {StyleSheet, View} from "react-native";
import {useTheme} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";
import React, {useEffect, useState} from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import {DoItemFiltering} from "./MenuItemSearch";

interface MenuSearchInputBoxProps {
    doItemFiltering: DoItemFiltering
}

export default function MenuSearchInputBox({doItemFiltering}: MenuSearchInputBoxProps) {
    const {colors} = useTheme();
    const [searchInput, setSearchInput] = useState<string>('');
    const debouncedInput = useDebounce(searchInput, 500);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    useEffect(() => {
        if (hasSearched && typeof debouncedInput === 'string') {
            doItemFiltering(debouncedInput);
        }
    }, [debouncedInput]);

    return (
        <View style={{
            backgroundColor: colors.background,
            width: '100%',
            flex: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Input
                placeholder='Search...'
                containerStyle={styles.control}
                value={searchInput}
                onChangeText={(text) => {
                    setHasSearched(true);
                    setSearchInput(text);
                }}
                leftIcon={<Icon
                    name='search'
                    size={16}
                />}
                autoCompleteType={'off'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
    },

    control: {
        marginTop: 10,
        width: 400
    },

    error: {
        marginTop: 10,
        padding: 20,
        borderRadius: 15,
        color: '#fff',
        backgroundColor: '#e62210',
    }
});
