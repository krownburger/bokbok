// Bok Bok Spil - Kyllingelyde med forbedret lyd

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

// Funktion til at lave en kyllinges "cluck" lyd
function playCluck(pitch = 800, duration = 0.15) {
    initAudio();
    const now = audioContext.currentTime;
    
    // Hoved oscillator (sawtooth for mere harmonisk indhold)
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(pitch, now);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    // Envelope for volumen
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + duration * 0.3);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc1.start(now);
    osc1.stop(now + duration);
    
    // Tilføj en sinus bølge for mere varme
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(pitch * 0.5, now);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    gain2.gain.setValueAtTime(0.02, now);
    gain2.gain.exponentialRampToValueAtTime(0.005, now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
    
    // Tilføj noise for at gøre det mere organisk
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
    
    // Filter noise for at gøre det mere "kyllinge-agtigt"
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(2, now);
    noise.connect(filter);
    filter.connect(noiseGain);
    
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.start(now);
    noise.stop(now + duration);
}

// Funktion til at lave "Bok" lyden (højere, skarpere)
function playBok(pitch = 1200, duration = 0.1) {
    initAudio();
    const now = audioContext.currentTime;
    
    // Skarp attack med flere harmonics
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(pitch, now);
    osc1.frequency.exponentialRampToValueAtTime(pitch * 0.7, now + duration);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc1.start(now);
    osc1.stop(now + duration);
    
    // Tilføj en sinus bølge for dybde
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(pitch * 0.6, now);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    gain2.gain.setValueAtTime(0.03, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
}

// Funktion til at lave "boook" lyden (lavere, længere)
function playBoook(pitch = 400, duration = 0.25) {
    initAudio();
    const now = audioContext.currentTime;
    
    // Lav frekvens oscillator
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(pitch, now);
    osc1.frequency.exponentialRampToValueAtTime(pitch * 0.8, now + duration);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc1.start(now);
    osc1.stop(now + duration);
    
    // Tilføj en sawtooth for mere tekstur
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(pitch * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(pitch * 1.2, now + duration);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    gain2.gain.setValueAtTime(0.02, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
}

// Funktion til at afspille "Bok boook!"
function playBokBoook() {
    const now = audioContext.currentTime;
    
    // Bok
    playBok(1200, 0.1);
    
    // Pause
    setTimeout(() => {
        playBoook(400, 0.25);
    }, 150);
    
    // Tilføj en cluck i slutningen
    setTimeout(() => {
        playCluck(900, 0.1);
    }, 400);
}

// Funktion til at afspille højere version "BOK BOOOK!"
function playHighBokBoook() {
    const now = audioContext.currentTime;
    
    // Højere Bok
    playBok(1600, 0.1);
    
    // Pause
    setTimeout(() => {
        playBoook(550, 0.25);
    }, 150);
    
    // Tilføj en højere cluck
    setTimeout(() => {
        playCluck(1100, 0.1);
    }, 400);
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
    playBokBoook();
    
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
    playHighBokBoook();
    
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
