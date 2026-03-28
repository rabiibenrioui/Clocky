export type Day = 
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export interface Alarm {
  id: string;
  hour: number;
  minute: number;
  period: string;
  label: string;
  repeat: Day[];
  ringtone: string;
  snoozeMinutes: number;
  enabled: boolean;
  vibrate: boolean
}