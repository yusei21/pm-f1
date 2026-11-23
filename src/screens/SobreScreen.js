import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

// Tela Sobre: nome da API, breve descrição e link
export default function SobreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>OpenF1 API</Text>

      <Text style={styles.texto}>
        A OpenF1 é uma API REST com dados da Fórmula 1 desde 2023: pilotos, sessões, voltas,
        pit stops, clima e outros. Dados históricos são gratuitos e não exigem cadastro.
        Dados em tempo real exigem assinatura. Neste app usamos o endpoint /drivers para
        listar os pilotos e mostrar os detalhes de cada um.
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL('https://openf1.org')}>
        <Text style={styles.link}>https://openf1.org</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.popToTop()}>
        <Text style={styles.textoBotao}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24, alignItems: 'center' },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 20 },
  texto: { color: '#fff', fontSize: 16, lineHeight: 24, textAlign: 'justify' },
  link: { color: '#fff', fontSize: 18, marginTop: 20, textDecorationLine: 'underline' },
  botao: { backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: 'auto' },
  textoBotao: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
