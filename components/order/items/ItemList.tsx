import React, {useRef} from "react";
import ItemListRow from "./ItemListRow";
import {ScrollView, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import ScrollDownButton from "./ScrollDownButton";
import ScrollUpButton from "./ScrollUpButton";
import {Order} from "../../../interfaces/order";
import {MenuItem} from "../../../interfaces/item";


interface ItemListProps {
    orderDict: Order | null,
    itemDataList: MenuItem[] | null,
    isMobile: boolean | undefined
}


export default function ItemList(props: ItemListProps) {
    let scrollY = 0;
    const {colors} = useTheme();
    const scrollRef = useRef<any>();

    const downButtonHandler = () => {
        //OnCLick of down button we scrolled the list to bottom
        if (scrollRef) {
            scrollY = scrollY + 100;
            scrollRef.current?.scrollTo({
                y : scrollY,
                animated : true
            });
        }
    };

    const upButtonHandler = () => {
        //OnCLick of down button we scrolled the list to bottom
        if (scrollRef) {
            scrollY = (scrollY > 0) ? scrollY - 100 : 0;
            scrollRef.current?.scrollTo({
                y : scrollY,
                animated : true
            });
        }
    };

    if (props.itemDataList) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxHeight: '45%',
                    position: 'relative',
                    marginBottom: 10,
                    alignSelf: 'stretch',
                    paddingTop: 20,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'left',
                        fontSize: 20,
                        paddingLeft: 2,
                        fontWeight: 'bold',
                        marginBottom: 30
                    }}
                >
                    {props.itemDataList.length} items:
                </Text>
                <View
                    style={{
                        backgroundColor: 'white',
                        shadowColor: '#171717',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        borderRadius: 10,
                        marginBottom: 10,
                        position: 'relative',
                    }}
                >
                    <ScrollView
                        style={{
                            paddingTop: 0,
                            backgroundColor: colors.background,
                            padding: 0,
                            borderRadius: 10,
                            flexGrow: 0
                        }}
                        ref={scrollRef}
                    >
                        {(props.orderDict && props.itemDataList) && (
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 0,
                                    alignSelf: 'stretch',
                                    paddingTop: 20,
                                    paddingBottom: 40,
                                    backgroundColor: colors.background
                                }}
                            >
                                {props.orderDict.order.map(itemDict => {
                                    return (
                                        <ItemListRow
                                            key={`${itemDict._id}${Math.random()}`}
                                            orderItemDict={itemDict}
                                            itemDataList={props.itemDataList}
                                            isMobile={props.isMobile}
                                        />
                                    )
                                })}
                            </View>
                        )}
                    </ScrollView>
                </View>

                {props.isMobile && (
                    <ScrollUpButton
                        upButtonHandler={upButtonHandler}
                    />
                )}

                {props.isMobile && (
                    <ScrollDownButton
                        downButtonHandler={downButtonHandler}
                    />
                )}
            </View>
        )
    } else {
        return null
    }
}
