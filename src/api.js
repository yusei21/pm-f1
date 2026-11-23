// Consumo da API REST OpenF1 (https://openf1.org).
const BASE_URL = 'https://api.openf1.org/v1';

// ENDPOINT 1 — Listar recursos: pilotos da última sessão de F1
// GET https://api.openf1.org/v1/drivers?session_key=latest
export async function listarPilotos() {
  const resposta = await fetch(`${BASE_URL}/drivers?session_key=latest`);
  if (!resposta.ok) throw new Error('Erro ao buscar pilotos: ' + resposta.status);
  const dados = await resposta.json();

  // Remove pilotos repetidos (pelo número) e ordena por equipe
  const unicos = dados.filter(
    (p, i) => dados.findIndex((x) => x.driver_number === p.driver_number) === i
  );
  return unicos.sort((a, b) => (a.team_name || '').localeCompare(b.team_name || ''));
}

// ENDPOINT 2 — Detalhar um recurso: um piloto pelo número
// GET https://api.openf1.org/v1/drivers?session_key={sessao}&driver_number=44
export async function buscarPiloto(numero, sessionKey) {
  const resposta = await fetch(
    `${BASE_URL}/drivers?session_key=${sessionKey}&driver_number=${numero}`
  );
  if (!resposta.ok) throw new Error('Erro ao buscar piloto: ' + resposta.status);
  const dados = await resposta.json();
  return dados[0]; // a API devolve uma lista; pegamos o primeiro item
}


// Consulta simples à OpenF1
async function consultar(caminho) {
  const resposta = await fetch(`${BASE_URL}/${caminho}`);
  if (!resposta.ok) throw new Error('Erro ao consultar a OpenF1');
  return resposta.json();
}

// Corridas já realizadas na temporada atual, da mais recente para a mais antiga
async function listarCorridasDaTemporada() {
  const ano = new Date().getFullYear();
  const sessoes = await consultar(`sessions?year=${ano}&session_name=Race`);
  return sessoes
    .filter(s => s.date_end && new Date(s.date_end) < new Date())
    .sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
}

// Posição mais recente disponível no campeonato de pilotos
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

function formatarVolta(segundos) {
  if (segundos == null) return '—';
  const minutos = Math.floor(segundos / 60);
  return `${minutos}:${(segundos % 60).toFixed(3).padStart(6, '0')}`;
}

// Três últimas corridas realizadas nesta temporada
export async function buscarCorridas(numero) {
  const sessoes = (await listarCorridasDaTemporada()).slice(0, 3);
  const corridas = [];

  // Pequenos grupos evitam disparar dezenas de chamadas de uma vez
  for (let i = 0; i < sessoes.length; i += 4) {
    const grupo = sessoes.slice(i, i + 4);
    const resultados = await Promise.all(grupo.map(async sessao => {
      try {
        const [resultados, voltas] = await Promise.all([
          consultar(`session_result?session_key=${sessao.session_key}&driver_number=${numero}`),
          consultar(`laps?session_key=${sessao.session_key}&driver_number=${numero}`)
        ]);
        const resultado = resultados[0];
        const tempos = voltas.map(v => v.lap_duration)
          .filter(t => typeof t === 'number' && t > 0);
        const melhor = tempos.length ? Math.min(...tempos) : null;

        return {
          id: sessao.session_key,
          nome: sessao.country_name || sessao.location || 'Corrida',
          posicao: resultado?.dsq ? 'DSQ'
            : resultado?.dns ? 'DNS'
            : resultado?.dnf ? 'DNF'
            : resultado?.position != null ? `${resultado.position}º` : '—',
          volta: formatarVolta(melhor)
        };
      } catch {
        return {
          id: sessao.session_key,
          nome: sessao.country_name || 'Corrida',
          posicao: '—',
          volta: '—'
        };
      }
    }));
    corridas.push(...resultados);
  }

  return corridas;
}
