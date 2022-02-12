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
            <View style={{
                borderRadius: 20,
                marginBottom: 10,
                margin: 5,
                marginTop: 10,
                padding: 15,
                backgroundColor: "blue",
                color: 'white',
            }}><Text style={{
                fontSize: 40,
                color: 'white',
                textAlign: 'center'
            }}>MPGK Tarnów</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 19
                }} onPress={() => {
                    dialCall(123456789)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 15
                    }}>{'\n'}{'\u2B24'}
                    </Text>123456789</Text>
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

