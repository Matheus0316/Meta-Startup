import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddClient'>;

const AddClientScreen: React.FC<Props> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.initialData) {
      const { name, email, phone } = route.params.initialData;
      setName(name || '');
      setEmail(email || '');
      setPhone(phone || '');
    }
  }, [route.params]);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Nome e E-mail são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // Check subscription limits first
      const statusRes = await api.get('/subscription/status');
      const { usage, limits } = statusRes.data;

      if (usage.clients >= limits.clients) {
        Alert.alert(
          'Limite Atingido',
          'Você atingiu o limite de clientes do plano Gratuito. Faça um upgrade para continuar cadastrando.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Ver Planos', onPress: () => navigation.navigate('Subscription') }
          ]
        );
        setLoading(false);
        return;
      }

      await api.post('/clients', {
        name,
        email,
        phone,
      });
      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Não foi possível salvar o cliente.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Header title="Novo Cliente" onBack={() => navigation.goBack()} />
      
      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-bold text-navy mb-4 font-display">Dados Pessoais</Text>
          
          <Input 
            placeholder="Nome Completo" 
            icon="person" 
            value={name}
            onChangeText={setName}
            className="mb-4"
          />
          
          <Input 
            placeholder="E-mail" 
            icon="email" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4"
          />
          
          <Input 
            placeholder="Telefone (Opcional)" 
            icon="call" 
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <Button 
          title={loading ? "Salvando..." : "Salvar Cliente"} 
          onPress={handleSave} 
          size="lg" 
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddClientScreen;
