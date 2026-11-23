const URL_BASE = 'https://api.openf1.org/v1';

// Busca os pilotos da sessão mais recente e remove números repetidos.
export async function listarPilotos() {
  const resposta = await fetch(`${URL_BASE}/drivers?session_key=latest`);
  if (!resposta.ok) throw new Error('Erro ao buscar pilotos: ' + resposta.status);
  const dados = await resposta.json();

  const unicos = dados.filter(
    (piloto, indice) => dados.findIndex(
      (outroPiloto) => outroPiloto.driver_number === piloto.driver_number
    ) === indice
  );
  return unicos.sort((primeiro, segundo) =>
    (primeiro.team_name || '').localeCompare(segundo.team_name || '')
  );
}

// Busca os dados de um piloto na sessão selecionada.
export async function buscarPiloto(numero, chaveSessao) {
  const resposta = await fetch(
    `${URL_BASE}/drivers?session_key=${chaveSessao}&driver_number=${numero}`
  );
  if (!resposta.ok) throw new Error('Erro ao buscar piloto: ' + resposta.status);
  const dados = await resposta.json();
  return dados[0];
}

// Faz uma consulta à API e devolve o resultado em JSON.
async function consultar(caminho) {
  const resposta = await fetch(`${URL_BASE}/${caminho}`);
  if (!resposta.ok) throw new Error('Erro ao consultar a OpenF1');
  return resposta.json();
}

// Lista as corridas já encerradas no ano atual.
async function listarCorridasDaTemporada() {
  const ano = new Date().getFullYear();
  const sessoes = await consultar(`sessions?year=${ano}&session_name=Race`);
  return sessoes
    .filter(sessao => sessao.date_end && new Date(sessao.date_end) < new Date())
    .sort((primeira, segunda) => new Date(segunda.date_start) - new Date(primeira.date_start));
}

// Procura a posição mais recente do piloto no campeonato.
export async function buscarPosicao(numero) {
  const sessoes = await listarCorridasDaTemporada();
  for (const sessao of sessoes) {
    try {
      const dados = await consultar(
        `championship_drivers?session_key=${sessao.session_key}&driver_number=${numero}`
      );
      if (dados[0]?.position_current != null) return dados[0].position_current;
    } catch {
      // Tenta a corrida anterior se os dados ainda não estiverem disponíveis
    }
  }
  return null;
}
