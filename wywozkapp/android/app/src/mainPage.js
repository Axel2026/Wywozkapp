import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Platform} from 'react-native';
import GetLocation from 'react-native-get-location'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {AsyncStorage} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PushNotification from "react-native-push-notification";

const MainPage = ({navigation, route}) => {


    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [reminderTime, setReminderTime] = useState('1day');


    const {colors} = useTheme();
    const json_data = [
        {
            'location': 'Tuchów',
            'scheduleDate': '10.02.2022',
            'garbageCollections': [
                {
                    'date': '10.01.2022',
                    'type': 'paper',
                    'month': 'STY',
                    'name': 'papier i tektura'
                },
                {
                    'date': '11.01.2022',
                    'type': 'glass',
                    'month': 'STY',
                    'name': 'szkło'
                },
                {
                    'date': '11.01.2022',
                    'type': 'metals',
                    'month': 'STY',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '12.02.2022',
                    'type': 'paper',
                    'month': 'LUT',
                    'name': 'papier i tektura'
                },
                {
                    'date': '12.02.2022',
                    'type': 'glass',
                    'month': 'LUT',
                    'name': 'szkło'
                },
                {
                    'date': '16.02.2022',
                    'type': 'bio',
                    'month': 'LUT',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '21.02.2022',
                    'type': 'mixed',
                    'month': 'LUT',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '21.02.2022',
                    'type': 'metals',
                    'month': 'LUT',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '03.03.2022',
                    'type': 'bio',
                    'month': 'MAR',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '10.03.2022',
                    'type': 'metals',
                    'month': 'MAR',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '17.03.2022',
                    'type': 'mixed',
                    'month': 'MAR',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '07.04.2022',
                    'type': 'metals',
                    'month': 'KWI',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '12.04.2022',
                    'type': 'bio',
                    'month': 'KWI',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '12.04.2022',
                    'type': 'mixed',
                    'month': 'KWI',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '17.05.2022',
                    'type': 'bio',
                    'month': 'MAJ',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '17.05.2022',
                    'type': 'mixed',
                    'month': 'MAJ',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '17.05.2022',
                    'type': 'metals',
                    'month': 'MAJ',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '11.06.2022',
                    'type': 'metals',
                    'month': 'CZE',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '12.06.2022',
                    'type': 'paper',
                    'month': 'CZE',
                    'name': 'papier i tektura'
                },
                {
                    'date': '12.06.2022',
                    'type': 'glass',
                    'month': 'CZE',
                    'name': 'szkło'
                },
                {
                    'date': '17.07.2022',
                    'type': 'bio',
                    'month': 'LIP',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '17.07.2022',
                    'type': 'mixed',
                    'month': 'LIP',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '23.07.2022',
                    'type': 'metals',
                    'month': 'LIP',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '05.08.2022',
                    'type': 'bio',
                    'month': 'SIE',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '07.08.2022',
                    'type': 'mixed',
                    'month': 'SIE',
                    'name': 'śmieci mieszane'
                },
                {
                    'date': '08.08.2022',
                    'type': 'metals',
                    'month': 'SIE',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '12.09.2022',
                    'type': 'glass',
                    'month': 'WRZ',
                    'name': 'szkło'
                },
                {
                    'date': '16.09.2022',
                    'type': 'bio',
                    'month': 'WRZ',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '04.10.2022',
                    'type': 'glass',
                    'month': 'PAŹ',
                    'name': 'szkło'
                },
                {
                    'date': '18.10.2022',
                    'type': 'bio',
                    'month': 'PAŹ',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '02.11.2022',
                    'type': 'glass',
                    'month': 'LIS',
                    'name': 'szkło'
                },
                {
                    'date': '05.11.2022',
                    'type': 'bio',
                    'month': 'LIS',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '07.11.2022',
                    'type': 'metals',
                    'month': 'LIS',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '05.12.2022',
                    'type': 'paper',
                    'month': 'GRU',
                    'name': 'papier i tektura'
                },
                {
                    'date': '05.12.2022',
                    'type': 'glass',
                    'month': 'GRU',
                    'name': 'szkło'
                },
                {
                    'date': '05.12.2022',
                    'type': 'metals',
                    'month': 'GRU',
                    'name': 'metale i tworzywa sztuczne'
                },
                {
                    'date': '20.12.2022',
                    'type': 'paper',
                    'month': 'GRU',
                    'name': 'papier i tektura'
                },
            ]
        }
    ]

    function setDateLocationComponent() {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return day + "." + month + "." + date.getFullYear();
    }

    const _retrieveData = async () => {
        try {
            const value = AsyncStorage.getItem('STORAGE_USER_SETTINGS');
            if (value === null) {
                navigation.navigate("newUserSettingsModal")
            } else {
                //alert("Wczytano ustawienia: " + value)
                let val = JSON.parse(await value)
                setReminderTime(val.selectedReminderTime)
                setCity(val.city)
                setStreet(val.street)
                setHouseNumber(val.houseNumber)
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    const nextGarbageDate = () => {
        const weekday = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        //console.log('log ' + JSON.stringify(json_data[0].garbageCollections[0]))
        const found = json_data[0].garbageCollections.find(element => new Date(element.date.replace('.', '-').replace('.', '-').split('-').reverse().join('-')) >= new Date(setDateLocationComponent().replace('.', '-').replace('.', '-').split('-').reverse().join('-')));
        if (found == null) {
            return 'Brak danych'
        }
        const nextGarbageDate = found.date
        const d = new Date(nextGarbageDate.replace('.', '-').replace('.', '-').split('-').reverse().join('-'));
        let day = weekday[d.getDay()];

        //console.log(day)
        return day + ', ' + nextGarbageDate
    }
    const nextGarbageType = () => {
        const nextGarbageDateOnly = nextGarbageDate().substr(-10)
        const found = json_data[0].garbageCollections.find(element => element.date == nextGarbageDateOnly);
        if (found == null) {
            return '-'
        }
        const number = json_data[0].garbageCollections.filter(x => x.date == nextGarbageDateOnly).length - 1;
        let moreInfo = ''
        if (number > 0) {
            moreInfo = ' i ' + number + ' inne'
        }
        //console.log(found.name, number)
        return found.name + moreInfo
    }
    useEffect(() => {
        console.log('useEffect-----------')
        _retrieveData()
        // testPush()
        scheduleAllNotifications();
    }, [route])


    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: Platform.OS === 'ios',
    });

    const testPush = () => {
        PushNotification.localNotification({
            channelId: "channel-id",
            title: "My Notification Title", // (optional)
            message: "My Notification Message", // (required)
        });
    }

    // PushNotification.createChannel(
    //     {
    //         channelId: 'channel-id', // (required)
    //         channelName: 'My channel', // (required)
    //         channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    //         playSound: false, // (optional) default: true
    //         soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //     },
    //     (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    // );

    const scheduleAllNotifications = () => {
        PushNotification.cancelAllLocalNotifications()
        let jsonData = json_data[0].garbageCollections;
        let reminderTimeInSeconds = {
            '1day': 86400,
            '2days': 172800,
            '3days': 259200,
            '1week': 604800,
        }
        // let notificationTime = STORAGE_USER_SETTINGS;
        console.log('reminder ' + reminderTime)
        console.log('dat now ' + new Date(Date.now()))
        // console.log('czas ' + jsonData.)

        jsonData.map(item => {
            let date = new Date(item.date.replace('.', '-').replace('.', '-').split('-').reverse().join('-'));
            let seconds = date.getTime();
            let now = new Date(Date.now())

            if (seconds >= now) {
                PushNotification.localNotificationSchedule({
                    //... You can use all the options from localNotifications
                    channelId: "channel-id",
                    message: 'przygotuj ' + item.name + ' w dniu ' + item.date, // (required)
                    date: new Date(seconds - reminderTimeInSeconds[reminderTime] * 1000 + 2 * 21600000), // in 60 secs
                    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false


                    /* Android Only Properties */
                    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                });
            }
        })
        PushNotification.getScheduledLocalNotifications((nots) => {
            console.log(nots);
        })
        // console.log('scedhule all notification ' + JSON.stringify(json_data[0].garbageCollections))
    }

    return (
        <View style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingTop: 20,
            backgroundColor: colors.backgroundColor
        }}>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('Location', {'paramPropKey': 'paramPropValue'})
            }}><Entypo color={colors.textAndIconColor} size={35} name="location-pin"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Lokalizacja</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                }}>{city}, {street} {houseNumber}</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                }}>{setDateLocationComponent()}</Text></TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('NextGarbage')
            }}><MaterialCommunityIcons color={colors.textAndIconColor} size={35} name="dump-truck"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Najbliższy wywóz</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>{nextGarbageDate()}</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>{nextGarbageType()}</Text></TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('Contact')
            }}><AntDesign color={colors.textAndIconColor} size={35} name="contacts"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Kontakt do firm</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>Najważniejsze informacje o firmach wywożących odpady</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('GarbageSchedule', {json_data: json_data})
            }}><MaterialCommunityIcons color={colors.textAndIconColor} size={35} name="timetable"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Harmonogram wywozów</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>Daty wywozów {"\n"}odpadów</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('RecyclingInfo')
            }}><MaterialCommunityIcons color={colors.textAndIconColor} size={35} name="recycle"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Informacje o recyklingu</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>Segregacja odpadów</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: colors.blockColor,
                display: "flex",
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                textAlign: 'center',
                alignItems: "center",
                width: '45%',
                aspectRatio: 1,
                color: "black",
                flex: 0,
                marginTop: '5%'
            }} onPress={() => {
                navigation.navigate('Settings')
            }}><MaterialIcons color={colors.textAndIconColor} size={50} name="settings"/>
                <Text style={{
                    textAlign: 'center',
                    color: colors.textAndIconColor,
                    fontSize: 19,
                    fontFamily: 'Poppins-Bold'
                }}>Ustawienia</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MainPage;

const styles = StyleSheet.create({
    main_buttons_container: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 20
    },
    main_buttons: {
        backgroundColor: "#85BB76",
        display: "flex",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        textAlign: 'center',
        alignItems: "center",
        width: '45%',
        aspectRatio: 1,
        color: "black",
        flex: 0,
        marginTop: '5%'
    },

    button_name: {
        textAlign: 'center',
        color: 'black',
        fontSize: 19,
        fontFamily: 'Poppins-Bold'
    },

    location_icon: {
        width: 30,
        height: 30,
    },

    location_city: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },

    location_date: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },

    header: {
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },

    header_icon: {
        backgroundColor: 'blue',
        display: 'flex',
    },

    header_text: {
        backgroundColor: 'yellow',
        width: 'auto'
    },
    header_option: {
        backgroundColor: 'yellow',
    },
    button_description: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center'
    },
    new_user_settings: {
        backgroundColor: 'yellow',
        position: 'absolute',
        top: 10,
        width: '95%',
        height: '100%',
        elevation: 3,
        zIndex: 3,
    }
});
