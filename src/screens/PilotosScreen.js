import { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import { listarPilotos } from '../api';

// Carrega os pilotos e mostra a lista para seleção.
export default function TelaPilotos({ navigation: navegacao }) {
  const [pilotos, definirPilotos] = useState([]);
  const [carregando, definirCarregando] = useState(true);
  const [erro, definirErro] = useState(null);

  useEffect(() => {
    listarPilotos()
      .then((dados) => definirPilotos(dados))
      .catch((falha) => definirErro(falha.message))
      .finally(() => definirCarregando(false));
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" color="#fff" style={estilos.container} />;
  }
  if (erro) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.erro}>{erro}</Text>
        <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navegacao.popToTop()}>
          <Text style={estilos.textoBotao}>Voltar à Tela Principal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={pilotos}
        keyExtractor={(piloto) => String(piloto.driver_number)}
        renderItem={({ item: piloto }) => (
          <TouchableOpacity
            style={estilos.cartao}
            onPress={() => navegacao.navigate('Detalhes', {
              numero: piloto.driver_number,
              chaveSessao: piloto.session_key,
            })}
          >
            {piloto.headshot_url ? (
              <Image source={{ uri: piloto.headshot_url }} style={estilos.foto} />
            ) : (
              <View style={[estilos.foto, { backgroundColor: '#ddd' }]} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={estilos.nome}>{piloto.full_name}</Text>
              <Text style={estilos.equipe}>{piloto.team_name}</Text>
            </View>
            <Text style={estilos.numero}>#{piloto.driver_number}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navegacao.popToTop()}>
        <Text style={estilos.textoBotao}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cartao: {
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
