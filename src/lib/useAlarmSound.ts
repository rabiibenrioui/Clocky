import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';

export function useAlarmSound() {
    const soundRef = useRef<Audio.Sound | null>(null);

    const stopAlarm = async () => {
        if (soundRef.current) {
            try {
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
            } catch (_) {}
            soundRef.current = null;
        }
    };

    const playAlarm = async () => {
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

            soundRef.current = sound;
        } catch (e) {
            console.error('[useAlarmSound] Failed to play alarm sound:', e);
        }
    };

    useEffect(() => {
        // Fires when a notification is received while the app is in the FOREGROUND
        const receivedSub = Notifications.addNotificationReceivedListener(() => {
            playAlarm();
        });

        // Fires when the user taps the notification (foreground or background)
        const responseSub = Notifications.addNotificationResponseReceivedListener(() => {
            stopAlarm();
        });

        return () => {
            receivedSub.remove();
            responseSub.remove();
            stopAlarm();
        };
    }, []);

    return { playAlarm, stopAlarm };
}
