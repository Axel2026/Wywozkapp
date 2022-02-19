import React, {useEffect, useState} from 'react';
import MainPage from "./android/app/src/mainPage";
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "./android/app/src/TabNavigation";
import SplashScreen from "react-native-splash-screen";
import newUserSettingsModal from "./android/app/src/newUserSettingsModal";
import {Provider, useSelector} from 'react-redux'
import {createStore, combineReducers} from "redux";
import {themeReducer} from "./android/app/src/themeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const customDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        backgroundColor: "#222222",
        blockColor: "#3D5736",
        textAndIconColor: "white",
        greyTint: "#444444",
        modalSettings: "#343434",
        settingsBackground: "#444444",
    }
}

const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        backgroundColor: "#f2f2f2",
        blockColor: "#85BB76",
        textAndIconColor: "black",
        greyTint: "#d5d5d5",
        modalSettings: "white",
        settingsBackground: "#EFEFF4",
    }
}

const rootReducer = combineReducers({
    myDarkMode: themeReducer
})

const store = createStore(rootReducer)

export default function App() {
    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    )
}

export function Navigation() {

    let parsed;

    useEffect(() => {
        SplashScreen.hide();
        getKeyValue()
    }, [])

    let currentTheme = useSelector(state => {
        return state.myDarkMode
    })

    async function getKeyValue() {
        const settings = AsyncStorage.getItem('SELECTED_THEME');
        parsed = (JSON.parse(await settings))
        console.log('parsed ' + parsed)
        // return parsed
    }

    return (
        <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
            <Stack.Navigator initialRouteName="TabNavigation">
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
                <Stack.Screen name="newUserSettingsModal" component={newUserSettingsModal}
                              options={{headerShown: false, animationEnabled: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
