import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Alarm } from './alarmStorage';

// How notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// Create the Android notification channel (must be done before scheduling)
// Android 8+ requires a channel — without one, no sound plays at all.
export async function setupNotificationChannel() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('clocky-alarm', {
            name: 'Alarms',
            importance: Notifications.AndroidImportance.MAX,
            sound: 'alarm',           // references assets/sounds/alarm.mp3 (no extension) in dev builds
            vibrationPattern: [0, 500, 500, 500],
            enableVibrate: true,
            bypassDnd: true,          // ring even in Do Not Disturb mode
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        });
    }
}

// Call once at app startup to ensure permissions are requested
export async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

// Schedule an alarm
export async function scheduleAlarm(alarm: Alarm): Promise<string> {
    const alarmTime = new Date(alarm.time);

    // Build the fire date
    const fire = new Date();
    fire.setHours(alarmTime.getHours(), alarmTime.getMinutes(), 0, 0);

    // If that time has already passed today, push it to tomorrow
    const now = new Date();
    if (fire <= now) fire.setDate(fire.getDate() + 1);

    const notifId = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Clocky Alarm',
            body: alarm.label || alarmTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            sound: 'alarm.mp3',       // iOS + dev builds; Expo Go falls back to system default
            data: {
                alarmId: alarm.id,
                screen: 'ring-alarm'
            }
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: fire,
            channelId: 'clocky-alarm',  // Android: attach to our high-priority channel
        }
    });

    return notifId;
}

// Cancel an alarm by its notification ID
export async function cancelAlarm(notifId: string) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
}