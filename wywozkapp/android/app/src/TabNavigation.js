import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from "./settings"
import GarbageSchedule from "./garbageSchedule";
import MainPage from "./mainPage";
import homeIcon from "./images/home.png";
import {Image} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    if (route.name === 'Home') {
                        return <FontAwesome color="black" size={40} name="home"/>;
                    } else if (route.name === 'Settings') {
                        return <FontAwesome color="black" size={40} name="home"/>;
                    }
                },
            })}
        >
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons color="black" size={35} name="settings"/>
                ),
                title: 'SETTINGS',
                headerTitleAlign: 'center',
                // tabBarIconStyle: {display: "none"},
                // tabBarLabelStyle: {
                //     fontWeight: "700",
                //     fontSize: 15,
                //     bottom: 15
                // }
            }}/>
            <Tab.Screen name="Home" component={MainPage} options={{ headerShown: false}}/>
            <Tab.Screen name="Schedule" component={GarbageSchedule} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons color="black" size={35} name="timetable"/>
                ),
                title: 'GARBAGE SCHEDULE',
                headerTitleAlign: 'center',
                // tabBarIconStyle: {display: "none"},
                // tabBarLabelStyle: {
                //     fontWeight: "700",
                //     fontSize: 15,
                //     bottom: 15
                // }
            }}/>
        </Tab.Navigator>
    );
}
