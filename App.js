import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import TelaInicial from './src/screens/HomeScreen';
import TelaPilotos from './src/screens/PilotosScreen';
import TelaDetalhes from './src/screens/DetalhesScreen';
import TelaSobre from './src/screens/SobreScreen';

const Pilha = createNativeStackNavigator();

// Configura as telas e a navegação do aplicativo.
export default function Aplicativo() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Pilha.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Pilha.Screen name="Inicio" component={TelaInicial} options={{ headerShown: false }} />
        <Pilha.Screen name="Pilotos" component={TelaPilotos} options={{ title: 'Pilotos' }} />
        <Pilha.Screen name="Detalhes" component={TelaDetalhes} options={{ title: 'Detalhes do Piloto' }} />
        <Pilha.Screen name="Sobre" component={TelaSobre} options={{ title: 'Sobre' }} />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
