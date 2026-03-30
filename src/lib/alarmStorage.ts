import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alarm {
  id: string;
  time: Date;
  label: string;
  repeat: string[];
  isEnabled: boolean;
  soundUri?: string;
}

const ALARMS_KEY = '@alarms'

export const saveAlarm = async (alarm: Alarm): Promise<void> => {
    try {
        const existingAlarms = await getAlarms();
        const updatedAlarms = [...existingAlarms, alarm];
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
        const filteredAlarms = alarms.filter(alarm => alarm.id !== id);
        await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(filteredAlarms));
    }
    catch (error) {
        console.error('Error deleting alarm: ', error);
        throw error;
    }
}