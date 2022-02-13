import React, {useEffect} from 'react';
import MainPage from "./android/app/src/mainPage";
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "./android/app/src/TabNavigation";
import SplashScreen from "react-native-splash-screen";
import Contact from "./android/app/src/contact";
import Location from "./android/app/src/location";
import GarbageSchedule from "./android/app/src/garbageSchedule";
import NextGarbage from "./android/app/src/nextGarbage";
import RecyclingInfo from "./android/app/src/recyclingInfo";
import Settings from "./android/app/src/settings";
import newUserSettingsModal from "./android/app/src/newUserSettingsModal";

const Stack = createStackNavigator();
const App = () => {

    const customDarkTheme = {
        ...DarkTheme,
            colors:{
            ...DarkTheme.colors,
                backgroundColor: "#222222",
                blockColor: "#3D5736",
                textAndIconColor: "white",
                greyTint: "#444444"
        }
    }

    const customDefaultTheme = {
        ...DefaultTheme,
        colors:{
            ...DefaultTheme.colors,
            backgroundColor: "#f2f2f2",
            blockColor: "#85BB76",
            textAndIconColor: "black",
            greyTint: "#d5d5d5"
        }
    }

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
        <NavigationContainer theme={customDarkTheme} >
            <Stack.Navigator initialRouteName="TabNavigation">
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
                <Stack.Screen name="newUserSettingsModal" component={newUserSettingsModal}
                              options={{headerShown: false, animationEnabled: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
