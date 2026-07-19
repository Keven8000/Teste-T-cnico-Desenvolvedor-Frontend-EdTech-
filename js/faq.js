document.addEventListener('DOMContentLoaded', () => {
    const faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            
            // Se o item atual acabou de ser aberto...
            if (item.open) {
                // Percorre todos os outros itens
                faqItems.forEach(otherItem => {
                    // E força o fechamento dos que não são o item clicado
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
});