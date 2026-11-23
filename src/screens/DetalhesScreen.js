import { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  ActivityIndicator, StyleSheet
} from 'react-native';
import { buscarPiloto, buscarPosicao, buscarCorridas } from '../api';

export default function DetalhesScreen({ route, navigation }) {
  const { numero, sessionKey } = route.params;
  const [piloto, setPiloto] = useState(null);
  const [posicao, setPosicao] = useState(null);
  const [corridas, setCorridas] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [carregandoCorridas, setCarregandoCorridas] = useState(false);
  const [erroCorridas, setErroCorridas] = useState(false);

  useEffect(() => {
    buscarPiloto(numero, sessionKey)
      .then(setPiloto)
      .catch(() => setPiloto(null))
      .finally(() => setCarregando(false));

    buscarPosicao(numero).then(setPosicao).catch(() => setPosicao(null));
  }, [numero, sessionKey]);

  async function alternarCorridas() {
    setAberto(!aberto);
    if (aberto || corridas.length || carregandoCorridas) return;

    setCarregandoCorridas(true);
    setErroCorridas(false);
    try {
      setCorridas(await buscarCorridas(numero));
    } catch {
      setErroCorridas(true);
    } finally {
      setCarregandoCorridas(false);
    }
  }

  if (carregando) {
    return <ActivityIndicator style={styles.container} size="large" color="#fff" />;
  }

  if (!piloto) {
    return (
      <View style={styles.container}>
        <Text style={styles.aviso}>Piloto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      {piloto.headshot_url && (
        <Image source={{ uri: piloto.headshot_url }} style={styles.foto} />
      )}
      <Text style={styles.nome}>{piloto.full_name}</Text>
      <Text style={styles.equipe}>{piloto.team_name}</Text>

      <View style={styles.dados}>
        <Linha rotulo="Número" valor={`#${piloto.driver_number}`} />
        <Linha rotulo="Sigla" valor={piloto.name_acronym} />
        <Linha rotulo="Equipe" valor={piloto.team_name} />
        <Linha rotulo="Posição no campeonato" valor={posicao != null ? `${posicao}º` : '—'} />
      </View>

      <TouchableOpacity style={styles.botaoCorridas} onPress={alternarCorridas}>
        <Text style={styles.titulo}>Corridas da temporada</Text>
        <Text style={styles.seta}>{aberto ? '⌃' : '⌄'}</Text>
      </TouchableOpacity>

      {aberto && (
        <View style={styles.lista}>
          {carregandoCorridas ? (
            <ActivityIndicator color="#fff" style={styles.aviso} />
          ) : erroCorridas ? (
            <Text style={styles.aviso}>Não foi possível carregar as corridas.</Text>
          ) : corridas.length === 0 ? (
            <Text style={styles.aviso}>Nenhuma corrida disponível.</Text>
          ) : (
            corridas.map(corrida => (
              <View key={corrida.id} style={styles.corrida}>
                <Text style={styles.nomeCorrida}>GP de {corrida.nome}</Text>
                <Text style={styles.info}>Posição: {corrida.posicao}</Text>
                <Text style={styles.info}>Melhor volta: {corrida.volta}</Text>
              </View>
            ))
          )}
        </View>
      )}

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.popToTop()}>
        <Text style={styles.textoVoltar}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Linha({ rotulo, valor }) {
  return (
    <View style={styles.linha}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.valor}>{valor ?? '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  conteudo: { padding: 24, paddingBottom: 40 },
  foto: {
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: '#fff', alignSelf: 'center', marginTop: 20
  },
  nome: {
    color: '#fff', fontSize: 28, fontWeight: 'bold',
    textAlign: 'center', marginTop: 16
  },
  equipe: { color: '#999', fontSize: 16, textAlign: 'center', marginTop: 4 },
  dados: { marginTop: 32 },
  linha: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#292929'
  },
  rotulo: { color: '#aaa', fontSize: 15, flex: 1 },
  valor: { color: '#fff', fontSize: 16, fontWeight: '600' },
  botaoCorridas: {
    backgroundColor: '#1c1c1e', borderRadius: 12,
    padding: 18, marginTop: 30, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center'
  },
  titulo: { color: '#fff', fontSize: 17, fontWeight: '600' },
  seta: { color: '#aaa', fontSize: 24 },
  lista: { marginTop: 8 },
  corrida: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#292929' },
  nomeCorrida: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  info: { color: '#aaa', fontSize: 14, marginTop: 3 },
  aviso: { color: '#aaa', padding: 16 },
  voltar: { padding: 18, alignItems: 'center', marginTop: 36 },
  textoVoltar: { color: '#aaa', fontSize: 15 }
});
