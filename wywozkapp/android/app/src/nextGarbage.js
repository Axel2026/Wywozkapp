import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";


const NextGarbage = () => {

    const json_data = [
        {
            'location': 'Tuchów',
            'scheduleDate': '10.02.2022',
            'garbageCollections': [
                {
                    'date': '12.02.2022',
                    'type': 'paper',
                    'month': 'LUT',
                    'name': 'papier i tektura'
                },
                {
                    'date': '12.02.2022',
                    'type': 'glass',
                    'month': 'LUT',
                    'name': 'szkło'
                },
                {
                    'date': '16.02.2022',
                    'type': 'bio',
                    'month': 'LUT',
                    'name': 'biodegradowalne'
                },
                {
                    'date': '21.02.2022',
                    'type': 'mixed',
                    'month': 'LUT',
                    'name': 'zmieszane'
                },
                {
                    'date': '23.02.2022',
                    'type': 'metals',
                    'month': 'LUT',
                    'name': 'metale i tworzywa sztuczne'
                },
            ]
        }
    ]

    const Item = ({data}) => (
        <View style={styles.item}>
            <View style={styles.date_box}><Text style={styles.date_box_text}>{data.date.substr(0,2)} {data.month}</Text></View>
            <View style={styles.name_box}><Text style={styles.name_box_text}>{data.name}</Text></View>
            <View style={styles.trash_box}><AntDesign color="black" size={42} name="delete"/></View>
        </View>
    );

    const renderItem = ({item}) => (
        <Item data={item}/>
    );


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>Najbliższy wywóz w twojej lokalizacji
                </Text>
            </View>
            <View style={styles.flatlist}>
                <FlatList
                    data={json_data[0].garbageCollections}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

export default NextGarbage;

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems:'center',
    },
    header: {
        backgroundColor: "#85BB76",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        width:'100%'
    },
    header_text: {
        color: 'black',
        fontSize: 21,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    flatlist: {
        backgroundColor: "#ffffff",
        width: '97%',
        marginTop:5,
    },
    item: {
        backgroundColor: "#d5d5d5",
        marginBottom: 2,
        height: 70,
        width: '100%',
        borderLeftWidth: 7,
        borderColor:"#e2dd39",
        display:'flex',
        flexDirection:'row'
    },
    date_box:{
        backgroundColor: "#d5d5d5",
        aspectRatio: 1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date_box_text:{
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    name_box:{
        backgroundColor: "#d5d5d5",
        flex:1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:10,
    },
    name_box_text:{
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
    },
    trash_box:{
        backgroundColor: "#d5d5d5",
        display:'flex',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
