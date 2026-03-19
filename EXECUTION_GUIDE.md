# 🚀 Guia de Execução - Teste Técnico QA - Dog API

Este guia fornece instruções completas para executar os testes em qualquer máquina (Linux, Windows, macOS) e via pipeline CI/CD.

## 📋 Pré-requisitos

- **Node.js 18+** (recomendado 18.x ou 20.x)
- **npm 9+** ou **yarn**
- **Git** (para clonar o repositório)

### Verificar versões instaladas

```bash
node --version
npm --version
```

---

## 💻 Instalação Rápida

### 1. Clonar o repositório
```bash
git clone <URL-DO-REPOSITORIO>
cd teste-tecnico-qa-api
```

### 2. Instalar dependências
```bash
npm install
```

---

## 🏃 Executando os Testes

### Opção 1: Scripts Automatizados (Recomendado)

#### No Linux/macOS:
```bash
chmod +x setup-tests.sh
./setup-tests.sh
```

#### No Windows:
```cmd
setup-tests.bat
```

### Opção 2: Comandos NPM Diretos

#### Executar todos os testes em headless
```bash
npm run test:dog
```

#### Executar com visualização (headed mode)
```bash
npm run test:headed
```

#### Abrir Cypress interativo
```bash
npm run cypress:open
```

#### Gerar relatório HTML
```bash
npm run report
```

---

## 🔄 Pipeline CI/CD (GitHub Actions)

O projeto inclui configuração automática de testes via **GitHub Actions**.

### Como funciona:

1. **Trigger**: O pipeline é acionado automaticamente em:
   - Push para o branch `main` ou `develop`
   - Pull Requests para o branch `main` ou `develop`

2. **Ambientes testados**:
   - ✅ Ubuntu (Linux)
   - ✅ Windows
   - ✅ macOS

3. **Versões Node.js testadas**:
   - ✅ Node 18.x
   - ✅ Node 20.x

4. **Relatórios gerados**:
   - 📊 Mochawesome HTML Reports
   - 📸 Screenshots em caso de falha
   - 🎬 Vídeos em caso de falha

### Visualizar resultados do pipeline:

1. Vá para a aba **"Actions"** no GitHub
2. Clique no workflow **"Cypress Tests - Dog API"**
3. Encontre o run desejado e clique
4. Acesse a aba **"Artifacts"** para baixar relatórios

---

## 📊 Estrutura de Testes

```
cypress/e2e/dog-api/
├── 01-breeds-list.cy.js       # 7 testes - GET /breeds/list/all
├── 02-breed-images.cy.js      # 10 testes - GET /breed/{breed}/images
└── 03-random-image.cy.js      # 10 testes - GET /breeds/image/random

Total: 27 testes automatizados
```

### Suites de testes:

| Suite | Endpoint | Testes | Status |
|-------|----------|--------|--------|
| Breeds List | `/breeds/list/all` | 7 | ✅ |
| Breed Images | `/breed/{breed}/images` | 10 | ✅ |
| Random Image | `/breeds/image/random` | 10 | ✅ |

---

## 🛠️ Troubleshooting

### Erro: "Node.js não encontrado"
**Solução**: Instale Node.js 18+ em https://nodejs.org/

### Erro: "npm: command not found"
**Solução**: Node.js não foi instalado corretamente ou não está no PATH. Reinstale conforme acima.

### Erro: "Cypress não encontrado"
**Solução**: Execute `npm install` novamente
```bash
npm install
```

### Erro: "Port already in use"
**Solução**: Feche outras instâncias do Cypress ou use porta diferente na config

### Testes falhando no pipeline mas passando localmente
**Solução**: Certifique-se que:
- Você está usando a mesma versão do Node.js
- Dependências estão atualizadas: `npm ci`
- Nenhum arquivo foi modificado

---

## 📁 Arquivos importantes

```
projeto/
├── cypress/
│   ├── e2e/dog-api/           # Testes automatizados
│   ├── fixtures/dog-api/      # Dados de teste
│   ├── schemas/dog-api/       # Validação de esquema JSON
│   └── support/               # Comandos customizados
├── .github/workflows/test.yml # Configuração CI/CD
├── cypress.config.js          # Configuração do Cypress
├── package.json               # Dependências do projeto
├── setup-tests.sh             # Script setup (Linux/macOS)
├── setup-tests.bat            # Script setup (Windows)
└── README.md                  # Documentação principal
```

---

## 🔗 API Testada

**Base URL**: https://dog.ceo/api

### Endpoints testados:
1. `GET /breeds/list/all` - Lista todas as raças
2. `GET /breed/{breed}/images` - Imagens de uma raça específica
3. `GET /breeds/image/random` - Uma imagem aleatória

---

## ✅ Validações implementadas

- ✅ Status HTTP 200/404
- ✅ Estrutura JSON (JSON Schema)
- ✅ Tipos de dados
- ✅ Arrays e objetos aninhados
- ✅ Format de URLs
- ✅ Performance (tempo de resposta < 5s)
- ✅ Insensibilidade a maiúsculas/minúsculas