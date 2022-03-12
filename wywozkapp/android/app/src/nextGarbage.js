import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {useTheme} from '@react-navigation/native';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import json_data from "./json_data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Picker} from "@react-native-community/picker";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";

const Separator = () => (
    <View style={{
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }}/>
);

const NextGarbage = () => {

    const {colors} = useTheme();

    const [nextDate, setNextDate] = useState([])
    const [nextType, setNextType] = useState([])
    const [nextName, setNextName] = useState([])

    const nextGarbageDate = () => {
        let futureDates = [];
        let futureTypes = [];
        let futureNames = [];
        for (let i = 0; i < json_data[0].garbageCollections.length; i++) {
            let seconds = moment(json_data[0].garbageCollections[i].date, 'DD.MM.YYYY');
            let now = moment()

            if (seconds >= now) {
                futureDates.push(json_data[0].garbageCollections[i].date)
                futureTypes.push(json_data[0].garbageCollections[i].type)
                futureNames.push(json_data[0].garbageCollections[i].name)
            }
        }

        setNextDate(futureDates[0])
        setNextType(futureTypes[0])
        setNextName(futureNames[0])
    }

    useEffect(() => {
        nextGarbageDate()
    }, [])


    return (

        <ScrollView
            contentContainerStyle={{backgroundColor: colors.backgroundColor, flexGrow: 1}}>
            <View style={{
                backgroundColor: colors.blockColor,
                // height: '20%',
                flex: 2,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
                <MaterialCommunityIcons color={colors.textAndIconColor} size={35} name="dump-truck"/>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }}>Najbliższy wywóz</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>{nextDate ? nextDate : console.log('laduje...')}</Text>
            </View>
            <Text style={{
                textAlign: 'center',
                marginVertical: 8,
                color: 'grey'
            }}>
            </Text>
            {nextType.toString().localeCompare('mixed') === 0 ? (<View style={{
                display: 'flex',
                flex: 5,
                backgroundColor: colors.backgroundColor,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }} numberOfLines={1}
                      adjustsFontSizeToFit={true}>Typ śmieci: {nextName}</Text>
                <Text style={{
                    marginTop: 40,
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>Przygotuj:</Text>
                <View style={styles.toPrepare}>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> zatłuszczony papier</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> zabrudzone folie</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> zużyte ręczniki</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> mięso, kości i ości</Text>
                    </View>
                </View>
            </View>) : null}


            {nextType.toString().localeCompare('paper') === 0 ? (<View style={{
                display: 'flex',
                flex: 5,
                backgroundColor: colors.backgroundColor,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }} numberOfLines={1}
                      adjustsFontSizeToFit={true}>Typ śmieci: {nextName}</Text>
                <Text style={{
                    marginTop: 40,
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>Przygotuj:</Text>
                <View style={styles.toPrepare}>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> opakowania z papieru, karton,
                            tekturę (także falistą)</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> katalogi, ulotki,
                            prospekty</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> gazety i czasopisma</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> papier szkolny i biurowy,
                            zadrukowane kartki</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> zeszyty i książki</Text>
                    </View>
                </View>
            </View>) : null}


            {nextType.toString().localeCompare('glass') === 0 ? (<View style={{
                display: 'flex',
                flex: 5,
                backgroundColor: colors.backgroundColor,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }} numberOfLines={1}
                      adjustsFontSizeToFit={true}>Typ śmieci: {nextName}</Text>
                <Text style={{
                    marginTop: 40,
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>Przygotuj:</Text>
                <View style={styles.toPrepare}>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> butelki i słoiki po napojach
                            i żywności (w tym butelki po napojach alkoholowych i olejach roślinnych)</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> szklane opakowania po
                            kosmetykach (jeżeli nie są wykonane z trwale połączonych kilku surowców)</Text>
                    </View>
                </View>
            </View>) : null}


            {nextType.toString().localeCompare('bio') === 0 ? (<View style={{
                display: 'flex',
                flex: 5,
                backgroundColor: colors.backgroundColor,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }} numberOfLines={1}
                      adjustsFontSizeToFit={true}>Typ śmieci: {nextName}</Text>
                <Text style={{
                    marginTop: 40,
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>Przygotuj:</Text>
                <View style={styles.toPrepare}>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> odpadki warzywne i owocowe (w
                            tym obierki itp.)</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> gałęzie drzew i
                            krzewów</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> skoszoną trawę, liście,
                            kwiaty</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> trociny i korę drzew</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> resztki jedzenia</Text>
                    </View>
                </View>
            </View>) : null}
            {nextType.toString().localeCompare('metals') === 0 ? (<View style={{
                display: 'flex',
                flex: 5,
                backgroundColor: colors.backgroundColor,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-SemiBold',
                }} numberOfLines={1}
                      adjustsFontSizeToFit={true}>Typ śmieci: {nextName}</Text>
                <Text style={{
                    marginTop: 40,
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>Przygotuj:</Text>
                <View style={styles.toPrepare}>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> butelki plastikowe</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> kartony po mleku i
                            napojach</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> torby i opakowania
                            plastikowe</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> puszki po napojach i
                            konserwach</Text>
                    </View>
                    <View style={styles.singleGarbage}>
                        <Entypo color={colors.textAndIconColor} size={35} name="dot-single"/>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                        }}> nakrętki, kapsle</Text>
                    </View>
                </View>
            </View>) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    confused: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'grey'
    },
    bio: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'brown'
    },
    metals: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'orange'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    singleGarbage: {
        display: "flex",
        flexDirection: 'row',
    },
    toPrepare: {
        display: 'flex',
        width: '70%',
    }
});

export default NextGarbage;


