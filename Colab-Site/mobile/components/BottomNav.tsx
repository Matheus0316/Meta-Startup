import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomNav: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const currentRouteName = state.routes[state.index].name;
  
  const tabs = [
    { name: 'Dashboard', label: 'Home', icon: 'home' },
    { name: 'ContractList', label: 'Contratos', icon: 'description' },
    { name: 'ClientList', label: 'Clientes', icon: 'people' },
    { name: 'Settings', label: 'Ajustes', icon: 'settings' },
  ];

  return (
    <View 
      className="flex-row bg-white border-t border-gray-200 items-center justify-around pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 10), height: 60 + Math.max(insets.bottom, 10) }}
    >
      {tabs.map((tab) => {
        const isFocused = currentRouteName === tab.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: tab.name, // We need the route key, but since we are mapping manually, we navigate by name
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            className="items-center justify-center w-1/4"
          >
            <MaterialIcons 
              name={tab.icon as any} 
              size={24} 
              color={isFocused ? '#A90011' : '#9ca3af'} 
            />
            <Text className={`text-xs font-medium mt-1 ${isFocused ? 'text-primary' : 'text-gray-400'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
