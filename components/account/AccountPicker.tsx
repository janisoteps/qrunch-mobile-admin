import React, {useContext} from "react";
import SettingsContext from "../settings/settingsContext";
import {useNavigation, useTheme} from "@react-navigation/native";
import {Pressable} from "react-native";
import {RestaurantSettings} from "../../interfaces/appSettings";
import titleCase from "../../utils/general/titleCase";
import {Text, View} from 'react-native';
import {coloursConstants} from "../../constants/colours";

interface RestaurantListProps {
    restaurants: RestaurantSettings[] | null | undefined
}

interface SelectRestaurant {
    (restaurantId: string, restaurantLocations: any): void
}


const RestaurantList = (props: RestaurantListProps): React.ReactElement => {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const navigation = useNavigation();

    const selectRestaurant: SelectRestaurant = (restaurantId, restaurantLocations) => {
        if (!!settingsContext?.setUsedRestaurant) {
            // settingsContext.setUsedRestaurant(restaurantId).then(() => {
            //     if (restaurantLocations && restaurantLocations.length > 0) {
            //         navigation.navigate('LocationPick');
            //     } else {
            //         navigation.navigate('Orders');
            //     }
            // });
            navigation.navigate('Orders');
        }

    }

    if (props.restaurants && props.restaurants.length > 0) {

        const restaurantsList = props.restaurants.filter(restDict => {
            return restDict && restDict.name
        }).map(restDict => {

            return (
                <Pressable
                    key={restDict._id}
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: 'white',
                        shadowColor: '#171717',
                        shadowOffset: {width: -2, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        minWidth: 350
                    }}
                    onPress={() => {
                        selectRestaurant(restDict._id, restDict.locations);
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'center',
                            fontSize: 20
                        }}
                    >
                        {titleCase(restDict.name)}
                    </Text>
                </Pressable>
            )
        });

        return (
            <View
                style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: coloursConstants.backgroundColorLight.hex,
                }}
            >
                {restaurantsList}
            </View>
        )
    } else {
        return (
            <Text
                style={{
                    color: colors.text
                }}
            >
                You don't have any restaurants
            </Text>
        )
    }

}

export default function AccountPicker(): React.ReactElement {
    const settingsContext = useContext(SettingsContext);

    return (
        <View
            style={{
                backgroundColor: coloursConstants.backgroundColorLight.hex,
                margin: 0,
                marginBottom: 100,
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center'
                }}
            >
                Choose which restaurant to use:
            </Text>

            <RestaurantList
                restaurants={settingsContext.userRestaurants}
            />
        </View>
    )
}
