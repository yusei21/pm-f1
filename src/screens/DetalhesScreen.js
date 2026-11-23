import { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  ActivityIndicator, StyleSheet
} from 'react-native';
import { buscarPiloto, buscarPosicao } from '../api';

// Mostra os dados e a posição do piloto selecionado.
export default function TelaDetalhes({ route: rota, navigation: navegacao }) {
  const { numero, chaveSessao } = rota.params;
  const [piloto, definirPiloto] = useState(null);
  const [posicao, definirPosicao] = useState(null);
  const [carregando, definirCarregando] = useState(true);

  useEffect(() => {
    buscarPiloto(numero, chaveSessao)
      .then(definirPiloto)
      .catch(() => definirPiloto(null))
      .finally(() => definirCarregando(false));

    buscarPosicao(numero).then(definirPosicao).catch(() => definirPosicao(null));
  }, [numero, chaveSessao]);

  if (carregando) {
    return <ActivityIndicator style={estilos.container} size="large" color="#fff" />;
  }

  if (!piloto) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.aviso}>Piloto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      {piloto.headshot_url && (
        <Image source={{ uri: piloto.headshot_url }} style={estilos.foto} />
      )}
      <Text style={estilos.nome}>{piloto.full_name}</Text>
      <Text style={estilos.equipe}>{piloto.team_name}</Text>

      <View style={estilos.dados}>
        <Linha rotulo="Número" valor={`#${piloto.driver_number}`} />
        <Linha rotulo="Sigla" valor={piloto.name_acronym} />
        <Linha rotulo="Equipe" valor={piloto.team_name} />
        <Linha rotulo="Posição no campeonato" valor={posicao != null ? `${posicao}º` : '—'} />
      </View>

      <TouchableOpacity style={estilos.voltar} onPress={() => navegacao.popToTop()}>
        <Text style={estilos.textoVoltar}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Mostra um dado do piloto com seu rótulo.
function Linha({ rotulo, valor }) {
  return (
    <View style={estilos.linha}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor ?? '—'}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
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
