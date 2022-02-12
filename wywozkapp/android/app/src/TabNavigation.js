import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from "./settings"
import GarbageSchedule from "./garbageSchedule";
import MainPage from "./mainPage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NextGarbage from "./nextGarbage";
import Contact from "./contact";
import RecyclingInfo from "./recyclingInfo";
import Location from "./location";
import {useTheme} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    const {colors} = useTheme()

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarButton: [
                    "Location",
                    "NextGarbage",
                    "Contact",
                    "RecyclingInfo",
                    "HomeHidden"
                ].includes(route.name)
                    ? () => {
                        return null;
                    } : undefined,

                tabBarIcon: () => {
                    if (route.name === 'Home') {
                        return <MaterialIcons color={colors.textAndIconColor} size={35} name="home"/>
                    } else if (route.name === 'Settings') {
                        return <MaterialIcons color={colors.textAndIconColor} size={35} name="settings"/>
                    } else if (route.name === 'GarbageSchedule') {
                        return <MaterialCommunityIcons color={colors.textAndIconColor} size={35} name="timetable"/>
                    }
                },
            })}
        >
            <Tab.Screen name="HomeHidden" component={MainPage} options={{headerShown: false}}/>
            <Tab.Screen name="GarbageSchedule" component={GarbageSchedule} options={{
                headerShown: false,
                headerTitleAlign: 'center',
            }}/>
            <Tab.Screen name="Home" component={MainPage} options={{headerShown: false}}/>
            <Tab.Screen name="Settings" component={Settings} options={{
                headerShown: false,
                headerTitleAlign: 'center',
            }}/>
            <Tab.Screen name="Location" component={Location} options={{headerShown: false}}/>
            <Tab.Screen name="NextGarbage" component={NextGarbage} options={{headerShown: false}}/>
            <Tab.Screen name="Contact" component={Contact} options={{headerShown: false}}/>
            <Tab.Screen name="RecyclingInfo" component={RecyclingInfo} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}
