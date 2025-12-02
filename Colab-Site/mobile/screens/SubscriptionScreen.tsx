import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import api from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Subscription'>;

const SubscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Mock payment flow
      await api.post('/subscription/upgrade');
      Alert.alert(
        'Parabéns!',
        'Você agora é um membro Premium! Aproveite todos os recursos ilimitados.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar a assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper className="bg-navy">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Image or Icon */}
        <View className="items-center mt-8 mb-6">
          <View className="w-24 h-24 bg-gold/20 rounded-full items-center justify-center mb-4">
            <MaterialIcons name="workspace-premium" size={48} color="#FFD700" />
          </View>
          <Text className="text-3xl font-bold text-white font-display text-center">
            Seja Premium
          </Text>
          <Text className="text-gray-300 text-center mt-2 px-6">
            Desbloqueie todo o potencial do Contractfy e leve sua advocacia para o próximo nível.
          </Text>
        </View>

        {/* Plan Card */}
        <View className="mx-4 bg-white rounded-3xl p-6 shadow-xl border-2 border-gold">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-navy">Plano Ilimitado</Text>
            <View className="bg-gold/20 px-3 py-1 rounded-full">
              <Text className="text-gold font-bold text-xs">RECOMENDADO</Text>
            </View>
          </View>

          <View className="flex-row items-end mb-6">
            <Text className="text-4xl font-bold text-navy">R$ 49,90</Text>
            <Text className="text-gray-500 mb-1 ml-1">/mês</Text>
          </View>

          {/* Benefits */}
          <View className="space-y-4 mb-8">
            <BenefitItem text="Clientes Ilimitados" />
            <BenefitItem text="Contratos Ilimitados" />
            <BenefitItem text="Acesso a Modelos Premium" />
            <BenefitItem text="Suporte Prioritário" />
            <BenefitItem text="Sem Anúncios" />
          </View>

          <Button
            title={loading ? "Processando..." : "Assinar Agora"}
            onPress={handleSubscribe}
            size="lg"
            className="bg-navy"
            textClassName="text-white"
          />
          
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 items-center">
            <Text className="text-gray-500 font-medium">Talvez depois</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 px-6">
          <Text className="text-gray-400 text-xs text-center leading-5">
            A assinatura é renovada automaticamente. Você pode cancelar a qualquer momento nas configurações da sua conta.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <View className="flex-row items-center">
    <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3">
      <MaterialIcons name="check" size={16} color="green" />
    </View>
    <Text className="text-gray-700 font-medium">{text}</Text>
  </View>
);

export default SubscriptionScreen;
