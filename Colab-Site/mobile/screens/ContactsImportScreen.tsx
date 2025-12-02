import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Input from '../components/Input';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactsImport'>;

const ContactsImportScreen: React.FC<Props> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
        }
      } else {
        Alert.alert('Permissão negada', 'Precisamos de acesso aos contatos para importar.');
        navigation.goBack();
      }
      setLoading(false);
    })();
  }, []);

  const handleSelectContact = (contact: Contacts.Contact) => {
    const email = contact.emails?.[0]?.email || '';
    const phone = contact.phoneNumbers?.[0]?.number || '';
    const name = contact.name || '';

    navigation.navigate('AddClient', {
      initialData: {
        name,
        email,
        phone,
      }
    });
  };

  const filteredContacts = contacts.filter(contact => 
    (contact.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <TouchableOpacity 
      className="bg-white p-4 rounded-xl mb-3 border border-gray-100 flex-row items-center"
      onPress={() => handleSelectContact(item)}
    >
      <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
        <Text className="text-lg font-bold text-gray-500">{(item.name || '?').charAt(0)}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold text-navy">{item.name}</Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text className="text-sm text-gray-500">{item.phoneNumbers[0].number}</Text>
        )}
      </View>
      <Ionicons name="add-circle-outline" size={24} color="#A90011" />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <Header title="Importar Contato" onBack={() => navigation.goBack()} />

      <View className="mt-4 mb-6">
        <Input 
          placeholder="Buscar nos contatos..." 
          icon="search" 
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#A90011" />
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center mt-10">
              <Text className="text-gray-500">Nenhum contato encontrado.</Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
};

export default ContactsImportScreen;
