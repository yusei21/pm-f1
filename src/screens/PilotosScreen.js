import { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import { listarPilotos } from '../api';

// Tela de Listagem: busca os pilotos na API e mostra numa FlatList
export default function PilotosScreen({ navigation }) {
  const [pilotos, setPilotos] = useState([]);     // lista vinda da API
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // useEffect com [] roda uma vez, quando a tela abre
  useEffect(() => {
    listarPilotos()
      .then((dados) => setPilotos(dados))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" color="#fff" style={styles.container} />;
  }
  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.popToTop()}>
          <Text style={styles.textoBotao}>Voltar à Tela Principal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pilotos}
        keyExtractor={(item) => String(item.driver_number)}
        renderItem={({ item }) => (
          // Cada item é clicável e abre a tela de Detalhes, passando o número do piloto
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detalhes', {
              numero: item.driver_number,
              sessionKey: item.session_key,
            })}
          >
            {item.headshot_url ? (
              <Image source={{ uri: item.headshot_url }} style={styles.foto} />
            ) : (
              <View style={[styles.foto, { backgroundColor: '#ddd' }]} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.full_name}</Text>
              <Text style={styles.equipe}>{item.team_name}</Text>
            </View>
            <Text style={styles.numero}>#{item.driver_number}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.popToTop()}>
        <Text style={styles.textoBotao}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  foto: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  nome: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  equipe: { color: '#555', fontSize: 14 },
  numero: { color: '#000', fontSize: 20, fontWeight: 'bold' },
  erro: { color: '#fff', textAlign: 'center', marginTop: 40, padding: 20 },
  botaoVoltar: { backgroundColor: '#fff', padding: 14, margin: 12, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
