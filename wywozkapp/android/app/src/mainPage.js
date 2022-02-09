import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import locationIcon from "../src/images/locationIcon.png"
import GetLocation from 'react-native-get-location'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


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
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Location')}}><Entypo color="black" size={35} name="location-pin"/><Text style={styles.button_name}>Lokalizacja</Text>
                <Text style={styles.location_city}>{latitude}, {longitude}</Text><Text style={styles.location_date}>07.02.2022 18:02</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('NextGarbage')}}><MaterialCommunityIcons color="black" size={35} name="dump-truck"/><Text style={styles.button_name}>Najbliższy  wywóz</Text><Text style={styles.button_description}>Sroda, 20.11.2020</Text><Text style={styles.button_description}>Smieci mieszane</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Contact')}}><AntDesign color="black" size={35} name="contacts"/><Text style={styles.button_name}>Kontakt do firm</Text><Text style={styles.button_description}>Najważniejsze informacje o firmach wywożących odpady</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('GarbageSchedule')}}><MaterialCommunityIcons color="black" size={35} name="timetable"/><Text style={styles.button_name}>Harmonogram wywozów</Text><Text style={styles.button_description}>Daty wywozów {"\n"}odpadów</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('RecyclingInfo')}}><MaterialCommunityIcons color="black" size={35} name="recycle"/><Text style={styles.button_name}>Informacje o recyklingu</Text><Text style={styles.button_description}>Segregacja odpadów</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Settings')}}><MaterialIcons color="black" size={50} name="settings"/><Text style={styles.button_name}>Ustawienia</Text></TouchableOpacity>
        </View>

    // <View style={styles.main_buttons_container}>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Location')}}><View style={styles.header}><Entypo color="black" size={27} name="location-pin"/><Text style={styles.button_name}>Lokalizacja</Text></View>
    //         <Text style={styles.location_city}>{latitude}, {longitude}</Text><Text style={styles.location_date}>07.02.2022 18:02</Text></TouchableOpacity>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('NextGarbage')}}><View style={styles.header}><MaterialCommunityIcons color="black" size={27} name="dump-truck"/><Text style={styles.button_name}>Najbliższy{"\n"} wywóz</Text></View><Text>Sroda, 20.11.2020</Text><Text>Smieci mieszane</Text></TouchableOpacity>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Contact')}}><View style={styles.header}><AntDesign color="black" size={27} name="contacts"/><Text style={styles.button_name}>Kontakt {"\n"}do firm</Text></View></TouchableOpacity>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('GarbageSchedule')}}><View style={styles.header}><MaterialCommunityIcons color="black" size={27} name="timetable"/><Text style={styles.button_name}>Harmonogram wywozów</Text></View></TouchableOpacity>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('RecyclingInfo')}}><View style={styles.header}><MaterialCommunityIcons color="black" size={27} name="recycle"/><Text style={styles.button_name}>Informacje o recyklingu</Text></View></TouchableOpacity>
    //     <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Settings')}}><View style={styles.header}><MaterialIcons color="black" size={27} name="settings"/><Text style={styles.button_name}>Ustawienia</Text></View></TouchableOpacity>
    // </View>

    //     <View style={styles.main_buttons_container}>
    //         <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Location')}}><Entypo color="black" size={27} name="location-pin"/><Text style={styles.button_name}>Lokalizacja</Text>
    //             <Text style={styles.location_city}>{latitude}, {longitude}</Text><Text style={styles.location_date}>07.02.2022 18:02</Text></TouchableOpacity>
    //         <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('NextGarbage')}}><MaterialCommunityIcons color="black" size={27} name="dump-truck"/><Text style={styles.button_name}>Najbliższy{"\n"} wywóz</Text><Text style={styles.button_description}>Sroda, 20.11.2020</Text><Text style={styles.button_description}>Smieci mieszane</Text></TouchableOpacity>
    // <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Contact')}}><AntDesign color="black" size={27} name="contacts"/><Text style={styles.button_name}>Kontakt {"\n"}do firm</Text><Text style={styles.button_description}>Najważniejsze informacje o firmach wywożących odpady</Text></TouchableOpacity>
    // <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('GarbageSchedule')}}><MaterialCommunityIcons color="black" size={27} name="timetable"/><Text style={styles.button_name}>Harmonogram wywozów</Text><Text style={styles.button_description}>Daty wywozów {"\n"}odpadów</Text></TouchableOpacity>
    // <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('RecyclingInfo')}}><MaterialCommunityIcons color="black" size={27} name="recycle"/><Text style={styles.button_name}>Informacje o recyklingu</Text><Text style={styles.button_description}>Segregacja odpadów</Text></TouchableOpacity>
    //         <TouchableOpacity style={styles.main_buttons} onPress={()=>{navigation.navigate('Settings')}}><MaterialIcons color="black" size={27} name="settings"/><Text style={styles.button_name}>Ustawienia</Text></TouchableOpacity>
    //     </View>
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
        float: 'left',
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
});