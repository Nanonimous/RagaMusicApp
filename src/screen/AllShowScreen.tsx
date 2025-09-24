import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import {dataSet} from "../data/RagamList";


type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function SearchScreen() {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={dataSet}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {itemId : item.id})}
            style={{ padding: 15, borderBottomWidth: 1 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
