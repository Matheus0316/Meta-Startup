import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView, Image } from 'react-native';
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

type Props = NativeStackScreenProps<RootStackParamList, 'ClientList'>;

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: string;
  image?: string;
  isNew?: boolean;
}

interface FilterState {
  sort: string;
  status: string | null;
}

const ClientListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Consolidated Filter State
  const [filters, setFilters] = useState<FilterState>({
    sort: 'Recentes',
    status: null
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filter Modal State
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>({
    sort: 'Recentes',
    status: null
  });

  const fetchClients = useCallback(async (pageNum = 1, shouldRefresh = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await api.get('/clients', {
        params: {
          search: debouncedSearch,
          sort: filters.sort,
          status: filters.status || undefined,
          page: pageNum,
          limit: 10
        }
      });

      const newClients = response.data.data;
      const meta = response.data.meta;

      if (shouldRefresh || pageNum === 1) {
        setClients(newClients);
      } else {
        setClients(prev => [...prev, ...newClients]);
      }

      setHasMore(meta.page < meta.lastPage);
      setPage(pageNum);

    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [debouncedSearch, filters]);

  // Debug navigation prop
  console.log('ClientListScreen navigation:', navigation ? 'Present' : 'Missing');

  // Use useEffect instead of useFocusEffect to debug context issue
  React.useEffect(() => {
    fetchClients(1, true);
  }, [fetchClients]);

  /*
  useFocusEffect(
    useCallback(() => {
      fetchClients(1, true);
    }, [fetchClients])
  );
  */

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClients(1, true);
  }, [fetchClients]);

  const loadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      fetchClients(page + 1);
    }
  };
            <Text className="text-base font-bold text-navy font-display truncate" numberOfLines={1}>{item.name}</Text>
            {item.isNew && <View className="bg-gold/20 px-2 py-0.5 rounded-full"><Text className="text-yellow-800 text-[10px] font-bold uppercase">Novo</Text></View>}
        </View>
        <Text className="text-sm text-text-secondary truncate font-body" numberOfLines={1}>{item.email}</Text>
        <Text className={`text-xs font-medium mt-1 ${item.status === 'Cadastro Pendente' ? 'text-orange-600' : 'text-gold'}`}>
          {item.status}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
    </Card>
  );

  return (
    <ScreenWrapper>
      <Header title="Clientes" />
      
      <View className="px-6 mt-4">
        <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-1">
                <Input 
                    placeholder="Buscar cliente..." 
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

        {/* Quick Sort Pills */}
        <View style={{ height: 40, marginBottom: 8 }}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ gap: 8, paddingRight: 16 }}
            >
                {['Recentes', 'A-Z', 'Ativos', 'Pendentes'].map((pill) => {
                    const isSort = pill === 'Recentes' || pill === 'A-Z';
                    const isStatus = pill === 'Ativos' || pill === 'Pendentes';
                    
                    const isActive = 
                        (isSort && filters.sort === pill) || 
                        (isStatus && filters.status === pill);

                    return (
                    <TouchableOpacity
                        key={pill}
                        onPress={() => {
                            setFilters(prev => {
                                const newState = { ...prev };
                                if (isStatus) {
                                    // Toggle status if clicking the same one, or switch to new one
                                    newState.status = prev.status === pill ? null : pill;
                                } else {
                                    newState.sort = pill;
                                }
                                return newState;
                            });
                        }}
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
                            fontSize: 14,
                            fontWeight: '600',
                            color: isActive ? 'white' : '#6b7280'
                        }}>
                            {pill}
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
          data={clients}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 8, paddingHorizontal: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#A90011" className="py-4" /> : <View className="h-20" />
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-10">
              <Text className="text-gray-500 font-body">Nenhum cliente encontrado.</Text>
            </View>
          }
        />
      )}

      {/* FAB - Import Contacts */}
      <TouchableOpacity 
        className="absolute bottom-24 right-6 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm"
        onPress={() => navigation.navigate('ContactsImport')}
      >
        <MaterialIcons name="group-add" size={24} color="#0A2B4C" />
      </TouchableOpacity>

      {/* FAB - Add Client */}
      <Button
        variant="fab"
        icon="person-add"
        onPress={() => navigation.navigate('AddClient')}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        onReset={resetFilters}
        title="Filtrar Clientes"
      >
        <View className="flex-col gap-6">
            {/* Sort Section */}
            <View className="flex-col gap-3">
                <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider font-display">Ordenar por</Text>
                <View className="flex-row flex-wrap gap-2">
                    {['Recentes', 'A-Z', 'Z-A'].map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            onPress={() => setTempFilters(prev => ({ ...prev, sort: opt }))}
                            className={`px-4 py-2 rounded-lg border ${
                                tempFilters.sort === opt 
                                ? 'bg-navy border-navy' 
                                : 'bg-white border-gray-200'
                            }`}
                        >
                            <Text className={`text-sm font-medium ${tempFilters.sort === opt ? 'text-white' : 'text-gray-600'}`}>
                                {opt}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

             {/* Status Section */}
             <View className="flex-col gap-3">
                <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider font-display">Status</Text>
                <View className="flex-row flex-wrap gap-2">
                    {['Ativos', 'Pendentes', 'Arquivados'].map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            onPress={() => setTempFilters(prev => ({ 
                                ...prev, 
                                status: prev.status === opt ? null : opt 
                            }))}
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

export default ClientListScreen;
