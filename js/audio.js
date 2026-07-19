document.addEventListener('DOMContentLoaded', () => {
    const audioSection = document.querySelector('.audio-section');
    if (!audioSection) return;

    const audio = document.getElementById('customAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const iconPlay = playPauseBtn.querySelector('.icon-play');
    const iconPause = playPauseBtn.querySelector('.icon-pause');
    const progressBg = document.getElementById('progressBg');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const durationTimeEl = document.getElementById('durationTime');

    let isPlaying = false;
    let isAudioContextActive = false;

    const AUDIO_STORAGE_KEY = 'audioPlayerCurrentTime';

    document.addEventListener('click', (e) => {
        if (audioSection.contains(e.target)) {
            isAudioContextActive = true;
        } else {
            isAudioContextActive = false;
        }
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    // Carrega a duração total e restaura o progresso salvo
    audio.addEventListener('loadedmetadata', () => {
        durationTimeEl.textContent = formatTime(audio.duration);

        // Busca o tempo salvo. Se existir, avança o áudio para aquele exato segundo!
        const savedTime = sessionStorage.getItem(AUDIO_STORAGE_KEY);
        if (savedTime !== null) {
            audio.currentTime = parseFloat(savedTime);
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            iconPause.style.display = 'none';
            iconPlay.style.display = 'block';
        } else {
            audio.play();
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    // Atualiza a interface e salva o tempo na memória
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);

        // A cada segundo que passa, atualizamos o valor salvo na memória do navegador
        sessionStorage.setItem(AUDIO_STORAGE_KEY, audio.currentTime);
    });

    progressBg.addEventListener('click', (e) => {
        const clickX = e.offsetX;
        const width = progressBg.clientWidth;
        const clickPercent = (clickX / width);
        audio.currentTime = clickPercent * audio.duration;
    });

    // Reseta o player e limpa a memória quando o áudio termina
    audio.addEventListener('ended', () => {
        isPlaying = false;
        iconPause.style.display = 'none';
        iconPlay.style.display = 'block';
        progressFill.style.width = '0%';
        audio.currentTime = 0;

        // Limpa a chave do sessionStorage quando a música acaba para ela recomeçar do zero num próximo acesso
        sessionStorage.removeItem(AUDIO_STORAGE_KEY);
    });

    // Controles de Teclado
    document.addEventListener('keydown', (e) => {
        if (!isPlaying && !isAudioContextActive) {
            return; 
        }

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.key) {
            case ' ': 
            case 'Enter':
                e.preventDefault(); 
                playPauseBtn.click(); 
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
                break;

            case 'ArrowLeft':
                e.preventDefault();
                audio.currentTime = Math.max(audio.currentTime - 10, 0);
                break;
        }
    });
});