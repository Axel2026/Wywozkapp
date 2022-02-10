import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from '@react-native-community/picker';
import { AsyncStorage } from 'react-native';

const NewUserSettingsModal = ({navigation}) => {

    const [city,setCity] = useState();
    const [street,setStreet] = useState();
    const [houseNumber,setHouseNumber] = useState();
    const [selectedReminderTime, setSelectedReminderTime] = useState('1day');

    const saveSettings = () =>{
        //alert("Zapisuję city="+city + ' street=' + street + ' number='+houseNumber)
        const payload = {
            city: city,
            street: street,
            houseNumber: houseNumber,
        }
        //alert('Payload = ' + JSON.stringify(payload))
        AsyncStorage.setItem('STORAGE_USER_SETTINGS', JSON.stringify(payload))
        navigation.navigate("Home")
    }

    return (
        <View style={{flex: 1, backgroundColor: '#ececec', display: "flex", alignItems: "center"}}>
            <ScrollView>
                <Text style={styles.header_text}>Witaj, skonfiguruj swoją aplikację</Text>
                <Text style={styles.paragraph_text}>Twoja miejscowość:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="np. Tarnów"
                    onChangeText={newText => setCity(newText)}
                />
                <Text style={styles.paragraph_text}>Ulica i numer:</Text>
                <View style={{flex: 1,  display: "flex",flexDirection:"row",alignItems:"flex-start",}}>
                    <TextInput
                        style={styles.input_street}
                        placeholder="np. Krakowska"
                        onChangeText={newText => setStreet(newText)}
                    />
                    <TextInput
                        style={styles.input_house_number}
                        placeholder="5"
                        onChangeText={newText => setHouseNumber(newText)}
                    />
                </View>
                <TouchableOpacity style={styles.find_my_localization_button}><Text style={styles.find_my_localization_text}>Znajdź moją lokalizację</Text></TouchableOpacity>
                <Text style={styles.paragraph_text}>Ustaw przypomnienie:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="1 dzień przed"
                />
                {/*<Picker
                    selectedValue={selectedReminderTime}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedReminderTime(itemValue)
                    }>
                    <Picker.Item label="1 dzień przed" value="1day" />
                    <Picker.Item label="2 dni przed" value="2days" />
                    <Picker.Item label="3 dni przed" value="3days" />
                    <Picker.Item label="Tydzień przed" value="1week" />
                </Picker>*/}
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
    }
})
