import React from 'react';
import {StyleSheet,ScrollView, Text, View} from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);

const GarbageCollection  = () => {
    return (
        <ScrollView>
            <Text style={styles.confused}>
            10 luty zmieszane
        </Text>
            <Separator />
            <Text style={styles.bio}>
                10 luty bio
            </Text>
            <Separator/>
            <Text style={styles.metals}>
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
        color:'grey'
    },
    bio: {
        textAlign: 'center',
        marginVertical: 8,
        color:'brown'
    },
    metals: {
        textAlign: 'center',
        marginVertical: 8,
        color:'orange'
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

export default GarbageCollection;

