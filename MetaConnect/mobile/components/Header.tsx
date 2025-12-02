import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  variant?: 'default' | 'search' | 'profile';
  title?: string;
  subtitle?: string;
  profileName?: string;
  profileImage?: string;
  hasUnreadNotifications?: boolean;
  onBack?: () => void;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  onProfile?: () => void;
  onNotification?: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'default', 
  title, 
  subtitle,
  profileName,
  profileImage,
  hasUnreadNotifications,
  onBack, 
  onSearch, 
  onFilter, 
  onProfile,
  onNotification,
  children
}) => {
  if (variant === 'profile') {
    return (
      <View className="py-4 bg-background-light">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={onProfile} className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center border border-gray-300 overflow-hidden">
               {profileImage ? (
                 <Image source={{ uri: profileImage }} className="w-full h-full" />
               ) : (
                 <MaterialIcons name="person" size={24} color="#6b7280" />
               )}
            </View>
            <View>
              {subtitle && <Text className="text-xs text-text-secondary font-body">{subtitle}</Text>}
              <Text className="text-sm font-bold text-navy font-display">{profileName || 'Usuário'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotification} className="w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm relative">
            <MaterialIcons name="notifications-none" size={24} color="#0A2B4C" />
            {hasUnreadNotifications && (
              <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </TouchableOpacity>
        </View>
        {children}
      </View>
    );
  }

  if (variant === 'search') {
    return (
      <View className="py-4 bg-background-light">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-navy font-display">{title || 'Pesquisar'}</Text>
          {children}
        </View>
        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-white border border-gray-300 rounded-full px-4 h-12">
            <MaterialIcons name="search" size={24} color="#9ca3af" />
            <TextInput 
              className="flex-1 ml-2 text-text-light font-body"
              placeholder="Buscar..." 
              placeholderTextColor="#9ca3af"
              onChangeText={onSearch}
            />
          </View>
          {onFilter && (
            <TouchableOpacity onPress={onFilter} className="w-12 h-12 items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm">
              <MaterialIcons name="filter-list" size={24} color="#0A2B4C" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row items-center py-4 bg-background-light">
      {onBack && (
        <TouchableOpacity onPress={onBack} className="mr-4">
          <MaterialIcons name="arrow-back" size={24} color="#0A2B4C" />
        </TouchableOpacity>
      )}
      <Text className="text-xl font-bold text-navy font-display">{title}</Text>
      {children}
    </View>
  );
};

export default Header;
