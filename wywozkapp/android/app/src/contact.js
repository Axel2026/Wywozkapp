import React from 'react';
import {StyleSheet, Text, View, Linking, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Contact = () => {

    const {colors} = useTheme()

    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    };
    return (
        <View style={{
            display: 'flex',
            flex: 1,
            backgroundColor: colors.backgroundColor,
        }}>
            <View style={styles.main}>
                <Text style={{
                    fontSize: 40,
                }} onPress={() => {
                    dialCall(123456789)}}>MPGK Tarnów    {'\u2192'}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    dot: {
        color: 'white',
        fontSize: 15
    },
    main: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        marginTop: 10,
        padding: 15,
        color: 'black',
        borderWidth: 6,
        borderColor: "#85BB76",
        fontSize: 19
    }
});
export default Contact;

