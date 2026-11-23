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
