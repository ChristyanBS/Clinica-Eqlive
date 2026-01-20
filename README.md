# 🏥 Clínica Eqlive - Website

Website moderno e responsivo para a Clínica Eqlive, especializada em medicina integrativa e funcional.

## 📁 Estrutura do Projeto

```
clinica-eqlive/
├── src/
│   ├── index.html                 # Arquivo principal HTML
│   ├── css/
│   │   └── styles.css            # Estilos completos do projeto
│   ├── js/
│   │   ├── utils.js              # Funções utilitárias reutilizáveis
│   │   ├── navigation.js         # Lógica de navegação SPA
│   │   └── quiz.js               # Lógica do quiz de sintomas
│   └── assets/
│       ├── images/               # Imagens do projeto
│       ├── icons/                # Ícones customizados
│       └── fonts/                # Fontes personalizadas
├── docs/
│   └── dicas-de-commit.md        # Guia de commits
├── .gitignore                     # Arquivo de exclusão git
├── README.md                      # Este arquivo
└── package.json                   # Configuração do projeto
```

## 🚀 Como Usar

### Iniciar o Projeto

```bash
# Abrir o arquivo HTML no navegador
open src/index.html
```

Ou abra diretamente o arquivo `src/index.html` no seu navegador.

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Framework CSS utilitário
- **Vanilla JavaScript** - Sem dependências externas
- **Lucide Icons** - Biblioteca de ícones
- **Google Fonts** - Tipografia (DM Sans, Playfair Display)

## 📚 Componentes Principais

### CSS (`css/styles.css`)
- Reset CSS
- Tipografia responsiva
- Formulários customizados
- Animações reutilizáveis
- Utilitários de layout
- Suporte a acessibilidade

### JavaScript

#### `utils.js` - Funções Utilitárias
- Inicialização de ícones
- Scroll suave
- Validações (email, telefone)
- Formatações (moeda, data)
- Debounce e Throttle
- Detecção de dispositivo

#### `navigation.js` - Navegação SPA
- Menu mobile responsivo
- Navegação entre páginas sem reload
- Carrossel de cards
- Transições suaves

#### `quiz.js` - Quiz de Sintomas
- Captura de sintomas
- Validação de respostas
- Cálculo de resultados
- Integração com WhatsApp

### Blog com Sistema de Modal
- **6 artigos completos** com conteúdo expandido
- **Pop-up modal** com informações detalhadas ao clicar em qualquer post
- **Featured post** interativo igual aos posts recentes
- **Rolagem travada** quando modal abre (UX melhorada)
- Conteúdo baseado em pesquisa do site original com tópicos como:
  - Compulsão Alimentar
  - Desequilíbrio Hormonal
  - Mitos sobre Carboidratos
  - Check-ups Clínicos
  - Saúde Mental
  - Visão geral do espaço Vivendo em Equilíbrio

## ✨ Últimas Atualizações (v1.4)

- ✅ Removido bug de duplicação HTML na seção blog
- ✅ Melhorada legibilidade dos posts (font-sans, contraste aumentado)
- ✅ Featured post agora tem mesma formatação dos posts recentes
- ✅ Sistema de modal pop-up completamente funcional
- ✅ Logo adicionada ao footer (banner_logo.jpg)
- ✅ Horários de funcionamento atualizados: Seg-Sex 9h-19h | Sábado 9h-12h

## 🎯 Cores da Marca

```css
Eqlive Green:    #3C5C50
Eqlive Dark:     #132D2E
Eqlive Base:     #F9F8F6
Eqlive Accent:   #D4A373 (Gold/Bronze)
Eqlive Peach:    #F2B89A
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints em:
- Mobile: até 640px
- Tablet: até 768px
- Desktop: acima de 768px

## ♿ Acessibilidade

- Suporte a `prefers-reduced-motion`
- Suporte a modo escuro (Dark Mode)
- Semântica HTML apropriada
- Contraste adequado de cores
- Labels em formulários

## 🔧 Como Contribuir

1. Crie uma branch para sua feature
2. Commit suas mudanças seguindo o guia em `docs/dicas-de-commit.md`
3. Push para a branch
4. Abra um Pull Request

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes

## 👨‍💻 Autor

Desenvolvido por **Christyan Bernardo**

## 📞 Contato

- **Email**: clinicaeqlive@gmail.com
- **WhatsApp**: +55 21 96781-5767
- **Endereço**: R. Pres. Costa e Silva, 117 – sala 317, Centro, Itaboraí – RJ

---

⭐ Se este projeto foi útil, considere deixar uma estrela no repositório!
