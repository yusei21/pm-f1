import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import PilotosScreen from './src/screens/PilotosScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';
import SobreScreen from './src/screens/SobreScreen';

// ROTAS: cada Stack.Screen é uma tela do app, identificada pelo "name".
// Para trocar de tela usamos navigation.navigate('NomeDaTela', parametros).
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pilotos" component={PilotosScreen} options={{ title: 'Pilotos' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes do Piloto' }} />
        <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
