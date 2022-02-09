import React, {useEffect} from 'react';
import MainPage from "./android/app/src/mainPage";
import { NavigationContainer } from '@react-navigation/native';
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

    useEffect(() => {
        SplashScreen.hide();
    }, [])

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="TabNavigation">
              <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={MainPage} options={{ headerShown: false }}/>
              <Stack.Screen name="Location" component={Location} options={{ headerShown: false }}/>
              <Stack.Screen name="NextGarbage" component={NextGarbage} options={{ headerShown: false }}/>
              <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
              <Stack.Screen name="GarbageSchedule" component={GarbageSchedule} options={{ headerShown: false }}/>
              <Stack.Screen name="RecyclingInfo" component={RecyclingInfo} options={{ headerShown: false }}/>
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
              <Stack.Screen name="newUserSettingsModal" component={newUserSettingsModal} options={{ headerShown: false,animationEnabled:true }}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
