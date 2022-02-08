import React from 'react';
import {Image} from 'react-native';
import MainPage from "./android/app/src/mainPage";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeIcon from "../wywozkapp/android/app/src/images/home.png";

const Tab = createBottomTabNavigator();
const App = () => {
  return (
      <NavigationContainer>
          <Tab.Navigator
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
              <Tab.Screen name="Home" component={MainPage} options={{ headerShown: false}}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
