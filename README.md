# PM F1 — Pilotos de Fórmula 1

App em **React Native (Expo)** que consome a API REST **[OpenF1](https://openf1.org)**. Dados históricos são gratuitos e não exigem autenticação; dados em tempo real exigem assinatura.
Atividade Complementar da 3ª Nota — Programação para Dispositivos Móveis (IFMA).

## Como rodar

1. Instale o [Node.js](https://nodejs.org) (versão LTS).
2. No celular, instale o app **Expo Go** (Play Store / App Store).
3. No terminal do VS Code, dentro da pasta do projeto:

```bash
npm install
npx expo start
```

4. Escaneie o QR Code com o Expo Go (celular e PC na mesma rede Wi-Fi).
   - Se não conectar, use: `npx expo start --tunnel`

## Telas

| Tela | O que faz |
|---|---|
| **Home** | Logo + botões *Listar Pilotos* e *Sobre* |
| **Pilotos** | Lista os pilotos com `FlatList` (foto, nome, equipe, número). Cada item é clicável |
| **Detalhes** | Mostra os dados do piloto clicado |
| **Sobre** | Nome da API, descrição e link |

## Endpoints usados

| Tela | Endpoint |
|---|---|
| Pilotos | `GET https://api.openf1.org/v1/drivers?session_key=latest` |
| Detalhes | `GET https://api.openf1.org/v1/drivers?session_key={sessao}&driver_number={numero}` |

Logo da Fórmula 1 em branco, adaptado de [f1logo.svg](https://github.com/mark-boots/f1-2026-assets/blob/main/assets/f1logo.svg) para a tela inicial.

## Onde está cada parte (para a apresentação)

| Assunto | Arquivo |
|---|---|
| Consumo da API (`fetch`) | `src/api.js` |
| Roteamento (React Navigation) | `App.js` + `navigation.navigate(...)` nas telas |
| FlatList | `src/screens/PilotosScreen.js` |
| useState / useEffect | `src/screens/PilotosScreen.js` e `src/screens/DetalhesScreen.js` |
