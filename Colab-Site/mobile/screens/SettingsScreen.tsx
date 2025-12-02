import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Settings'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' } as any],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScreenWrapper>
      <Header title="Configurações" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Card */}
        <View className="flex-col items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-4 mx-4">
           <View className="relative">
             <View className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2W3LzxT7JQTokCjkqA3dX59LVUk-uNxUpr1OYPVkWh_cp3_Ek2_wigywJnJp4T7l43uJgBwW1Ua6JYbtDiIqXmO0X1V61myauoUIlo7oEh7doDyqefa3K1hmlza3hNH8NR8DPcX5KJ8hMrpqgVtFjZlbKPPV_3hP-7470rASQEKvGVVCUPFIrTmWqUwxFvt-Ux4sqZiU8ZDBvUy4C2-OywWQyGEi44V8f1TZ6mRwj-Elpw3ZiU8ZDBvUy4C2-OywWQyGEi44V8f1TZ6mRwj-Elpw3Zioc6ssgcfTEcGjNiKw6Vvhkr_pQU_" }} 
                  className="w-full h-full"
                />
             </View>
             <TouchableOpacity className="absolute bottom-0 right-0 bg-navy p-1.5 rounded-full border-2 border-white shadow-sm items-center justify-center">
                <MaterialIcons name="edit" size={14} color="white" />
             </TouchableOpacity>
           </View>
            <View className="items-center w-full">
                <Text className="text-xl font-bold text-navy text-center font-display">Dr. Silva</Text>
                <Text className="text-sm text-text-secondary text-center font-body">Advogado Senior</Text>
            </View>
        </View>

        {/* Identity Section */}
        <View className="mb-6 px-4">
             <View className="flex-row items-center gap-2 mb-3 px-1">
                <MaterialIcons name="badge" size={16} color="#0A2B4C" />
                <Text className="text-sm font-bold text-navy uppercase tracking-wider font-display">
                    Identidade Profissional
                </Text>
             </View>
            <View className="bg-white rounded-xl border border-gray-200 p-4 flex-col gap-4">
                 
                 {/* OAB */}
                 <View className="flex-col gap-1">
                    <Text className="text-xs font-bold text-gray-500 uppercase font-body">Número OAB</Text>
                    <TextInput 
                      className="rounded-lg border border-gray-300 h-10 px-3 text-sm font-body text-navy bg-white" 
                      defaultValue="SP 123.456" 
                      editable={false}
                    />
                 </View>

                 {/* Address */}
                  <View className="flex-col gap-1">
                    <Text className="text-xs font-bold text-gray-500 uppercase font-body">Endereço do Escritório</Text>
                    <TextInput 
                      className="rounded-lg border border-gray-300 h-10 px-3 text-sm font-body text-navy bg-white" 
                      defaultValue="Av. Paulista, 1000 - Sala 42" 
                      editable={false}
                    />
                 </View>

                 {/* Logo Upload */}
                 <View className="flex-col gap-1">
                    <Text className="text-xs font-bold text-gray-500 uppercase font-body">Logo do Escritório</Text>
                    <TouchableOpacity className="flex-row items-center gap-4 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 active:bg-gray-100">
                        <View className="w-12 h-12 bg-white rounded border border-gray-200 items-center justify-center">
                            <MaterialIcons name="account-balance" size={24} color="#D4AF37" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-semibold text-navy font-body">Alterar Logo</Text>
                            <Text className="text-xs text-gray-400 font-body">PNG ou JPG (Max 2MB)</Text>
                        </View>
                    </TouchableOpacity>
                 </View>

            </View>
        </View>
        

        
        {/* App Settings */}
        <View className="px-4">
            <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 font-display">Geral</Text>
            <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Subscription')}
                    className="w-full flex-row items-center justify-between p-4 active:bg-gray-50 border-b border-gray-100"
                >
                    <View className="flex-row items-center gap-3">
                        <MaterialIcons name="star" size={20} color="#D4AF37" />
                        <Text className="font-medium text-sm text-navy font-body">Assinatura Premium</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-gray-50 border-b border-gray-100">
                    <View className="flex-row items-center gap-3">
                        <MaterialIcons name="lock" size={20} color="#6b7280" />
                        <Text className="font-medium text-sm text-gray-700 font-body">Privacidade e Segurança</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
                <TouchableOpacity className="w-full flex-row items-center justify-between p-4 active:bg-gray-50">
                    <View className="flex-row items-center gap-3">
                        <MaterialIcons name="notifications" size={20} color="#6b7280" />
                        <Text className="font-medium text-sm text-gray-700 font-body">Notificações</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity 
          onPress={handleLogout}
          className="mx-4 p-4 bg-white border border-gray-200 rounded-xl mt-8 active:bg-red-50 flex-row items-center justify-center gap-2"
        >
            <MaterialIcons name="logout" size={20} color="#dc2626" />
            <Text className="text-red-600 font-bold font-body">Sair da Conta</Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-400 mt-6 font-body">Versão 1.1.0 • Advocacia Pro</Text>

      </ScrollView>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
