import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PokedexScreen } from './screens/PokedexScreen';
import { PokemonDetailScreen } from './screens/PokemonDetailScreen'; 
import { RootStackParamList } from './types/Pokemon';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* principal */}
          <Stack.Screen 
            name="Home" 
            component={PokedexScreen} 
            options={{ headerShown: false }} 
          />
          {/* detalhes */}
          <Stack.Screen 
            name="Details" 
            component={PokemonDetailScreen} 
            options={{ title: 'Detalhes do Pokémon' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}