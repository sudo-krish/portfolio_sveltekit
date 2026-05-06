/**
 * Procedural 8-bit Sound Manager using the Web Audio API.
 * Generates retro square-wave / triangle-wave sounds with zero external dependencies.
 * All sounds are synthesized on the fly — no .mp3 files needed.
 *
 * Audio only initializes after a user gesture (click on START ENCOUNTER)
 * to comply with browser autoplay policies.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;

/** Initialize the AudioContext. Must be called from a user gesture (click/tap). */
export function initAudio(): void {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.15; // Keep overall volume subtle — it's a portfolio, not a rave
    masterGain.connect(audioCtx.destination);
}

/** Toggle mute on/off */
export function toggleMute(): boolean {
    isMuted = !isMuted;
    if (masterGain) {
        masterGain.gain.value = isMuted ? 0 : 0.15;
    }
    return isMuted;
}

export function getMuted(): boolean {
    return isMuted;
}

// ─── INTERNAL HELPERS ──────────────────────────────────────────────

function playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'square',
    volume = 1.0,
    detune = 0
): void {
    if (!audioCtx || !masterGain) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;

    gain.gain.setValueAtTime(volume * 0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
}

function playNoise(duration: number, volume = 0.3): void {
    if (!audioCtx || !masterGain) return;

    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(volume * 0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    // Bandpass filter to make it less harsh
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start();
    noise.stop(audioCtx.currentTime + duration);
}

// ─── PUBLIC SOUND EFFECTS ──────────────────────────────────────────

/** Text blip — rapid, low-volume tick as each character types out */
export function playTextBlip(): void {
    // Alternate between two slightly different pitches for a more natural feel
    const freq = Math.random() > 0.5 ? 440 : 520;
    playTone(freq, 0.04, 'square', 0.15);
}

/** Button select — a crisp, satisfying click when the user selects a menu option */
export function playSelect(): void {
    playTone(660, 0.05, 'square', 0.4);
    setTimeout(() => playTone(880, 0.08, 'square', 0.3), 50);
}

/** Hit sound — a crunchy descending noise when an attack connects and deals damage */
export function playHit(): void {
    playTone(200, 0.15, 'sawtooth', 0.5);
    playNoise(0.12, 0.5);
    setTimeout(() => playTone(120, 0.2, 'square', 0.3), 80);
}

/** Block sound — a dull thud when the attack is blocked/evaded */
export function playBlock(): void {
    playTone(150, 0.15, 'triangle', 0.4);
    playNoise(0.08, 0.3);
}

/** Item unlock chime — an uplifting ascending arpeggio when a Key Item is obtained */
export function playItemUnlock(): void {
    const notes = [523, 659, 784, 1047]; // C5 → E5 → G5 → C6
    notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.2, 'square', 0.35), i * 100);
    });
}

/** Capture sound — a dramatic descending + ascending warble for the pokeball throw */
export function playCapture(): void {
    // Descending whistle
    if (!audioCtx || !masterGain) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.8);

    // Success ding after the wobble
    setTimeout(() => {
        const successNotes = [784, 988, 1175, 1568]; // G5→B5→D6→G6
        successNotes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 0.25, 'square', 0.3), i * 120);
        });
    }, 2500);
}

/** Error buzzer — a low buzz when trying to run or do something silly */
export function playError(): void {
    playTone(100, 0.15, 'sawtooth', 0.3);
    setTimeout(() => playTone(80, 0.2, 'sawtooth', 0.25), 100);
}

/** Menu open — a quick ascending blip when opening the command menu */
export function playMenuOpen(): void {
    playTone(440, 0.04, 'square', 0.2);
    setTimeout(() => playTone(660, 0.06, 'square', 0.25), 40);
}

/** Battle start — the iconic encounter jingle */
export function playBattleStart(): void {
    const melody = [
        { freq: 440, dur: 0.08 },
        { freq: 554, dur: 0.08 },
        { freq: 659, dur: 0.08 },
        { freq: 880, dur: 0.15 },
    ];
    melody.forEach((note, i) => {
        setTimeout(() => playTone(note.freq, note.dur, 'square', 0.4), i * 80);
    });
}
