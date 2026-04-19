import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Pokemon';
import { getPokemonDescription } from '../services/api';
import { capitalize } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const PokemonDetailScreen = ({ route }: Props) => {
  //pega o que ta no params de busca
  const { pokemon } = route.params;
  
  const [description, setDescription] = useState('');
  const [loadingDesc, setLoadingDesc] = useState(true);

  useEffect(() => {
    const fetchDescription = async () => {
      const text = await getPokemonDescription(pokemon.id);
      setDescription(text);
      setLoadingDesc(false);
    };

    fetchDescription();
  }, [pokemon.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pokemon.image }} style={styles.largeImage} />
      </View>
      
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      
      <View style={styles.typesContainer}>
        {pokemon.types.map((type, index) => (
          <View key={index} style={styles.typeBadge}>
            <Text style={styles.typeText}>{capitalize(type)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Peso</Text>
          {/* em hecto /10 pra kg */}
          <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Altura</Text>
          {/* em decimetros /10 pra metros */}
          <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Sobre</Text>
      {loadingDesc ? (
        <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <Text style={styles.description}>{description}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  imageContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 100,
    padding: 20,
    marginBottom: 20,
  },
  largeImage: { width: 150, height: 150 },
  name: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeBadge: {
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  typeText: { color: '#fff', fontWeight: 'bold' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statBox: { alignItems: 'center' },
  statLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  description: { fontSize: 16, color: '#444', lineHeight: 24, textAlign: 'justify' },
});