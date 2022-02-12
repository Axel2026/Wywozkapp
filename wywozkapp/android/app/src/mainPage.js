import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {AsyncStorage} from 'react-native';
import {useTheme} from '@react-navigation/native';

const MainPage = ({navigation}) => {


    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const {colors} = useTheme();

    function setDateLocationComponent() {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return day + "." + month + "." + date.getFullYear();
    }

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('STORAGE_USER_SETTINGS');
            if (value === null) {
                navigation.navigate("newUserSettingsModal")
            } else {
                //alert("Wczytano ustawienia: " + value)
                let val = JSON.parse(value)
                setCity(val.city)
                setStreet(val.street)
                setHouseNumber(val.houseNumber)
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    useEffect(() => {

        _retrieveData()


    }, [])

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
                navigation.navigate('Location')
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
                }}>Sroda, 20.11.2020</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center'
                }}>Smieci mieszane</Text></TouchableOpacity>
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
                navigation.navigate('GarbageSchedule')
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
