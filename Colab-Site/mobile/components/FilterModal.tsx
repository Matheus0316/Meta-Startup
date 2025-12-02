import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset?: () => void;
  title?: string;
  children: React.ReactNode;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  onApply, 
  onReset,
  title = 'Filtrar', 
  children 
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl h-[70%] w-full flex-col">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center gap-2">
                <MaterialIcons name="filter-list" size={24} color="#0A2B4C" />
                <Text className="text-lg font-bold text-navy font-display">{title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          {/* Footer */}
          <View className="p-4 border-t border-gray-100 flex-row gap-3 bg-white pb-8">
            {onReset && (
                <TouchableOpacity 
                    onPress={onReset}
                    className="flex-1 py-3 rounded-xl border border-gray-200 items-center justify-center active:bg-gray-50"
                >
                    <Text className="text-gray-600 font-bold font-body">Limpar</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity 
                onPress={onApply}
                className="flex-[2] py-3 rounded-xl bg-navy items-center justify-center shadow-sm active:bg-navy/90"
            >
                <Text className="text-white font-bold font-body">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
