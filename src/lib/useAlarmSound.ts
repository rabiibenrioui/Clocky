import { Audio } from 'expo-av';

let _sound: Audio.Sound | null = null;

/**
 * Plays the alarm sound on a loop.
 * Safe to call multiple times — stops any previous instance first.
 */
export async function playAlarm() {
    await stopAlarm(); // stop any previous sound first

    try {
        // Allow sound to play over silent switch on iOS, and in background
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
        });

        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/alarm.mp3'),
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
