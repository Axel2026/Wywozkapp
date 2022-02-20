import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const RecyclingInfo = () => {

    const {colors} = useTheme()

    return (
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={[styles.recycling_type_container]}><Text style={[styles.recycling_type_header, {backgroundColor: "#23C2FFFF", color: colors.textAndIconColor}]}>Papier</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> opakowania z papieru, karton,
                    tekturę (także falistą)</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> katalogi, ulotki,
                    prospekty</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> gazety i czasopisma</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> papier szkolny i biurowy,
                    zadrukowane kartki</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zeszyty i książki</Text>
            </View>
            <View style={[styles.recycling_type_container]}><Text style={[styles.recycling_type_header, {backgroundColor: "#77DD77FF", color: colors.textAndIconColor}]}>Szkło</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> butelki i słoiki po napojach
                    i żywności (w tym butelki po napojach alkoholowych i olejach roślinnych)</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> szklane opakowania po
                    kosmetykach (jeżeli nie są wykonane z trwale połączonych kilku surowców)</Text>
            </View>
            <View style={[styles.recycling_type_container]}><Text style={[styles.recycling_type_header, {backgroundColor: "#FF6961AF", color: colors.textAndIconColor}]}>Bio</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> odpadki warzywne i owocowe (w
                    tym obierki itp.)</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> gałęzie drzew i
                    krzewów</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> skoszoną trawę, liście,
                    kwiaty</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> trociny i korę drzew</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> resztki jedzenia</Text>
            </View>
            <View style={[styles.recycling_type_container]}><Text style={[styles.recycling_type_header, {backgroundColor: "#FDFD96AF", color: colors.textAndIconColor}]}>Metale i tworzywa sztuczne</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> butelki plastikowe</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> kartony po mleku i
                    napojach</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> torby i opakowania
                    plastikowe</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> puszki po napojach i
                    konserwach</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> nakrętki, kapsle</Text>
            </View>
            <View style={[styles.recycling_type_container]}><Text style={[styles.recycling_type_header, {backgroundColor: "#B6AFACAF", color: colors.textAndIconColor}]}>Mieszane</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zatłuszczony papier</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zabrudzone folie</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> zużyte ręczniki</Text>
                <Text style={[styles.recycling_type_text, {color: colors.textAndIconColor}]}><Text style={styles.dot}>{'\n'}{'\u2B24'}</Text> mięso,kości i ości</Text>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    recycling_type_container: {
        backgroundColor: "#FFFFFF0F",
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 10,
        margin: 20,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 3,
    },
    recycling_type_header: {
        top: 3,
        fontSize: 30,
        padding: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        textAlign: 'center'
    },
    recycling_type_text: {
        fontSize: 19,
        marginTop: 5,
    },
    dot: {
        fontSize: 15
    }
});
export default RecyclingInfo;

