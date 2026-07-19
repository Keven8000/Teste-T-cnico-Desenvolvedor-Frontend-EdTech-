document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.lateral-section');
    const imgWrapper = document.querySelector('.lateral-image-wrapper');
    const img = document.querySelector('.lateral-img');

    if (!section || !imgWrapper || !img) return;

    // ==========================================
    // 1. Animação de Entrada (Scroll - 20%)
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe quando 20% do elemento aparece
                entry.target.classList.add('animar-entrada');
                // Para de vigiar para não repetir a animação se subir a página
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2 // Dispara exatamente nos 20% de visibilidade
    });

    observer.observe(section);

    // ==========================================
    // 2. Efeito 3D Tilt Hover
    // ==========================================
    imgWrapper.addEventListener('mousemove', (e) => {
        // Pega as dimensões e a posição atual da caixa da imagem na tela
        const rect = imgWrapper.getBoundingClientRect();
        
        // Descobre onde o mouse está em relação ao topo-esquerdo da imagem
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = x - centerX;
        const deltaY = y - centerY;

        const rotateX = -(deltaY / 15); 
        const rotateY = (deltaX / 15);

        // Aplica a rotação e dá um levíssimo zoom (scale3d)
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        img.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.15)`;
    });

    // Quando o mouse sai, tudo volta suavemente ao normal
    imgWrapper.addEventListener('mouseleave', () => {
        img.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        img.style.boxShadow = `none`;
        img.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
    });

    // Quando o mouse volta a entrar, deixa a transição bem rápida para seguir o cursor
    imgWrapper.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    });
});