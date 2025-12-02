import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryInner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Screen Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-white items-center justify-center p-6">
          <View className="w-16 h-16 bg-orange-50 rounded-full items-center justify-center mb-4 border border-orange-100">
            <MaterialIcons name="warning" size={32} color="#ea580c" />
          </View>
          
          <Text className="text-xl font-bold text-navy mb-2 font-display text-center">
            Erro na Tela
          </Text>
          
          <Text className="text-gray-500 text-center mb-6 font-body">
            Não foi possível carregar esta tela.
          </Text>

          <TouchableOpacity 
            onPress={this.handleReset}
            className="bg-navy px-6 py-3 rounded-xl shadow-lg shadow-navy/20 flex-row items-center gap-2"
          >
            <MaterialIcons name="home" size={20} color="white" />
            <Text className="text-white font-bold">Voltar para o Início</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

import { navigate } from '../navigation/rootNavigation';

export default function ScreenErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryInner onReset={() => navigate('Dashboard')}>
      {children}
    </ErrorBoundaryInner>
  );
}
