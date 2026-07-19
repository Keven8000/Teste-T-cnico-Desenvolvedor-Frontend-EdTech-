document.addEventListener('DOMContentLoaded', () => {
    const objSection = document.querySelector('.atividade-objetiva-section');
    if (!objSection) return;

    const opcoesItems = objSection.querySelectorAll('.opcao-item');
    const checkboxes = objSection.querySelectorAll('.opcao-checkbox');
    const btnResponder = objSection.querySelector('#btnResponderObj');
    const btnAlterar = objSection.querySelector('#btnAlterarObj');
    
    const feedbackArea = objSection.querySelector('#feedbackAreaObj');
    const feedbackTitulo = objSection.querySelector('#feedbackTituloObj');
    const feedbackTexto = objSection.querySelector('#feedbackTextoObj');

    const STORAGE_KEY_OBJ = 'atividadeObjetivaData';

    // Função auxiliar para travar a interface e mostrar o feedback
    function aplicarEstadoRespondidoObj(checkboxSelecionado) {
        const isCorreto = checkboxSelecionado.getAttribute('data-correta') === 'true';

        feedbackArea.className = 'atividade-feedback'; 
        
        if (isCorreto) {
            feedbackArea.classList.add('sucesso');
            feedbackTitulo.textContent = 'É isso aí!';
            feedbackTexto.textContent = 'Parabéns! Você escolheu a alternativa correta.';
        } else {
            feedbackArea.classList.add('erro');
            feedbackTitulo.textContent = 'Ops, tente novamente!';
            feedbackTexto.textContent = 'Essa não é a resposta ideal. Revise o material e tente outra vez.';
        }

        feedbackArea.style.display = 'block';
        btnResponder.disabled = true;
        btnAlterar.disabled = false;

        opcoesItems.forEach(item => item.classList.add('desabilitado'));
        checkboxes.forEach(cb => cb.disabled = true);
    }

    // ==========================================
    // 1. CARREGAMENTO (Hydration)
    // ==========================================
    const savedData = sessionStorage.getItem(STORAGE_KEY_OBJ);
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Se havia alguma opção selecionada na memória
        if (data.opcaoSelecionada) {
            // Procura o checkbox exato que tem o mesmo value que estava salvo
            const cbSalvo = Array.from(checkboxes).find(cb => cb.value === data.opcaoSelecionada);
            
            if (cbSalvo) {
                cbSalvo.checked = true;
                cbSalvo.closest('.opcao-item').classList.add('selecionado');
                btnResponder.disabled = false; // Libera o botão de responder

                // Se a pessoa já tinha clicado em "Responder" antes do F5, aplica o bloqueio
                if (data.respondido) {
                    aplicarEstadoRespondidoObj(cbSalvo);
                }
            }
        }
    }

    // ==========================================
    // 2. Lógica de Seleção (Apenas 1 Checkbox por vez)
    // ==========================================
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            
            // Se o usuário desmarcou a opção que estava marcada
            if (!e.target.checked) {
                e.target.closest('.opcao-item').classList.remove('selecionado');
                btnResponder.disabled = true; 
                
                // Limpa a memória, pois não há nada selecionado
                sessionStorage.removeItem(STORAGE_KEY_OBJ);
                return;
            }

            // Desmarca todos os outros
            checkboxes.forEach(cb => {
                if (cb !== e.target) {
                    cb.checked = false;
                    cb.closest('.opcao-item').classList.remove('selecionado');
                }
            });

            e.target.closest('.opcao-item').classList.add('selecionado');
            btnResponder.disabled = false;

            // Salva a seleção atual como "rascunho" (ainda não respondido)
            sessionStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify({
                opcaoSelecionada: e.target.value,
                respondido: false
            }));
        });
    });

    // ==========================================
    // 3. Comportamento: Clicar em "Responder"
    // ==========================================
    btnResponder.addEventListener('click', () => {
        const checkboxSelecionado = Array.from(checkboxes).find(cb => cb.checked);
        if (!checkboxSelecionado) return;

        // Roda a função visual
        aplicarEstadoRespondidoObj(checkboxSelecionado);

        // Salva o estado como respondido permanentemente na sessão
        sessionStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify({
            opcaoSelecionada: checkboxSelecionado.value,
            respondido: true
        }));
    });

    // ==========================================
    // 4. Comportamento: Clicar em "Alterar"
    // ==========================================
    btnAlterar.addEventListener('click', () => {
        feedbackArea.style.display = 'none';

        btnAlterar.disabled = true;
        btnResponder.disabled = false; 

        opcoesItems.forEach(item => item.classList.remove('desabilitado'));
        checkboxes.forEach(cb => cb.disabled = false);

        // Devolve o status para rascunho na memória, mantendo a caixa que estava marcada
        const checkboxSelecionado = Array.from(checkboxes).find(cb => cb.checked);
        if (checkboxSelecionado) {
            sessionStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify({
                opcaoSelecionada: checkboxSelecionado.value,
                respondido: false
            }));
        }
    });
});