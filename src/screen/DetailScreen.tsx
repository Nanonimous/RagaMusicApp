// src/screens/DetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { dataSet } from "../data/RagamList";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { itemId } = route.params;

  const ragam = dataSet.find((r) => r.id === itemId);

  if (!ragam) {
    return (
      <View style={styles.center}>
        <Text>Ragam not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{ragam.name}</Text>
      <Text style={styles.cat}>{ragam.cat}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Arohanam </Text>
        <Text style={styles.sequence}>{ragam.arohanam.join(" - ")}</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>▶ Play Arohanam</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Avarohanam </Text>
        <Text style={styles.sequence}>{ragam.avarohanam.slice().reverse().join(" - ")}</Text>
        <Pressable style={[styles.button, { backgroundColor: "#009688" }]}>
          <Text style={styles.buttonText}>▶ Play Avarohanam</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 28, fontWeight: "700", color: "#333", marginBottom: 5 },
  cat: { fontSize: 16, color: "#666", marginBottom: 20 },
  section: { marginBottom: 30 },
  heading: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  sequence: { fontSize: 16, color: "#444", marginBottom: 10 },
  button: {
    backgroundColor: "#3f51b5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },
});
