# 🌐 COMO ABRIR E VISUALIZAR O SITE

## ✅ OPÇÃO 1: Abrir Direto no Navegador (Mais Rápido)

### Windows:
1. Abra o **Windows Explorer** (File Manager)
2. Navegue até: `C:\Users\maria\Downloads\Nova pasta\Clinica-Eqlive\`
3. Clique direito no arquivo `index.html`
4. Selecione **"Open with"** → **Chrome** (ou seu navegador favorito)
5. Pronto! O site abrirá completamente funcional

**Atalho direto:**
```
C:\Users\maria\Downloads\Nova pasta\Clinica-Eqlive\index.html
```

---

## ✅ OPÇÃO 2: Arrastar e Soltar

1. Abra seu navegador (Chrome, Firefox, Edge, etc)
2. Minimize o VS Code ou coloque lado a lado
3. Localize o arquivo `index.html`
4. **Arraste-o para a aba do navegador**
5. Pronto! O site abrirá

---

## ✅ OPÇÃO 3: Via Linha de Comando (PowerShell)

```powershell
# Abra o PowerShell e execute:
Start-Process "C:\Users\maria\Downloads\Nova pasta\Clinica-Eqlive\index.html"
```

---

## 🧭 NAVEGAÇÃO DO SITE

### Menu Superior (Navbar)
```
EQLIVE Logo
├── Quem Somos → Página About (✅ COMPLETA)
├── Tratamentos → Página Specialties (em breve)
├── Essence → Programa Essence
├── Quiz de Saúde → Quiz de Sintomas
├── Blog → Blog (em breve)
├── FAQ → FAQ
├── Localização → Mapa/Contato
└── [Comece Agora] → WhatsApp
```

### Páginas Implementadas:

🟢 **HOME (Homepage Principal)** ✅ COMPLETA
- Hero com gradiente e curva
- 3 pilares de valor
- Carousel de condições
- Testimonial
- 3 maneiras de iniciar

🟢 **QUEM SOMOS** ✅ COMPLETA
- Hero section
- Nossa atuação
- Missão/Visão/Valores
- Equipe (3 profissionais)
- Depoimentos (6 cards)
- CTA final

🟡 **ESSENCE** ⏳ Parcialmente pronto
- Design base existe
- Aguarda conteúdo específico

🟡 **QUIZ** ⏳ Framework pronto
- Funcionalidade básica
- Perguntas definidas
- Gerador de resultados

🔴 **TRATAMENTOS** ⏸️ Não iniciado
🔴 **BLOG** ⏸️ Não iniciado
🔴 **FAQ** ⏸️ Não iniciado

---

## 🎯 O QUE TESTAR

### Na Página HOME:

1. **Hero Section**
   - [ ] Gradiente aparece (verde → ouro)
   - [ ] Imagem tem bordas arredondadas
   - [ ] Border peach está visível
   - [ ] Fundo tem curva suave na base

2. **Seção "Como Eqlive Entrega"**
   - [ ] 3 cards aparecem lado a lado
   - [ ] Ícones aparecem dentro dos cards
   - [ ] Cores dos gradientes diferentes (azul, verde, ouro)
   - [ ] Hover effects funcionam

3. **Carousel**
   - [ ] 5 cards aparecem horizontáveis
   - [ ] Setas de navegação funcionam (desktop)
   - [ ] Botões funciona (mobile)
   - [ ] Hover effects nos cards

4. **Testimonial**
   - [ ] Fundo com gradiente (dark → green)
   - [ ] 5 estrelas ouro aparecem
   - [ ] Citação em grande e negrito
   - [ ] Botões funcionam

5. **3 Maneiras de Iniciar**
   - [ ] Card central está elevado (transform)
   - [ ] Badge "MAIS PROCURADO" no card 2
   - [ ] Card 2 tem cor diferente (dark)
   - [ ] CTAs funcionam

### Na Página QUEM SOMOS:

1. **Hero**
   - [ ] Titulo grande e destacado
   - [ ] Badge "Quem Somos" aparece
   - [ ] Fundo com blur elements

2. **Equipe**
   - [ ] 3 cards com fotos
   - [ ] Nomes e especialidades aparecem
   - [ ] Links funcionam para agendar

3. **Depoimentos**
   - [ ] 6 cards com avaliações
   - [ ] Bordas superiores coloridas
   - [ ] Texto do depoimento legível

4. **Responsividade**
   - [ ] Desktop (1920px): layouts 2+ colunas
   - [ ] Tablet (768px): layouts 2 colunas
   - [ ] Mobile (375px): layout 1 coluna

---

## 🖥️ NAVEGADORES RECOMENDADOS

✅ **Chrome** (RECOMENDADO)
- Suporte completo
- DevTools excelentes
- Performance ótima

✅ **Firefox**
- Suporte completo
- Compatibilidade total

✅ **Edge** (Microsoft)
- Suporte completo
- Bom performance

⚠️ **Safari** (Mac)
- Funciona, mas pode ter pequenas diferenças
- Recomenda-se verificar

---

## 📱 TESTE DE RESPONSIVIDADE

### Via DevTools (Recomendado):

1. Abra o site
2. Pressione **F12** (ou Ctrl+Shift+I)
3. Clique no ícone **"Toggle device toolbar"** (canto superior esquerdo)
4. Selecione dispositivos:
   - [ ] iPhone 12 (390x844)
   - [ ] iPad (768x1024)
   - [ ] Desktop (1920x1080)

### Redimensione Manualmente:
1. Abra DevTools (F12)
2. Redimensione a janela arrastando a lateral
3. Observe como o layout se adapta

---

## 🐛 Se Algo Não Funcionar

### Problema: Site não carrega
**Solução:**
- Verifique o caminho do arquivo
- Abra em navegador moderno (Chrome, Firefox)
- Limpe o cache (Ctrl+Shift+Delete)

### Problema: Imagens não aparecem
**Solução:**
- Imagens são de URL externo (Unsplash)
- Verifique conexão com internet
- Se offline, não haverá imagens

### Problema: Estilos estranhos
**Solução:**
- Reload da página (Ctrl+R)
- Hard reload (Ctrl+Shift+R)
- Limpe cookies/cache

### Problema: Botões não funcionam
**Solução:**
- Alguns botões linkam para WhatsApp (abrem app/web)
- Verifique se o WhatsApp está instalado/configurado
- Botões internos (navegação) sempre funcionam

### Problema: Live Server abre projeto errado
**Solução:**
- O VS Code mantém a última pasta aberta como raiz.
- Vá em **File** → **Close Folder** para fechar o projeto anterior.
- Vá em **File** → **Open Folder** e selecione especificamente a pasta `Clinica-Eqlive`.
- Clique com botão direito em `index.html` → **Open with Live Server**.

---

## 💾 EDITAR O ARQUIVO

Se quiser fazer alterações:

1. **Abra VS Code**
2. **File** → **Open Folder** → Selecione a pasta Clinica-Eqlive
3. **Abra o arquivo:** `index.html`
4. **Faça mudanças** no código
5. **Salve:** Ctrl+S
6. **Recarregue o site:** F5 no navegador

### Recomendações de Edição:
- Use a extensão "Live Server" (VS Code)
- Clique direito em index.html → "Open with Live Server"
- O site recarregará automaticamente ao salvar

---

## 📚 ARQUIVOS IMPORTANTES

```
📁 Clinica-Eqlive/
├── 📄 index.html ........................... ARQUIVO PRINCIPAL
├── 📁 src/
│   ├── css/
│   │   └── 📄 styles.css .................. Estilos CSS customizados
│   ├── js/
│   │   ├── 📄 navigation.js ............... Lógica de navegação
│   │   ├── 📄 quiz.js .................... Lógica do quiz
│   │   └── 📄 utils.js ................... Funções utilitárias
│   └── assets/
│       └── images/ ....................... Imagens locais
├── 📄 README.md ........................... Documentação geral
├── 📄 ATUALIZACOES.md ..................... Mudanças implementadas
├── 📄 MAPEAMENTO_SITES.md ................. Análise de competidores
└── 📄 RESUMO_VISUAL.md ................... Guia visual (este arquivo)
```

---

## 🎯 CHECKLIST DE VERIFICAÇÃO

- [ ] Site abre sem erros
- [ ] Home página carrega completa
- [ ] Quem Somos página funciona
- [ ] Imagens aparecem corretamente
- [ ] Cores estão corretas (verde, ouro, peach)
- [ ] Gradiente no hero aparece
- [ ] Curva na base do hero é visível
- [ ] Hover effects funcionam
- [ ] Navbar funciona em ambas páginas
- [ ] CTAs redirecionam corretamente
- [ ] Responsivo em mobile (redimensione)
- [ ] Responsivo em tablet
- [ ] Responsivo em desktop

---

## 📞 INFORMAÇÕES DE CONTATO

**Se precisar adicionar/mudar:**
- WhatsApp: (21) 96781-5767
- Email: clinicaeqlive@gmail.com
- Telefone para atendimento
- Endereço: R. Pres. Costa e Silva, 117 – sala 317

---

## ⏭️ PRÓXIMAS ETAPAS

1. Visualizar site completo em navegador
2. Testar responsividade
3. Verificar todos os CTAs
4. Fazer ajustes de branding se necessário
5. Iniciar FASE 2: Página de Tratamentos

---

**Desenvolvido:** 21 de janeiro de 2026
**Status:** ✅ Pronto para visualização
**Suporte:** Consulte ATUALIZACOES.md para histórico completo

