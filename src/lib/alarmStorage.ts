import AsyncStorage from '@react-native-async-storage/async-storage';
import { cancelAlarm, scheduleAlarm } from './alarmScheduler';

export interface Alarm {
  id: string;
  time: Date;
  label: string;
  repeat: string[];
  isEnabled: boolean;
  soundUri?: string;
  notifId?: string;
}

const ALARMS_KEY = '@alarms'

export const saveAlarm = async (alarm: Alarm): Promise<void> => {
    try {
        const existingAlarms = await getAlarms();

        // Schedule alarm notification and store its ID
        const notifId = await scheduleAlarm(alarm);
        const alarmWithNotif = { ...alarm, notifId }

        const updatedAlarms = [...existingAlarms, alarmWithNotif];
        await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(updatedAlarms));
    }
    catch (error) {
        console.error('Error saving alarm: ', error)
        throw error;
    }
};

export const getAlarms = async (): Promise<Alarm[]> => {
    try {
        const alarmsJson = await AsyncStorage.getItem(ALARMS_KEY);

        if(!alarmsJson) return [];

        const alarms = JSON.parse(alarmsJson);

        // Convert time strings to Date objects
        return alarms.map((alarm: any) => ({
            ...alarm,
            time: new Date(alarm.time),
        }));
    }
    catch (error) {
        console.error('Error getting alarms: ', error);
        return [];
    }
};

export const updateAlarm = async (id: string, updates: Partial<Alarm>): Promise<void> => {
    try {
        const alarms = await getAlarms();
        const existing = alarms.find(a => a.id === id);

        if (!existing) return;

        // Reschedule or cancel depending on the toggle action
        if (updates.isEnabled === true) {
            const notifId = await scheduleAlarm({ ...existing, ...updates });
            updates.notifId = notifId;
        } 
        else if (updates.isEnabled === false) {
            if (existing.notifId) await cancelAlarm(existing.notifId);
            updates.notifId = undefined;
        }

        const updatedAlarms = alarms.map(alarm =>
            alarm.id === id ? { ...alarm, ...updates } : alarm
        );
        await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(updatedAlarms));
    }
    catch (error) {
        console.error('Error updating alarm: ', error);
        throw error;
    }
}

export const deleteAlarm = async (id: string): Promise<void> => {
    try {
        const alarms = await getAlarms();
        const alarm = alarms.find(a => a.id === id);

        // Cancel the scheduled notification first
        if (alarm?.notifId) await cancelAlarm(alarm.notifId)
        
        // Delete the alarm (filter it out)
        const filteredAlarms = alarms.filter(alarm => alarm.id !== id);
        await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(filteredAlarms));
    }
    catch (error) {
        console.error('Error deleting alarm: ', error);
        throw error;
    }
}