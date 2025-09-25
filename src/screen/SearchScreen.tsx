import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { dataSet } from "../data/RagamList";
import RagaCard from "../components/RagaCard";

export const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Detail">>();
  const [search, setSearch] = useState("");

  let filterData = useMemo(() => {
    if(search.length > 0){
    return dataSet.filter(
      (data) => 
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.cat.toLowerCase().includes(search.toLowerCase())
    );}
  }, [search])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Find Your Ragam</Text>

      {/* Modern Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search ragam by name..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filterData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.cardWrapper}
            onPress={() => navigation.navigate("Detail", { itemId: item.id })}
          >
            <RagaCard name={item.name} seq1={item.arohanam} seq2={item.avarohanam} cat={item.cat} />
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.list}
        ListEmptyComponent={
          search.length > 0 ? (
            <Text style={styles.emptyText}>No ragam found ❌</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 5,
  },
  list: {
    width: "100%",
    paddingHorizontal: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 40,
  },
});
