import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // Use environment variable for API URL
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/auth/login`; 
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.accessToken);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Erro', data.message || 'Falha no login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper className="justify-center p-6">
      <View className="w-full max-w-md flex flex-col items-center">
        {/* Logo Placeholder */}
        <View className="mb-8">
          <MaterialIcons name="account-balance" size={72} color="#D4AF37" />
        </View>

        {/* Headline and Body Text */}
        <Text className="text-text-light tracking-tight text-4xl font-display font-bold text-center pb-2">
          Acesse sua conta
        </Text>
        <Text className="text-text-secondary text-base font-normal leading-normal text-center mb-10 font-body">
          Bem-vindo(a) de volta.
        </Text>

        {/* Form Fields */}
        <View className="w-full flex flex-col gap-6">
          {/* E-mail ou CPF TextField */}
          <View className="flex flex-col">
            <Text className="text-text-light text-sm font-medium leading-normal pb-2 font-body">
              E-mail ou CPF
            </Text>
            <TextInput
              className="w-full rounded-lg text-text-light border border-gray-300 bg-white h-14 px-4 text-base font-body"
              placeholder="Digite seu e-mail ou CPF"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Senha TextField */}
          <View className="flex flex-col">
            <Text className="text-text-light text-sm font-medium leading-normal pb-2 font-body">
              Senha
            </Text>
            <View className="relative w-full">
              <TextInput
                className="w-full rounded-lg text-text-light border border-gray-300 bg-white h-14 pl-4 pr-12 text-base font-body"
                placeholder="Digite sua senha"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center pr-4 h-14"
              >
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Forgot Password Link */}
        <View className="w-full items-end mt-4">
          <TouchableOpacity>
            <Text className="text-navy text-sm font-semibold leading-normal underline font-body">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`w-full bg-primary items-center justify-center h-14 rounded-lg mt-8 shadow-sm ${loading ? 'opacity-70' : ''}`}
        >
          <Text className="text-white text-base font-bold leading-normal font-body">
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View className="mt-10 flex-row justify-center">
          <Text className="text-gray-600 text-sm font-normal font-body">
            Não tem uma conta?{" "}
          </Text>
          <TouchableOpacity>
            <Text className="font-bold text-navy underline font-body">
              Criar uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
