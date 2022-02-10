import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';


const RecyclingInfo = () => {
    return (
        <ScrollView>
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
            <View style={styles.glass}><Text style={styles.header}>Szkło</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> butelki i słoiki po napojach
                    i żywności (w tym butelki po napojach alkoholowych i olejach roślinnych)</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> szklane opakowania po
                    kosmetykach (jeżeli nie są wykonane z trwale połączonych kilku surowców)</Text>
            </View>
            <View style={styles.bio}><Text style={styles.header}>Bio</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> odpadki warzywne i owocowe (w
                    tym obierki itp.)</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> gałęzie drzew i
                    krzewów</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> skoszoną trawę, liście,
                    kwiaty</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> trociny i korę drzew</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> resztki jedzenia</Text>
            </View>
            <View style={styles.metals}><Text style={styles.header}>Metale i tworzywa sztuczne</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> butelki plastikowe</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> kartony po mleku i
                    napojach</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> torby i opakowania
                    plastikowe</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> puszki po napojach i
                    konserwach</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> nakrętki, kapsle</Text>
            </View>
            <View style={styles.mixed}><Text style={styles.header}>Mieszane</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> zatłuszczony papier</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> zabrudzone folie</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> zużyte ręczniki</Text>
                <Text style={styles.dot}>{'\n'}{'\u2B24'}</Text><Text style={styles.main}> mięso,kości i ości</Text>
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
export default RecyclingInfo;

