// Bok Bok Spil - Kyllingelyde

// DOM elementer
const bokButton = document.getElementById('bokButton');
const egg = document.getElementById('egg');
const eggButtonContainer = document.getElementById('eggButtonContainer');
const eggButton = document.getElementById('eggButton');
const soundDisplay = document.getElementById('soundDisplay');
const chicken = document.getElementById('chicken');

// Lydkontekst (Web Audio API)
let audioContext;
let isAudioStarted = false;

// Funktion til at starte audio kontekst
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!isAudioStarted) {
        // Start audio kontekst med en lille lyd
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0.01;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        isAudioStarted = true;
    }
}

// Funktion til at lave en kyllingelyd (Bok boook)
function playBokSound(pitch = 440, duration = 0.3, isHighPitch = false) {
    initAudio();
    
    // Opret oscillatorer for at lave en "bok" lyd
    const now = audioContext.currentTime;
    
    // Første del af lyden (høj frekvens)
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(pitch, now);
    if (isHighPitch) {
        osc1.frequency.setValueAtTime(pitch * 1.5, now);
    }
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + duration);
    osc1.start(now);
    osc1.stop(now + duration);
    
    // Anden del (lavere frekvens for "ook" delen)
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(pitch * 0.7, now + duration * 0.5);
    if (isHighPitch) {
        osc2.frequency.setValueAtTime(pitch * 0.7 * 1.3, now + duration * 0.5);
    }
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    gain2.gain.setValueAtTime(0.1, now + duration * 0.5);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + duration * 1.5);
    osc2.start(now + duration * 0.5);
    osc2.stop(now + duration * 1.5);
    
    // Tilføj en lille bit noise for at gøre det mere "kyllinge-agtigt"
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = noiseBuffer;
    const noiseGain = audioContext.createGain();
    noise.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noise.start(now);
    noise.stop(now + duration);
}

// Funktion til at vise tekst med animation
function showSoundText(text, color = '#FF6347') {
    soundDisplay.textContent = text;
    soundDisplay.style.color = color;
    soundDisplay.classList.add('pulse');
    
    setTimeout(() => {
        soundDisplay.classList.remove('pulse');
    }, 500);
}

// Funktion til at animere kyllingen
function animateChicken() {
    chicken.classList.add('shake');
    setTimeout(() => {
        chicken.classList.remove('shake');
    }, 500);
}

// Funktion til at animere ægget
function animateEgg() {
    egg.classList.add('shake');
    setTimeout(() => {
        egg.classList.remove('shake');
    }, 500);
}

// Hovedknap - Bok boook!
bokButton.addEventListener('click', () => {
    // Afspil lyd
    playBokSound(440, 0.3, false);
    
    // Vis tekst
    showSoundText('Bok boook! 🐔');
    
    // Animer kyllingen
    animateChicken();
    
    // Vis ægget med det store næb
    setTimeout(() => {
        egg.classList.remove('hidden');
        eggButtonContainer.classList.remove('hidden');
    }, 500);
    
    // Deaktiver knappen midlertidigt
    bokButton.disabled = true;
    bokButton.style.opacity = '0.6';
    bokButton.textContent = '✓ Trykket!';
    
    setTimeout(() => {
        bokButton.disabled = false;
        bokButton.style.opacity = '1';
        bokButton.innerHTML = '<span class="button-text">Tryk her for at sige BOK!</span><span class="button-emoji">🐣</span>';
    }, 2000);
});

// Æg knap - Højere lyd
eggButton.addEventListener('click', () => {
    // Afspil højere lyd
    playBokSound(660, 0.3, true);
    
    // Vis tekst
    showSoundText('BOK BOOOK! 🥚🎵', '#FF8C00');
    
    // Animer ægget
    animateEgg();
    
    // Gør ægget større
    egg.style.transform = 'scale(1.1)';
    setTimeout(() => {
        egg.style.transform = 'scale(1)';
    }, 300);
    
    // Deaktiver knappen midlertidigt
    eggButton.disabled = true;
    eggButton.style.opacity = '0.6';
    eggButton.textContent = '✓ Høj lyd!';
    
    setTimeout(() => {
        eggButton.disabled = false;
        eggButton.style.opacity = '1';
        eggButton.innerHTML = '<span>Tryk på ægget!</span><span class="egg-emoji">🥚</span>';
    }, 1500);
});

// Tastatur support - Tryk på spacebar
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !eggButtonContainer.classList.contains('hidden')) {
        e.preventDefault();
        eggButton.click();
    } else if (e.code === 'Space') {
        e.preventDefault();
        bokButton.click();
    }
});

// Vis instruktioner ved start
setTimeout(() => {
    showSoundText('Tryk på knappen for at starte! 🎮', '#FF6347');
}, 500);

// Tilføj touch support til mobil
bokButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    bokButton.classList.add('active');
});

bokButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    bokButton.classList.remove('active');
    bokButton.click();
});

eggButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    eggButton.classList.add('active');
});

eggButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    eggButton.classList.remove('active');
    eggButton.click();
});

// Check for audio support
if (!window.AudioContext && !window.webkitAudioContext) {
    console.log('Web Audio API not supported, falling back to text only');
    // Vis en besked om at lyde ikke understøttes
    const audioWarning = document.createElement('div');
    audioWarning.style.cssText = 'background: #FFFACD; padding: 10px; border-radius: 5px; margin: 10px 0; color: #8B4513;';
    audioWarning.textContent = 'Lyd understøttes ikke i din browser. Du kan stadig se teksten!';
    document.querySelector('.game-container').prepend(audioWarning);
}
