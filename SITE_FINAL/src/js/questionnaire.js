/**
 * QUESTIONNAIRE FLOW CONTROLLER
 * Controla a navegação entre steps, validação e envio de dados
 */

class Questionnaire {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.data = {
            goal: null,
            areas: [],
            score: null
        };
        this.init();
    }

    init() {
        console.log('Questionnaire init() called');
        
        // Verificar se o wrapper existe
        const wrapper = document.querySelector('.questionnaire-wrapper');
        if (!wrapper) {
            console.error('Error: .questionnaire-wrapper not found in DOM');
            return;
        }
        
        console.log('questionnaire-wrapper found, setting up event listeners');
        this.setupEventListeners();
        
        console.log('Event listeners setup, showing step 1');
        this.showStep(1);
        
        // Restaurar dados se houver (sessão anterior)
        const savedData = sessionStorage.getItem('questionnaire-data');
        if (savedData) {
            try {
                this.data = JSON.parse(savedData);
                console.log('Restored saved data:', this.data);
            } catch (e) {
                console.warn('Could not parse saved data', e);
            }
        }
        
        console.log('Questionnaire initialized successfully');
    }

    setupEventListeners() {
        const wrapper = document.querySelector('.questionnaire-wrapper');
        if (!wrapper) {
            console.error('Questionnaire wrapper not found');
            return;
        }

        // Event delegation para todos os inputs e buttons
        wrapper.addEventListener('change', (e) => {
            // Step 1: Radio buttons de goal
            if (e.target.name === 'care-goal') {
                console.log('Goal selected:', e.target.value);
                this.enableNextButton(1);
            }
            // Step 2: Checkboxes de areas
            else if (e.target.name === 'care-area') {
                console.log('Area toggled:', e.target.value, e.target.checked);
                this.validateStep2();
            }
        });

        // Event delegation para buttons (score)
        wrapper.addEventListener('click', (e) => {
            if (e.target.matches('button[data-score]')) {
                console.log('Score selected:', e.target.getAttribute('data-score'));
                this.selectScore(e.target);
            }
            // Botão Próximo
            else if (e.target.matches('.questionnaire-button-next')) {
                console.log('Next button clicked');
                this.nextStep();
            }
            // Botão Voltar
            else if (e.target.matches('.questionnaire-button-back')) {
                console.log('Back button clicked');
                this.prevStep();
            }
        });

        console.log('Event listeners setup completed');
    }

    showStep(step) {
        console.log('Showing step:', step);
        
        // Esconde todos os steps
        document.querySelectorAll('.questionnaire-step').forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden');
        });

        // Mostra o step atual
        const activeStep = document.querySelector(`.questionnaire-step[data-step="${step}"]`);
        if (activeStep) {
            activeStep.classList.remove('hidden');
            activeStep.classList.add('active');
            console.log('Step shown successfully');
        } else {
            console.error(`Step ${step} not found in DOM`);
        }

        this.currentStep = step;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextStep() {
        // Validar step atual
        if (!this.validateCurrentStep()) {
            return;
        }

        // Salvar dados
        this.saveStepData();

        // Avançar
        if (this.currentStep < this.totalSteps) {
            this.showStep(this.currentStep + 1);
        } else {
            this.finishQuestionnaire();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.showStep(this.currentStep - 1);
        }
    }

    validateCurrentStep() {
        let isValid = false;
        
        switch (this.currentStep) {
            case 1:
                const checkedGoal = document.querySelector('input[name="care-goal"]:checked');
                isValid = !!checkedGoal;
                if (!isValid) {
                    console.warn('Step 1 validation failed: No goal selected');
                    if (typeof showAppAlert === 'function') {
                        showAppAlert('Por favor, selecione uma opção para continuar.');
                    } else {
                        alert('Por favor, selecione uma opção para continuar.');
                    }
                }
                break;
                
            case 2:
                const checkedAreas = document.querySelectorAll('input[name="care-area"]:checked');
                isValid = checkedAreas.length > 0;
                if (!isValid) {
                    console.warn('Step 2 validation failed: No areas selected');
                    if (typeof showAppAlert === 'function') {
                        showAppAlert('Por favor, selecione pelo menos uma área de interesse.');
                    } else {
                        alert('Por favor, selecione pelo menos uma área de interesse.');
                    }
                }
                break;
                
            case 3:
                const selectedScore = document.querySelector('button[data-score].selected');
                isValid = !!selectedScore;
                if (!isValid) {
                    console.warn('Step 3 validation failed: No score selected');
                    if (typeof showAppAlert === 'function') {
                        showAppAlert('Por favor, indique seu nível de satisfação.');
                    } else {
                        alert('Por favor, indique seu nível de satisfação.');
                    }
                }
                break;
                
            default:
                isValid = true;
        }
        
        return isValid;
    }

    validateStep2() {
        const hasSelection = document.querySelectorAll('input[name="care-area"]:checked').length > 0;
        const nextBtn = document.querySelector('.questionnaire-step[data-step="2"] .questionnaire-button-next');
        if (nextBtn) {
            nextBtn.disabled = !hasSelection;
        }
    }

    saveStepData() {
        switch (this.currentStep) {
            case 1:
                const goalRadio = document.querySelector('input[name="care-goal"]:checked');
                if (goalRadio) {
                    this.data.goal = goalRadio.value;
                }
                break;
            case 2:
                this.data.areas = Array.from(
                    document.querySelectorAll('input[name="care-area"]:checked')
                ).map(x => x.value);
                break;
            case 3:
                const scoreBtn = document.querySelector('button[data-score].selected');
                if (scoreBtn) {
                    this.data.score = scoreBtn.getAttribute('data-score');
                }
                break;
        }

        // Salvar no sessionStorage (ambos os nomes para compatibilidade)
        sessionStorage.setItem('questionnaire-data', JSON.stringify(this.data));
        sessionStorage.setItem('careData', JSON.stringify(this.data)); // Para compatibilidade com quiz.js
    }

    enableNextButton(step) {
        const nextBtn = document.querySelector(`.questionnaire-step[data-step="${step}"] .questionnaire-button-next`);
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    selectScore(button) {
        console.log('selectScore called with button:', button);
        
        // Remover seleção anterior
        document.querySelectorAll('button[data-score]').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Marcar como selecionado
        if (button) {
            button.classList.add('selected');
            console.log('Score selected:', button.getAttribute('data-score'));
            
            // Habilitar botão próximo
            this.enableNextButton(3);
        } else {
            console.error('selectScore: button is null or undefined');
        }
    }

    finishQuestionnaire() {
        this.saveStepData();

        // Armazenar resultado
        sessionStorage.setItem('questionnaire-completed', 'true');
        sessionStorage.setItem('careData', JSON.stringify(this.data));

        console.log('Questionário concluído:', this.data);
        
        // Mostrar o container do quiz
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            quizContainer.style.display = 'block';

            // Esconde apenas o conteúdo do questionário (mantém o container visível)
            document.querySelectorAll('.questionnaire-step').forEach(step => {
                step.classList.add('hidden');
            });
            const header = document.querySelector('.questionnaire-wrapper > .mb-12');
            if (header) {
                header.classList.add('hidden');
            }
            
            // Iniciar o quiz imediatamente
            if (typeof startQuiz === 'function') {
                startQuiz();
            } else {
                console.error('startQuiz função não encontrada');
            }

            // Fallback: garantir que o step 0 apareça
            const introStep = document.getElementById('quiz-step-0');
            if (introStep && introStep.classList.contains('hidden')) {
                document.querySelectorAll('.quiz-step').forEach(step => step.classList.add('hidden'));
                introStep.classList.remove('hidden');
                const progressBar = document.getElementById('quiz-progress');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }
        } else {
            console.error('Quiz container not found');
        }
    }

    showCompletionScreen() {
        const wrapper = document.querySelector('.questionnaire-wrapper');
        wrapper.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check-circle" class="w-8 h-8 text-green-600"></i>
                </div>
                <h2 class="text-3xl font-semibold text-eqlive-dark mb-3">Obrigado!</h2>
                <p class="text-gray-600 mb-8">Seus dados foram recebidos. Vamos começar sua avaliação.</p>
                <a href="tel:+5521967815767" class="inline-block px-8 py-4 bg-eqlive-dark text-white rounded-lg font-semibold hover:bg-eqlive-dark/90 transition">
                    Fale com nossa equipe
                </a>
            </div>
        `;
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined' && lucide.replace) {
            lucide.replace();
        }
    }

    // Método público para obter dados
    getData() {
        return this.data;
    }

    // Método para resetar questionário
    reset() {
        this.currentStep = 1;
        this.data = { goal: null, areas: [], score: null };
        document.querySelectorAll('input').forEach(input => {
            input.checked = false;
        });
        document.querySelectorAll('button[data-score]').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.showStep(1);
        sessionStorage.removeItem('questionnaire-data');
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded event fired');
        window.questionnaire = new Questionnaire();
    });
} else {
    // DOM já carregado
    console.log('DOM already loaded, initializing Questionnaire');
    window.questionnaire = new Questionnaire();
}
