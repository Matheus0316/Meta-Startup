import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddContract'>;

interface Client {
  id: number;
  name: string;
}

const AddContractScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  };

  const handleSave = async () => {
    if (!title || !selectedClient) {
      Alert.alert('Erro', 'Título e Cliente são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/contracts', {
        title,
        details,
        clientId: selectedClient.id,
        status: 'Pendente',
      });
      Alert.alert('Sucesso', 'Contrato criado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Não foi possível salvar o contrato.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Header title="Novo Contrato" onBack={() => navigation.goBack()} />
      
      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-lg font-bold text-navy mb-4 font-display">Detalhes do Contrato</Text>
          
          <Input 
            placeholder="Título do Contrato" 
            icon="description" 
            value={title}
            onChangeText={setTitle}
            className="mb-4"
          />

          <TouchableOpacity 
            className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4"
            onPress={() => setShowClientModal(true)}
          >
            <Ionicons name="person" size={20} color="#6b7280" style={{ marginRight: 10 }} />
            <Text className={`flex-1 ${selectedClient ? 'text-navy' : 'text-gray-400'}`}>
              {selectedClient ? selectedClient.name : 'Selecionar Cliente'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
          
          <Input 
            placeholder="Detalhes (Opcional)" 
            icon="list" 
            value={details}
            onChangeText={setDetails}
            multiline
            numberOfLines={4}
            className="h-24"
          />
        </View>

        <Button 
          title={loading ? "Salvando..." : "Salvar Contrato"} 
          onPress={handleSave} 
          size="lg" 
        />
      </ScrollView>

      {/* Client Selection Modal */}
      <Modal
        visible={showClientModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowClientModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 h-2/3">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-navy">Selecionar Cliente</Text>
              <TouchableOpacity onPress={() => setShowClientModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={clients}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  className="p-4 border-b border-gray-100"
                  onPress={() => {
                    setSelectedClient(item);
                    setShowClientModal(false);
                  }}
                >
                  <Text className="text-lg text-navy">{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text className="text-center text-gray-500 mt-4">Nenhum cliente encontrado.</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default AddContractScreen;
