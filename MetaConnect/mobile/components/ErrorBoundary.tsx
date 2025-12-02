import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRestart = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      // Fallback if expo-updates is not available (e.g. in dev client sometimes)
      // We can try to just reset state, but a full reload is safer for "crashes"
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-white items-center justify-center p-6">
          <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6 border border-red-100">
            <MaterialIcons name="error-outline" size={48} color="#dc2626" />
          </View>
          
          <Text className="text-2xl font-bold text-navy mb-2 font-display text-center">
            Ops! Algo deu errado.
          </Text>
          
          <Text className="text-gray-500 text-center mb-8 font-body">
            O aplicativo encontrou um erro inesperado.
          </Text>

          <ScrollView className="w-full max-h-40 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
            <Text className="text-red-600 font-mono text-xs">
              {this.state.error?.toString()}
            </Text>
          </ScrollView>

          <TouchableOpacity 
            onPress={this.handleRestart}
            className="bg-primary px-8 py-4 rounded-xl shadow-lg shadow-primary/30 flex-row items-center gap-2"
          >
            <MaterialIcons name="refresh" size={24} color="white" />
            <Text className="text-white font-bold text-lg">Reiniciar Aplicativo</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
