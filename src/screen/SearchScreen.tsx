import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types/navigation';
import { Item } from "../types/navigation";
import { dataSet } from "../data/RagamList";
import { FlatList } from "react-native-gesture-handler";

export const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Detail'>>();
  const [search, setSearch] = useState("");

  let filterData = useMemo(() => {
    if(search.length > 0)
    return dataSet.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()));
  }, [search])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Search Ragam Screen!</Text>
      <TextInput
        placeholder="Search Ragam"
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Detail', { itemId: item.id })}
            style={styles.result}
          >
            <Text style={{ fontSize: 18 ,color : "white"}}>{item.name}</Text>
            <Text style={{ color: 'white' }}>{item.cat}</Text>
          </Pressable>
        )}
        style = {styles.showSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
  button: { padding: 12, backgroundColor: "#6200ee", borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16 },
  showSearch :{ width : "100%"},
  result : { padding: 10, borderBottomWidth: 1, width: '100%' , alignItems : "center" ,backgroundColor : "blue",color : "white"}
});
