import React, {useEffect, useState} from 'react';
import {AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from '@react-native-community/picker';
import GetLocation from "react-native-get-location";

const NewUserSettingsModal = ({navigation}) => {

    const [city,setCity] = useState();
    const [street,setStreet] = useState();
    const [houseNumber,setHouseNumber] = useState();
    const [selectedReminderTime, setSelectedReminderTime] = useState('1day');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [isLocationLoading, setIsLocationLoading] =useState(false)
    const [address, setAddress] = useState(0)

    const saveSettings = () =>{
        //alert("Zapisuję city="+city + ' street=' + street + ' number='+houseNumber)
        const payload = {
            city: city,
            street: street,
            houseNumber: houseNumber,
            selectedReminderTime: selectedReminderTime
        }
        //alert('Payload = ' + JSON.stringify(payload))
        AsyncStorage.setItem('STORAGE_USER_SETTINGS', JSON.stringify(payload))
        navigation.navigate("Home")
    }
    function getAddressFromCoordinates({ latitude, longitude }) {
        return new Promise((resolve) => {
            const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=glDPcNHhGcxDWLac9fvMIEUDcXj9HOoJIEjTSA4CTlI&mode=retrieveAddresses&prox=${latitude},${longitude}`
            fetch(url)
                .then(res => res.json())
                .then((resJson) => {
                    console.log(resJson)
                    if (resJson
                        && resJson.Response
                        && resJson.Response.View
                        && resJson.Response.View[0]
                        && resJson.Response.View[0].Result
                        && resJson.Response.View[0].Result[0]) {
                        resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
                        console.log(resJson.Response.View[0].Result[0].Location.Address)
                        setCity(resJson.Response.View[0].Result[0].Location.Address.District)
                        setStreet(resJson.Response.View[0].Result[0].Location.Address.Street)
                        setHouseNumber(resJson.Response.View[0].Result[0].Location.Address.HouseNumber)
                    } else {
                        resolve()
                        console.log(latitude,longitude)
                    }
                })
                .catch((e) => {
                    console.log('Error in getAddressFromCoordinates', e)
                    resolve()
                })
        })
    }
    const getLocation = () =>{
        setIsLocationLoading(true)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                setLatitude(location.latitude)
                setLongitude(location.longitude)
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'glDPcNHhGcxDWLac9fvMIEUDcXj9HOoJIEjTSA4CTlI')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        getAddressFromCoordinates({latitude,longitude})
                        setIsLocationLoading(false)
                    })
            })
            .catch(error => {
                const {code, message} = error;
                console.warn(code, message);
            })
    }

    return (
        <View style={{flex: 1, backgroundColor: '#ececec', display: "flex", alignItems: "center"}}>
            <ScrollView>
                <Text style={styles.header_text}>Witaj, skonfiguruj swoją aplikację</Text>
                <Text style={styles.paragraph_text}>Twoja miejscowość:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="np. Tarnów"
                    value={city}
                    onChangeText={newText => setCity(newText)}
                />
                <Text style={styles.paragraph_text}>Ulica i numer:</Text>
                <View style={{flex: 1,  display: "flex",flexDirection:"row",alignItems:"flex-start",}}>
                    <TextInput
                        style={styles.input_street}
                        placeholder="np. Krakowska"
                        value={street}
                        onChangeText={newText => setStreet(newText)}
                    />
                    <TextInput
                        style={styles.input_house_number}
                        placeholder="5"
                        value={houseNumber}
                        onChangeText={newText => setHouseNumber(newText)}
                    />
                </View>
                {!isLocationLoading && <TouchableOpacity style={styles.find_my_localization_button} onPress={getLocation}><Text style={styles.find_my_localization_text}>Znajdź moją lokalizację</Text></TouchableOpacity> }
                {isLocationLoading && <ActivityIndicator size="large" color="#85BB76" style={{height:40}}/>}
                <Text style={styles.paragraph_text}>Ustaw przypomnienia:</Text>
                <Picker
                    style={{ backgroundColor: '#d5d5d5'}}
                    mode="dropdown"
                    selectedValue={selectedReminderTime}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedReminderTime(itemValue)
                    }>
                    <Picker.Item label="1 dzień przed" value="1day" />
                    <Picker.Item label="2 dni przed" value="2days" />
                    <Picker.Item label="3 dni przed" value="3days" />
                    <Picker.Item label="Tydzień przed" value="1week" />
                </Picker>
                <TouchableOpacity style={styles.save_settings_button} onPress={saveSettings}><Text style={styles.save_settings_text}>Zapisz</Text></TouchableOpacity>


            </ScrollView>
        </View>
    );
};

export default NewUserSettingsModal;

const styles = StyleSheet.create({
    header_text: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
        marginTop: '5%',
        textAlign: 'center'
    },
    paragraph_text: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginTop: '5%',
    },
    input: {
        height: 40,
        margin: 0,
        width: '100%',
        borderWidth: 1,
        padding: 10,
    },
    input_street: {
        height: 40,
        margin: 0,
        width: '60%',
        borderWidth: 1,
        padding: 10,
    },
    input_house_number: {
        height: 40,
        marginLeft: 10,
        width: '20%',
        borderWidth: 1,
        padding: 10,
    },
    find_my_localization_button:{
        borderWidth:2,
        borderColor:"#85BB76",
        backgroundColor:"#85BB76",
        borderRadius:15,
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    find_my_localization_text:{
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    },
    save_settings_button:{
        borderWidth:2,
        borderColor:"#85BB76",
        backgroundColor:"#85BB76",
        borderRadius:15,
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'15%'
    },
    save_settings_text:{
        color: 'black',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },
})
