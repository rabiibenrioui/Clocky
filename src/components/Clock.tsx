import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { formatTime, formatDate } from "@/lib/utils";

export default function ClockComponent() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    const time = formatTime(currentTime);

    return (
        <View className="justify-center items-center">
            <View className="flex-row items-baseline gap-1.5">

                <Text className="text-[72px] font-light text-gray-900 tracking-tighter">
                    {time.hours}:{time.minutes}:{time.seconds}
                </Text>

                <Text className="text-[22px] font-medium text-gray-700">
                    {time.period}
                </Text>

            </View>

            <Text className="text-lg font-medium text-gray-700">
                {formatDate(currentTime)}
            </Text>
        </View>
    )
}