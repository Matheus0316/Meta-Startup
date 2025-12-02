import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import { RootStackParamList } from '../types';
import api from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientDetails'>;

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  nationality?: string;
  civilStatus?: string;
  profession?: string;
  address?: string;
  status: string;
  image?: string;
}

const ClientDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { clientId } = route.params;
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientDetails();
  }, [clientId]);

  const fetchClientDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/clients/${clientId}`);
      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client details:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPending = (value?: string) => !value || value === "Pendente de envio";

  if (loading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0A2B4C" />
        </View>
      </ScreenWrapper>
    );
  }

  if (!client) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Cliente não encontrado.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between p-4 pb-2 bg-background-light">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#0A2B4C" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-navy flex-1 text-center font-display">
          Detalhes do Cliente
        </Text>
        <TouchableOpacity 
          onPress={() => console.log('Edit client')}
          className="w-12 items-end justify-center"
        >
          <Text className="text-primary text-base font-bold">Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header */}
        <View className="items-center p-6">
          <View className="w-28 h-28 rounded-full bg-gray-200 items-center justify-center mb-4 border-4 border-white shadow-md overflow-hidden">
            {client.image ? (
              <Image source={{ uri: client.image }} className="w-full h-full" />
            ) : (
              <MaterialIcons name="person" size={48} color="#9ca3af" />
            )}
          </View>
          <Text className="text-2xl font-bold text-navy text-center font-display mb-1">
            {client.name}
          </Text>
          <Text className="text-base text-gray-500 text-center mb-6 font-body">
            {client.email}
          </Text>

          {/* Quick Actions */}
          <View className="flex-row gap-6 w-full justify-center mb-4">
            <TouchableOpacity 
              onPress={() => client.phone && Linking.openURL(`tel:${client.phone}`)}
              className="items-center gap-1"
            >
              <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center border border-green-100 shadow-sm">
                <MaterialIcons name="call" size={24} color="#16a34a" />
              </View>
              <Text className="text-xs font-medium text-green-700">Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => client.phone && Linking.openURL(`whatsapp://send?phone=${client.phone}`)}
              className="items-center gap-1"
            >
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center border border-blue-100 shadow-sm">
                <MaterialIcons name="chat" size={24} color="#2563eb" />
              </View>
              <Text className="text-xs font-medium text-blue-700">WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Linking.openURL(`mailto:${client.email}`)}
              className="items-center gap-1"
            >
              <View className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100 shadow-sm">
                <MaterialIcons name="mail" size={24} color="#4b5563" />
              </View>
              <Text className="text-xs font-medium text-gray-700">Email</Text>
            </TouchableOpacity>
          </View>

          {/* Incomplete Profile Warning */}
          {(isPending(client.cpf) || isPending(client.address)) && (
            <View className="w-full bg-orange-50 border border-orange-100 rounded-xl p-3 flex-row items-start gap-3 mt-2">
              <MaterialIcons name="info" size={20} color="#ea580c" style={{ marginTop: 2 }} />
              <View className="flex-1">
                <Text className="text-sm font-bold text-orange-800 mb-1">Cadastro Incompleto</Text>
                <Text className="text-xs text-orange-700 leading-relaxed">
                  Envie o formulário de boas-vindas para coletar os dados faltantes.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Section: Personal Data */}
        <View className="px-4 pt-2">
          <Text className="text-lg font-bold text-navy mb-2 font-display">Dados Pessoais</Text>
          <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {[
              { label: "CPF", value: client.cpf },
              { label: "RG", value: client.rg },
              { label: "Nacionalidade", value: client.nationality },
              { label: "Estado Civil", value: client.civilStatus },
              { label: "Profissão", value: client.profession },
            ].map((item, idx) => (
              <View 
                key={idx} 
                className={`flex-row py-4 px-4 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
              >
                <Text className="w-1/3 text-sm text-gray-500 font-body">{item.label}</Text>
                <Text className={`flex-1 text-sm font-medium ${isPending(item.value) ? 'text-orange-600 italic' : 'text-navy'}`}>
                  {item.value || "Pendente de envio"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Address */}
        <View className="px-4 pt-6">
          <Text className="text-lg font-bold text-navy mb-2 font-display">Endereço</Text>
          <View className="bg-white rounded-xl border border-gray-100 overflow-hidden p-4">
            <Text className="text-sm text-gray-500 mb-1 font-body">Endereço Completo</Text>
            <Text className={`text-sm font-medium leading-relaxed ${isPending(client.address) ? 'text-orange-600 italic' : 'text-navy'}`}>
              {client.address || "Pendente de envio"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-lg">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => console.log('Request Data')}
            className="flex-1 bg-white border border-primary/30 rounded-xl py-3 px-2 items-center justify-center flex-row gap-2 shadow-sm"
          >
            <MaterialIcons name="assignment" size={20} color="#A90011" />
            <Text className="text-primary font-bold text-sm">Solicitar Dados</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('ContractList')} // Or filter by client
            className="flex-1 bg-navy rounded-xl py-3 px-2 items-center justify-center flex-row gap-2 shadow-md"
          >
            <MaterialIcons name="folder-open" size={20} color="white" />
            <Text className="text-white font-bold text-sm">Ver Contratos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ClientDetailsScreen;
