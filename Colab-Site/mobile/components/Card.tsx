import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CardProps {
  variant?: 'default' | 'highlight' | 'flat';
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ variant = 'default', children, onPress, className }) => {
  const baseStyle = "p-4 rounded-xl mb-3";
  const variants = {
    default: "bg-white border border-gray-100 shadow-sm",
    highlight: "bg-navy border border-navy shadow-md",
    flat: "bg-gray-50 border border-gray-200",
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      onPress={onPress} 
      className={`${baseStyle} ${variants[variant]} ${className || ''}`}
    >
      {children}
    </Container>
  );
};

export default Card;
