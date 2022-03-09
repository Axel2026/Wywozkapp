import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ScrollView} from "react-native";

const axios = require('axios');
// (data, dzien tygodnia, miejsce, ulica?, pogoda)
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from '@react-navigation/native';


const Location = ({navigation, route}) => {

    const {colors} = useTheme()

    const [city, setCity] = useState();
    const [cityWeather, setCityWeather] = useState();
    const [temperature, setTemperature] = useState();
    const [country, setCountry] = useState("pl");
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [pressure, setPressure] = useState();
    const [humidity, setHumidity] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [refreshing, setRefreshing] = React.useState(false);

    var days = [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela",
    ];

    const setDate = () => {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        return day + "." + month + "." + date.getFullYear();
    }

    const setDay = () => {
        return (days[new Date().getDay() - 1])
    }


    const locationData = async () => {
        try {
            const value = await AsyncStorage.getItem('STORAGE_USER_SETTINGS');
            if (value === null) {
                navigation.navigate("newUserSettingsModal")
            } else {
                let val = JSON.parse(value)
                setCity(val.city)
                setStreet(val.street)
                setHouseNumber(val.houseNumber)
                console.log('city ' + city)
                console.log('str ' + street)
                console.log('hn ' + houseNumber)
                getWeatherData(val.city, country)

            }
        } catch (error) {
            // Error retrieving data
        }
    };

    function getWeatherData(city, country) {
        try {
            console.log('city2 ' + city)
            axios({
                method: "GET",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=008e40b573882c158b399cbb943f15a1`
            }).then((response) => {
                console.log(response.data.name)
                setTemperature(response.data.main.temp - 273.15);
                setCityWeather(response.data.name);
                setPressure(response.data.main.pressure)
                setHumidity(response.data.main.humidity)
                setWindSpeed(response.data.wind.speed)
            }).catch((error => {
                console.log('error ' + error)
            }))
        } catch (error) {
            //błąd
        }
    }

    useEffect(() => {
        locationData();
    }, [route])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView style={{
            display: 'flex',
            flex: 1,
            backgroundColor: colors.backgroundColor
        }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
        >

            <View style={{
                color: 'black',
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
                <AntDesign color={colors.textAndIconColor} size={35} name="calendar"/>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 30,
                    fontFamily: 'Poppins-Medium',
                }}>{setDate()}</Text>
                <Text style={{
                    color: colors.textAndIconColor,
                    fontSize: 23,
                    fontFamily: 'Poppins-SemiBold',
                }}>{setDay()}</Text>
            </View>
            <View style={{
                display: 'flex',
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
                <MaterialCommunityIcons color={colors.textAndIconColor} size={50} name="home-city-outline"/>
                <Text style={{
                    fontSize: 30,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-SemiBold',
                }}>{city}</Text>
                <Text style={{
                    fontSize: 15,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Regular',
                }}>{street} {houseNumber}</Text>
            </View>
            <View style={{
                display: 'flex',
                flex: 5,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <MaterialCommunityIcons color={colors.textAndIconColor} size={70} name="weather-cloudy"/>
                <Text style={{
                    fontSize: 20,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center'
                }}>Pogoda w miejscowości: {cityWeather}</Text>
                <Text style={{
                    fontSize: 15,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Regular',
                }}>Temperatura: {Math.round(temperature * 100) / 100} °C </Text>
                <Text style={{
                    fontSize: 15,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Regular',
                }}>Ciśnienie: {pressure} hPa</Text>
                <Text style={{
                    fontSize: 15,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Regular',
                }}>Wilgotność: {humidity}%</Text>
                <Text style={{
                    fontSize: 15,
                    color: colors.textAndIconColor,
                    fontFamily: 'Poppins-Regular',
                }}>Szybkość wiatru: {windSpeed} km/h</Text>
            </View>

        </ScrollView>
    );
};

export default Location;


const styles = StyleSheet.create({
    location_view: {
        display: 'flex',
        flex: 1,
    },
    location_date: {
        color: 'black',
        backgroundColor: "#85BB76",
        // height: '20%',
        flex: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    date_text: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'Poppins-Medium',
    },
    dayname_text: {
        color: 'black',
        fontSize: 23,
        fontFamily: 'Poppins-SemiBold',
    },
    address_view: {
        display: 'flex',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: 'red',
    },
    weather_view: {
        display: 'flex',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    address_street: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins-Regular',
        // backgroundColor: 'yellow',
    },
    address_city: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        // backgroundColor: 'yellow',
    },
    weather_header: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center'
        // backgroundColor: 'yellow',
    },
    weather_units: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins-Regular',
        // backgroundColor: 'yellow',
    },
})
