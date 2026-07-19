document.addEventListener('DOMContentLoaded', () => {
    const sliderSection = document.querySelector('.slider-section');
    
    const track = sliderSection.querySelector('#sliderTrack');
    const prevBtn = sliderSection.querySelector('#prevBtn');
    const nextBtn = sliderSection.querySelector('#nextBtn');
    const dots = sliderSection.querySelectorAll('.dot');
    const sliderBtns = sliderSection.querySelectorAll('.slider-btn');

    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    sliderBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                const activeDot = sliderSection.querySelector('.dot.active');
                if (activeDot) activeDot.classList.add('hover-green');
            }
        });

        btn.addEventListener('mouseleave', () => {
            const activeDot = sliderSection.querySelector('.dot.active');
            if (activeDot) activeDot.classList.remove('hover-green');
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    updateSlider();
});