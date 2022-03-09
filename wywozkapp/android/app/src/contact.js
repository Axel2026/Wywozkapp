import React from 'react';
import {StyleSheet, Text, View, Linking, Platform, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import contacts_json from "./contactsJson";
import Entypo from "react-native-vector-icons/Entypo";

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


    // <View style={{
    //     display: 'flex',
    //     flex: 1,
    //     backgroundColor: colors.backgroundColor,
    // }}>
    //     <View style={styles.main}>
    //         <Text style={{
    //             fontSize: 40,
    //         }} onPress={() => {
    //             dialCall(123456789)
    //         }}>MPGK Tarnów</Text>
    //         <Image source={require('./images/companies/vangansewinkel.png')}/>
    //     </View>
    // </View>

    return (
        contacts_json.map((item) => (
            <View key={item.id} style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.backgroundColor,
            }}>
                <View style={styles.main}>
                    <View style={styles.logoWrapper}>
                        <Image style={styles.logo} source={item.logo}/>
                    </View>
                    <View style={styles.infoPhoneWrapper}>
                        <View style={styles.infoContact}>

                                <Text numberOfLines={1}
                                      adjustsFontSizeToFit={true} style={styles.companyNameText}>{item.companyName}</Text>

                                <Text style={styles.phoneNumberText}>{item.phoneNumber}</Text>


                        </View>
                        <View style={styles.phoneContact}>
                            <Feather size={45} color="green" name="phone-call" onPress={() => {
                                dialCall(item.phoneNumber)
                            }}/>
                        </View>
                    </View>

                </View>
            </View>
        ))
    );
};
const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flex: 1,
        borderRadius: 20,
        marginBottom: 10,
        // margin: 5,
        marginTop: 10,
        padding: 10,
        borderWidth: 5,
        borderColor: "black",
        flexWrap: 'wrap',
        width: '95%',
        justifyContent: 'center',
    },
    logoWrapper: {
        width: '30%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    logo: {
        width: '100%',
        // height: undefined,
        // aspectRatio: 5,
        resizeMode: 'contain'
    },
    infoContact: {
        // backgroundColor: 'orange',
        width: '65%',
        padding: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneContact: {
        // backgroundColor: 'grey',
        display: 'flex',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '18%'
    },
    infoPhoneWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    companyNameText: {
        color: 'black',
        fontSize: 25,
    },

    phoneNumberText: {
        color: 'black',
        fontSize: 30,
    }
});

export default Contact;

