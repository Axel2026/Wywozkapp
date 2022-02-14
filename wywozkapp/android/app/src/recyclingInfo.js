import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const RecyclingInfo = () => {

    const {colors} = useTheme()

    return (
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={styles.paper}><Text style={styles.header}>Papier</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> opakowania z papieru, karton,
                    tekturę (także falistą)</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> katalogi, ulotki,
                    prospekty</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> gazety i czasopisma</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> papier szkolny i biurowy,
                    zadrukowane kartki</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zeszyty i książki</Text>
            </View>
            <View style={styles.glass}><Text style={styles.header2}>Szkło</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> butelki i słoiki po napojach
                    i żywności (w tym butelki po napojach alkoholowych i olejach roślinnych)</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> szklane opakowania po
                    kosmetykach (jeżeli nie są wykonane z trwale połączonych kilku surowców)</Text>
            </View>
            <View style={styles.bio}><Text style={styles.header3}>Bio</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> odpadki warzywne i owocowe (w
                    tym obierki itp.)</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> gałęzie drzew i
                    krzewów</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> skoszoną trawę, liście,
                    kwiaty</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> trociny i korę drzew</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> resztki jedzenia</Text>
            </View>
            <View style={styles.metals}><Text style={styles.header4}>Metale i tworzywa sztuczne</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> butelki plastikowe</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> kartony po mleku i
                    napojach</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> torby i opakowania
                    plastikowe</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> puszki po napojach i
                    konserwach</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> nakrętki, kapsle</Text>
            </View>
            <View style={styles.mixed}><Text style={styles.header5}>Mieszane</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zatłuszczony papier</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zabrudzone folie</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zużyte ręczniki</Text>
                <Text style={styles.main}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> mięso,kości i ości</Text>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    paper: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        marginTop: 10,
        padding: 15,
        borderColor: "blue",
        borderWidth: 10,
        color: 'white',
    },
    dot: {
        color: 'black',
        fontSize: 15
    },
    main: {
        color: 'black',
        fontSize: 19
    },
    glass: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        borderColor: "green",
        borderWidth: 10,
        color: 'white'
    },
    bio: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        borderColor: "brown",
        borderWidth: 10,
        color: 'white'
    },
    metals: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        borderColor: "yellow",
        borderWidth: 10,
        color: 'white'
    },
    mixed: {
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        padding: 15,
        borderColor: "grey",
        borderWidth: 10,
        color: 'black'
    },
    header: {
        fontSize: 40,
        borderRadius: 10,
        color: 'black',
        backgroundColor: "blue",
        textAlign: 'center'
    },
    header2: {
        fontSize: 40,
        borderRadius: 10,
        color: 'black',
        backgroundColor: "green",
        textAlign: 'center'
    },
    header3: {
        fontSize: 40,
        borderRadius: 10,
        color: 'black',
        backgroundColor: "brown",
        textAlign: 'center'
    },
    header4: {
        fontSize: 40,
        borderRadius: 10,
        color: 'black',
        backgroundColor: "yellow",
        textAlign: 'center'
    },
    header5: {
        fontSize: 40,
        borderRadius: 10,
        color: 'black',
        backgroundColor: "grey",
        textAlign: 'center'
    },
});
export default RecyclingInfo;

