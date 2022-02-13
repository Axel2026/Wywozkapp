import React, {useEffect, useState} from 'react';
import SettingsList from 'react-native-settings-list';
import {
    Alert,
    Text,
    View,
    StyleSheet,
    Modal,
    Pressable,
    TextInput
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from '@react-navigation/native';

const Settings = () => {

    const {colors} = useTheme();

    const [automaticLocation, setAutomaticLocation] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [selectedReminderTime, setSelectedReminderTime] = useState('1day');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([])

    function onAutomaticLocationSwitch() {
        setAutomaticLocation(!automaticLocation)
    }

    function onDarkThemeSwitch() {
        setDarkTheme(!darkTheme)
        console.log(darkTheme)
    }

    useEffect(() => {
        getAddress()
    }, [])

    /*
        async function removeData() {
            try {
                await AsyncStorage.removeItem('STORAGE_USER_SETTINGS');
                console.log("Usunięto!")
            } catch (error) {
                console.log(error)
            }
        };
    */

    async function getAddress() {
        try {
            const settings = await AsyncStorage.getItem('STORAGE_USER_SETTINGS');
            if (settings !== null) {
                setCity(JSON.parse(settings).city)
                setStreet(JSON.parse(settings).street)
                setHouseNumber(JSON.parse(settings).houseNumber)
                setSelectedReminderTime(JSON.parse(settings).selectedReminderTime)
            }
        } catch (error) {
            console.log(error)
        }
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#00000080',
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: colors.greyTint,
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
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            marginBottom: 15,
                            width: '100%',
                            textAlign: "left",
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: colors.textAndIconColor
                        }}>{modalData[0] + ": "}</Text>
                        <TextInput style={{
                            fontFamily: 'Poppins-regular',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: "grey",
                            width: '100%',
                            color: colors.textAndIconColord,
                        }} placeholder={modalData[1]}
                                   onChangeText={modalData[0] === "Miasto" ? (newText => setCity(newText)) : (modalData[0] === "Ulica" ? (newText => setStreet(newText)) : (newText => setHouseNumber(newText)))}/>
                        <Pressable
                            style={{
                                borderRadius: 10,
                                padding: 10,
                                elevation: 2,
                                backgroundColor: colors.blockColor,
                                alignSelf: 'flex-end',
                                marginTop: 20,
                            }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={{
                                fontFamily: 'Poppins-Bold',
                                color: "white",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>Zapisz</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
            <View style={{backgroundColor: colors.greyTint, flex: 1, fontFamily: 'Poppins-Bold'}}>
                <SettingsList borderColor='#c8c7cc' defaultItemSize={50} backgroundColor={colors.greyTint}>
                    <SettingsList.Header
                        headerStyle={{
                            color: colors.textAndIconColor,
                            fontFamily: 'Poppins-Bold',
                            marginTop: 15,
                            fontWeight: 'bold',
                            fontSize: 16
                        }}
                        headerText="Lokalizacja"/>
                    <SettingsList.Item
                        titleStyle={{color: colors.textAndIconColor}}
                        icon={<MaterialIcons color={colors.textAndIconColor} size={25} style={styles.imageStyle}
                                             name="my-location"/>}
                        hasSwitch={true}
                        switchOnValueChange={onAutomaticLocationSwitch}
                        switchState={automaticLocation}
                        hasNavArrow={false}
                        title='Automatyczna lokalizacja'
                    />
                    <SettingsList.Item
                        icon={<MaterialIcons color={colors.textAndIconColor} size={25} style={styles.imageStyle}
                                             name="location-city"/>}
                        title='Miasto'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor}}
                        titleInfo={city}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setModalVisible(true);
                            setModalData(["Miasto", city])
                        })}
                    />
                    <SettingsList.Item
                        icon={<MaterialCommunityIcons color={colors.textAndIconColor} size={25}
                                                      style={styles.imageStyle} name="road"/>}
                        title='Ulica'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor}}
                        titleInfo={street}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setModalVisible(true);
                            setModalData(["Ulica", street])
                        })}
                    />
                    <SettingsList.Item
                        icon={<MaterialIcons color={colors.textAndIconColor} size={25} style={styles.imageStyle}
                                             name="house"/>}
                        title='Numer domu'
                        titleStyle={automaticLocation === true ? {
                            color: "#DCDCDC",
                            fontSize: 16
                        } : {color: colors.textAndIconColor}}
                        titleInfo={houseNumber}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={automaticLocation === true ? (() => {
                        }) : (() => {
                            setModalVisible(true);
                            setModalData(["Numer domu", houseNumber])
                        })}
                    />
                    <SettingsList.Header
                        headerStyle={{marginTop: 20, fontWeight: 'bold', fontSize: 16, color: colors.textAndIconColor}}
                        headerText="Powiadomienia"/>
                    <SettingsList.Item
                        icon={<MaterialCommunityIcons color={colors.textAndIconColor} size={25}
                                                      style={styles.imageStyle}
                                                      name="clock-time-two-outline"/>}
                        titleStyle={{color: colors.textAndIconColor}}
                        title='Czas powiadomień'
                        titleInfo={selectedReminderTime}
                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={() => Alert.alert('Route To czas powiadomień Page')}
                    />
                    <SettingsList.Header
                        headerStyle={{marginTop: 20, fontWeight: 'bold', fontSize: 16, color: colors.textAndIconColor}}
                        headerText="Wygląd"/>
                    <SettingsList.Item
                        titleStyle={{color: colors.textAndIconColor}}
                        icon={<MaterialCommunityIcons color={colors.textAndIconColor} size={25}
                                                      style={styles.imageStyle}
                                                      name="theme-light-dark"/>}
                        title='Tryb ciemny'
                        hasSwitch={true}
                        switchOnValueChange={onDarkThemeSwitch}
                        switchState={darkTheme}
                        hasNavArrow={false}
                    />
                </SettingsList>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        marginLeft: 15,
        marginRight: 20,
        alignSelf: 'center',
        width: 25,
        height: 26,
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000080',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
        marginTop: 20,
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
        color: 'black'
    },
    input: {
        fontFamily: 'Poppins-regular',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        width: '100%',
    }
});
export default Settings;




