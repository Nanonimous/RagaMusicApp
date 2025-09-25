// src/components/RagaCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RagaCard({ name, seq1,seq2, cat }) {
  return (
    <View style={styles.card} >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subTitle}>{cat}</Text>
      <Text style={styles.scale}>{seq1.join(" - ")}</Text>
      <Text style={styles.scale}>{seq2.join(" - ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#222",
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  scale: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
});
