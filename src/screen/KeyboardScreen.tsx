import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface BlackKey {
  label: string;
  top: number; // percentage of container height from the top
}

export default function KeyboardScreen() {
  // White key labels
  const whiteKeys = ['S', 'G1', 'GAP', 'M1', 'P', 'GAP', 'GAP', 'S'];

  // Black keys with their vertical position (roughly matching your reference image)
  const blackKeys: BlackKey[] = [
    { label: 'R1', top: 0.12 }, // between S and G1
    { label: 'D1', top: 0.47 }, // between M1 and P
    { label: 'N2', top: 0.60 }, // between P and next GAP
  ];

  return (
    <View style={styles.container}>
      {/* WHITE KEYS */}
      <View style={styles.whiteKeysWrapper}>
        {whiteKeys.map((label, idx) => (
          <View key={idx} style={styles.whiteKey}>
            <Text style={styles.whiteText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* BLACK KEYS */}
      {blackKeys.map((b, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.blackKey,
            { top: screenHeight * b.top }, // convert percentage to absolute px
          ]}
        >
          <Text style={styles.blackText}>{b.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // background frame
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteKeysWrapper: {
    flexDirection: 'column',
    width: screenWidth * 0.9,
    height: '100%',
  },
  whiteKey: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  whiteText: {
    color: '#000',
    fontWeight: '600',
  },
  blackKey: {
    position: 'absolute',
    right: screenWidth * 0.05,      // align to right edge of white keys
    width: screenWidth * 0.4,       // narrower than white keys
    height: screenHeight * 0.10,    // size of each black key
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  blackText: {
    color: '#fff',
    fontWeight: '600',
  },
});
