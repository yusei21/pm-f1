import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/f1-logo-white.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo da Fórmula 1" />
      <Text style={styles.titulo}>Pilotos F1</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Pilotos')}>
        <Text style={styles.textoBotao}>Listar Pilotos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Sobre')}>
        <Text style={styles.textoBotao}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: { width: 256, height: 64, marginBottom: 24 },
  titulo: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 48,
  },
  botao: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 320,
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  textoBotao: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});
