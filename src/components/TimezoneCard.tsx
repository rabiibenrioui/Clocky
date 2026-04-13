import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TimezoneCardProps {
    city: string;
    region: string;
    utcOffset: number; // hours from UTC, e.g. 5.5 for IST
    onLongPress?: () => void;
}

function getTimeInOffset(utcOffset: number): string {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    const target = new Date(utcMs + utcOffset * 3_600_000);

    let hours = target.getHours();
    const minutes = target.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}

function getOffsetLabel(utcOffset: number): string {
    const localOffset = -new Date().getTimezoneOffset() / 60;
    const diff = utcOffset - localOffset;

    if (diff === 0) return "Same time";
    const sign = diff > 0 ? "+" : "-";
    const absDiff = Math.abs(diff);
    const hrs = Math.floor(absDiff);
    const mins = Math.round((absDiff - hrs) * 60);
    const label = mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    return `${sign}${label}`;
}

export default function TimezoneCard({ city, region, utcOffset, onLongPress }: TimezoneCardProps) {
    const [timeStr, setTimeStr] = useState(() => getTimeInOffset(utcOffset));
    const offsetLabel = getOffsetLabel(utcOffset);

    useEffect(() => {
        const timer = setInterval(() => setTimeStr(getTimeInOffset(utcOffset)), 1000);
        return () => clearInterval(timer);
    }, [utcOffset]);

    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            delayLongPress={250}
            activeOpacity={0.5}
            className="flex-row justify-between items-center"
        >
            {/* Left: city + offset label */}
            <View>
                <Text className="text-[20px] text-gray-900">{city}</Text>
                <Text className="text-sm text-gray-500 mt-0.5">
                    {region} · {offsetLabel}
                </Text>
            </View>

            {/* Right: live time */}
            <Text className="text-[26px] font-light text-gray-900 tracking-tight">
                {timeStr}
            </Text>
        </TouchableOpacity>
    );
}