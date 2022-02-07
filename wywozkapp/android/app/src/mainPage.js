import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import locationIcon from "../src/images/locationIcon.png"
import GetLocation from 'react-native-get-location'

const MainPage  = () => {

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
            <TouchableOpacity style={styles.main_buttons}><Text style={styles.locationName}>Lokalizacja</Text><Image style={styles.locationIcon} source={locationIcon}/>
                <Text style={styles.locationCity}>{latitude}, {longitude}</Text><Text style={styles.locationDate}>07.02.2022 18:02</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons}><Text>Przycisk 2</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons}><Text>Przycisk 3</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons}><Text>Przycisk 4</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons}><Text>Przycisk 5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.main_buttons}><Text>Przycisk 6</Text></TouchableOpacity>
        </View>
    );
};

export default MainPage ;

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
        alignItems: "center",
        width: '45%',
        aspectRatio: 1,
        color: "black",
        flex: 0,
        marginTop: '5%'
    },

    locationIcon: {
        width: 30,
        height: 30,
    },

    locationName: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20
    },

    locationCity: {
        color: 'black',
    },

    locationDate: {
        color: 'black',
    },
});
