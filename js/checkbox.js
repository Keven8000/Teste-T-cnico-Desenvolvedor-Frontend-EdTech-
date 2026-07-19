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
        btnAlterar.focus(); // move o foco pro botão que continua ativo, já que Responder some da tab order

        opcoesItems.forEach(item => item.classList.add('desabilitado'));
        checkboxes.forEach(cb => cb.disabled = true);
    }

    // ==========================================
    // 1. CARREGAMENTO (Hydration)
    // ==========================================
    const savedData = sessionStorage.getItem(STORAGE_KEY_OBJ);
    if (savedData) {
        const data = JSON.parse(savedData);
        
        if (data.opcaoSelecionada) {
            const cbSalvo = Array.from(checkboxes).find(cb => cb.value === data.opcaoSelecionada);
            
            if (cbSalvo) {
                cbSalvo.checked = true;
                cbSalvo.closest('.opcao-item').classList.add('selecionado');
                btnResponder.disabled = false;

                if (data.respondido) {
                    aplicarEstadoRespondidoObj(cbSalvo);
                }
            }
        }
    }

    // ==========================================
    // 2. Lógica de Seleção (checkbox NÃO garante 1 por vez — controlamos aqui)
    // ==========================================
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                // Desmarca manualmente todos os outros (checkbox não faz isso sozinho)
                checkboxes.forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
                opcoesItems.forEach(item => item.classList.remove('selecionado'));
                e.target.closest('.opcao-item').classList.add('selecionado');

                btnResponder.disabled = false;

                sessionStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify({
                    opcaoSelecionada: e.target.value,
                    respondido: false
                }));
            } else {
                // Usuário desmarcou a própria opção — volta ao estado neutro
                e.target.closest('.opcao-item').classList.remove('selecionado');
                btnResponder.disabled = true;
                sessionStorage.removeItem(STORAGE_KEY_OBJ);
            }
        });
    });

    // ==========================================
    // 3. Comportamento: Clicar em "Responder"
    // ==========================================
    btnResponder.addEventListener('click', () => {
        const checkboxSelecionado = Array.from(checkboxes).find(cb => cb.checked);
        if (!checkboxSelecionado) return;

        aplicarEstadoRespondidoObj(checkboxSelecionado);

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

        const checkboxSelecionado = Array.from(checkboxes).find(cb => cb.checked);
        if (checkboxSelecionado) {
            checkboxSelecionado.focus(); // devolve o foco pra opção que estava marcada
            sessionStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify({
                opcaoSelecionada: checkboxSelecionado.value,
                respondido: false
            }));
        }
    });
});