import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
};

export default function DetailScreen({ route }: Props) {
  const item = {
    id : 1 ,
    name : "nivaas"
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Detail Page</Text>
      <Text>ID: {item.id}</Text>
      <Text>Name: {item.name}</Text>
    </View>
  );
}
