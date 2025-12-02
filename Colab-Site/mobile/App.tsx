import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { navigationRef } from './navigation/rootNavigation';

import LoginScreen from './screens/LoginScreen';
import MainTabNavigator from './navigation/MainTabNavigator';
import AddClientScreen from './screens/AddClientScreen';
import AddContractScreen from './screens/AddContractScreen';
import ContactsImportScreen from './screens/ContactsImportScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import ClientDetailsScreen from './screens/ClientDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

import ErrorBoundary from './components/ErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="AddClient" component={AddClientScreen} />
            <Stack.Screen name="ContactsImport" component={ContactsImportScreen} />
            <Stack.Screen name="AddContract" component={AddContractScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
