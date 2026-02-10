# NOVO QUESTIONÁRIO - DESIGN PARSLEY HEALTH STYLE

## 📋 Resumo das Alterações

A página de questionário foi completamente redesenhada seguindo a abordagem minimalista e profissional da Parsley Health. O novo design enfatiza clareza, usabilidade e uma experiência fluida.

### Arquivo Anterior (Backup)
- **care-backup.html** - Versão anterior com tema escuro

### Arquivo Novo
- **care.html** - Nova versão com design moderno, limpo e profissional

---

## 🎨 Paleta de Cores

```
Fundo Principal:     #f9fafb (Cinza bem claro)
Fundo Secundário:    #ffffff (Branco)
Texto Principal:     #1f2937 (Cinza escuro)
Texto Secundário:    #6b7280 (Cinza médio)
Bordas:             #e5e7eb (Cinza claro)
Botões/Destaques:   #132D2E (Verde escuro - Eqlive)
Hover:              #1a3d3a (Verde mais escuro)
```

---

## 🏗️ Estrutura HTML

### Layout Principal
```html
<main>  (altura mínima 100vh, centralizado)
  <div class="questionnaire-wrapper">  (max-width: 672px)
    <header>  (título + subtítulo)
    <div class="bg-white rounded-2xl">  (card principal)
      <div class="questionnaire-step">  (cada step aqui)
```

### 3 Steps do Questionário

**Step 1: O que você procura?**
- 5 opções com radio buttons
- Validação obrigatória antes de avançar

**Step 2: Áreas de saúde**
- Grid 2 colunas no desktop
- 8 checkboxes
- Mínimo 1 seleção obrigatória

**Step 3: Impacto dos sintomas**
- Escala de 1-10
- Botões com visual feedback

---

## 🎯 Componentes Principais

### Radio Buttons (Step 1)
- 16px de altura
- Border 2px
- Cores: gris ou verde escuro quando selecionado
- Transição suave 0.2s
- Ícone check-circle aparece quando selecionado

### Checkboxes (Step 2)
- 14px de altura
- Border 2px
- Grid responsivo (1 col mobile, 2 col desktop)
- Checkmark branco aparece quando selecionado

### Escala Numérica (Step 3)
- 10 botões (1-10)
- 44x44px mínimo
- Alinhamento centralizado
- Feedback visual imediato

### Botões de Navegação
- **Próximo**: Verde escuro (#132D2E)
- **Voltar**: Transparente com borda
- Estado desabilitado: 50% opacidade
- Hover com elevação leve

---

## 🔧 JavaScript (questionnaire.js)

### Classe: `Questionnaire`

**Métodos principais:**
- `init()` - Inicializa listeners e estado
- `showStep(step)` - Navega para um step específico
- `nextStep()` - Validar, salvar e avançar
- `prevStep()` - Voltar um passo
- `validateCurrentStep()` - Valida o step atual
- `saveStepData()` - Salva dados em sessionStorage
- `finishQuestionnaire()` - Conclusão do fluxo

**Dados salvos:**
```javascript
{
  goal: "cronico|sintomas|nao-funciona|proativo|saiba",
  areas: ["saude-intestinal", "saude-hormonal", ...],
  score: "1-10"
}
```

---

## 📱 Responsividade

### Desktop (> 640px)
- Container max-width 672px
- Checkboxes em 2 colunas
- Padding 20px horizontal
- Espaçamento generoso

### Mobile (≤ 640px)
- Full width com padding 16px
- Checkboxes em 1 coluna
- Scroll suave entre steps
- Botões com altura adequada para touch

---

## ✨ Recursos

✅ Navegação fluida entre steps
✅ Validação em tempo real
✅ Persistência via sessionStorage
✅ Animações suaves (fadeIn, slideUp)
✅ Estados visuais claros (hover, selected, disabled)
✅ Acessibilidade com labels e inputs semânticos
✅ Design responsivo
✅ Pré-validação antes de avançar

---

## 📝 Como Usar

### Para o usuário:
1. Visitar `/care.html`
2. Completar 3 steps do questionário
3. Dados salvos automaticamente em sessionStorage
4. Ao finalizar, mensagem de sucesso

### Para integração:
```javascript
// Acessar dados
const data = window.questionnaire.getData();
console.log(data.goal);    // String
console.log(data.areas);   // Array
console.log(data.score);   // String (1-10)

// Resetar formulário
window.questionnaire.reset();
```

---

## 🔄 Próximos Passos (Opcional)

1. Integrar com quiz/avaliação funcional
2. Enviar dados para WhatsApp ao finalizar
3. Adicionar progress bar visual no topo
4. Implementar validação server-side
5. Criar página de resumo antes de envio

---

## 📂 Arquivos Modificados

- ✅ `/care.html` - Novo arquivo principal
- ✅ `/src/css/styles.css` - Novos estilos do questionário
- ✅ `/src/js/questionnaire.js` - Novo controlador de fluxo

---

**Data:** Fevereiro 2026  
**Status:** Pronto para produção
