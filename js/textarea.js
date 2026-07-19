document.addEventListener('DOMContentLoaded', () => {
    const atividadeSection = document.querySelector('.atividade-discursiva-section');
    if (!atividadeSection) return;

    const textarea = atividadeSection.querySelector('#respostaTextarea');
    const btnResponder = atividadeSection.querySelector('#btnResponder');
    const btnAlterar = atividadeSection.querySelector('#btnAlterar');
    const feedbackArea = atividadeSection.querySelector('#feedbackArea');
    const btnCloseFeedback = atividadeSection.querySelector('#btnCloseFeedback');

    const STORAGE_KEY = 'atividadeDiscursivaData';

    // Função auxiliar que centraliza a lógica de mudar a interface para "Respondida"
    function aplicarEstadoRespondido(texto) {
        let pResposta = feedbackArea.querySelector('.texto-resposta-usuario');
        
        if (!pResposta) {
            pResposta = document.createElement('p');
            pResposta.classList.add('texto-resposta-usuario');
            feedbackArea.appendChild(pResposta);
        }

        pResposta.textContent = `Essa foi sua resposta: ${texto}`;
        feedbackArea.style.display = 'block';
        textarea.disabled = true;
        btnResponder.disabled = true;
        btnAlterar.disabled = false;
    }

    // ==========================================
    // 1. CARREGAMENTO (Hydration)
    // ==========================================
    const savedData = sessionStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const data = JSON.parse(savedData);
        textarea.value = data.texto; // Restaura o texto (seja rascunho ou resposta final)

        if (data.respondido) {
            aplicarEstadoRespondido(data.texto); // Se já foi respondido, trava a interface
        }
    }

    // ==========================================
    // 2. EVENTOS
    // ==========================================
    btnResponder.addEventListener('click', () => {
        const respostaUsuario = textarea.value.trim();

        if (respostaUsuario === '') {
            textarea.focus();
            return;
        }

        // Atualiza a interface
        aplicarEstadoRespondido(respostaUsuario);

        // Salva o estado final no SessionStorage
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            texto: respostaUsuario,
            respondido: true
        }));
    });

    btnAlterar.addEventListener('click', () => {
        feedbackArea.style.display = 'none';
        textarea.disabled = false;
        textarea.focus();
        btnAlterar.disabled = true;
        btnResponder.disabled = false;

        // Atualiza o SessionStorage dizendo que voltou a ser rascunho, mas mantém o texto
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            texto: textarea.value,
            respondido: false
        }));
    });

    // Salva o rascunho em tempo real enquanto o usuário digita
    textarea.addEventListener('input', () => {
        if (!btnResponder.disabled) { 
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
                texto: textarea.value,
                respondido: false
            }));
        }
    });

    btnCloseFeedback.addEventListener('click', () => {
        feedbackArea.style.display = 'none';
    });

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            btnResponder.click(); 
        }
    });
});