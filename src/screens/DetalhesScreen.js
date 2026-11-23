import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { buscarPiloto } from '../api';

// Tela de Detalhes: recebe o número do piloto pela rota e busca os dados dele na API
export default function DetalhesScreen({ route, navigation }) {
  const { numero, sessionKey } = route.params; // parâmetros enviados pela tela de Pilotos
  const [piloto, setPiloto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarPiloto(numero, sessionKey)
      .then((dados) => setPiloto(dados))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [numero, sessionKey]);

  if (carregando) {
    return <ActivityIndicator size="large" color="#fff" style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {erro || !piloto ? (
        <Text style={styles.mensagem}>{erro || 'Piloto não encontrado.'}</Text>
      ) : (
        <>
          {piloto.headshot_url && (
            <Image source={{ uri: piloto.headshot_url }} style={styles.foto} />
          )}
          <Text style={styles.nome}>{piloto.full_name}</Text>
          <Linha rotulo="Número" valor={piloto.driver_number} />
          <Linha rotulo="Sigla" valor={piloto.name_acronym} />
          <Linha rotulo="Equipe" valor={piloto.team_name} />
          <Linha rotulo="País" valor={piloto.country_code || '—'} />
          <Linha rotulo="Nome na TV" valor={piloto.broadcast_name} />
        </>
      )}

      <TouchableOpacity style={styles.botao} onPress={() => navigation.popToTop()}>
        <Text style={styles.textoBotao}>Voltar à Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

function Linha({ rotulo, valor }) {
  return (
    <View style={styles.linha}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.texto}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#000', padding: 20 },
  foto: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#fff', marginTop: 10 },
  nome: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 12, marginBottom: 16 },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  rotulo: { color: '#555', fontSize: 16 },
  texto: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  mensagem: { color: '#fff', fontSize: 16 },
  botao: { backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: 'auto' },
  textoBotao: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
