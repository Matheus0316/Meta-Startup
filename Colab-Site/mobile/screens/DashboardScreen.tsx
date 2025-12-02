import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface DashboardStats {
  totalClients: number;
  totalContracts: number;
  activeContracts: number;
  pendingContracts: number;
  recentContracts: any[];
}

interface Client {
  id: number;
  name: string;
  image?: string;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [statsRes, clientsRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/clients')
      ]);
      setStats(statsRes.data);
      // Handle paginated response structure: { data: [], meta: {} }
      const clientsData = clientsRes.data.data || clientsRes.data; 
      setRecentClients(Array.isArray(clientsData) ? clientsData.slice(0, 5) : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <ScreenWrapper>
      <Header 
        variant="profile" 
        profileName="Dr. Silva"
        subtitle="Bom dia,"
        profileImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC2W3LzxT7JQTokCjkqA3dX59LVUk-uNxUpr1OYPVkWh_cp3_Ek2_wigywJnJp4T7l43uJgBwW1Ua6JYbtDiIqXmO0X1V61myauoUIlo7oEh7doDyqefa3K1hmlza3hNH8NR8DPcX5KJ8hMrpqgVtFjZlbKPPV_3hP-7470rASQEKvGVVCUPFIrTmWqUwxFvt-Ux4sqZiU8ZDBvUy4C2-OywWQyGEi44V8f1TZ6mRwj-Elpw3Zioc6ssgcfTEcGjNiKw6Vvhkr_pQU_"
        onProfile={() => navigation.navigate('Settings')}
        onNotification={() => {}}
        hasUnreadNotifications={true}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#A90011" className="mt-10" />
        ) : (
          <>
            {/* Stats Cards */}
            <View className="flex-row gap-4 p-4">
              <Card 
                onPress={() => navigation.navigate('ContractList')}
                className="flex-1 min-w-[100px] flex-col gap-2 border-gold/20 active:bg-gold/5"
              >
                <Text className="text-text-secondary text-sm font-medium leading-normal font-body">
                  Pendentes
                </Text>
                <Text className="text-gold text-2xl font-bold leading-tight font-display">
                  {stats?.pendingContracts || 0}
                </Text>
              </Card>
              <Card 
                onPress={() => navigation.navigate('ContractList')}
                className="flex-1 min-w-[100px] flex-col gap-2 border-navy/20 active:bg-navy/5"
              >
                <Text className="text-text-secondary text-sm font-medium leading-normal font-body">
                  Assinados
                </Text>
                <Text className="text-navy text-2xl font-bold leading-tight font-display">
                  {stats?.activeContracts || 0}
                </Text>
              </Card>
              <Card 
                onPress={() => navigation.navigate('ClientList')}
                className="flex-1 min-w-[100px] flex-col gap-2 border-navy/20 active:bg-navy/5"
              >
                <Text className="text-text-secondary text-sm font-medium leading-normal font-body">
                  Clientes
                </Text>
                <Text className="text-navy text-2xl font-bold leading-tight font-display">
                  {stats?.totalClients || 0}
                </Text>
              </Card>
            </View>

            {/* Pendências Urgentes */}
            <Text className="text-text-light text-xl font-bold leading-tight px-4 pb-3 pt-4 font-display">
              Pendências Urgentes
            </Text>

            <View className="flex flex-col gap-2 px-4">
              {stats?.recentContracts.slice(0, 3).map((contract: any) => (
                <Card key={contract.id} className="flex-row items-center gap-4 p-3">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="bg-gold/10 w-12 h-12 rounded-lg items-center justify-center">
                      <MaterialIcons name="gavel" size={24} color="#D4AF37" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-text-light text-base font-medium leading-normal font-body" numberOfLines={1}>
                        {contract.title}
                      </Text>
                      <Text className="text-text-secondary text-sm font-normal leading-normal font-body" numberOfLines={1}>
                        Status: {contract.status}
                      </Text>
                    </View>
                  </View>
                  <Button
                    title="Revisar"
                    size="sm"
                    onPress={() => navigation.navigate('ContractList')}
                    className="bg-gold shadow-none h-8 px-3"
                    textClassName="text-navy text-xs"
                  />
                </Card>
              ))}
              {(!stats?.recentContracts || stats.recentContracts.length === 0) && (
                 <Text className="text-gray-400 text-center py-4 font-body">Nenhuma pendência urgente.</Text>
              )}
            </View>

            {/* Clientes Recentes */}
            <Text className="text-text-light text-xl font-bold leading-tight px-4 pb-3 pt-6 font-display">
              Clientes Recentes
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }} className="pb-2">
              {recentClients.map((client) => (
                <TouchableOpacity 
                  key={client.id}
                  onPress={() => navigation.navigate('ClientList')}
                  className="flex-col items-center gap-2"
                >
                  <View className="w-14 h-14 rounded-full bg-gray-100 border border-gray-100 items-center justify-center overflow-hidden">
                    {client.image ? (
                      <Image source={{ uri: client.image }} className="w-full h-full" />
                    ) : (
                      <MaterialIcons name="person" size={24} color="#9ca3af" />
                    )}
                  </View>
                  <Text className="text-text-secondary text-xs font-medium font-body max-w-[60px] text-center" numberOfLines={1}>
                    {client.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
              {recentClients.length === 0 && (
                 <Text className="text-gray-400 font-body">Nenhum cliente recente.</Text>
              )}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DashboardScreen;
