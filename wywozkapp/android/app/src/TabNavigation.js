import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from "./settings"
import GarbageSchedule from "./garbageSchedule";
import MainPage from "./mainPage";
import homeIcon from "./images/home.png";
import {Image} from "react-native";


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    if (route.name === 'Home') {
                        return <Image source={homeIcon} style={{height: 30, width: 30}} />;
                    } else if (route.name === 'Settings') {
                        return <Image source={homeIcon} style={{height: 30, width: 30}} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Settings" component={Settings} options={{
                title: 'SETTINGS',
                headerTitleAlign: 'center',
                tabBarIconStyle: {display: "none"},
                tabBarLabelStyle: {
                    fontWeight: "700",
                    fontSize: 15,
                    bottom: 15
                }
            }}/>
            <Tab.Screen name="Home" component={MainPage} options={{ headerShown: false}}/>
            <Tab.Screen name="Schedule" component={GarbageSchedule} options={{
                title: 'GARBAGE SCHEDULE',
                headerTitleAlign: 'center',
                tabBarIconStyle: {display: "none"},
                tabBarLabelStyle: {
                    fontWeight: "700",
                    fontSize: 15,
                    bottom: 15
                }
            }}/>
        </Tab.Navigator>
    );
}
