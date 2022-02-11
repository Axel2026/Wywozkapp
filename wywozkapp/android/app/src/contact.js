import React from 'react';
import {StyleSheet, Text, View, Linking, Platform} from 'react-native';

const Contact  = () => {
    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };
    return (
        <View>
            <View style={styles.paper}><Text style={styles.header}>MPGK Tarnów</Text>
                <Text style={styles.main} onPress={()=>{dialCall(123456789)}}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text>123456789</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    paper: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        marginTop: 10,
        padding: 15,
        backgroundColor: "blue",
        color: 'white',
    },
    dot: {
        color: 'white',
        fontSize: 15
    },
    main: {
        color: 'white',
        fontSize: 19
    },
    glass: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        backgroundColor: "green",
        color: 'white'
    },
    bio: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        backgroundColor: "brown",
        color: 'white'
    },
    metals: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        backgroundColor: "orange",
        color: 'white'
    },
    mixed: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        backgroundColor: "grey",
        color: 'white'
    },
    header: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
    },
});
export default Contact;

