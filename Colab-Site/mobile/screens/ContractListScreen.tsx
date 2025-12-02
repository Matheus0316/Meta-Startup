import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../services/api';
import { RootStackParamList } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import FilterModal from '../components/FilterModal';

type Props = NativeStackScreenProps<RootStackParamList, 'ContractList'>;

interface Client {
  id: number;
  name: string;
}

interface Contract {
  id: number;
  title: string;
  status: string;
  client: Client;
  createdAt: string;
}

interface FilterState {
  status: 'Todos' | 'Pendente' | 'Assinado';
}

const ContractListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Consolidated Filter State
  const [filters, setFilters] = useState<FilterState>({
    status: 'Todos'
  });

  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filter Modal State
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>({
    status: 'Todos'
  });

  const fetchData = useCallback(async (pageNum = 1, shouldRefresh = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const [contractsRes, statsRes] = await Promise.all([
        api.get('/contracts', {
          params: {
            search: debouncedSearch,
            status: filters.status,
            page: pageNum,
            limit: 10
          }
        }),
        pageNum === 1 ? api.get('/dashboard') : Promise.resolve({ data: stats })
      ]);

      const newContracts = contractsRes.data.data;
      const meta = contractsRes.data.meta;

      if (shouldRefresh || pageNum === 1) {
        setContracts(newContracts);
      } else {
        setContracts(prev => [...prev, ...newContracts]);
      }

      setHasMore(meta.page < meta.lastPage);
      setPage(pageNum);
      if (pageNum === 1) setStats(statsRes.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [debouncedSearch, filters]);

  // Consolidate to a single effect
  useFocusEffect(
    useCallback(() => {
      fetchData(1, true);
    }, [fetchData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1, true);
  }, [fetchData]);

  const loadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      fetchData(page + 1);
    }
  };

  const openFilterModal = () => {
      setTempFilters(filters);
      setFilterModalVisible(true);
  };

  const applyFilters = () => {
      setFilters(tempFilters);
      setFilterModalVisible(false);
  };

  const resetFilters = () => {
      setTempFilters({ status: 'Todos' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'assinado': return 'text-green-700 bg-green-50 border-green-100';
      case 'pendente': return 'text-yellow-700 bg-yellow-50 border-yellow-100';
      case 'arquivado': return 'text-gray-600 bg-gray-50 border-gray-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const renderItem = ({ item }: { item: Contract }) => (
    <Card 
      onPress={() => console.log('Contract details', item.id)}
      className="flex-col gap-3"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-2">
          <Text className="font-bold text-lg leading-tight text-navy font-display">{item.title}</Text>
          <Text className="text-sm text-gray-500 font-body mt-1">
            Cliente: <Text className="text-gray-800 font-medium">{item.client.name}</Text>
          </Text>
        </View>
        <View className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-full border ${getStatusColor(item.status).split(' ').slice(1).join(' ')}`}>
          <View className={`w-2 h-2 rounded-full ${getStatusColor(item.status).split(' ')[0].replace('text-', 'bg-')}`} />
          <Text className={`text-xs font-bold uppercase ${getStatusColor(item.status).split(' ')[0]}`}>
            {item.status}
          </Text>
        </View>
      </View>
      <View className="border-t border-gray-100 pt-2 mt-1 flex-row items-center">
        <MaterialIcons name="calendar-today" size={14} color="#9ca3af" style={{ marginRight: 4 }} />
        <Text className="text-sm text-gray-600 leading-relaxed font-body">
          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </Card>
  );

  return (
    <ScreenWrapper>
      <Header 
        variant="profile" 
        profileName="Dr. Silva"
        subtitle="Bem-vindo,"
        profileImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC2W3LzxT7JQTokCjkqA3dX59LVUk-uNxUpr1OYPVkWh_cp3_Ek2_wigywJnJp4T7l43uJgBwW1Ua6JYbtDiIqXmO0X1V61myauoUIlo7oEh7doDyqefa3K1hmlza3hNH8NR8DPcX5KJ8hMrpqgVtFjZlbKPPV_3hP-7470rASQEKvGVVCUPFIrTmWqUwxFvt-Ux4sqZiU8ZDBvUy4C2-OywWQyGEi44V8f1TZ6mRwj-Elpw3Zioc6ssgcfTEcGjNiKw6Vvhkr_pQU_"
        onProfile={() => navigation.navigate('Settings' as any)}
        onNotification={() => {}}
        hasUnreadNotifications={true}
      >
        {/* Mini Stats Summary */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, gap: 12 }}>
            <View className="min-w-[100px] bg-navy/5 border border-navy/10 rounded-xl p-3 flex-col gap-1 items-start">
                <Text className="text-2xl font-bold text-navy font-display">{stats?.pendingContracts || 0}</Text>
                <Text className="text-xs font-semibold text-navy/60 uppercase font-body">Pendentes</Text>
            </View>
            <View className="min-w-[100px] bg-green-50 border border-green-100 rounded-xl p-3 flex-col gap-1 items-start">
                <Text className="text-2xl font-bold text-green-700 font-display">{stats?.activeContracts || 0}</Text>
                <Text className="text-xs font-semibold text-green-700/60 uppercase font-body">Assinados</Text>
            </View>
             <TouchableOpacity 
               onPress={() => navigation.navigate('ClientList' as any)}
               className="min-w-[100px] bg-orange-50 border border-orange-100 rounded-xl p-3 flex-col gap-1 items-start"
             >
                <Text className="text-2xl font-bold text-orange-700 font-display">{stats?.totalClients || 0}</Text>
                <Text className="text-xs font-semibold text-orange-700/60 uppercase font-body">Clientes</Text>
            </TouchableOpacity>
        </ScrollView>
      </Header>

      {/* Search & Filter - Moved outside Header */}
      <View className="px-6 mt-2 pb-2">
          <View className="flex-row items-center gap-3 mb-4">
              <View className="flex-1">
                <Input 
                    placeholder="Buscar contrato..."
                    icon="search"
                    value={search}
                    onChangeText={setSearch}
                />
              </View>
              <TouchableOpacity 
                  onPress={openFilterModal}
                  className="w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm"
              >
                  <MaterialIcons name="filter-list" size={24} color="#0A2B4C" />
              </TouchableOpacity>
          </View>

          {/* Quick Filters Pill Bar - Inline Styles to prevent crash */}
          <View style={{ height: 40, marginBottom: 8 }}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ gap: 8, paddingRight: 16 }}
            >
                {['Todos', 'Pendente', 'Assinado'].map((f) => {
                    const isActive = filters.status === f;
                    return (
                    <TouchableOpacity
                        key={f}
                        onPress={() => setFilters({ status: f as any })}
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 6,
                            borderRadius: 9999,
                            borderWidth: 1,
                            borderColor: isActive ? '#0A2B4C' : '#e5e7eb',
                            backgroundColor: isActive ? '#0A2B4C' : 'white',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: isActive ? 0.2 : 0,
                            shadowRadius: 1.41,
                            elevation: isActive ? 2 : 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '700',
                            color: isActive ? 'white' : '#6b7280'
                        }}>
                          {f}
                        </Text>
                    </TouchableOpacity>
                )})}
            </ScrollView>
          </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#A90011" className="mt-10" />
      ) : (
        <FlatList
          data={contracts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#A90011" className="py-4" /> : <View className="h-20" />
          }
          ListHeaderComponent={
            <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">Lista de Contratos</Text>
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-10">
              <MaterialIcons name="description" size={48} color="#9ca3af" />
              <Text className="text-gray-500 mt-2 font-body">Nenhum contrato encontrado.</Text>
            </View>
          }
        />
      )}

      {/* FAB */}
      <Button
        variant="fab"
        icon="add"
        onPress={() => navigation.navigate('AddContract')}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        onReset={resetFilters}
        title="Filtrar Contratos"
      >
        <View className="flex-col gap-6">
             {/* Status Section */}
             <View className="flex-col gap-3">
                <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider font-display">Status</Text>
                <View className="flex-row flex-wrap gap-2">
                    {['Todos', 'Pendente', 'Assinado'].map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            onPress={() => setTempFilters({ status: opt as any })}
                            className={`px-4 py-2 rounded-lg border ${
                                tempFilters.status === opt 
                                ? 'bg-navy border-navy' 
                                : 'bg-white border-gray-200'
                            }`}
                        >
                            <Text className={`text-sm font-medium ${tempFilters.status === opt ? 'text-white' : 'text-gray-600'}`}>
                                {opt}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
      </FilterModal>

    </ScreenWrapper>
  );
};

export default ContractListScreen;
