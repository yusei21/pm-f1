# PM F1 — Pilotos de Fórmula 1

Aplicativo em **React Native (Expo)** que consulta a API REST [OpenF1](https://openf1.org).

Atividade Complementar da 3ª Nota — Programação para Dispositivos Móveis (IFMA).

## Como executar

1. Instale o [Node.js](https://nodejs.org) e o **Expo Go** no celular.
2. Na pasta do projeto, execute:

```bash
npm install
npx expo start
```

3. Escaneie o QR Code com o Expo Go (celular e computador na mesma rede Wi-Fi).

Se não conectar, experimente `npx expo start --tunnel`.

## Telas

| Tela | Funcionalidade |
|---|---|
| **Home** | Acesso à lista de pilotos e à tela Sobre |
| **Pilotos** | Lista de pilotos com foto, nome, equipe e número |
| **Detalhes** | Foto, número, sigla, equipe e posição no campeonato; seção expansível com as três últimas corridas já realizadas na temporada atual, posição final e melhor volta do piloto |
| **Sobre** | Informações sobre a API |

## API utilizada

Os dados são consultados em `https://api.openf1.org/v1`:

- `drivers`: lista e detalhes dos pilotos.
- `sessions`: corridas da temporada atual.
- `championship_drivers`: posição do piloto no campeonato.
- `session_result`: resultado do piloto em cada corrida.
- `laps`: tempos de volta para identificar a melhor volta pessoal na corrida.

As consultas usam `fetch`, em `src/api.js`. Algumas informações podem não estar disponíveis na API; nesses casos, a tela mostra `—`. A lista de corridas considera apenas as já encerradas.

## Estrutura principal

- `App.js`: navegação entre as telas.
- `src/api.js`: consultas à OpenF1.
- `src/screens/PilotosScreen.js`: listagem com `FlatList`.
- `src/screens/DetalhesScreen.js`: informações e resultados expansíveis do piloto.
