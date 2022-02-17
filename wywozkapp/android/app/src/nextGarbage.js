import React from 'react';
import {FlatList, StyleSheet, ScrollView, Text, View} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {useTheme} from '@react-navigation/native';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';

const Separator = () => (
    <View style={{
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }}/>
);

const NextGarbage = () => {

    const {colors} = useTheme();

    return (
        <ScrollView style={{
            display: 'flex',
            flex: 1,
            backgroundColor: colors.backgroundColor,
        }}>
            <Text style={{
                textAlign: 'center',
                marginVertical: 8,
                color: 'grey'
            }}>
                10 luty zmieszane
            </Text>
            <Separator/>
            <Text style={{
                textAlign: 'center',
                marginVertical: 8,
                color: 'brown'
            }}>
                10 luty bio
            </Text>
            <Separator/>
            <Text style={{
                textAlign: 'center',
                marginVertical: 8,
                color: 'orange'
            }}>
                21 lut metale
            </Text>
            <Separator/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    confused: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'grey'
    },
    bio: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'brown'
    },
    metals: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'orange'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default NextGarbage;


