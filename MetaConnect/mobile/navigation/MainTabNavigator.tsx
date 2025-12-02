import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import DashboardScreen from '../screens/DashboardScreen';
import ContractListScreen from '../screens/ContractListScreen';
import ClientListScreen from '../screens/ClientListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BottomNav from '../components/BottomNav';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ContractList" component={ContractListScreen} />
      <Tab.Screen name="ClientList" component={ClientListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
