import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
}

const Input: React.FC<InputProps> = ({ icon, className, ...props }) => {
  return (
    <View className={`flex-row items-center bg-white border border-gray-300 rounded-lg px-4 h-12 mb-4 focus:border-navy ${className || ''}`}>
      {icon && <MaterialIcons name={icon} size={20} color="#9ca3af" style={{ marginRight: 10 }} />}
      <TextInput 
        className="flex-1 text-text-light font-body"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
};

export default Input;
