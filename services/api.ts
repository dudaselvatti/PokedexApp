import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';
//const API_BASE = 'https://pokeapi.co/apiERRADA/v2'; //pra erro testar errros a de cima eh o certo ta bom

export async function getPokemons(limit: number): Promise<PokemonListItem[]> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}`);
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémons:", error);
    // disparo de erro
    throw new Error("Não foi possível carregar a lista de Pokémons.");
  }
}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes na URL ${url}:`, error);
    throw new Error("Não foi possível carregar os detalhes do Pokémon.");
  }
}