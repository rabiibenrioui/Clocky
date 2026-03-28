export interface FormattedTime {
    hours: string;
    minutes: string;
    seconds: string;
    period: string;
}

// Time formatter
export const formatTime = (date: Date): FormattedTime => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return {
        hours: String(displayHours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        period,
    };
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Date formatter
export const formatDate = (date: Date): string => {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

/* Data */

// Dummy Alarm data
export const alarms = [
    { id: '1', time: "12:45", period: "AM", label: "Alarm", frequency: "Every Day", isOn: true },
    { id: '2', time: "11:30", period: "AM", label: "Alarm", frequency: "Every Day", isOn: true },
    { id: '3', time: "06:00", period: "PM", label: "Alarm", frequency: "Once", isOn: false },
    { id: '4', time: "07:00", period: "AM", label: "Alarm", frequency: "Mon, Tue, Wed", isOn: true },
    //{ id: '5', time: "09:00", period: "PM", label: "Alarm", frequency: "Weekdays", isOn: true },
    //{ id: '6', time: "07:00", period: "AM", label: "Alarm", frequency: "Every Day", isOn: false },
    //{ id: '7', time: "09:00", period: "PM", label: "Alarm", frequency: "Weekdays", isOn: false },
    //{ id: '8', time: "07:00", period: "AM", label: "Alarm", frequency: "Every Day", isOn: false },
    //{ id: '9', time: "09:00", period: "PM", label: "Alarm", frequency: "Weekdays", isOn: true },
];

/// Repeat days data ///
export const repeatOptions = [
    { id: "1", day: "Once" },
    { id: "2", day: "Every day" },
    { id: "3", day: "Weekdays" },
    { id: "4", day: "Weekends" },
    { id: "5", day: "Monday" },
    { id: "6", day: "Tuesday" },
    { id: "7", day: "Wednesday" },
    { id: "8", day: "Thursday" },
    { id: "9", day: "Friday" },
    { id: "10", day: "Saturday" },
    { id: "11", day: "Sunday" },
];

// Convert for modal
export const repeatModalOptions = repeatOptions.map(opt => ({
    id: opt.id,
    label: opt.day
}));

// Get selected repeat value
export const getSelectedRepeatValue = (selectedId: string) => {
    const selected = repeatOptions.find(opt => opt.id === selectedId);
    return selected ? selected.day : 'Never';
};

/// Snooze Data ///
export const snoozeOptions = [
    { id: '1', duration: 5},
    { id: '2', duration: 10},
    { id: '3', duration: 15},
    { id: '4', duration: 20},
    { id: '5', duration: 25},
    { id: '6', duration: 30}
]

// Convert for modal
export const snoozeModalOptions = snoozeOptions.map(opt => ({
    id: opt.id,
    label: `${opt.duration} minutes`
}))

// Extract selected snooze name from its id
export const getSelectedSnoozeValue = (selectedId:string) => {
    const selected = snoozeOptions.find(opt => opt.id === selectedId);
    return selected ? `${selected.duration} minutes` : '';
};