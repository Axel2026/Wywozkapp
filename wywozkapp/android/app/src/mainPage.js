import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import locationIcon from "../src/images/locationIcon.png"
import GetLocation from 'react-native-get-location'
import Icon from 'react-native-vector-icons/FontAwesome';


const MainPage  = ({navigation}) => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                setLatitude(location.latitude)
                setLongitude(location.longitude)
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyARsjm6KomoMKnzAvBeJmFi9pzCv0ZOX38')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Address: ' + JSON.stringify(responseJson));
                    })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }, [])

    return (
        <View style={styles.main_buttons_container}>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Location')}}><Text style={styles.button_name}>Lokalizacja</Text><Image style={styles.location_icon} source={locationIcon}/>
                <Text style={styles.location_city}>{latitude}, {longitude}</Text><Text style={styles.location_date}>07.02.2022 18:02</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('NextGarbage')}}><Text style={styles.button_name}>Najbliższy  wywóz</Text><Icon name="rocket" /><Text>Sroda, 20.11.2020</Text><Text>Smieci mieszane</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Contact')}}><Text style={styles.button_name}>Kontakt do firm</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('GarbageSchedule')}}><Text style={styles.button_name}>Harmonogram wywozów</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('RecyclingInfo')}}><Text style={styles.button_name}>Informacje o recyklingu</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Settings')}}><Text style={styles.button_name}>Ustawienia</Text></TouchableOpacity>
        </View>
    );
};

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
        fontSize: 20,
        fontFamily: 'Poppins-Bold'
    },

    location_icon: {
        width: 30,
        height: 30,
    },

    location_city: {
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },

    location_date: {
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },
});
