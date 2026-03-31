import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";

interface AlarmCardProps {
    time: string;
    period: string;
    label: string;
    frequency: string;
    enabled: boolean;

    onLongPress?: (pos: { x: number; y: number; topY: number }) => void;
}

export default function AlarmCard({ time, period, label, frequency, enabled, onLongPress }: AlarmCardProps) {
    return (
        <TouchableOpacity 
          className="flex-row justify-between items-center" 
          onLongPress={(e) => {
            const { pageX, pageY, locationY } = e.nativeEvent;
            onLongPress?.({ x: pageX, y: pageY, topY: pageY - locationY })
          }} >
            
            {/* Alarm details */}
            <View className="flex flex-col">

                <View className="flex-row items-baseline gap-1">
                    <Text className="text-[32px] font-light text-gray-800 tracking-tighter">{time}</Text>
                    <Text className="text-sm">{period}</Text>
                </View>

                <View className="flex-row gap-x-1.5 mt-[-2px]">
                    <Text className="text-[12px] text-gray-600">{label},</Text>
                    <Text className="text-[12px] text-gray-600">{frequency}</Text>
                </View>

            </View>

            {/* Alarm toggle switch */}
            <ToggleSwitch enabled={enabled}/>

        </TouchableOpacity>
    )
}