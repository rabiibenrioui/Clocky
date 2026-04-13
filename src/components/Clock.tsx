import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { formatTime, formatDate } from "@/lib/utils";

interface ClockProps {
    time?: Date;
    mode?: "live" | "static" | "display";
    clockSize?: number;
    periodSize?: number;
}

export default function ClockComponent({ time, mode = "live", clockSize = 72, periodSize = 22 }: ClockProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (mode !== "live") return;

        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    const displayTime = mode === "live" ? currentTime : time ?? new Date();
    const formattedTime = formatTime(displayTime);

    // Don't show seconds in the 'add-alarm' screen
    const clock = mode === "live"
                    ? `${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}`
                    : `${formattedTime.hours}:${formattedTime.minutes}`;
    
    // Don't show date in the 'add-alarm' screen
    const dateLabel = mode === "live" ? formatDate(currentTime) : null

    return (
        <View className="justify-center items-center">
            <View className="flex-row items-baseline gap-x-1.5">

                <Text style={{ fontSize: clockSize }} className="font-light text-gray-900 tracking-tighter">
                    {clock}
                </Text>

                <Text style={{ fontSize: periodSize }} className="font-medium text-gray-700">
                    {formattedTime.period}
                </Text>

            </View>

            {dateLabel && (
                <Text className="text-lg font-medium text-gray-700">
                    {dateLabel}
                </Text>
            )}
        </View>
    )
}