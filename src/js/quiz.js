/* ========================================
   QUIZ DE SINTOMAS - EQLIVE
   ======================================== */

// Iniciar Quiz
window.startQuiz = function() {
    const step0 = document.getElementById('quiz-step-0');
    const step1 = document.getElementById('quiz-step-1');
    
    if (step0 && step1) {
        step0.classList.add('hidden');
        step1.classList.remove('hidden');
        updateProgress(33);
    }
}

// Selecionar Sintoma
window.toggleSymptom = function(checkbox) {
    const value = checkbox.value;
    const noneCheckbox = document.getElementById('checkbox-none');

    if (checkbox.checked) {
        // Se marcou um sintoma, desmarca "Nenhuma dessas"
        if (noneCheckbox) {
            noneCheckbox.checked = false;
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

// Selecionar "Nenhuma dessas"
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

// Validar botão "Próximo"
function validateStep1() {
    const nextBtn = document.getElementById('btn-next-step-1');
    if (nextBtn) {
        if (quizState.selectedSymptoms.length > 0) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

// Avançar para próxima etapa
window.nextStep = function(currentStep) {
    if (currentStep === 1) {
        document.getElementById('quiz-step-1').classList.add('hidden');
        document.getElementById('quiz-step-2').classList.remove('hidden');
        updateProgress(66);
    }
}

// Voltar etapa
window.prevStep = function(step) {
    if (step === 1) {
        document.getElementById('quiz-step-2').classList.add('hidden');
        document.getElementById('quiz-step-1').classList.remove('hidden');
        updateProgress(33);
    }
}

// Selecionar Duração
window.selectDuration = function(duration) {
    quizState.duration = duration;
    document.getElementById('quiz-step-2').classList.add('hidden');
    calculateResult();
    document.getElementById('quiz-result').classList.remove('hidden');
    updateProgress(100);
}

// Atualizar barra de progresso
function updateProgress(percent) {
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) progressBar.style.width = `${percent}%`;
}

// Calcular resultado baseado em respostas
function calculateResult() {
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');
    const ctaEl = document.getElementById('result-cta');
    
    let specialty = '';
    let description = '';
    let whatsappMsg = '';

    // Sintomas cardíacos
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
        specialty = 'Clínica Geral Integrativa';
        description = 'Com base nas suas respostas, recomendamos uma avaliação completa para entender melhor seu quadro de saúde e direcionar o tratamento ideal.';
        whatsappMsg = 'Olá, fiz o teste no site e gostaria de agendar uma consulta.';
    }

    if (titleEl) titleEl.textContent = specialty;
    if (descEl) descEl.textContent = description;
    if (ctaEl) ctaEl.href = `https://wa.me/5521967815767?text=${encodeURIComponent(whatsappMsg)}`;
}

// Reiniciar Quiz
window.resetQuiz = function() {
    quizState = { selectedSymptoms: [], duration: null };
    
    // Reseta os checkboxes
    const checkboxes = document.querySelectorAll('#quiz-step-1 input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    validateStep1();

    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-step-0').classList.remove('hidden');
    updateProgress(0);
}
