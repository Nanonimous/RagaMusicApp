import React, { useState, useMemo ,useRef,useEffect} from 'react';
import Sound from 'react-native-sound';          
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import { dataSet } from "../data/RagamList";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface BlackKey {
  label: string;
  top: number;
}

export default function KeyboardScreen() {
  const [keyPressed, setKeyPressed] = useState<string[]>([]);
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList, "Detail">>();
  const whiteKeys = ['S', 'R2', 'G3', 'M1', 'P', 'D2', 'N3', 'S'];
  const blackKeys: BlackKey[] = [
    { label: 'R1', top: 0.05 },
    { label: 'G2', top: 0.157 },
    { label: 'M2', top: 0.365 },
    { label: 'D1', top: 0.47 },
    { label: 'N2', top: 0.575 },
  ];
  const soundMap: Record<string, string> = {
  S: "s",
  R2: "r2",
  G3: "g3",
  M1: "m1",
  P: "p",
  D2: "d2",
  N3: "n3",
  R1: "r1",
  G2: "g2",
  M2: "m2",
  D1: "d1",
  N2: "n2",
};

const soundsRef = useRef<Record<string, Sound>>({});

useEffect(() => {
  Object.keys(soundMap).forEach(key => {
    soundsRef.current[key] = new Sound(soundMap[key], undefined, (err) => {
      if (err) console.log('Failed to load', key, err);
    });
  });

  return () => {
    Object.values(soundsRef.current).forEach(s => s.release());
  };
}, []);

const keyClicked = (key: string) => {
  const sound = soundsRef.current[key.toUpperCase()];
  if (sound) sound.stop(() => sound.play());
  setKeyPressed(keys => [...keys, key.toUpperCase()]);
};


  const clearKeys = () => setKeyPressed([]);

  const displayedKeys = keyPressed.slice(-10);

  const matchingRagams = useMemo(() => {
    if (displayedKeys.length === 0) return [];
    return dataSet.filter(ragam =>
      displayedKeys.every(
        (k, idx) =>
          ragam.arohanam?.[idx]?.toUpperCase() === k ||
          ragam.avarohanam?.[idx]?.toUpperCase() === k
      )
    );
  }, [displayedKeys]);

  return (
    <View style={styles.container}>
      {/* 🎹 Keyboard Section */}
      <View style={styles.keyboardContainer}>
        <View style={styles.whiteKeysWrapper}>
          {whiteKeys.map((label, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.whiteKey}
              onPress={() => keyClicked(label)}
            >
              <Text style={styles.whiteText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {blackKeys.map((b, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => keyClicked(b.label)}
            style={[styles.blackKey, { top: screenHeight * b.top }]}
          >
            <Text style={styles.blackText}>{b.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 👉 Sidebar */}
      <View style={styles.sidePanel}>
        <View style={[styles.sidebarCard, { transform: [{ rotate: "90deg" }] }]}>

          {/* Key Search Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎶 Key Search</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.keyScroll}
            >
              <Text style={styles.keySearchText}>
                {displayedKeys.length > 0
                  ? displayedKeys.join(' , ')
                  : 'No key pressed'}
              </Text>
            </ScrollView>
            {displayedKeys.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearKeys}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Matches Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔍 Matches</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              style={styles.matchesScroll}
            >
              {matchingRagams.length > 0 ? (
                matchingRagams.map(r => (
                  <Pressable onPress={()=> navigation.navigate("Detail", { itemId: r.id })}>
                    <View key={r.id} style={styles.matchCard}>
                      <Text style={styles.matchName}>{r.name}</Text>
                      <Text style={styles.matchCat}>{r.cat}</Text>
                    </View>
                  </Pressable>

                ))
              ) : (
                <Text style={styles.noMatchText}>No matches yet</Text>
              )}
            </ScrollView>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fafafa'
  },
  keyboardContainer: {
    flex: 2,
    position: 'relative',
    marginRight: 10
  },
  /** Sidebar Layout **/
  sidePanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarCard: {
    width: 700,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-around"
  },

  /** Sections **/
  section: {
    marginBottom: 20,
    maxWidth: 350,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },

  /** Keys **/
  keyScroll: { maxHeight: 40 },
  keySearchText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  /** Divider **/
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },

  /** Matches **/
  matchesScroll: {
    maxHeight: 160,
  },
  matchCard: {
    width: 130,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height : 60
  },
  matchName: { fontSize: 16, fontWeight: '700', color: '#2c3e50', textAlign: 'center' },
  matchCat: { fontSize: 14, color: '#7f8c8d', marginTop: 4, textAlign: 'center' },
  noMatchText: { fontSize: 15, color: '#999', marginTop: 10 },

  /** Keyboard Keys **/
  whiteKeysWrapper: { flexDirection: 'column', width: '100%', height: '100%' },
  whiteKey: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  whiteText: { color: '#000', fontWeight: '600' },
  blackKey: {
    position: 'absolute',
    right: 0,
    width: screenWidth * 0.4,
    height: screenHeight * 0.1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  blackText: { color: '#fff', fontWeight: '600' },
});
