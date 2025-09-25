import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SectionList,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { dataSet } from "../data/RagamList";
import RagaCard from "../components/RagaCard";

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Detail"
>;

export default function SearchScreen() {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  // ✅ Group ragas by category
  const groupedData = useMemo(() => {
    const map: Record<string, typeof dataSet> = {};
    dataSet.forEach((item) => {
      if (!map[item.cat]) map[item.cat] = [];
      map[item.cat].push(item);
    });

    return Object.keys(map).map((cat) => ({
      title: cat,
      data: map[cat],
    }));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <SectionList
        sections={groupedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Detail", { itemId: item.id })}
          >
            <RagaCard name={item.name} seq1={item.arohanam} seq2={item.avarohanam} cat={item.cat}/>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#e6e6e6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 15,
    paddingLeft : 143
  },
});
