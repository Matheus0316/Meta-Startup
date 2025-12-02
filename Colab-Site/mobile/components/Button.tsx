import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'fab';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', title, onPress, icon, className, textClassName }) => {
  if (variant === 'fab') {
    return (
      <TouchableOpacity 
        onPress={onPress}
        className={`absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30 ${className || ''}`}
      >
        <MaterialIcons name={icon || 'add'} size={28} color="white" />
      </TouchableOpacity>
    );
  }

  const baseStyle = "flex-row items-center justify-center rounded-lg";
  
  const variants = {
    primary: "bg-primary",
    secondary: "bg-white border border-gray-200",
    ghost: "bg-transparent",
    fab: "" // Handled above
  };

  const sizes = {
    sm: "px-3 py-1.5",
    md: "px-4 py-3",
    lg: "px-6 py-4 w-full",
  };

  const textStyles = {
    primary: "text-white font-bold",
    secondary: "text-navy font-semibold",
    ghost: "text-primary font-semibold",
    fab: ""
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className || ''}`}
    >
      {icon && <MaterialIcons name={icon} size={20} color={variant === 'primary' ? 'white' : '#0A2B4C'} style={{ marginRight: title ? 8 : 0 }} />}
      {title && <Text className={`${textStyles[variant]} ${textClassName || ''}`}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
