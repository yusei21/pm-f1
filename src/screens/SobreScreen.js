import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

// Apresenta a API usada pelo aplicativo e seu endereço.
export default function TelaSobre({ navigation: navegacao }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>OpenF1 API</Text>

      <Text style={estilos.texto}>
        A OpenF1 é uma API REST com dados da Fórmula 1 desde 2023: pilotos, sessões, voltas,
        pit stops, clima e outros. Dados históricos são gratuitos e não exigem cadastro.
        Dados em tempo real exigem assinatura. Neste app usamos /drivers para listar
        e detalhar pilotos, /sessions para consultar as corridas da temporada e
        /championship_drivers para obter a posição dos pilotos no campeonato.
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL('https://openf1.org')}>
        <Text style={estilos.link}>https://openf1.org</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.botao} onPress={() => navegacao.popToTop()}>
        <Text style={estilos.textoBotao}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24, alignItems: 'center' },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 20 },
  texto: { color: '#fff', fontSize: 16, lineHeight: 24, textAlign: 'justify' },
  link: { color: '#fff', fontSize: 18, marginTop: 20, textDecorationLine: 'underline' },
  botao: { backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: 'auto' },
  textoBotao: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
