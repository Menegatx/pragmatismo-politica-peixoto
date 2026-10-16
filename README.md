# Peixoto Transparente — Auditoria Cívica & Pragmatismo Fiscal

> **Observatório Independente de Finanças Públicas: Peixoto de Azevedo - MT**  
> *Uma análise técnica, materialista e não-partidária da alocação de recursos públicos.*

---

## 📌 1. Visão Geral e Princípios

Este projeto foi construído sob a ótica do **pragmatismo político e econômico**:
- **Sem partidarismo:** Sem narrativas de direita ou de esquerda, sem defesa ou ataque a grupos políticos.
- **Materialismo dos números:** Foco estrito no rastro do dinheiro — onde ele entra, quem recebe e qual é o retorno prático no bolso e no estômago do trabalhador comum.
- **Transparência ativa via API:** Integração direta com as bases federais abertas (PNCP e Tesouro Nacional SICONFI), eliminando a dependência de relatórios manuais dos portais locais.

---

## 🔍 2. Principais Achados da Auditoria (2024–2026)

| Indicador Oficial | Peixoto de Azevedo | Guarantã do Norte | Matupá | O que isso significa no bolso do cidadão |
| :--- | :---: | :---: | :---: | :--- |
| **Arrecadação Anual** | **R$ 292,2 Milhões** | R$ 243,6 Mi | R$ 172,1 Mi | R$ 8.618/ano por morador (R$ 718/mês). **Dinheiro sobra no cofre.** |
| **Liquidez de Caixa (TCE-MT)** | **R$ 10,78 p/ R$ 1,00** | R$ 3,40 | R$ 4,10 | A prefeitura possui R$ 10,78 no banco para cada R$ 1 de dívida imediata. |
| **Urbanismo & Asfalto / Hab** | **R$ 71,79** | **R$ 243,01** *(R$ 668 em 2024)* | **R$ 292,74** | **Abandono de infraestrutura:** Vizinhos investem de 3x a 9x mais por habitante. |
| **Custo de Gabinetes / Hab** | **R$ 1.017,50** | **R$ 743,12** | **R$ 1.058,22** | A máquina burocrática consumiu R$ 34,3 Milhões (+48% em 1 ano). |
| **Taxa Real de Obras** | **6,09%** | **15,25%** | **17,86%** | Mais de 94% do dinheiro vai para a própria máquina e terceirizações. |
| **Escândalo da UPA / Saúde** | **R$ 1,55 Mi Bloqueados** | Regular | Regular | Decisão unânime do TJ-MT manteve bloqueio por pagamentos fora de contrato. |
| **Diárias de Viagem** | **R$ 837.197,00** | - | - | **Explosão de +167%** em diárias de servidores/gestores em apenas 12 meses. |

---

## 🛠️ 3. Funcionalidades da Plataforma

1. **Dashboard Interativo & Storytelling de Dados:** Gráficos, métricas e visualizações didáticas sobre as prioridades reais de gasto público.
2. **Calculadora Cívica ("Onde Vai Seu Imposto?"):** O cidadão informa sua renda ou IPTU e vê exatamente quantos reais vão para gabinetes, terceirizados e os centavos destinados ao asfalto.
3. **Raio-X de Fornecedores (CNPJ por CNPJ):** Tabela pesquisável com 326 contratos oficiais do PNCP, destacando dispensas de licitação, valores acumulados e objetos contratuais.
4. **Batalha Regional de Eficiência:** Comparativo gráfico interativo com Guarantã do Norte, Matupá e as médias de MT e do Brasil.
5. **Dossiê em PDF para Download:** Relatório executivo diagramado em A4 gerado automaticamente via script Python com ReportLab (`public/dossie-auditoria-peixoto.pdf`).
6. **Integração Ativa com APIs:** Pipeline automatizado em Python que puxa dados do PNCP e SICONFI.

---

## 🚀 4. Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (v18+)
- **Python** (v3.10+) e `uv` (ou `venv` padrão)

### 1. Iniciar a Plataforma Web (Frontend)
```bash
# Instalar dependências (caso ainda não tenha instalado)
npm install

# Rodar servidor de desenvolvimento
npm run dev
```
Acesse no navegador: `http://localhost:5173`

---

## 🔄 5. Como Atualizar os Dados via API (Acompanhamento Contínuo)

Para puxar os novos contratos publicados pela Prefeitura no PNCP, baixar os balanços mais recentes do Tesouro e re-gerar o PDF automaticamente, execute:

```bash
./pipeline/update_pipeline.sh
```

Esse script realiza 3 etapas automáticas:
1. `pipeline/fetch_data.py`: Faz as chamadas REST nas APIs federais do PNCP e SICONFI.
2. `pipeline/analyze.py`: Processa métricas, calcula o HHI de concentração e salva os JSONs em `src/data/`.
3. `pipeline/generate_pdf.py`: Compila e gera o novo PDF do Dossiê em `public/dossie-auditoria-peixoto.pdf`.

---

## 📁 6. Estrutura do Repositório

```text
pragmatismo-politica-peixoto/
├── .venv/                         # Ambiente virtual Python
├── pipeline/                      # Pipeline de automação e auditoria de dados
│   ├── fetch_data.py              # Extrator de APIs (PNCP e SICONFI)
│   ├── analyze.py                 # Algoritmo de auditoria, HHI e indicadores
│   ├── generate_pdf.py            # Gerador de Dossiê A4 profissional
│   └── update_pipeline.sh         # Script unificado de atualização contínua
├── src/                           # Aplicação Web (React + Vite + Tailwind CSS)
│   ├── components/                # Componentes modulares de UI
│   │   ├── Navbar.jsx             # Barra de navegação e atalho do PDF
│   │   ├── HeroSection.jsx        # Headline e KPIs macroeconômicos
│   │   ├── StorytellingSection.jsx# Diagnóstico das 5 anomalias auditadas
│   │   ├── TaxCalculatorSection.jsx# Calculadora cívica por faixa salarial/IPTU
│   │   ├── RegionalBenchmarkSection.jsx # Comparativo visual com vizinhos e médias
│   │   ├── SuppliersSection.jsx   # Tabela de contratos CNPJ por CNPJ
│   │   ├── ApiStatusSection.jsx   # Status das conexões e central de download
│   │   └── Footer.jsx             # Fontes oficiais e ouvidorias
│   ├── data/                      # Dados oficiais pré-processados em JSON
│   │   ├── contracts.json         # 326 contratos detalhados
│   │   ├── suppliers_summary.json # Agregação e ranking de 275 fornecedores
│   │   ├── budget_comparison.json # Séries temporais e benchmarks regionais
│   │   └── civic_indicators.json  # Indicadores per capita e anomalias
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── dossie-auditoria-peixoto.pdf # Dossiê PDF gerado pronto para download
│   └── favicon.svg
├── package.json
└── vite.config.js
```

---

## ⚖️ 7. Fontes Oficiais & Legislação

- **PNCP (Portal Nacional de Contratações Públicas):** Lei Federal nº 14.133/2021.
- **SICONFI (Tesouro Nacional):** Lei de Responsabilidade Fiscal (LC nº 101/2000).
- **TCE-MT:** Prestação de Contas de Governo Anual de Peixoto de Azevedo.
- **IBGE Cidades:** Censo Demográfico e Contas Regionais.
- **Lei de Acesso à Informação:** Lei Federal nº 12.527/2011.
