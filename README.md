# 🐕 Teste Técnico QA - Dog API

Projeto completo de **automação de testes** para a **Dog CEO API** usando **Cypress** com testes robustos, validação JSON Schema e relatórios Mochawesome. **27 testes** cobrindo 3 endpoints principais com **100% de sucesso** ✅

> **Ambiente multiplataforma**: Linux, Windows e macOS com suporte a CI/CD via GitHub Actions

## ⚡ Quick Start

### Linux/macOS:
```bash
chmod +x setup-tests.sh
./setup-tests.sh
```

### Windows:
```cmd
setup-tests.bat
```

### Manual:
```bash
npm install
npm run test:dog
```

---

## 📋 Informações do Projeto

| Item | Detalhes |
|------|----------|
| **API** | https://dog.ceo/api |
| **Framework** | Cypress 13.17.0 |
| **Validação** | AJV + JSON Schema |
| **Relatórios** | Mochawesome |
| **Testes** | 27 casos (100% passando) |
| **CI/CD** | GitHub Actions (3 workflows) |
| **Suporte** | Linux, Windows, macOS |
| **Node.js** | 18.x, 20.x |

---

## 🧪 Testes Implementados

### 1️⃣ GET `/breeds/list/all` (7 testes)
Lista completa de raças com subraças aninhadas.

```bash
npx cypress run --spec cypress/e2e/dog-api/01-breeds-list.cy.js
```

✅ Status 200 | ✅ JSON válido | ✅ Raças conhecidas | ✅ Subraças aninhadas | ✅ Performance

### 2️⃣ GET `/breed/{breed}/images` (10 testes)
Imagens de raças específicas com validação múltipla.

```bash
npx cypress run --spec cypress/e2e/dog-api/02-breed-images.cy.js
```

✅ URLs válidas | ✅ Erro 404 para raças inválidas | ✅ Case insensitive | ✅ Hífen/espaço em nomes

### 3️⃣ GET `/breeds/image/random` (10 testes)
Imagens aleatórias com validação robusta.

```bash
npx cypress run --spec cypress/e2e/dog-api/03-random-image.cy.js
```

✅ Domínio dog.ceo | ✅ Sem rate limit | ✅ Extensões válidas | ✅ Sem duplicatas

---

## 📁 Estrutura do Projeto

```
projeto/
├── .github/workflows/          # GitHub Actions CI/CD (3 workflows)
│   ├── test.yml               # Testes automáticos (push/PR)
│   ├── manual-tests.yml       # Testes manuais on-demand
│   └── quality.yml            # Validação de qualidade
│
├── cypress/
│   ├── e2e/dog-api/           # 27 Testes Cypress
│   │   ├── 01-breeds-list.cy.js       (7 testes)
│   │   ├── 02-breed-images.cy.js      (10 testes)
│   │   └── 03-random-image.cy.js      (10 testes)
│   │
│   ├── fixtures/dog-api/      # Dados de teste
│   ├── schemas/dog-api/       # Validação JSON Schema
│   └── support/               # Comandos customizados
│       ├── commands/http.js   # HTTP: GET, POST, PUT, PATCH, DELETE
│       └── e2e.js             # Configuração global
│
├── cypress.config.js          # Configuração Cypress
├── package.json               # Dependências e scripts
├── setup-tests.sh             # Setup Linux/macOS
├── setup-tests.bat            # Setup Windows
├── EXECUTION_GUIDE.md         # Guia detalhado
└── README.md                  # Este arquivo
```

## 🚀 Instalação

### 1. Clonar o repositório
```bash
git clone <URL-DO-REPO>
cd teste-tecnico-qa-api
```

### 2. Instalar dependências
```bash
npm install
```

Este comando instalará:
- **Cypress 13.17.0**: Framework de testes e2e
- **AJV 8.12.0**: Validador de JSON Schema
- **Mochawesome 7.1.3**: Relatórios em HTML

## 📋 Scripts Disponíveis

```bash
# Abrir Cypress em modo interativo
npm run cypress:open

# Executar todos os testes em headless
npm run test:dog

# Executar com visualização do navegador
npm run test:headed

# Gerar relatório HTML
npm run report
```

---

## 🔄 GitHub Actions - CI/CD Pipeline

O projeto possui **3 workflows automáticos** para garantir qualidade:

### 1. **Testes Automáticos** (`test.yml`) - 🔄 Automático
- **Acionado**: Push/PR para `main` ou `develop`
- **Ambientes**: Ubuntu, Windows, macOS
- **Node.js**: 18.x e 20.x (matriz de teste)
- **Saídas**: Relatórios, screenshots, vídeos
- **Retenção**: 30 dias (relatórios), 14 dias (mídia)

### 2. **Testes Manuais** (`manual-tests.yml`) - 👆 Manual
- **Acionado**: Via GitHub UI (workflow_dispatch)
- **Configurável**:
  - SO: Linux, Windows, macOS
  - Node.js: 18.x ou 20.x
  - Suite: Todas ou suites específicas
- **Ideal**: Debug, validação rápida, testes sob demanda

### 3. **Validação de Qualidade** (`quality.yml`) - 🔍 Automático
- **Acionado**: Push/PR
- **Validações**:
  - Sintaxe JavaScript (node -c)
  - Arquivos JSON (JSON.parse)
  - Vulnerabilidades npm (npm audit)
  - Estrutura de testes

### Como usar:

**Execução automática:**
```bash
git commit -m "Nova feature"
git push origin main  # Dispara test.yml automaticamente
```

**Execução manual:**
1. Vá para aba **Actions** no GitHub
2. Selecione **"Cypress Tests - Manual Trigger"**
3. Clique em **"Run workflow"**
4. Configure: OS, Node version, test suite
5. Clique em **"Run workflow"**
6. Acompanhe em tempo real

**Visualizar resultados:**
1. Vá para aba **Actions**
2. Abra o workflow desejado
3. Clique em **Artifacts** para baixar:
   - 📊 cypress-reports-*
   - 📸 cypress-screenshots-*
   - 🎬 cypress-videos-*

---

## ✅ Status dos Testes

| Suíte | Testes | Status | Score |
|-------|--------|--------|-------|
| 🐕 Breeds List | 7 | ✅ Passando | 100% |
| 🖼️ Breed Images | 10 | ✅ Passando | 100% |
| 🎲 Random Image | 10 | ✅ Passando | 100% |
| **TOTAL** | **27** | **✅ Passando** | **100%** |

---

## 🎯 Comandos Customizados HTTP

```javascript
// GET Request
cy.getRequest('/api/endpoint', { 
  expectedStatus: 200,
  timeout: 10000 
}).then(response => {
  expect(response.status).to.eq(200);
  expect(response.body).to.exist;
});

// POST Request
cy.postRequest('/api/endpoint', { name: 'value' }, {
  expectedStatus: 201
}).then(response => {
  expect(response.status).to.eq(201);
});

// PUT/PATCH/DELETE - Similar ao GET com dados adicionais
cy.putRequest('/api/endpoint', { name: 'updated' });
cy.patchRequest('/api/endpoint', { name: 'patched' });
cy.deleteRequest('/api/endpoint');
```

## 📊 Validação com JSON Schema

```javascript
// Dog API Schemas
const schemas = {
  breedsListSchema: { /* structure */ },
  breedImagesSchema: { /* structure */ },
  randomImageSchema: { /* structure */ }
};

// Uso nos testes
cy.getRequest('/breeds/list/all').then(response => {
  cy.validateResponseSchema(response.body, 'breedsListSchema');
});
```

---

## 🛠️ Troubleshooting

### "Node.js não encontrado"
```bash
# Instale Node.js 18+ de https://nodejs.org/
node --version
```

### "npm: command not found"
```bash
# Reinstale Node.js ou configure PATH
npm --version
```

### "Cypress não localizado"
```bash
npm install
npm run test:dog
```

### Testes falhando em CI mas passando localmente
```bash
# Use npm ci em vez de npm install para reproducibilidade
npm ci
npm run test:dog
```

### "Port already in use"
```bash
# Feche outras instâncias do Cypress
# ou configure porta diferente em cypress.config.js
```

---

## 🔐 Compatibilidade

| SO | Status | CI/CD |
|---|--------|-------|
| Linux (Ubuntu) | ✅ Testado | ✅ GitHub Actions |
| Windows | ✅ Testado | ✅ GitHub Actions |
| macOS | ✅ Testado | ✅ GitHub Actions |

**Node.js Suportado:**
- ✅ 18.x (LTS)
- ✅ 20.x (LTS)

---

## 📊 Relatórios de Teste

Os relatórios HTML são gerados automaticamente:

```
./mochawesomeReports/report.html
```

**Conteúdo dos Relatórios:**
- 📈 Gráficos de resultado (pie, bar)
- ⏱️ Tempo de execução total e por teste
- 📸 Screenshots de testes falhando
- 📝 Logs detalhados com timestamps
- 🎬 Vídeos de execução (quando habilitado)
- 🌍 Ambiente (navegador, SO, Node.js)

---

## 📚 Documentação Completa

Para guia detalhado de execução em diferentes ambientes, veja:
➡️ **[EXECUTION_GUIDE.md](./EXECUTION_GUIDE.md)**

---

## 🔗 API Testada

**Base URL**: https://dog.ceo/api

### Endpoints:
1. **GET** `/breeds/list/all` - Lista de todas as raças
2. **GET** `/breed/{breed}/images` - Imagens de uma raça
3. **GET** `/breeds/image/random` - Imagem aleatória

### Response Format:
```json
{
  "message": {},
  "status": "success"
}
```

---

## ✨ Recursos Principais

- ✅ **27 Testes Automatizados** cobrindo 3 endpoints principais
- ✅ **Validação JSON Schema** com AJV
- ✅ **CI/CD Pipeline** com GitHub Actions (3 workflows)
- ✅ **Relatórios HTML** com Mochawesome
- ✅ **Multiplataforma** (Linux, Windows, macOS)
- ✅ **Cross-version** (Node.js 18.x e 20.x)
- ✅ **Scripts de Setup** para todas as plataformas
- ✅ **100% Passing Tests** com cobertura completa

---

## 📞 Recursos & Documentação

- [Cypress Documentation](https://docs.cypress.io)
- [Dog CEO API](https://dog.ceo/dog-api/)
- [JSON Schema](https://json-schema.org/)
- [AJV Validator](https://ajv.js.org/)
- [Mochawesome](https://adamgruber.github.io/mochawesome/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 📄 Licença

MIT License © 2026

---

## 👨‍💻 Autor

**QA Automation Team**

**Projeto:** Teste Técnico - Dog API  
**Data:** Março de 2026  
**Versão:** 1.0.0

**Status:** ✅ Pronto para produção

---

> 💡 **Dica**: Para instruções completas de execução em diferentes ambientes, veja [EXECUTION_GUIDE.md](./EXECUTION_GUIDE.md)
