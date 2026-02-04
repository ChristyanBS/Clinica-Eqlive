document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.care-step'));
    const state = {
        goal: null,
        areas: new Set(),
        score: null
    };

    // Scroll para o topo quando a página carrega
    window.scrollTo({ top: 0, behavior: 'instant' });

    const setButtonState = (button, enabled) => {
        if (!button) return;
        button.disabled = !enabled;
        button.classList.toggle('opacity-50', !enabled);
        button.classList.toggle('pointer-events-none', !enabled);
    };

    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.toggle('hidden', i !== index);
        });
        currentStep = index;
        updateStepButtons();
        
        // Scroll suave para a seção do care-card
        setTimeout(() => {
            const careCard = document.querySelector('.care-card');
            if (careCard) {
                const cardTop = careCard.getBoundingClientRect().top + window.scrollY;
                const navHeight = 120; // altura aproximada da nav
                window.scrollTo({ top: cardTop - navHeight, behavior: 'smooth' });
            }
        }, 100);
    };

    const updateStepButtons = () => {
        const step = steps[currentStep];
        if (!step) return;
        const nextButton = step.querySelector('[data-care-next]');
        const finishButton = step.querySelector('[data-care-finish]');
        if (nextButton) {
            const enabled = currentStep === 0 ? !!state.goal : state.areas.size > 0;
            setButtonState(nextButton, enabled);
        }
        if (finishButton) {
            setButtonState(finishButton, !!state.score);
        }
    };

    let currentStep = 0;
    showStep(0);

    document.querySelectorAll('[data-care-goal]').forEach((button) => {
        button.addEventListener('click', () => {
            state.goal = button.dataset.careGoal;
            document.querySelectorAll('[data-care-goal]').forEach((btn) => {
                btn.classList.toggle('is-selected', btn === button);
                btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
            });
            updateStepButtons();
        });
    });

    document.querySelectorAll('[data-care-area]').forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.dataset.careArea;
            if (state.areas.has(value)) {
                state.areas.delete(value);
                button.classList.remove('is-selected');
                button.setAttribute('aria-pressed', 'false');
            } else {
                state.areas.add(value);
                button.classList.add('is-selected');
                button.setAttribute('aria-pressed', 'true');
            }
            updateStepButtons();
        });
    });

    document.querySelectorAll('[data-care-score]').forEach((button) => {
        button.addEventListener('click', () => {
            state.score = button.dataset.careScore;
            document.querySelectorAll('[data-care-score]').forEach((btn) => {
                btn.classList.toggle('is-selected', btn === button);
                btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
            });
            updateStepButtons();
        });
    });

    document.querySelectorAll('[data-care-next]').forEach((button) => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('[data-care-prev]').forEach((button) => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    document.querySelectorAll('[data-care-finish]').forEach((button) => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            
            // Salvar dados no sessionStorage para usar em join-care.html
            sessionStorage.setItem('careData', JSON.stringify({
                goal: state.goal,
                areas: Array.from(state.areas),
                score: state.score
            }));
            
            window.location.href = 'join-care.html';
        });
    });
});
