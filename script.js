// Bok Bok Spil - Kyllingelyde med butik, græs og rumskib

// Lydkontekst (Web Audio API)
let audioContext;
let isAudioStarted = false;

// Spil state
let money = 0;
let hasSpaceship = false;
const spaceshipPrice = 100;
const grassValue = 10; // Hvor mange penge man får per græs

// ========== FUNKTIONER ==========

// Funktion til at starte audio kontekst
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Kunne ikke oprette AudioContext:', e);
            return false;
        }
    }
    if (!isAudioStarted && audioContext) {
        try {
            // Opret en kort lyd for at starte konteksten
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = 0.01;
            oscillator.start();
            oscillator.stop(0.1);
            isAudioStarted = true;
        } catch (e) {
            console.log('Kunne ikke starte audio:', e);
            return false;
        }
    }
    return true;
}

// Funktion til at lave en kyllinges "cluck" lyd
function playCluck(pitch = 800, duration = 0.15) {
    if (!initAudio() || !audioContext) return;
    
    const now = audioContext.currentTime;
    
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(pitch, now);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + duration * 0.3);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc1.start(now);
    osc1.stop(now + duration);
    
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

function playBok(pitch = 1200, duration = 0.1) {
    if (!initAudio() || !audioContext) return;
    
    const now = audioContext.currentTime;
    
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

function playBoook(pitch = 400, duration = 0.25) {
    if (!initAudio() || !audioContext) return;
    
    const now = audioContext.currentTime;
    
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
    playBok(1200, 0.1);
    setTimeout(() => {
        playBoook(400, 0.25);
    }, 150);
    setTimeout(() => {
        playCluck(900, 0.1);
    }, 400);
}

// Funktion til at afspille højere version "BOK BOOOK!"
function playHighBokBoook() {
    playBok(1600, 0.1);
    setTimeout(() => {
        playBoook(550, 0.25);
    }, 150);
    setTimeout(() => {
        playCluck(1100, 0.1);
    }, 400);
}

// Funktion til at vise tekst med animation
function showSoundText(text, color = '#FF6347') {
    const soundDisplay = document.getElementById('soundDisplay');
    if (soundDisplay) {
        soundDisplay.textContent = text;
        soundDisplay.style.color = color;
        soundDisplay.classList.add('pulse');
        
        setTimeout(() => {
            soundDisplay.classList.remove('pulse');
        }, 500);
    }
}

// Funktion til at animere kyllingen
function animateChicken() {
    const chicken = document.getElementById('chicken');
    if (chicken) {
        chicken.classList.add('shake');
        setTimeout(() => {
            chicken.classList.remove('shake');
        }, 500);
    }
}

// Funktion til at animere ægget
function animateEgg() {
    const egg = document.getElementById('egg');
    if (egg) {
        egg.classList.add('shake');
        setTimeout(() => {
            egg.classList.remove('shake');
        }, 500);
    }
}

// Funktion til at skifte skærm
function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('hidden');
        screen.classList.add('active');
    }
}

// Funktion til at opdatere penge-display
function updateMoneyDisplay() {
    const moneyCounter = document.getElementById('moneyCounter');
    const buySpaceshipButton = document.getElementById('buySpaceship');
    
    if (moneyCounter) {
        moneyCounter.textContent = money;
    }
    
    if (buySpaceshipButton) {
        if (money >= spaceshipPrice) {
            buySpaceshipButton.disabled = false;
        } else {
            buySpaceshipButton.disabled = true;
        }
    }
}

// Funktion til at oprette græs
function createGrass() {
    const grassContainer = document.getElementById('grassContainer');
    if (!grassContainer) return;
    
    const grass = document.createElement('div');
    grass.className = 'grass';
    grass.addEventListener('click', () => {
        playCluck(1000, 0.1);
        
        money += grassValue;
        updateMoneyDisplay();
        
        const plusMoney = document.createElement('div');
        plusMoney.style.cssText = `
            position: absolute;
            color: #2E8B57;
            font-weight: bold;
            font-size: 1.2em;
            top: ${Math.random() * 50}px;
            left: ${Math.random() * 50}px;
            animation: floatUp 1s ease-out forwards;
        `;
        plusMoney.textContent = `+${grassValue} 💵`;
        grass.appendChild(plusMoney);
        
        setTimeout(() => {
            plusMoney.remove();
        }, 1000);
        
        grass.style.opacity = '0';
        grass.style.transform = 'scale(0)';
        setTimeout(() => {
            grass.remove();
            createGrass();
        }, 300);
    });
    
    grassContainer.appendChild(grass);
}

// Opret initialt græs
function initGrass() {
    const grassContainer = document.getElementById('grassContainer');
    if (grassContainer) {
        grassContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            createGrass();
        }
    }
}

// Funktion til at flyve til månen
function flyToMoon() {
    const rocketElement = document.querySelector('.rocket');
    const moonElement = document.querySelector('.moon');
    
    if (rocketElement) rocketElement.classList.add('flying');
    if (moonElement) moonElement.classList.add('flying');
    
    if (!initAudio() || !audioContext) {
        setTimeout(() => {
            showScreen('moonScreen');
            if (rocketElement) rocketElement.classList.remove('flying');
            if (moonElement) moonElement.classList.remove('flying');
        }, 3000);
        return;
    }
    
    const now = audioContext.currentTime;
    
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = noiseBuffer;
    const noiseGain = audioContext.createGain();
    noise.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 2);
    noise.connect(filter);
    filter.connect(noiseGain);
    
    noiseGain.gain.setValueAtTime(0.1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 2);
    noise.start(now);
    noise.stop(now + 2);
    
    setTimeout(() => {
        showScreen('moonScreen');
        
        setTimeout(() => {
            if (rocketElement) rocketElement.classList.remove('flying');
            if (moonElement) moonElement.classList.remove('flying');
        }, 100);
    }, 3000);
}

// ========== HOVEDKODE (KØRER NÅR DOM ER LOADED) ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - spil startet');
    
    // DOM elementer
    const bokButton = document.getElementById('bokButton');
    const egg = document.getElementById('egg');
    const eggButtonContainer = document.getElementById('eggButtonContainer');
    const eggButton = document.getElementById('eggButton');
    const soundDisplay = document.getElementById('soundDisplay');
    const chicken = document.getElementById('chicken');
    
    // Nye elementer til butik
    const startScreen = document.getElementById('startScreen');
    const shopScreen = document.getElementById('shopScreen');
    const moonScreen = document.getElementById('moonScreen');
    const moneyCounter = document.getElementById('moneyCounter');
    const grassContainer = document.getElementById('grassContainer');
    const buySpaceshipButton = document.getElementById('buySpaceship');
    const backToStartButton = document.getElementById('backToStart');
    const backToShopButton = document.getElementById('backToShop');
    const rocketElement = document.querySelector('.rocket');
    const moonElement = document.querySelector('.moon');
    
    // Hovedknap - Bok boook!
    if (bokButton) {
        bokButton.addEventListener('click', () => {
            console.log('Bok knap trykket');
            playBokBoook();
            showSoundText('Bok boook! 🐔');
            animateChicken();
            
            setTimeout(() => {
                if (egg) egg.classList.remove('hidden');
                if (eggButtonContainer) eggButtonContainer.classList.remove('hidden');
            }, 500);
            
            bokButton.disabled = true;
            bokButton.style.opacity = '0.6';
            bokButton.textContent = '✓ Trykket!';
            
            setTimeout(() => {
                bokButton.disabled = false;
                bokButton.style.opacity = '1';
                bokButton.innerHTML = '<span class="button-text">Tryk her for at sige BOK!</span><span class="button-emoji">🐣</span>';
            }, 2000);
        });
    } else {
        console.log('bokButton ikke fundet');
    }

    // Æg knap - Gå til butik
    if (eggButton) {
        eggButton.addEventListener('click', () => {
            console.log('Æg knap trykket');
            playHighBokBoook();
            showSoundText('BOK BOOOK! 🥚🎵', '#FF8C00');
            animateEgg();
            
            if (egg) {
                egg.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    egg.style.transform = 'scale(1)';
                }, 300);
            }
            
            eggButton.disabled = true;
            eggButton.style.opacity = '0.6';
            eggButton.textContent = '✓ Går til butik!';
            
            setTimeout(() => {
                showScreen('shopScreen');
                initGrass();
                updateMoneyDisplay();
            }, 1000);
        });
    } else {
        console.log('eggButton ikke fundet');
    }

    // Køb rumskib
    if (buySpaceshipButton) {
        buySpaceshipButton.addEventListener('click', () => {
            console.log('Køb rumskib knap trykket');
            if (money >= spaceshipPrice) {
                money -= spaceshipPrice;
                hasSpaceship = true;
                updateMoneyDisplay();
                
                const message = document.createElement('div');
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: #FFD700;
                    padding: 20px 40px;
                    border-radius: 15px;
                    font-size: 1.5em;
                    font-weight: bold;
                    z-index: 1000;
                    animation: pulse 1s ease;
                `;
                message.textContent = 'Du købte et rumskib! 🚀';
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.remove();
                    flyToMoon();
                }, 2000);
            }
        });
    }

    // Tilbage til start
    if (backToStartButton) {
        backToStartButton.addEventListener('click', () => {
            showScreen('startScreen');
            if (egg) egg.classList.add('hidden');
            if (eggButtonContainer) eggButtonContainer.classList.add('hidden');
            if (bokButton) {
                bokButton.innerHTML = '<span class="button-text">Tryk her for at sige BOK!</span><span class="button-emoji">🐣</span>';
                bokButton.disabled = false;
                bokButton.style.opacity = '1';
            }
            if (eggButton) {
                eggButton.innerHTML = '<span>Tryk på ægget!</span><span class="egg-emoji">🥚</span>';
                eggButton.disabled = false;
                eggButton.style.opacity = '1';
            }
        });
    }

    // Tilbage til butik
    if (backToShopButton) {
        backToShopButton.addEventListener('click', () => {
            showScreen('shopScreen');
            if (rocketElement) rocketElement.classList.remove('flying');
            if (moonElement) moonElement.classList.remove('flying');
        });
    }

    // Tastatur support
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && startScreen && startScreen.classList.contains('active')) {
            if (eggButtonContainer && !eggButtonContainer.classList.contains('hidden')) {
                e.preventDefault();
                if (eggButton) eggButton.click();
            } else {
                e.preventDefault();
                if (bokButton) bokButton.click();
            }
        }
    });

    // Tilføj touch support
    if (bokButton) {
        bokButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            bokButton.classList.add('active');
        });

        bokButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            bokButton.classList.remove('active');
            bokButton.click();
        });
    }

    if (eggButton) {
        eggButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            eggButton.classList.add('active');
        });

        eggButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            eggButton.classList.remove('active');
            eggButton.click();
        });
    }

    if (buySpaceshipButton) {
        buySpaceshipButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            buySpaceshipButton.classList.add('active');
        });

        buySpaceshipButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            buySpaceshipButton.classList.remove('active');
            if (!buySpaceshipButton.disabled) {
                buySpaceshipButton.click();
            }
        });
    }

    // Check for audio support
    if (!window.AudioContext && !window.webkitAudioContext) {
        console.log('Web Audio API not supported');
        const audioWarning = document.createElement('div');
        audioWarning.style.cssText = 'background: #FFFACD; padding: 10px; border-radius: 5px; margin: 10px 0; color: #8B4513;';
        audioWarning.textContent = 'Lyd understøttes ikke i din browser. Du kan stadig spille!';
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.prepend(audioWarning);
        }
    }

    // CSS animation for floatUp
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);

    // Vis instruktioner ved start
    setTimeout(() => {
        showSoundText('Tryk på knappen for at starte! 🎮', '#FF6347');
    }, 500);
});

// Service Worker registration and update handling
let serviceWorkerRegistration = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/bokbok/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful:', registration.scope);
                serviceWorkerRegistration = registration;
                
                // Check for updates periodically
                setInterval(checkForUpdates, 60000); // Check every minute
                
                // Listen for update messages from service worker
                navigator.serviceWorker.addEventListener('message', (event) => {
                    if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
                        showUpdateNotification(event.data.version);
                    }
                });
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Check for service worker updates
function checkForUpdates() {
    if (!serviceWorkerRegistration) return;
    
    serviceWorkerRegistration.update().then((registration) => {
        if (registration.waiting) {
            console.log('New version available');
            showUpdateNotification('Ny version');
        }
    }).catch((error) => {
        console.log('Update check failed:', error);
    });
}

// Show update notification to user
function showUpdateNotification(version) {
    // Check if notification already exists
    if (document.getElementById('updateNotification')) return;
    
    const notification = document.createElement('div');
    notification.id = 'updateNotification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #FF6347, #FF8C00);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        font-size: 1em;
        font-weight: bold;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <span>🆕 Ny version tilgængelig!</span>
        <button id="updateButton" style="
            background: white;
            color: #FF6347;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        ">Genindlæs</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add click handler for update button
    const updateButton = notification.querySelector('#updateButton');
    updateButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
        
        // Skip waiting and reload
        if (serviceWorkerRegistration && serviceWorkerRegistration.waiting) {
            serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 10000);
}

// Faldback hvis DOMContentLoaded ikke virker
window.addEventListener('load', () => {
    console.log('Window loaded fallback');
});
