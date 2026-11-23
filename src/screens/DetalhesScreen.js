import { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  ActivityIndicator, StyleSheet
} from 'react-native';
import { buscarPiloto, buscarPosicao } from '../api';

export default function DetalhesScreen({ route, navigation }) {
  const { numero, sessionKey } = route.params;
  const [piloto, setPiloto] = useState(null);
  const [posicao, setPosicao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarPiloto(numero, sessionKey)
      .then(setPiloto)
      .catch(() => setPiloto(null))
      .finally(() => setCarregando(false));

    buscarPosicao(numero).then(setPosicao).catch(() => setPosicao(null));
  }, [numero, sessionKey]);


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
  voltar: { padding: 18, alignItems: 'center', marginTop: 36 },
  textoVoltar: { color: '#aaa', fontSize: 15 }
});
