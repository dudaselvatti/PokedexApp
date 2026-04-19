export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  //no desafio a gente usa peso e altura
  height: number; 
  weight: number; 
}

//temos que tipar as rotas agora
export type RootStackParamList = {
  Home: undefined; // na home não recebe parâmetros
  Details: { pokemon: Pokemon }; // na details tem que receber o objeto completo
};