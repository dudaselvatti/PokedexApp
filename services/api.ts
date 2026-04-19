import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';
//const API_BASE = 'https://pokeapi.co/apiERRADA/v2'; //pra erro testar errros a de cima eh o certo ta bom

// offset com padrao 0
export async function getPokemons(limit: number, offset: number = 0): Promise<PokemonListItem[]> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémons:", error);
    throw new Error("Não foi possível carregar a lista de Pokémons.");
  }
}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      //high resolucao ou default
      image: res.data.sprites.other['official-artwork'].front_default || res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
      //mapear altura e peso
      height: res.data.height,
      weight: res.data.weight,
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes na URL ${url}:`, error);
    throw new Error("Não foi possível carregar os detalhes do Pokémon.");
  }
}

//buscando descrição do pokemon
export async function getPokemonDescription(id: number): Promise<string> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon-species/${id}`);
    
    //procura em portugues primeiro ai se não achar procura em inglês
    const entry = res.data.flavor_text_entries.find((e: any) => e.language.name === 'pt-BR') 
               || res.data.flavor_text_entries.find((e: any) => e.language.name === 'en');
               
    //limpando os \n da api pq quebra tudo
    return entry ? entry.flavor_text.replace(/[\n\f]/g, ' ') : "Descrição não disponível.";
  } catch (error) {
    return "Descrição não disponível.";
  }
}