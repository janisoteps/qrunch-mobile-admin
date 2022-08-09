import React, {useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";
import {ChangeOrderEta, Order} from "../../../interfaces/order";
import leadTimesList from "../../../constants/leadTimesList";

interface OrderLeadTimesListProps {
    orderDict: Order,
    changeOrderEta: ChangeOrderEta,
    viewEtaPicker: () => void,
    isMobile: boolean | undefined
}

interface CheckMarkState {
    show: boolean,
    timeIdx: number
}


export default function OrderLeadTimesList(props: OrderLeadTimesListProps) {
    const [showCheckMark, setShowCheckMark] = useState<CheckMarkState>({
        show: false,
        timeIdx: 0
    });
    const rowLength = 4;
    let rowLeadTimes = [];
    for (let i=0; i < leadTimesList.length / rowLength; i++){
        rowLeadTimes.push(leadTimesList.slice(i * rowLength, (i + 1) * rowLength));
    }

    const leadTimeRows = rowLeadTimes.map((leadTimes, rowIdx) => {
        const leadTimeColumns = leadTimes.map((leadTime, columnIdx) => {
            const idx = rowIdx * rowLength + (columnIdx + 1);
            const showCheck = showCheckMark.timeIdx === idx && showCheckMark.show;

            return (
                <Pressable
                    style={{
                        flex: 1,
                        backgroundColor: showCheck ? 'white' : `rgb(${10 * (11 + idx)},100,${25 * (10 - idx)})`,
                        borderRadius: 20,
                        margin: 5
                    }}
                    onPress={() => {
                        if (props.orderDict) {
                            const readyDate = new Date(new Date().getTime() + leadTime * 60000);
                            setShowCheckMark({
                                show: true,
                                timeIdx: idx
                            });
                            props.changeOrderEta(props.orderDict._id, readyDate).then(() => {
                                setShowCheckMark({
                                    show: false,
                                    timeIdx: 0
                                });
                                props.viewEtaPicker();
                            })
                        }
                    }}
                    key={`${Math.random()}-${leadTime}`}
                >
                    {showCheck ? (
                        <Image
                            source={(AllImages as AllImagesXface)['success']}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    ):(
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 15,
                                fontWeight: 'bold',
                                padding: 10
                            }}
                        >
                            {leadTime} min
                        </Text>
                    )}
                </Pressable>
            )
        })

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: 'white',
                }}
                key={`${Math.random()}`}
            >
                {leadTimeColumns}
            </View>
        )
    })

    return (
        <View
            style={{
                backgroundColor: 'white',
                flexDirection: "column",
                flex: props.isMobile ? 1 : 0.7,
                height: 135
            }}
        >
            <Text
                style={{
                    color: 'rgb(50,40,40)',
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    padding: 10
                }}
            >
                Choose order lead time:
            </Text>

            {leadTimeRows}
        </View>
    )
}
