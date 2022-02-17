import React, {useEffect, useState} from 'react';
import SettingsList from 'react-native-settings-list';
import {Text, View, StyleSheet, Modal, Pressable, TextInput, ScrollView, ActivityIndicator} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import GetLocation from "react-native-get-location";

const Settings = () => {

    const [automaticLocation, setAutomaticLocation] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [onChangeCity, setOnChangeCity] = useState(city);
    const [onChangeStreet, setOnChangeStreet] = useState(street);
    const [onChangeHouseNumber, setOnChangeHouseNumber] = useState(houseNumber);
    const [selectedReminderTime, setSelectedReminderTime] = useState();
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [pickerModalVisible, setPickerModalVisible] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [modalData, setModalData] = useState([])
    const [isLocationLoading, setIsLocationLoading] = useState(false)

    const {colors} = useTheme();
    const dispatch = useDispatch()
    const currentTheme = useSelector(state => {
        return state.myDarkMode
    })

    const reminderTimes = {
        "1 dzień przed": "1day",
        "2 dni przed": "2days",
        "3 dni przed": "3days",
        "Tydzień przed": "1week"
    };

    useEffect(() => {
        getAddress()
        getAutomaticLocationSetting()
    }, [])

    useEffect(() => {
        if (isLocationLoading) {
            setIsLocationLoading(false)
        }
    }, [city, street, houseNumber])

    function onAutomaticLocationSwitch() {
        setAutomaticLocation(!automaticLocation);
        saveAutomaticLocationSetting()
        if (!automaticLocation) {
            setLocationModalVisible(!locationModalVisible);
            getLocation()
        }
    }

    function onDarkThemeSwitch() {
        setDarkTheme(!darkTheme)
        dispatch({type: "change_theme", payload: !currentTheme})
    }

    async function getAddressFromCoordinates(latitude, longitude) {
        return new Promise((resolve) => {
            const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=jBSGY_EW33IDBGXABqOoOjx2sT5weNRI6WybF0d9aU0&mode=retrieveAddresses&prox=${latitude},${longitude}`
            fetch(url).then(res => res.json())
                .then(resJson => {
                    if (resJson
                        && resJson.Response
                        && resJson.Response.View
                        && resJson.Response.View[0]
                        && resJson.Response.View[0].Result
                        && resJson.Response.View[0].Result[0]) {
                        resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
                        setCity(resJson.Response.View[0].Result[0].Location.Address.District)
                        setOnChangeCity(resJson.Response.View[0].Result[0].Location.Address.District)
                        setStreet(resJson.Response.View[0].Result[0].Location.Address.Street.replace("ulica", ""))
                        setOnChangeStreet(resJson.Response.View[0].Result[0].Location.Address.Street.replace("ulica", ""))
                        setHouseNumber(resJson.Response.View[0].Result[0].Location.Address.HouseNumber)
                        setOnChangeHouseNumber(resJson.Response.View[0].Result[0].Location.Address.HouseNumber)
                        if (city === resJson.Response.View[0].Result[0].Location.Address.District && onChangeCity === resJson.Response.View[0].Result[0].Location.Address.District &&
                            street === resJson.Response.View[0].Result[0].Location.Address.Street.replace("ulica", "") && onChangeStreet === resJson.Response.View[0].Result[0].Location.Address.Street.replace("ulica", "") &&
                            houseNumber === resJson.Response.View[0].Result[0].Location.Address.HouseNumber && onChangeHouseNumber === resJson.Response.View[0].Result[0].Location.Address.HouseNumber) {
                            setIsLocationLoading(false)
                        }
                    } else {
                        resolve();
                    }
                })
                .catch((e) => {
                    console.warn('Error in getAddressFromCoordinates: ', e)
                    resolve()
                })
        })
    }

    async function getLocation() {
        setIsLocationLoading(true)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            getAddressFromCoordinates(location.latitude, location.longitude)
        }).catch(error => {
            console.warn(error);
        })
    }

    async function getAddress() {
        try {
            const settings = await AsyncStorage.getItem('STORAGE_USER_SETTINGS');
            if (settings !== null && JSON.parse(settings).city !== undefined &&
                JSON.parse(settings).street !== undefined && JSON.parse(settings).houseNumber !== undefined) {
                setCity(JSON.parse(settings).city)
                setOnChangeCity(JSON.parse(settings).city)
                setStreet(JSON.parse(settings).street)
                setOnChangeStreet(JSON.parse(settings).street)
                setHouseNumber(JSON.parse(settings).houseNumber)
                setOnChangeHouseNumber(JSON.parse(settings).houseNumber)
                setSelectedReminderTime(JSON.parse(settings).selectedReminderTime)
            }
        } catch (error) {
            console.warn(error)
        }
    }

    async function saveSettings(notificationTime, city, street, houseNumber) {
        try {
            const payload = {
                city: city,
                street: street,
                houseNumber: houseNumber,
                selectedReminderTime: notificationTime
            }
            await AsyncStorage.setItem('STORAGE_USER_SETTINGS', JSON.stringify(payload))
        } catch (error) {
            console.warn(error)
        }
    }

    async function getAutomaticLocationSetting() {
        try {
            const automaticLocationSetting = await AsyncStorage.getItem('AUTOMATIC_LOCATION');
            if (automaticLocationSetting !== null) {
                setAutomaticLocation(JSON.parse(automaticLocationSetting));
            }
        } catch (error) {
            console.warn(error)
        }
    }

    async function saveAutomaticLocationSetting() {
        try {
            await AsyncStorage.setItem('AUTOMATIC_LOCATION', JSON.stringify(!automaticLocation))
        } catch (error) {
            console.warn(error)
        }
    }

    async function saveAutomaticLocationAddress() {
        setLocationModalVisible(!locationModalVisible);
        setCity(onChangeCity);
        setStreet(onChangeStreet);
        setHouseNumber(onChangeHouseNumber);
        saveSettings(selectedReminderTime, onChangeCity, onChangeStreet, onChangeHouseNumber)
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function onPickerModalPress(time) {
        setSelectedReminderTime(reminderTimes[time]);
        setPickerModalVisible(!pickerModalVisible);
        saveSettings(reminderTimes[time], city, street, houseNumber)
    }

    return (
        <View style={{backgroundColor: colors.backgroundColor, flex: 1}}>
            <View style={{borderBottomWidth: 1, backgroundColor: colors.backgroundColor, borderColor: '#c8c7cc'}}>
                <Text style={{
                    fontFamily: 'Poppins-Bold',
                    alignSelf: 'center',
                    marginTop: 15,
                    marginBottom: 15,
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: colors.textAndIconColor
                }}>Settings</Text>
            </View>
            <View style={{backgroundColor: colors.settingsBackground, flex: 1, fontFamily: 'Poppins-Bold'}}>
                <SettingsList borderColor='#c8c7cc' defaultItemSize={50} backgroundColor={colors.modalSettings}>
                    <SettingsList.Header
                        headerStyle={{
                            fontFamily: 'Poppins-Bold',
                            marginTop: 20,
                            marginLeft: 15,
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: colors.textAndIconColor
                        }}
                        headerText="Lokalizacja"/>
                    <SettingsList.Item
                        icon={<MaterialIcons color="black" size={28} style={styles.imageStyle} name="my-location"/>}
                        hasSwitch={true}
                        switchOnValueChange={onAutomaticLocationSwitch}
                        switchState={automaticLocation}
                        hasNavArrow={false}
                        title='Automatyczna lokalizacja'
                        titleStyle={{color: colors.textAndIconColor, fontSize: 16}}
                    />
                    <SettingsList.Item
                        icon={<MaterialIcons color="black" size={28} style={styles.imageStyle} name="location-city"/>}
                        title='Miasto'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor, fontSize: 16}}
                        titleInfo={city}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setInputModalVisible(true);
                            setModalData(["Miasto", city])
                        })}
                    />
                    <SettingsList.Item
                        icon={<MaterialCommunityIcons color="black" size={28} style={styles.imageStyle} name="road"/>}
                        title='Ulica'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor, fontSize: 16}}
                        titleInfo={street}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setInputModalVisible(true);
                            setModalData(["Ulica", street])
                        })}
                    />
                    <SettingsList.Item
                        icon={<MaterialIcons color="black" size={28} style={styles.imageStyle} name="house"/>}
                        title='Numer domu'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor, fontSize: 16}}
                        titleInfo={houseNumber}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setInputModalVisible(true);
                            setModalData(["Numer domu", houseNumber])
                        })}
                    />
                    <SettingsList.Header headerStyle={{
                        fontFamily: 'Poppins-Bold',
                        marginTop: 20,
                        marginLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colors.textAndIconColor
                    }}
                                         headerText="Powiadomienia"/>
                    <SettingsList.Item
                        icon={<MaterialCommunityIcons color="black" size={28} style={styles.imageStyle}
                                                      name="clock-time-two-outline"/>}
                        title='Czas powiadomień'
                        titleStyle={{color: colors.textAndIconColor, fontSize: 16}}
                        titleInfo={getKeyByValue(reminderTimes, selectedReminderTime)}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={() => setPickerModalVisible(true)}
                    />
                    <SettingsList.Header headerStyle={{
                        fontFamily: 'Poppins-Bold',
                        marginTop: 20,
                        marginLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colors.textAndIconColor
                    }}
                                         headerText="Wygląd"/>
                    <SettingsList.Item
                        icon={<MaterialCommunityIcons color="black" size={28} style={styles.imageStyle}
                                                      name="theme-light-dark"/>}
                        title='Tryb ciemny'
                        titleStyle={{color: colors.textAndIconColor, fontSize: 16}}
                        hasSwitch={true}
                        switchOnValueChange={onDarkThemeSwitch}
                        switchState={darkTheme}
                        hasNavArrow={false}
                    />
                </SettingsList>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={inputModalVisible}>
                <Pressable onPress={() => setInputModalVisible(!inputModalVisible)} style={styles.centeredView}>
                    <View style={[styles.modalView, {backgroundColor: colors.modalSettings}]}>
                        <Text style={[styles.modalText, {color: colors.textAndIconColor}]}>{modalData[0] + ": "}</Text>
                        <TextInput style={[styles.input, {color: colors.textAndIconColor}]} placeholder={modalData[1]}
                                   placeholderTextColor={colors.textAndIconColor}
                                   onChangeText={modalData[0] === "Miasto" ? (newText => setCity(newText)) : (modalData[0] === "Ulica" ? (newText => setStreet(newText)) : (newText => setHouseNumber(newText)))}/>
                        <Pressable
                            style={[styles.button, {backgroundColor: colors.blockColor}]}
                            onPress={() => {
                                setInputModalVisible(!inputModalVisible);
                                saveSettings(selectedReminderTime, city, street, houseNumber)
                            }}>
                            <Text style={styles.textStyle}>Zapisz</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={pickerModalVisible}>
                <Pressable onPress={() => setPickerModalVisible(!pickerModalVisible)} style={styles.centeredView}>
                    <View style={[styles.modalView, {backgroundColor: colors.modalSettings}]}>
                        <ScrollView>
                            {Object.keys(reminderTimes).map((time, index) => (
                                <View style={styles.picker_modal_item_container} key={time + index}>
                                    <Pressable onPress={() => onPickerModalPress(time)}
                                               style={styles.picker_modal_item}><Text
                                        style={[styles.picker_modal_item_text, {color: colors.textAndIconColor}]}>{time}</Text></Pressable>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={locationModalVisible}>
                <Pressable onPress={() => setLocationModalVisible(!locationModalVisible)} style={styles.centeredView}>
                    {(isLocationLoading) &&
                    <ActivityIndicator size="large" color={colors.blockColor} style={{height: 40}}/>}
                    {!isLocationLoading && (<View style={[styles.modalView, {backgroundColor: colors.modalSettings}]}>
                        <Text style={[styles.modalText, {color: colors.textAndIconColor, marginBottom: 25}]}>Pobrane
                            dane</Text>
                        <TextInput style={[styles.input_location, {color: colors.textAndIconColor}]}
                                   placeholder={city}
                                   placeholderTextColor={colors.textAndIconColor}
                                   onChangeText={newText => setOnChangeCity(newText)}/>
                        <TextInput style={[styles.input_location, {color: colors.textAndIconColor}]}
                                   placeholder={street}
                                   placeholderTextColor={colors.textAndIconColor}
                                   onChangeText={newText => setOnChangeStreet(newText)}/>
                        <TextInput style={[styles.input_location, {color: colors.textAndIconColor}]}
                                   placeholder={houseNumber}
                                   placeholderTextColor={colors.textAndIconColor}
                                   onChangeText={newText => setOnChangeHouseNumber(newText)}/>
                        <Pressable
                            style={[styles.button, {backgroundColor: colors.blockColor}]}
                            onPress={() => {
                                saveAutomaticLocationAddress()
                            }}>
                            <Text style={styles.textStyle}>Zapisz</Text>
                        </Pressable>
                    </View>)}
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    input_location: {
        fontFamily: 'Poppins-regular',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        width: '100%',
        paddingLeft: 10,
        marginBottom: 15,
    },
    picker_modal_item_text: {
        color: 'black',
        fontSize: 20,
    },
    picker_modal_item_container: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        width: '100%',
        marginBottom: 20,
    },
    imageStyle: {
        marginLeft: 15,
        marginRight: 20,
        alignSelf: 'center',
        width: 28,
        height: 29,
        justifyContent: 'center',
        backgroundColor: '#85BB76',
        borderRadius: 3,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000080',
    },
    modalView: {
        margin: 20,
        borderRadius: 10,
        width: '70%',
        paddingTop: 35,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: "#85BB76",
        alignSelf: 'flex-end',
        marginTop: 20
    },
    textStyle: {
        fontFamily: 'Poppins-Bold',
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontFamily: 'Poppins-Bold',
        marginBottom: 15,
        width: '100%',
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 17,
    },
    input: {
        fontFamily: 'Poppins-regular',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        width: '100%',
        paddingLeft: 10
    }
});
export default Settings;




