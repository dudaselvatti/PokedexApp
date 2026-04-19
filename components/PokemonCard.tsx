import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format'; // Importando a função!

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <View style={styles.card}>
      {/* Adicionei o {uri: pokemon.image} que estava faltando no seu código base lá do início */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      
      {/* Usando a função capitalize para formatar o nome */}
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    margin: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 8, fontWeight: 'bold' },
});