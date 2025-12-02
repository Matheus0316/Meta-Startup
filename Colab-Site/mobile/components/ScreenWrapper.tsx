import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
}

import ScreenErrorBoundary from './ScreenErrorBoundary';

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style, className }) => {
  return (
    <SafeAreaView className={`flex-1 bg-background-light ${className || ''}`}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F6" />
      <ScreenErrorBoundary>
        <View className="flex-1 px-4" style={style}>
          {children}
        </View>
      </ScreenErrorBoundary>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
