import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, AsyncStorage} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import {Picker} from "@react-native-community/picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import json_data from './json_data'

const GarbageCollection = ({route}) => {

    const [selectedDateRange, setSelectedDateRange] = useState('thismonth')
    const [schedule, setSchedule] = useState();
    const garbage_colors = {
        paper: '#2b81a6',
        glass: '#2f7b25',
        bio: '#5a4343',
        mixed: '#323030',
        metals: '#ccc841',
    }

    const {colors} = useTheme()

    /*const json_data = route.params.json_data*/


    const _retrieveData = async () => {
        try {
            const valueSchedule = await AsyncStorage.getItem('STORAGE_SCHEDULE_CITY');
            let valSchedule = JSON.parse(valueSchedule)
            setSchedule(valSchedule)

        } catch (error) {
            // Error retrieving data
        }
    };

    const garbageColorStyles = (type) => {
        return {
            borderColor: garbage_colors[type]
        }
    };

    const Item = ({data}) => (
        <View style={[styles.item, garbageColorStyles(data.type)]}>
            <View style={styles.date_box}><Text
                style={styles.date_box_text}>{data.date.substr(0, 2)}{'\n'}{data.month}</Text></View>
            <View style={styles.name_box}><Text numberOfLines={1} style={styles.name_box_text}>{data.name}</Text><Text
                style={styles.smallname_box_text}>{calculate(data.date)}</Text></View>
            <View style={styles.trash_box}><MaterialCommunityIcons style={styles.shadow}
                                                                   color={garbage_colors[data.type]} size={52}
                                                                   name="trash-can-outline"/></View>
        </View>
    );

    const renderItem = ({item}) => (
        <Item data={item}/>
    );

    function setDateLocationComponent() {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return day + "." + month + "." + date.getFullYear();
    }

    const scheduleRange = (range) => {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

        console.log(range)

        if (range == 'thismonth') {
            return schedule[0].garbageCollections.filter(element => element.date.substr(3, 2) == month)
        } else if (range == 'nextmonth') {
            const nextMonth = date.getMonth() + 2 < 10 ? "0" + (date.getMonth() + 2) : (date.getMonth() + 2);
            return schedule[0].garbageCollections.filter(element => element.date.substr(3, 2) == nextMonth)
        } else if (range == '3nextmonths') {
            const nextMonth = date.getMonth() + 2 < 10 ? "0" + (date.getMonth() + 2) : (date.getMonth() + 2);
            const nextNextMonth = date.getMonth() + 3 < 10 ? "0" + (date.getMonth() + 3) : (date.getMonth() + 3);
            return schedule[0].garbageCollections.filter(element => element.date.substr(3, 2) == month || element.date.substr(3, 2) == nextMonth || element.date.substr(3, 2) == nextNextMonth)
        } else if (range == 'thisyear') {
            return schedule[0].garbageCollections.filter(element => element.date.substr(6, 5) == date.getFullYear())

        }
    };

    const calculate = (date) => {
        const podana = new Date(date.replace('.', '-').replace('.', '-').split('-').reverse().join('-'));
        const dzis = new Date(setDateLocationComponent().replace('.', '-').replace('.', '-').split('-').reverse().join('-'));
        const diffDays = Math.ceil((podana - dzis) / (1000 * 60 * 60 * 24));

        //console.log('podana' + podana)
        //console.log('dzis' + dziś)
        //console.log('różnica ' + diffDays)

        if (diffDays < 0) {
            return 'Termin minął'
        } else if (diffDays == 0) {
            return 'Odbiór dzisiaj'
        } else if (diffDays == 1) {
            return 'Za 1 dzień'
        } else if (diffDays > 1 && diffDays < 14) {
            return 'Za ' + diffDays + ' dni'
        } else if (diffDays >= 14) {
            return 'Za ' + Math.round(diffDays / 7) + ' tyg.'
        }
    }

    useEffect(() => {
        _retrieveData()
    }, [])

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
            flex: 1,
        }}>
            <View style={{
                backgroundColor: colors.blockColor,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                padding: 15,
                width: '100%',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 21,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                }}>Najbliższy wywóz w twojej lokalizacji</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                }}>Ostatnia aktualizacja: {schedule ? schedule[0].scheduleDate : console.log('loading...')}</Text>

            </View>

            <View style={styles.flatlist}>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 18,
                    textAlign: 'left',
                    fontFamily: 'Poppins-Medium',
                    marginTop: 5
                }}>Zakres harmonogramu
                </Text>
                <Picker
                    style={{backgroundColor: '#d5d5d5', marginBottom: 20,}}
                    mode="dropdown"
                    selectedValue={selectedDateRange}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDateRange(itemValue)
                    }>
                    <Picker.Item label="Bieżący miesiąc" value="thismonth"/>
                    <Picker.Item label="Następny miesiąc" value="nextmonth"/>
                    <Picker.Item label="3 Najbliższe miesiące" value="3nextmonths"/>
                    <Picker.Item label="Bieżący rok" value="thisyear"/>
                </Picker>
                <FlatList
                    /* data={json_data[0].garbageCollections}*/
                    data={schedule !== undefined ? scheduleRange(selectedDateRange) : console.log('loading...')}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    animationType={AnimationType.Fade}
                    animationDuration={800}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "#85BB76",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    header_text: {
        color: 'black',
        fontSize: 21,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    flatlist: {
        /*backgroundColor: "#942020",*/
        width: '97%',
        marginTop: 5,
        flex: 1
    },
    item: {
        backgroundColor: "#d5d5d5",
        marginBottom: 2,
        height: 70,
        width: '100%',
        borderLeftWidth: 7,

        borderColor: "#e2dd39",
        display: 'flex',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    date_box: {
        backgroundColor: "#d5d5d5",
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date_box_text: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    name_box: {
        backgroundColor: "#d5d5d5",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,

    },
    name_box_text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
    },
    smallname_box_text: {
        color: 'black',
        fontSize: 14,
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
    },
    trash_box: {
        backgroundColor: "#d5d5d5",
        display: 'flex',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    }
})

export default GarbageCollection;
