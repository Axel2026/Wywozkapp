import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {useTheme} from '@react-navigation/native';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import json_data from "./json_data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Picker} from "@react-native-community/picker";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import Carousel from "pinar";


const NextGarbage = () => {


    const {colors} = useTheme();
    const [schedule, setSchedule] = useState();
    const [nextDate, setNextDate] = useState([])
    const [nextType, setNextType] = useState([])
    const [nextName, setNextName] = useState([])
    const [nextDate2, setNextDate2] = useState([])
    const [nextType2, setNextType2] = useState([])
    const [nextName2, setNextName2] = useState([])
    const [nextDate3, setNextDate3] = useState([])
    const [nextType3, setNextType3] = useState([])
    const [nextName3, setNextName3] = useState([])
    const [garbageAmount, setGarbageAmount] = useState(0)

    const _retrieveData = async () => {
        try {
            const valueSchedule = await AsyncStorage.getItem('STORAGE_SCHEDULE_CITY');
            let valSchedule = JSON.parse(valueSchedule)
            setSchedule(valSchedule)

        } catch (error) {
            // Error retrieving data
        }
    };


    const nextGarbageDate = () => {
        let futureDates = [];
        let futureTypes = [];
        let futureNames = [];
        for (let i = 0; i < schedule[0].garbageCollections.length; i++) {
            let seconds = moment(schedule[0].garbageCollections[i].date, 'DD.MM.YYYY');
            let now = moment()

            if (seconds >= now) {
                futureDates.push(schedule[0].garbageCollections[i].date)
                futureTypes.push(schedule[0].garbageCollections[i].type)
                futureNames.push(schedule[0].garbageCollections[i].name)
            }
        }

        setNextDate(futureDates[0])
        setNextType(futureTypes[0])
        setNextName(futureNames[0])
        setNextDate2(futureDates[1])
        setNextType2(futureTypes[1])
        setNextName2(futureNames[1])
        setNextDate3(futureDates[2])
        setNextType3(futureTypes[2])
        setNextName3(futureNames[2])

        if(futureDates[0].toString().localeCompare(futureDates[1].toString()) === 0 && futureDates[0].toString().localeCompare(futureDates[2].toString()) === 0){
            setGarbageAmount(3)
        }else if(futureDates[0].toString().localeCompare(futureDates[1].toString()) === 0){
            setGarbageAmount(2)
        }else{
            setGarbageAmount(1)
        }

        console.log('+++++++++++future dates ' + nextDate.toString().localeCompare(nextDate2.toString()))

    }

    useEffect(() => {
        _retrieveData()

    }, [])

    useEffect(() => {
        schedule ? nextGarbageDate() : console.log('loading')
    }, [schedule])

    return (
        <View style={{display: 'flex', flex: 1, backgroundColor: colors.backgroundColor}}>
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
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                }}>{garbageAmount > 1 ? 'Ilość wywozów w tym dniu: ' + garbageAmount : console.log('laduje...')}</Text>
            </View>
            <Text style={{
                textAlign: 'center',
                marginVertical: 8,
                color: 'grey'
            }}>
            </Text>
            <View style={{display: "flex", flex: 5}}>
                <Carousel showsDots={false} controlsTextStyle={{color: colors.blockColor, fontSize: 100}}>

                    {/*slide pierwszy*/}

                    {nextType.toString().localeCompare('mixed') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
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
                    </ScrollView>) : null}

                    {nextType.toString().localeCompare('paper') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
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
                    </ScrollView>) : null}


                    {nextType.toString().localeCompare('glass') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
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
                    </ScrollView>) : null}


                    {nextType.toString().localeCompare('bio') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
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
                    </ScrollView>) : null}

                    {nextType.toString().localeCompare('metals') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
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
                    </ScrollView>) : null}

                    {/*drugi slajd*/}

                    {nextDate.toString().localeCompare(nextDate2.toString()) === 0 &&
                    nextType2.toString().localeCompare('mixed') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName2}</Text>
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
                    </ScrollView>) : null}

                    {
                        nextDate.toString().localeCompare(nextDate2.toString()) === 0 &&
                        nextType2.toString().localeCompare('paper') === 0 ? (<ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: colors.backgroundColor,
                        }}>
                            <Text style={{
                                color: colors.textAndIconColor,
                                fontSize: 30,
                                fontFamily: 'Poppins-SemiBold',
                            }} numberOfLines={1}
                                  adjustsFontSizeToFit={true}>Typ śmieci: {nextName2}</Text>
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
                        </ScrollView>) : null}


                    {nextDate.toString().localeCompare(nextDate2.toString()) === 0 &&
                    nextType2.toString().localeCompare('glass') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName2}</Text>
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
                    </ScrollView>) : null}


                    {nextDate.toString().localeCompare(nextDate2.toString()) === 0 &&
                    nextType2.toString().localeCompare('bio') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName2}</Text>
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
                    </ScrollView>) : null}

                    {nextDate.toString().localeCompare(nextDate2.toString()) === 0 &&
                    nextType2.toString().localeCompare('metals') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName2}</Text>
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
                    </ScrollView>) : null}

                    {/*trzeci slajd*/}

                    {nextDate.toString().localeCompare(nextDate3.toString()) === 0 &&
                    nextType3.toString().localeCompare('mixed') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName3}</Text>
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
                    </ScrollView>) : null}

                    {
                        nextDate.toString().localeCompare(nextDate3.toString()) === 0 &&
                        nextType3.toString().localeCompare('paper') === 0 ? (<ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: colors.backgroundColor,
                        }}>
                            <Text style={{
                                color: colors.textAndIconColor,
                                fontSize: 30,
                                fontFamily: 'Poppins-SemiBold',
                            }} numberOfLines={1}
                                  adjustsFontSizeToFit={true}>Typ śmieci: {nextName3}</Text>
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
                        </ScrollView>) : null}


                    {nextDate.toString().localeCompare(nextDate3.toString()) === 0 &&
                    nextType3.toString().localeCompare('glass') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName3}</Text>
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
                    </ScrollView>) : null}


                    {nextDate.toString().localeCompare(nextDate3.toString()) === 0 &&
                    nextType3.toString().localeCompare('bio') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName3}</Text>
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
                    </ScrollView>) : null}

                    {nextDate.toString().localeCompare(nextDate3.toString()) === 0 &&
                    nextType3.toString().localeCompare('metals') === 0 ? (<ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: colors.backgroundColor,
                    }}>
                        <Text style={{
                            color: colors.textAndIconColor,
                            fontSize: 30,
                            fontFamily: 'Poppins-SemiBold',
                        }} numberOfLines={1}
                              adjustsFontSizeToFit={true}>Typ śmieci: {nextName3}</Text>
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
                    </ScrollView>) : null}

                </Carousel>
            </View>
        </View>
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


