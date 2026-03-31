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

/// Repeat days data ///
export const repeatModalOptions = [
    { id: "Mon", label: "Monday" },
    { id: "Tue", label: "Tuesday" },
    { id: "Wed", label: "Wednesday" },
    { id: "Thu", label: "Thursday" },
    { id: "Fri", label: "Friday" },
    { id: "Sat", label: "Saturday" },
    { id: "Sun", label: "Sunday" },
];

// Format the label better (instead of showing the full week --> just show "Every Day")
export const formatRepeatLabel = (days: string[]): string => {
    if (!days || days.length === 0) return "Once";

    if (days.length === 7) return "Every day";
    
    const hasWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"].every(d => days.includes(d));
    const hasWeekends = ["Sat", "Sun"].every(d => days.includes(d));

    if (days.length === 5 && hasWeekdays) return "Weekdays";
    if (days.length === 2 && hasWeekends) return "Weekends";

    // Sort days according to chronological order from Monday
    const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sortedDays = [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return sortedDays.join(", ");
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

/// Ringtone Data ///
export const ringtoneOptions = [
    { id: '1', name: 'Default' },
    { id: '2', name: 'Radar' },
    { id: '3', name: 'Beacon' },
    { id: '4', name: 'Chimes' },
    { id: '5', name: 'Circuit' },
    { id: '6', name: 'Reflection' }
];

export const ringtoneModalOptions = ringtoneOptions.map(opt => ({
    id: opt.id,
    label: opt.name
}));

export const getSelectedRingtoneValue = (selectedId: string) => {
    const selected = ringtoneOptions.find(opt => opt.id === selectedId);
    return selected ? selected.name : 'Default';
};