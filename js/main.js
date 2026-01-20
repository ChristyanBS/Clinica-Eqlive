document.addEventListener('DOMContentLoaded', () => {
            // --- Inicialização de ícones ---
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }

            // --- Lógica do Menu Mobile ---
            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                    // Prevent scrolling when menu is open
                    if(!mobileMenu.classList.contains('hidden')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            // --- Garantir Home visível ao carregar ---
            const home = document.getElementById('home');
            if (home) {
                home.style.display = 'block';
                home.classList.remove('hidden');
                setTimeout(() => home.classList.add('active'), 10);
            }

            // --- Carrossel Logic ---
            const track = document.getElementById('carousel-track');
            if (track) {
                const prevBtn = document.getElementById('prev-btn');
                const nextBtn = document.getElementById('next-btn');
                const prevBtnMob = document.getElementById('prev-btn-mobile');
                const nextBtnMob = document.getElementById('next-btn-mobile');
                
                let scrollAmount = 0;
                const cardWidth = 340 + 24; // Largura do card + gap (approx)

                const scrollCarousel = (direction) => {
                    const containerWidth = track.parentElement.offsetWidth;
                    const trackWidth = track.scrollWidth;
                    const maxScroll = trackWidth - containerWidth;
                    
                    if (direction === 'next') {
                        scrollAmount += cardWidth;
                        if(scrollAmount > maxScroll) scrollAmount = maxScroll;
                    } else {
                        scrollAmount -= cardWidth;
                        if(scrollAmount < 0) scrollAmount = 0;
                    }
                    
                    track.style.transform = `translateX(-${scrollAmount}px)`;
                };

                if(prevBtn) prevBtn.addEventListener('click', () => scrollCarousel('prev'));
                if(nextBtn) nextBtn.addEventListener('click', () => scrollCarousel('next'));
                if(prevBtnMob) prevBtnMob.addEventListener('click', () => scrollCarousel('prev'));
                if(nextBtnMob) nextBtnMob.addEventListener('click', () => scrollCarousel('next'));
            }
        });

        // --- Funções Globais ---

        // Estado do Quiz
        let quizState = {
            selectedSymptoms: [], 
            duration: null
        };

        // Navegação Mobile
        window.mobileNav = function(pageId) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            window.navigateTo(pageId);
        }

        // Navegação SPA
        window.navigateTo = function(pageId) {
            window.scrollTo(0, 0);
            
            // Esconde todas as seções
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
                setTimeout(() => {
                    if(!section.classList.contains('active')) {
                        section.classList.add('hidden');
                        section.style.display = 'none'; 
                    }
                }, 300); 
            });

            // Mostra a seção alvo
            const target = document.getElementById(pageId);
            if(target) {
                target.classList.remove('hidden');
                target.style.display = 'block';
                
                // Pequeno delay para permitir que o display:block renderize antes da opacidade
                setTimeout(() => {
                    target.classList.add('active');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 50);
            }
        }

        // --- LÓGICA DO QUIZ ---

        // Passo 0: Iniciar
        window.startQuiz = function() {
            const step0 = document.getElementById('quiz-step-0');
            const step1 = document.getElementById('quiz-step-1');
            
            if(step0 && step1) {
                step0.classList.add('hidden');
                step1.classList.remove('hidden');
                updateProgress(33);
            }
        }

        // Passo 1: Selecionar Sintomas
        window.toggleSymptom = function(checkbox) {
            const value = checkbox.value;
            const noneCheckbox = document.getElementById('checkbox-none');

            if (checkbox.checked) {
                // Se marcou um sintoma, desmarca "Nenhuma dessas"
                if(noneCheckbox) {
                    noneCheckbox.checked = false;
                    // Remove 'nenhuma' do estado se existir
                    quizState.selectedSymptoms = quizState.selectedSymptoms.filter(item => item !== 'nenhuma');
                }
                
                // Adiciona ao array se não existir
                if (!quizState.selectedSymptoms.includes(value)) {
                    quizState.selectedSymptoms.push(value);
                }
            } else {
                // Remove do array
                quizState.selectedSymptoms = quizState.selectedSymptoms.filter(item => item !== value);
            }
            
            validateStep1();
        }

        // Passo 1: Selecionar "Nenhuma dessas"
        window.toggleNone = function(checkbox) {
            if (checkbox.checked) {
                // Desmarca visualmente todos os outros checkboxes
                const checkboxes = document.querySelectorAll('#quiz-step-1 input[type="checkbox"]:not(#checkbox-none)');
                checkboxes.forEach(cb => cb.checked = false);
                
                // Limpa estado e define apenas 'nenhuma'
                quizState.selectedSymptoms = ['nenhuma'];
            } else {
                // Se desmarcou, limpa tudo
                quizState.selectedSymptoms = [];
            }
            validateStep1();
        }

        // Validação do botão "Próximo"
        function validateStep1() {
            const nextBtn = document.getElementById('btn-next-step-1');
            if(nextBtn) {
                if (quizState.selectedSymptoms.length > 0) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    nextBtn.disabled = true;
                    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }

        // Avançar para Passo 2
        window.nextStep = function(currentStep) {
            if (currentStep === 1) {
                document.getElementById('quiz-step-1').classList.add('hidden');
                document.getElementById('quiz-step-2').classList.remove('hidden');
                updateProgress(66);
            }
        }

        // Voltar Passo
        window.prevStep = function(step) {
            if (step === 1) {
                document.getElementById('quiz-step-2').classList.add('hidden');
                document.getElementById('quiz-step-1').classList.remove('hidden');
                updateProgress(33);
            }
        }

        // Passo 2: Selecionar Duração e Mostrar Resultado
        window.selectDuration = function(duration) {
            quizState.duration = duration;
            document.getElementById('quiz-step-2').classList.add('hidden');
            calculateResult();
            document.getElementById('quiz-result').classList.remove('hidden');
            updateProgress(100);
        }

        // Barra de Progresso
        function updateProgress(percent) {
            const progressBar = document.getElementById('quiz-progress');
            if(progressBar) progressBar.style.width = `${percent}%`;
        }

        // Cálculo do Resultado
        function calculateResult() {
            const titleEl = document.getElementById('result-title');
            const descEl = document.getElementById('result-desc');
            const ctaEl = document.getElementById('result-cta');
            
            let specialty = '';
            let description = '';
            let whatsappMsg = '';

            // Verifica se há algum sintoma cardíaco selecionado
            const cardiacSymptoms = ['dor_peito', 'batimento_acelerado', 'tontura', 'inchaco_pernas', 'falta_ar'];
            const hasCardiacSymptoms = quizState.selectedSymptoms.some(s => cardiacSymptoms.includes(s));

            if (hasCardiacSymptoms) {
                specialty = 'Cardiologia Integrativa';
                description = 'Seus sintomas indicam a necessidade de uma avaliação cardiovascular detalhada. Investigaremos a saúde do seu coração, circulação e fatores metabólicos para prevenir riscos e melhorar sua qualidade de vida.';
                whatsappMsg = 'Olá, fiz o teste no site e relatei sintomas cardíacos. Gostaria de agendar uma avaliação cardiológica.';
            } else if (quizState.selectedSymptoms.includes('nenhuma')) {
                specialty = 'Clínica Geral Integrativa';
                description = 'Ótimo que você não apresenta sintomas agudos! Para manter sua saúde em dia e prevenir doenças futuras, recomendamos um check-up preventivo focado em longevidade.';
                whatsappMsg = 'Olá, fiz o teste no site e gostaria de agendar um Check-up Preventivo.';
            } else {
                // Caso genérico ou misto
                specialty = 'Clínica Geral Integrativa';
                description = 'Com base nas suas respostas, recomendamos uma avaliação completa para entender melhor seu quadro de saúde e direcionar o tratamento ideal.';
                whatsappMsg = 'Olá, fiz o teste no site e gostaria de agendar uma consulta.';
            }

            if(titleEl) titleEl.textContent = specialty;
            if(descEl) descEl.textContent = description;
            if(ctaEl) ctaEl.href = `https://wa.me/5521967815767?text=${encodeURIComponent(whatsappMsg)}`;
        }

        // Reiniciar Quiz
        window.resetQuiz = function() {
            quizState = { selectedSymptoms: [], duration: null };
            
            // Reseta visualmente os checkboxes
            const checkboxes = document.querySelectorAll('#quiz-step-1 input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
            
            validateStep1();

            document.getElementById('quiz-result').classList.add('hidden');
            document.getElementById('quiz-step-0').classList.remove('hidden');
            updateProgress(0);
        }