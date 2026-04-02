import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { playAlarm } from './useAlarmSound';

export const ALARM_BACKGROUND_TASK = 'CLOCKY_ALARM_BACKGROUND_TASK';

/**
 * Defines the background task that plays the alarm sound when the OS
 * wakes the app after a notification fires (best-effort on both platforms).
 * Must be called at module/root level — before any component mounts.
 */
try {
    TaskManager.defineTask(ALARM_BACKGROUND_TASK, async () => {
        try {
            await playAlarm();
        } catch (e) {
            console.error('[BackgroundTask] Failed to play alarm:', e);
        }
    });
} catch (error) {
    console.warn('[BackgroundTask] TaskManager not available. This is expected if you haven\'t rebuilt the dev client yet.');
}

export const registerAlarmTask = async () => {
    try {
        await Notifications.registerTaskAsync(ALARM_BACKGROUND_TASK);
    } catch (error) {
        console.error('[BackgroundTask] Registration failed:', error);
    }
};
