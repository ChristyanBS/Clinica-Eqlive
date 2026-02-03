/* ========================================
   QUIZ COMPLETO - ÍNDICE DE SINTOMAS EQLIVE
   9 Domínios de Saúde Integrada
   ======================================== */

let currentStep = 0;
let selectedSymptoms = {};
const totalSteps = 10; // 0-9 + resultado

// Inicializar quiz
window.startQuiz = function() {
    console.log('Quiz iniciado');
    currentStep = 1;
    selectedSymptoms = {
        neurological: [],
        musculoskeletal: [],
        gastrointestinal: [],
        metabolic: [],
        respiratory: [],
        skin: [],
        cardiac: [],
        mental: [],
        reproductive: []
    };
    updateQuizUI();
};

// Próximo passo - FUNÇÃO PRINCIPAL
window.nextStep = function() {
    console.log('nextStep chamado - currentStep:', currentStep);
    collectCurrentStepSymptoms();
    if (currentStep < 9) {
        currentStep++;
        updateQuizUI();
    } else if (currentStep === 9) {
        showResults();
    }
};

// Passo anterior - FUNÇÃO PRINCIPAL
window.prevStep = function() {
    console.log('prevStep chamado - currentStep:', currentStep);
    if (currentStep > 0) {
        collectCurrentStepSymptoms();
        currentStep--;
        updateQuizUI();
    }
};

// Coletar sintomas do step atual
function collectCurrentStepSymptoms() {
    const step = document.getElementById(`quiz-step-${currentStep}`);
    if (step) {
        step.querySelectorAll('.quiz-checkbox input[type="checkbox"]').forEach(checkbox => {
            const category = checkbox.dataset.category;
            if (category) {
                if (checkbox.checked) {
                    if (!selectedSymptoms[category]) selectedSymptoms[category] = [];
                    if (!selectedSymptoms[category].includes(checkbox.value)) {
                        selectedSymptoms[category].push(checkbox.value);
                    }
                } else {
                    if (selectedSymptoms[category]) {
                        selectedSymptoms[category] = selectedSymptoms[category].filter(v => v !== checkbox.value);
                    }
                }
            }
        });
    }
}

// Atualizar UI do quiz
function updateQuizUI() {
    // Esconder todos os steps
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.add('hidden');
    });

    // Mostrar step atual
    const currentElement = document.getElementById(`quiz-step-${currentStep}`);
    if (currentElement) {
        currentElement.classList.remove('hidden');
        
        // Scroll suave para centralizar a avaliação no meio da tela
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            setTimeout(() => {
                const containerTop = quizContainer.getBoundingClientRect().top + window.scrollY;
                const containerHeight = quizContainer.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollPosition = containerTop - (windowHeight / 2) + (containerHeight / 2);
                window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            }, 50);
        }
    }

    // Atualizar barra de progresso (9 passos de perguntas)
    const progress = (currentStep / 9) * 100;
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Mostrar resultados
window.showResults = function() {
    collectCurrentStepSymptoms();
    
    // Esconder todos os steps
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.add('hidden');
    });

    // Mostrar resultado
    const resultElement = document.getElementById('quiz-result');
    if (resultElement) {
        resultElement.classList.remove('hidden');
    }

    // Gerar breakdown dos domínios
    generateDomainsBreakdown();
    generateRecommendations();

    // Atualizar progresso
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Gerar breakdown dos domínios
function generateDomainsBreakdown() {
    const domains = [
        { 
            id: 'neurological', 
            name: '🧠 Sistema Neurológico',
            description: 'Humor, foco, memória e clareza cognitiva'
        },
        { 
            id: 'musculoskeletal', 
            name: '💪 Sistema Musculoesquelético',
            description: 'Dor, inflamação, mobilidade e recuperação'
        },
        { 
            id: 'gastrointestinal', 
            name: '🍽️ Sistema Gastrointestinal',
            description: 'Digestão, absorção e equilíbrio intestinal'
        },
        { 
            id: 'metabolic', 
            name: '⚡ Sistema Metabólico',
            description: 'Regulação de açúcar, energia e peso'
        },
        { 
            id: 'respiratory', 
            name: '💨 Sistema Respiratório',
            description: 'Respiração, imunidade e sensibilidade'
        },
        { 
            id: 'skin', 
            name: '✨ Pele e Cabelo',
            description: 'Sinais de saúde hormonal e nutricional'
        },
        { 
            id: 'cardiac', 
            name: '❤️ Sistema Cardiovascular',
            description: 'Resistência, circulação e resiliência'
        },
        { 
            id: 'mental', 
            name: '🧘 Mental e Emocional',
            description: 'Estresse, sono e regulação emocional'
        },
        { 
            id: 'reproductive', 
            name: '🌸 Saúde Reprodutiva',
            description: 'Ciclo, hormônios e fertilidade'
        }
    ];

    const domainsContainer = document.getElementById('domains-breakdown');
    if (!domainsContainer) return;

    domainsContainer.innerHTML = '';

    domains.forEach(domain => {
        const count = selectedSymptoms[domain.id]?.length || 0;
        const severity = count === 0 ? 'Ótimo' : count <= 2 ? 'Moderado' : 'Importante';
        const color = count === 0 ? 'green' : count <= 2 ? 'yellow' : 'red';
        const bgClass = color === 'green' ? 'bg-green-50 border-green-200' : 
                       color === 'yellow' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
        const textClass = color === 'green' ? 'text-green-700' : 
                         color === 'yellow' ? 'text-yellow-700' : 'text-red-700';

        const html = `
            <div class="p-4 rounded-xl border ${bgClass}">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-semibold text-gray-800">${domain.name}</h4>
                    <span class="text-xs font-bold px-3 py-1 rounded-full ${textClass} bg-white border">${severity}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">${domain.description}</p>
                <p class="text-xs text-gray-500"><strong>${count}</strong> ${count === 1 ? 'sintoma' : 'sintomas'} selecionados</p>
                ${count > 0 ? `
                    <div class="mt-2 flex flex-wrap gap-1">
                        ${selectedSymptoms[domain.id].map(s => `
                            <span class="text-xs bg-white px-2 py-1 rounded border">${formatSymptomName(s)}</span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        domainsContainer.innerHTML += html;
    });
}

// Formatar nome do sintoma
function formatSymptomName(symptom) {
    const names = {
        // Neurological
        dor_cabeca: 'Dores de cabeça',
        brain_fog: 'Brain fog',
        memoria: 'Problemas de memória',
        tontura: 'Tonturas',
        tremor: 'Tremores',
        // Musculoskeletal
        dor_costas: 'Dor nas costas',
        articulacoes: 'Dor nas articulações',
        inflamacao: 'Inflamação',
        rigidez: 'Rigidez',
        recuperacao: 'Recuperação lenta',
        // Gastrointestinal
        inchaço: 'Inchaço abdominal',
        gases: 'Gases',
        constipacao: 'Constipação',
        diarreia: 'Diarreia',
        azia: 'Azia/Refluxo',
        intolerancia: 'Intolerâncias',
        // Metabolic
        ganho_peso: 'Ganho de peso',
        dificuldade_perder: 'Dificuldade em perder peso',
        fome_insaciavel: 'Fome insaciável',
        queda_energia: 'Queda de energia',
        desejo_açucar: 'Desejo por açúcar',
        // Respiratory
        falta_ar: 'Falta de ar',
        tosse: 'Tosse crônica',
        congestao: 'Congestão',
        alergias: 'Alergias',
        sensibilidade: 'Sensibilidade',
        // Skin
        acne: 'Acne',
        eczema: 'Eczema',
        pele_oleosa: 'Pele desequilibrada',
        manchas: 'Manchas na pele',
        cabelo_queda: 'Queda de cabelo',
        cabelo_fino: 'Cabelo fino',
        // Cardiac
        dor_peito: 'Dor no peito',
        palpitacoes: 'Palpitações',
        pressao_alta: 'Pressão alta',
        intolerancia_exercicio: 'Intolerância ao exercício',
        inchaço_pernas: 'Inchaço nas pernas',
        // Mental
        ansiedade: 'Ansiedade',
        depressao: 'Depressão',
        irritabilidade: 'Irritabilidade',
        insonia: 'Insônia',
        fadiga_mental: 'Fadiga/Burnout',
        dificuldade_concentracao: 'Dificuldade de concentração',
        // Reproductive
        tpm: 'TPM',
        ciclo_irregular: 'Ciclo irregular',
        sangramento_abundante: 'Sangramento abundante',
        libido_baixa: 'Libido baixa',
        dificuldade_concepcao: 'Dificuldade em conceber',
        sintomas_menopausa: 'Sintomas de menopausa'
    };
    return names[symptom] || symptom;
}

// Gerar recomendações
function generateRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations');
    if (!recommendationsContainer) return;

    // Contar domínios com sintomas
    const affectedDomains = Object.entries(selectedSymptoms)
        .filter(([_, symptoms]) => symptoms.length > 0)
        .sort((a, b) => b[1].length - a[1].length);

    const specialtyMap = {
        neurological: { specialty: 'Psiquiatria / Neurologia', icon: '🧠' },
        gastrointestinal: { specialty: 'Nutrição Funcional', icon: '🍽️' },
        metabolic: { specialty: 'Endocrinologia', icon: '⚡' },
        reproductive: { specialty: 'Endocrinologia / Ginecologia', icon: '🌸' },
        respiratory: { specialty: 'Clínica Geral / Pulmonologia', icon: '💨' },
        cardiac: { specialty: 'Cardiologia / Clínica Geral', icon: '❤️' },
        skin: { specialty: 'Nutrição / Endocrinologia', icon: '✨' },
        musculoskeletal: { specialty: 'Clínica Geral / Fisioterapia', icon: '💪' },
        mental: { specialty: 'Psiquiatria / Psicologia', icon: '🧘' }
    };

    let html = '';

    if (affectedDomains.length === 0) {
        html = '<li class="text-green-700 font-semibold">✓ Excelente! Nenhum sintoma significativo relatado. Continue com hábitos saudáveis!</li>';
    } else if (affectedDomains.length <= 2) {
        const specialties = affectedDomains.map(([domain, _]) => specialtyMap[domain].specialty).join(' e ');
        html = `<li class="text-amber-700">🎯 Recomendamos consulta com: <strong>${specialties}</strong></li>`;
        html += '<li>✓ Realizar avaliação inicial profunda</li>';
        html += '<li>✓ Identificar conexões entre os sintomas</li>';
        html += '<li>✓ Criar protocolo de tratamento integrado</li>';
    } else {
        html = '<li class="text-red-700 font-semibold">⚠️ Múltiplos sistemas afetados - Recomendamos Eqlive Essence</li>';
        html += '<li>✓ Avaliação multidisciplinar completa (6 meses)</li>';
        html += '<li>✓ Equipe: Nutrição + Endocrinologia + Psiquiatria + Clínica Geral</li>';
        html += '<li>✓ Identificar e tratar causas raiz integrativamente</li>';
    }

    recommendationsContainer.innerHTML = html;
}

// Reset do quiz
window.resetQuiz = function() {
    currentStep = 0;
    selectedSymptoms = {
        neurological: [],
        musculoskeletal: [],
        gastrointestinal: [],
        metabolic: [],
        respiratory: [],
        skin: [],
        cardiac: [],
        mental: [],
        reproductive: []
    };
    document.querySelectorAll('.quiz-checkbox input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.quiz-step').forEach(step => step.classList.add('hidden'));
    document.getElementById('quiz-step-0').classList.remove('hidden');
    document.getElementById('quiz-progress').style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    // Garantir que o quiz começa no step 0 quando a página de quiz é aberta
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        resetQuiz();
    }
});

/* ========================================
   BLOG - FILTRO DE CATEGORIAS
   ======================================== */

let activeBlogCategory = 'all';
let blogSearchTerm = '';

function applyBlogFilters({ shouldScroll = false } = {}) {
    const posts = document.querySelectorAll('.blog-post');
    const normalizedTerm = blogSearchTerm.trim().toLowerCase();

    posts.forEach(post => {
        const categoryMatches = activeBlogCategory === 'all' || post.dataset.category === activeBlogCategory;
        const textMatches = !normalizedTerm || (post.textContent || '').toLowerCase().includes(normalizedTerm);

        if (categoryMatches && textMatches) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            post.style.display = 'none';
        }
    });

    if (shouldScroll) {
        setTimeout(() => {
            document.getElementById('blog-posts-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

window.filterPosts = function(category, buttonEl) {
    const buttons = document.querySelectorAll('.blog-filter-btn');
    
    // Atualizar estado dos botões
    buttons.forEach(btn => {
        btn.classList.remove('bg-eqlive-dark', 'text-white');
        btn.classList.add('bg-eqlive-base', 'text-eqlive-dark');
    });
    if (buttonEl) {
        buttonEl.classList.add('bg-eqlive-dark', 'text-white');
        buttonEl.classList.remove('bg-eqlive-base', 'text-eqlive-dark');
    }
    
    activeBlogCategory = category;
    applyBlogFilters({ shouldScroll: true });
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blog-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
        blogSearchTerm = event.target.value || '';
        applyBlogFilters();
    });
});

window.loadMorePosts = function() {
    alert('Em breve mais posts! Continue acompanhando o blog Vivendo em Equilíbrio para novos artigos sobre saúde, nutrição e bem-estar.');
};

window.openPostModal = function(postId) {
    const posts = {
        1: {
            title: "História de Transformação: \"Eu achava que era só fraqueza, mas descobri que era compulsão alimentar\"",
            category: "Histórias de Transformação",
            author: "Equipe Eqlive",
            date: "6 de junho de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
            content: [
                "Relato ilustrativo: uma paciente percebeu que a compulsão alimentar era um sintoma de fatores emocionais e metabólicos, não falta de força de vontade.",
                "Com acompanhamento multidisciplinar, ajustes de rotina e suporte psicológico, ela conseguiu ressignificar a relação com a comida e recuperar o bem-estar."
            ],
            highlights: [
                "Escuta clínica e investigação das causas raiz",
                "Plano nutricional realista e sustentável",
                "Suporte emocional contínuo"
            ],
            sources: []
        },
        2: {
            title: "Como Identificar Sinais de Desequilíbrio Hormonal",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "29 de maio de 2025",
            readTime: "3 min",
            image: "https://images.unsplash.com/photo-1576087192825-e56de34f5629?auto=format&fit=crop&w=800&q=80",
            content: [
                "Hormônios são mensageiros químicos que regulam metabolismo, humor, energia, sono e reprodução. Pequenos desequilíbrios podem gerar sintomas amplos e inespecíficos.",
                "A avaliação adequada combina história clínica, sinais e exames laboratoriais direcionados. O tratamento depende da causa e deve ser individualizado."
            ],
            highlights: [
                "Sintomas variam e podem se sobrepor a outros quadros",
                "Exames ajudam a confirmar o diagnóstico",
                "Tratamento é personalizado"
            ],
            sources: [
                { label: "MedlinePlus – Hormones", url: "https://medlineplus.gov/hormones.html" }
            ]
        },
        3: {
            title: "Carboidrato à Noite Engorda? Mitos e Verdades",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "21 de maio de 2025",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
            content: [
                "A qualidade do carboidrato costuma ser mais importante que o horário de consumo. Integrais, legumes, frutas e verduras têm efeitos metabólicos diferentes dos refinados.",
                "O impacto no peso depende do contexto geral: porções, equilíbrio do prato e total calórico diário."
            ],
            highlights: [
                "Prefira carboidratos integrais",
                "Evite açúcar e refinados à noite",
                "Planejamento do dia faz diferença"
            ],
            sources: [
                { label: "Harvard Nutrition Source – Carbohydrates", url: "https://nutritionsource.hsph.harvard.edu/carbohydrates/" },
                { label: "Harvard Healthy Eating Plate", url: "https://nutritionsource.hsph.harvard.edu/healthy-eating-plate/" }
            ]
        },
        4: {
            title: "Check-up Clínico Anual: Por Que Fazer Todo Ano?",
            category: "Prevenção",
            author: "Equipe Clínica",
            date: "12 de maio de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
            content: [
                "Check-ups são mais eficazes quando personalizados por idade, sexo, histórico familiar e fatores de risco.",
                "Organizações internacionais publicam recomendações de rastreios com base em evidências para orientar decisões clínicas."
            ],
            highlights: [
                "Prevenção personalizada é mais precisa",
                "Rastreios variam conforme risco",
                "Converse com sua equipe de saúde"
            ],
            sources: [
                { label: "USPSTF – A & B Recommendations", url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations" }
            ]
        },
        5: {
            title: "Prevenção e Cuidado com a Saúde Mental",
            category: "Bem-Estar",
            author: "Psicólogo Eqlive",
            date: "6 de maio de 2025",
            readTime: "3 min",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
            content: [
                "A saúde mental é parte essencial do bem-estar e pode ser fortalecida com ações de prevenção, apoio social e cuidado contínuo.",
                "Há estratégias acessíveis que ajudam a proteger a saúde mental e reduzir impactos do estresse crônico."
            ],
            highlights: [
                "Conexão social é fator protetor",
                "Sono e rotina influenciam o humor",
                "Buscar ajuda cedo reduz riscos"
            ],
            sources: [
                { label: "OMS – Mental Health", url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" }
            ]
        },
        6: {
            title: "A Verdade Sobre Hormônios e Ganho de Peso",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "28 de abril de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
            content: [
                "Hormônios regulam o metabolismo e a forma como o corpo armazena energia. Alterações na insulina, tireoide e outros eixos podem impactar peso e disposição.",
                "A resistência à insulina é um fator relevante em ganho de peso e risco de diabetes, especialmente quando associada ao sedentarismo e alimentação inadequada."
            ],
            highlights: [
                "Metabolismo é multifatorial",
                "Insulina é peça-chave no controle de peso",
                "Avaliação clínica direciona o tratamento"
            ],
            sources: [
                { label: "MedlinePlus – Hormones", url: "https://medlineplus.gov/hormones.html" },
                { label: "NIDDK – Insulin Resistance & Prediabetes", url: "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance" }
            ]
        },
        7: {
            title: "Alimentos Inflamatórios: O Que Evitar",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "20 de abril de 2025",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
            content: [
                "Dietas ricas em refinados e ultraprocessados tendem a piorar o controle glicêmico e o perfil metabólico.",
                "Priorizar alimentos naturais, integrais e variedade de vegetais ajuda a reduzir riscos e promover equilíbrio."
            ],
            highlights: [
                "Reduza açúcar e farinhas refinadas",
                "Priorize alimentos integrais",
                "Hidrate-se bem"
            ],
            sources: [
                { label: "Harvard Nutrition Source – Carbohydrates", url: "https://nutritionsource.hsph.harvard.edu/carbohydrates/" },
                { label: "Harvard Healthy Eating Plate", url: "https://nutritionsource.hsph.harvard.edu/healthy-eating-plate/" }
            ]
        },
        8: {
            title: "Saúde Digestiva: O Início de Tudo",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "15 de abril de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
            content: [
                "O microbioma intestinal influencia digestão e resposta imune. Alimentação e estilo de vida moldam essa comunidade de microrganismos.",
                "Probíoticos podem ser úteis em alguns contextos, mas as evidências variam e a escolha deve ser orientada por profissionais."
            ],
            highlights: [
                "Microbioma responde à dieta",
                "Fibras e alimentos naturais ajudam",
                "Suplementos devem ser avaliados"
            ],
            sources: [
                { label: "NCCIH – Probiotics: Usefulness and Safety", url: "https://www.nccih.nih.gov/health/probiotics-what-you-need-to-know" }
            ]
        },
        9: {
            title: "Qualidade de Sono: Como Melhorar Sua Recuperação",
            category: "Bem-Estar",
            author: "Especialista Eqlive",
            date: "10 de abril de 2025",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1528148343865-1218efdf513f?auto=format&fit=crop&w=800&q=80",
            content: [
                "O sono regula funções cardiovasculares, metabólicas e cognitivas. A privação de sono afeta concentração, humor e saúde geral.",
                "Rotina consistente, luz adequada e ambiente silencioso melhoram a qualidade do descanso."
            ],
            highlights: [
                "Sono de qualidade sustenta o metabolismo",
                "Rotina fixa ajuda o relógio biológico",
                "Procure ajuda se houver insônia persistente"
            ],
            sources: [
                { label: "NHLBI – How Sleep Works", url: "https://www.nhlbi.nih.gov/health/sleep" }
            ]
        },
        10: {
            title: "SOP - Síndrome do Ovário Policístico",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "5 de setembro de 2025",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1576091160593-112996f3a5c6?auto=format&fit=crop&w=800&q=80",
            content: [
                "A SOP é comum e pode envolver ciclos irregulares, sinais de excesso de andrógenos e alterações ovarianas.",
                "Mudanças de estilo de vida e acompanhamento médico reduzem sintomas e riscos metabólicos associados."
            ],
            highlights: [
                "Diagnóstico depende de critérios clínicos",
                "Controle de peso e atividade física ajudam",
                "Acompanhamento regular é essencial"
            ],
            sources: [
                { label: "NHS – Polycystic Ovary Syndrome (PCOS)", url: "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/" }
            ]
        },
        11: {
            title: "Menopausa: Transitando com Saúde e Bem-Estar",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "2 de setembro de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1532694386590-a9a1ef7a36bc?auto=format&fit=crop&w=800&q=80",
            content: [
                "A menopausa é a interrupção definitiva da menstruação por queda hormonal. Os sintomas podem começar na perimenopausa.",
                "Há intervenções de estilo de vida e tratamentos médicos que ajudam a reduzir desconfortos e preservar qualidade de vida."
            ],
            highlights: [
                "Sintomas variam entre mulheres",
                "Há opções de tratamento personalizadas",
                "Acompanhamento médico é recomendado"
            ],
            sources: [
                { label: "NHS – Menopause", url: "https://www.nhs.uk/conditions/menopause/" }
            ]
        },
        12: {
            title: "Resistência à Insulina e Peso: Entenda a Conexão",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "30 de agosto de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1504674900549-19db67e39390?auto=format&fit=crop&w=800&q=80",
            content: [
                "A resistência à insulina ocorre quando as células respondem menos ao hormônio, elevando a glicose e aumentando o risco de pré-diabetes.",
                "Mudanças de alimentação, atividade física e perda de peso podem reduzir o risco de evolução para diabetes tipo 2."
            ],
            highlights: [
                "Sintomas podem ser silenciosos",
                "Exames de glicemia e A1C ajudam",
                "Intervenção precoce é eficaz"
            ],
            sources: [
                { label: "NIDDK – Insulin Resistance & Prediabetes", url: "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance" }
            ]
        },
        13: {
            title: "Cortisol Elevado: Quando o Stress Domina Seu Corpo",
            category: "Endocrinologia",
            author: "Dra. Eqlive",
            date: "27 de agosto de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
            content: [
                "O cortisol é um hormônio relacionado à resposta ao estresse. Estresse crônico pode impactar sono, humor e energia.",
                "Avaliação clínica é importante para diferenciar estresse do dia a dia de alterações hormonais relevantes."
            ],
            highlights: [
                "Estresse crônico afeta múltiplos sistemas",
                "Sono adequado é protetor",
                "Procure ajuda se sintomas persistirem"
            ],
            sources: [
                { label: "MedlinePlus – Hormones", url: "https://medlineplus.gov/hormones.html" },
                { label: "OMS – Mental Health", url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" }
            ]
        },
        14: {
            title: "Dieta Mediterrânea: O Segredo da Longevidade",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "24 de agosto de 2025",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
            content: [
                "A dieta mediterrânea prioriza alimentos minimamente processados, azeite de oliva, legumes, grãos integrais e peixes.",
                "Estudos observacionais e ensaios clínicos mostram associação com menor risco cardiovascular e melhor saúde metabólica."
            ],
            highlights: [
                "Base vegetal e gorduras saudáveis",
                "Peixes e legumes como proteínas principais",
                "Padrão alimentar sustentável"
            ],
            sources: [
                { label: "Harvard Nutrition Source – Mediterranean Diet", url: "https://nutritionsource.hsph.harvard.edu/healthy-weight/diet-reviews/mediterranean-diet/" }
            ]
        },
        15: {
            title: "Alimentos Probióticos: Cuide do Seu Microbioma",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "21 de agosto de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1505252585461-04db1267ae5b?auto=format&fit=crop&w=800&q=80",
            content: [
                "Probióticos são microrganismos vivos presentes em alimentos fermentados e suplementos, com potenciais benefícios para a saúde intestinal.",
                "A eficácia varia por cepa e condição, e a segurança deve ser avaliada em pessoas com saúde vulnerável."
            ],
            highlights: [
                "Nem todo probiótico é igual",
                "Evidência ainda é variável",
                "Orientação profissional é recomendada"
            ],
            sources: [
                { label: "NCCIH – Probiotics: Usefulness and Safety", url: "https://www.nccih.nih.gov/health/probiotics-what-you-need-to-know" }
            ]
        },
        16: {
            title: "Jejum Intermitente: Como Fazer Com Segurança",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "18 de agosto de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
            content: [
                "Jejum intermitente inclui protocolos como janela alimentar diária ou dias com restrição calórica. A evidência em humanos ainda é limitada para recomendações gerais.",
                "Antes de iniciar, é importante avaliar segurança e adequação individual, especialmente para pessoas com condições médicas."
            ],
            highlights: [
                "Não é indicado para todos",
                "Qualidade nutricional continua essencial",
                "Avaliação profissional é importante"
            ],
            sources: [
                { label: "NIA – Calorie restriction and fasting diets", url: "https://www.nia.nih.gov/health/calorie-restriction-and-fasting-diets-what-do-we-know" }
            ]
        },
        17: {
            title: "Alergia vs Intolerância: Qual É a Sua?",
            category: "Nutrição",
            author: "Nutricionista Eqlive",
            date: "15 de agosto de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1585238341710-4a4a0f6efb98?auto=format&fit=crop&w=800&q=80",
            content: [
                "Alergia alimentar envolve resposta imunológica e pode ser grave. Intolerância está ligada à digestão e tende a causar sintomas gastrointestinais.",
                "O diagnóstico correto evita restrições desnecessárias e orienta a conduta adequada."
            ],
            highlights: [
                "Alergia pode ser emergencial",
                "Intolerância é desconfortável, mas não imunológica",
                "Procure avaliação especializada"
            ],
            sources: [
                { label: "FDA – Food Allergies: What You Need to Know", url: "https://www.fda.gov/food/buy-store-serve-safe-food/food-allergies-what-you-need-know" },
                { label: "NHS – Food intolerance", url: "https://www.nhs.uk/conditions/food-intolerance/" }
            ]
        },
        18: {
            title: "Meditação e Mindfulness: Começa Hoje",
            category: "Bem-Estar",
            author: "Psicólogo Eqlive",
            date: "12 de agosto de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
            content: [
                "Mindfulness é atenção ao momento presente sem julgamento. Estudos indicam benefícios potenciais para estresse e bem-estar.",
                "A prática é segura para a maioria das pessoas, mas não substitui cuidados médicos quando necessários."
            ],
            highlights: [
                "Comece com poucos minutos por dia",
                "Consistência supera duração",
                "Use práticas guiadas se necessário"
            ],
            sources: [
                { label: "NCCIH – Meditation and Mindfulness", url: "https://www.nccih.nih.gov/health/meditation-and-mindfulness-what-you-need-to-know" }
            ]
        },
        19: {
            title: "Movimento é Medicina: Exercício para Saúde Mental",
            category: "Bem-Estar",
            author: "Personal Trainer Eqlive",
            date: "9 de agosto de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
            content: [
                "Atividade física regular está associada a melhora do humor, energia e qualidade do sono.",
                "O mais importante é encontrar uma rotina viável e prazerosa para manter a consistência."
            ],
            highlights: [
                "Benefícios físicos e emocionais",
                "Comece com metas pequenas",
                "Regularidade é chave"
            ],
            sources: [
                { label: "NIA – Exercise and Physical Activity", url: "https://www.nia.nih.gov/health/exercise-physical-activity" }
            ]
        },
        20: {
            title: "Burnout: Reconhecer e Recuperar",
            category: "Bem-Estar",
            author: "Coach de Vida Eqlive",
            date: "6 de agosto de 2025",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1513584684102-7a0d92e4e6d9?auto=format&fit=crop&w=800&q=80",
            content: [
                "A OMS descreve burnout como fenômeno ocupacional associado a estresse crônico no trabalho não gerenciado.",
                "Reconhecer sinais precoces e buscar apoio é essencial para recuperação sustentável."
            ],
            highlights: [
                "Exaustão e distanciamento emocional",
                "Queda de desempenho percebida",
                "Recuperação exige mudanças de rotina"
            ],
            sources: [
                { label: "OMS – Burn-out in ICD-11", url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases" }
            ]
        },
        21: {
            title: "Ansiedade: Técnicas Para Controlar e Prevenir",
            category: "Bem-Estar",
            author: "Terapeuta Eqlive",
            date: "3 de agosto de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            content: [
                "Ansiedade é comum, mas quando persistente pode interferir no dia a dia. Intervenções precoces ajudam a reduzir impacto.",
                "Técnicas de respiração, rotina de sono e apoio profissional podem ser parte do plano de cuidado."
            ],
            highlights: [
                "Identifique gatilhos",
                "Use técnicas de regulação",
                "Procure ajuda quando necessário"
            ],
            sources: [
                { label: "NIMH – Anxiety Disorders", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" }
            ]
        },
        22: {
            title: "\"Reverti meu Pré-Diabetes\" - Caso de Sucesso",
            category: "Histórias de Transformação",
            author: "Equipe Eqlive",
            date: "31 de julho de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
            content: [
                "Relato ilustrativo: mudanças consistentes em alimentação e rotina de atividade podem melhorar marcadores metabólicos.",
                "Acompanhamento clínico ajuda a monitorar resultados e ajustar estratégias de forma segura."
            ],
            highlights: [
                "Mudanças graduais têm efeito cumulativo",
                "Acompanhamento profissional é essencial",
                "Resultados sustentáveis são possíveis"
            ],
            sources: []
        },
        23: {
            title: "\"Recuperei Minha Energia\" - Transformação Hormonal",
            category: "Histórias de Transformação",
            author: "Equipe Eqlive",
            date: "28 de julho de 2025",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1542818906-a0d6f6d3f141?auto=format&fit=crop&w=800&q=80",
            content: [
                "Relato ilustrativo sobre fadiga persistente e importância de investigação clínica completa.",
                "O cuidado integrado combina ajustes de estilo de vida, suporte emocional e acompanhamento médico."
            ],
            highlights: [
                "Fadiga exige investigação ampla",
                "Sono e estresse impactam hormônios",
                "Plano integrado traz resultados"
            ],
            sources: []
        },
        24: {
            title: "\"Durmo Como Criança Novamente\" - Sono Restaurador",
            category: "Histórias de Transformação",
            author: "Equipe Eqlive",
            date: "25 de julho de 2025",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1528148343865-1218efdf513f?auto=format&fit=crop&w=800&q=80",
            content: [
                "Relato ilustrativo sobre recuperação do sono com mudanças de rotina e ambiente.",
                "A higiene do sono é um dos pilares para restaurar energia e concentração."
            ],
            highlights: [
                "Regularidade melhora o relógio biológico",
                "Ambiente escuro e silencioso ajuda",
                "Suporte profissional acelera ajustes"
            ],
            sources: []
        },
        25: {
            title: "\"Emagreci de Verdade\" - Perda de Peso Sustentável",
            category: "Histórias de Transformação",
            author: "Equipe Eqlive",
            date: "22 de julho de 2025",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
            content: [
                "Relato ilustrativo: resultados duradouros exigem mudança de hábitos, não soluções rápidas.",
                "Estratégias personalizadas respeitam saúde hormonal, rotina e objetivos reais."
            ],
            highlights: [
                "Foco em consistência",
                "Plano ajustado ao metabolismo",
                "Acompanhamento evita efeito sanfona"
            ],
            sources: []
        }
    };

    const post = posts[postId];
    const modal = document.getElementById('blog-post-modal');
    if (!post || !modal) return;

    const titleEl = modal.querySelector('[data-post-title]');
    const categoryEl = modal.querySelector('[data-post-category]');
    const metaEl = modal.querySelector('[data-post-meta]');
    const imageEl = modal.querySelector('[data-post-image]');
    const contentEl = modal.querySelector('[data-post-content]');
    const highlightsEl = modal.querySelector('[data-post-highlights]');
    const sourcesEl = modal.querySelector('[data-post-sources]');

    if (titleEl) titleEl.textContent = post.title;
    if (categoryEl) categoryEl.textContent = post.category;
    if (metaEl) metaEl.textContent = `${post.author} • ${post.date} • ${post.readTime}`;
    if (imageEl) {
        imageEl.src = post.image;
        imageEl.alt = post.title;
    }

    if (contentEl) {
        contentEl.innerHTML = '';
        (post.content || []).forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            contentEl.appendChild(p);
        });
    }

    if (highlightsEl) {
        highlightsEl.innerHTML = '';
        (post.highlights || []).forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex gap-3';
            li.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-eqlive-green"></i><span>${item}</span>`;
            highlightsEl.appendChild(li);
        });
    }

    if (sourcesEl) {
        sourcesEl.innerHTML = '';
        (post.sources || []).forEach(source => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-3';
            li.innerHTML = `<i data-lucide="link" class="w-4 h-4 text-eqlive-green mt-0.5"></i><a href="${source.url}" target="_blank" class="text-eqlive-green hover:underline">${source.label}</a>`;
            sourcesEl.appendChild(li);
        });
    }

    try { if (window.lucide && lucide.createIcons) lucide.createIcons(); } catch (e) {}
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closePostModal = function() {
    const modal = document.getElementById('blog-post-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('blog-post-modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                window.closePostModal();
            }
        });
    }
});
