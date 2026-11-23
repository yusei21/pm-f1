import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Mostra o logo e os botões de acesso às outras telas.
export default function TelaInicial({ navigation: navegacao }) {
  return (
    <View style={estilos.container}>
      <Image source={require('../../assets/f1-logo-white.png')} style={estilos.logo} resizeMode="contain" accessibilityLabel="Logo da Fórmula 1" />
      <Text style={estilos.titulo}>Pilotos F1</Text>

      <TouchableOpacity style={estilos.botao} onPress={() => navegacao.navigate('Pilotos')}>
        <Text style={estilos.textoBotao}>Listar Pilotos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.botao} onPress={() => navegacao.navigate('Sobre')}>
        <Text style={estilos.textoBotao}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
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
