import { Audio } from 'expo-av';

let _sound: Audio.Sound | null = null;

const RINGTONES: Record<string, any> = {
    '1': require('../../assets/sounds/morning.mp3'),
    '2': require('../../assets/sounds/home.mp3'),
    '3': require('../../assets/sounds/retro.mp3'),
    '4': require('../../assets/sounds/guitar.mp3'),
    '5': require('../../assets/sounds/oxygen.mp3'),
    '6': require('../../assets/sounds/neon.mp3')
};

/**
 * Plays the alarm sound on a loop.
 * Safe to call multiple times — stops any previous instance first.
 */
export async function playAlarm(ringtoneId: string = '1') {
    await stopAlarm(); // stop any previous sound first

    try {
        // Allow sound to play over silent switch on iOS, and in background
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
        });

        const soundFile = RINGTONES[ringtoneId] || RINGTONES['1'];

        const { sound } = await Audio.Sound.createAsync(
            soundFile,
            { shouldPlay: true, isLooping: true, volume: 1.0 }
        );

        _sound = sound;
    } catch (e) {
        console.error('[AlarmSound] Failed to play alarm sound:', e);
    }
}

/**
 * Stops and unloads the currently playing alarm sound.
 */
export async function stopAlarm() {
    if (_sound) {
        try {
            await _sound.stopAsync();
            await _sound.unloadAsync();
        } catch (_) {}
        _sound = null;
    }
}