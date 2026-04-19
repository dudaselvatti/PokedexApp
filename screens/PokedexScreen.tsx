import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  
  // estado de carregamento
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // estado de erro
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // pra começar ja carregando
        setError(null); // limpa qualquer erro que tenha ficado salvo

        //pra tirar o delay apague a linha abaixo
        await new Promise(resolve => setTimeout(resolve, 2000)); // simula um delay de 2 segundos pra verificar se ta funcionando o loading
        
        const list = await getPokemons(30); 
        const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
        
        setPokemons(details);
      } catch (err) {
        // se der pau na requisição, ele cai aqui
        setError("Falha ao carregar Pokémons. Verifique sua conexão.");
      } finally {
        //executa dando certo ou errado, garantindo que o loading suma
        setIsLoading(false); // para de loadar quando os dados chegam ou falham
      }
    };
    
    fetchData();
  }, []);

  const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

  // renderizar as mensagens quando a lista está vazia
  const renderEmptyList = () => {
    // digitou algo e nao achou
    if (search.trim() !== '') {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Nenhum Pokémon encontrado para '{search}'
          </Text>
        </View>
      );
    }

    // sem busca lista vazia 
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          Nenhum Pokémon para exibir no momento.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
      />

      {/*if dos loads e erros*/}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando Pokémons...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          
          // tratamento de lista vazia
          ListEmptyComponent={renderEmptyList}

          // garantir que a lista ocupe o espaço todo e o texto vazio fique centralizado na tela
          contentContainerStyle={filtered.length === 0 ? { flex: 1 } : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  //styles pra centralizar tava feio antes
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  // style pro texto de erro 
  errorText: {
    color: '#D8000C',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
  // style para o texto de lista vazia
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});