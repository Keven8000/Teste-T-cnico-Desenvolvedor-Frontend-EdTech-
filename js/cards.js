document.addEventListener('DOMContentLoaded', () => {
    const cardsSection = document.querySelector('.cards-section');
    if (!cardsSection) return; 

    const cards = cardsSection.querySelectorAll('.inter-card');

    // Define o card do meio (índice 1) como aberto por padrão, garantindo que exista
    if (cards.length > 1) {
        cards[1].classList.add('is-open');
    }

    cards.forEach(card => {
        const btnAbrir = card.querySelector('.inter-btn-abrir');
        const btnFechar = card.querySelector('.inter-btn-fechar');

        // Evento para ABRIR o card
        btnAbrir.addEventListener('click', () => {
            // 1. Fecha todos os outros cards primeiro (garante que só 1 fique aberto)
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('is-open');
                }
            });
            
            // 2. Abre o card clicado
            card.classList.add('is-open');
        });

        // Evento para FECHAR o card
        btnFechar.addEventListener('click', (e) => {
            e.stopPropagation(); 
            card.classList.remove('is-open');
        });
    });
});