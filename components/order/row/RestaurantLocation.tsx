import React from "react";
import {LocationDict} from "../../../interfaces/appSettings";
import {View, Text} from "react-native";

interface RestaurantLocationProps {
    restaurantLocation: LocationDict,
    backgroundColor: string
}


export default function RestaurantLocation(props: RestaurantLocationProps) {

    if (props.restaurantLocation) {
        return (
            <View
                style={{
                    backgroundColor: props.backgroundColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 5
                }}
            >
                <View
                    style={{
                        borderRadius: 20,
                        padding: 8,
                        backgroundColor: 'rgb(45,39,39)',
                        paddingRight: 10,
                        paddingLeft: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 17
                        }}
                    >
                        {props.restaurantLocation.locationId}
                    </Text>
                </View>
            </View>
        )
    } else {
        return null
    }
}
