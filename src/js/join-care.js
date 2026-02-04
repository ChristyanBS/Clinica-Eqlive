document.addEventListener('DOMContentLoaded', () => {
    // Scroll para o topo quando a página carrega
    window.scrollTo({ top: 0, behavior: 'instant' });

    const cepInput = document.getElementById('care-cep');
    const consentInput = document.getElementById('care-consent');
    const submitButton = document.getElementById('care-submit');

    // Recuperar dados do care.html
    const careDataStr = sessionStorage.getItem('careData');
    const careData = careDataStr ? JSON.parse(careDataStr) : null;

    // Map de áreas para nomes amigáveis
    const areaNames = {
        'saude-intestinal': 'Saúde intestinal e digestiva',
        'saude-hormonal': 'Saúde hormonal',
        'menopausa': 'Perimenopausa e Menopausa',
        'fertilidade': 'Fertilidade, Gravidez e Pós-parto',
        'metabolismo': 'Metabolismo e Controle de Peso',
        'longevidade': 'Longevidade e expectativa de vida saudável',
        'saude-masculina': 'Saúde masculina',
        'autoimunes': 'Doenças autoimunes e inflamação',
        'sintomas-inexplicaveis': 'Sintomas inexplicáveis e não diagnosticados'
    };

    // Map de goals para nomes amigáveis
    const goalNames = {
        'cronico': 'Ajuda para lidar com um problema crônico',
        'sintomas': 'Respostas para sintomas persistentes',
        'nao-funciona': 'Apoio quando nada mais funcionou',
        'proativo': 'Um plano de saúde proativo',
        'saiba': 'Para saber como a saúde pode ajudar'
    };

    const toggleButton = () => {
        const cepValue = (cepInput?.value || '').trim();
        const isValid = cepValue.length >= 5 && consentInput?.checked;
        if (submitButton) {
            submitButton.disabled = !isValid;
            submitButton.classList.toggle('opacity-50', !isValid);
            submitButton.classList.toggle('pointer-events-none', !isValid);
        }
    };

    cepInput?.addEventListener('input', toggleButton);
    consentInput?.addEventListener('change', toggleButton);

    submitButton?.addEventListener('click', () => {
        if (submitButton.disabled) return;
        
        const cepValue = (cepInput?.value || '').trim();
        
        // Construir mensagem para WhatsApp
        let message = 'Olá, gostaria de agendar uma consulta! 👋\n\n';
        message += '📍 *CEP:* ' + cepValue + '\n\n';
        
        if (careData) {
            message += '📋 *Meu objetivo:*\n' + (goalNames[careData.goal] || careData.goal) + '\n\n';
            
            if (careData.areas && careData.areas.length > 0) {
                message += '🏥 *Áreas de interesse:*\n';
                careData.areas.forEach(area => {
                    message += '• ' + (areaNames[area] || area) + '\n';
                });
                message += '\n';
            }
            
            if (careData.score) {
                message += '📊 *Impacto na qualidade de vida:* ' + careData.score + '/10\n\n';
            }
        }
        
        message += 'Aguardo retorno!';
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5521967815767?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
    });

    toggleButton();
});
