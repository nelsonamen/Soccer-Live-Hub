# ⚽ Soccer Live Hub

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/nelsonamen/Soccer-Live-Hub?include_prereleases&color=orange)](https://github.com/nelsonamen/Soccer-Live-Hub/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/nelsonamen)

Cartão Lovelace modular, elegante e ultra-rápido para **Home Assistant** para acompanhar jogos em direto, classificações, últimos resultados, competições e tendências de forma das tuas equipas de futebol favoritas.

---

## 🌟 Principais Funcionalidades

- **🏆 Deteção Automática de Ligas e Competições**: Agrupa os teus módulos por competição (ex: **Primeira Liga**, **Liga dos Campeões**, **Liga Europa**) sem repetições de nomes genéricos.
- **🗂️ Navegação por Subcategorias**:
  - **Nível 1 (Equipa)**: Alterna entre os teus clubes e seleções favoritas.
  - **Nível 2 (Competição / Subcategoria)**: Agrupa os módulos por liga ou torneio.
  - **Nível 3 (Módulos)**: Navegação simples entre Próximo Jogo, Classificação, Último Jogo, etc.
- **🛡️ Marca d'Água Dinâmica do Emblema**: O canto superior direito exibe suavemente o emblema oficial do clube ou seleção selecionada.
- **🎨 Editor Visual Completo**: Totalmente configurável pela interface do Home Assistant (sem necessidade de editar ficheiros YAML).
- **🏷️ Identificação Clara no Editor**: Cada módulo na lista do editor exibe uma etiqueta identificadora com a Equipa e Competição correspondente.
- **🌓 Temas e Aparência**: Suporte nativo para os temas do Home Assistant, modo Escuro e Claro.
- **🌍 Multilingue**: Deteção automática do idioma do utilizador (Português, English, Español, Français, Deutsch, Italiano, Nederlands).

---

## 📋 Módulos Disponíveis

| Módulo | Descrição |
|---|---|
| **Próximo Jogo / Ao Vivo** | Placar ao vivo em tempo real, relógio, alinhamento, estádio e dados da transmissão TV. |
| **Classificação** | Tabela classificativa da liga com zonas de qualificação/despromoção. |
| **Mini Classificação** | Vista compacta centrada na tua equipa e rivais diretos. |
| **Último Jogo** | Resultado final, marcadores e detalhes do jogo mais recente. |
| **Competições da Equipa** | Vista agrupada das várias competições da equipa com abas e próximos encontros. |
| **Forma da Equipa** | Tendência de forma recente com gráfico e histórico V/E/D. |

---

## 📦 Requisito Prévio

Este cartão utiliza os sensores criados pela seguinte integração do Home Assistant:
- [Soccer Live Integration](https://github.com/rononline/soccerlive) por [@rononline](https://github.com/rononline)

---

## 🚀 Instalação

### Via HACS (Recomendado)

1. Abre o **HACS** no Home Assistant.
2. Vai a **Frontend** > Menu superior (3 pontos) > **Repositórios personalizados**.
3. Adiciona o repositório:
   - **Repositório**: `https://github.com/nelsonamen/Soccer-Live-Hub`
   - **Categoria**: `Dashboard` (ou `Lovelace`)
4. Clica em **Adicionar**, pesquisa por **Soccer Live Hub** e clica em **Transferir**.
5. Faz um *Hard Refresh* no navegador (`Ctrl + F5`).

### Instalação Manual

1. Transfere o ficheiro `dist/soccer-live-hub.bundle.js` da [última versão](https://github.com/nelsonamen/Soccer-Live-Hub/releases).
2. Copia o ficheiro para a pasta `www` do teu Home Assistant: `<config>/www/soccer-live-hub.bundle.js`.
3. No Home Assistant, vai a **Definições** > **Painéis** > **Recursos** (menu superior direito).
4. Clica em **Adicionar Recurso**:
   - **URL**: `/local/soccer-live-hub.bundle.js`
   - **Tipo de Recurso**: `Módulo JavaScript`
5. Atualiza a página do navegador (`Ctrl + F5`).

---

## ⚙️ Configuração na Interface (UI)

1. Em qualquer painel do Home Assistant, clica em **Editar Painel** > **Adicionar Cartão** e escolhe **Soccer Live Hub**.
2. **Definições Gerais do Cartão**:
   - **Título do cartão**: Texto para o cabeçalho (opcional).
   - **Modo de layout**: Escolhe entre *Abas (Barra de Navegação)* ou *Empilhado*.
   - **Aparência**: Seleciona *Tema Home Assistant*, *Escuro* ou *Claro*.
   - **Mostrar logótipos nas abas**: Ativa ou desativa os emblemas/ícones nas abas de navegação.
3. **Adicionar Módulos**:
   - Seleciona o conteúdo no menu **Escolher conteúdo...** (ex: *Próximo Jogo*, *Classificação*, *Último Jogo*).
   - Escolhe a **Entidade** do sensor.
   - Escreve a **Categoria / Competição (Opcional)** para agrupar o módulo sob uma aba específica (ex: *Primeira Liga*, *Liga dos Campeões*). Se deixares em branco, o cartão deteta a competição automaticamente!

---

## ☕ Apoiar o Desenvolvimento

<div align="center">
  <p>Estes projetos são de código aberto e assim continuarão. Se quiseres pagar um café:</p>
  <a href="https://www.buymeacoffee.com/nelsonamen" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
  </a>
</div>
