import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AlarmCardProps {
    time: string;
    period: string;
    label: string;
    frequency: string;
}

export default function AlarmCard({ time, period, label, frequency }: AlarmCardProps) {
    // alarm toggle
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(isEnabled => !isEnabled)
    }
    
    return (
        <View className="flex-row justify-between items-center">
            
            <View className="flex flex-col">

                <View className="flex-row items-baseline gap-1">
                    <Text className="text-[32px] font-light text-gray-800 tracking-tighter">{time}</Text>
                    <Text className="text-sm">{period}</Text>
                </View>

                <View className="mt-[-2px]">
                    <Text className="text-[12px] text-gray-600">{label}, {frequency}</Text>
                </View>

            </View>

            <View>
                <TouchableOpacity onPress={toggleSwitch}>
                    <Ionicons 
                      name={isEnabled ? "toggle" : "toggle"} 
                      size={36} 
                      color={isEnabled ? "#1E6FFE" : "#52525250"}
                      style={{
                        transform: [{ scaleX: isEnabled ? 1 : -1 }]
                      }}
                      />
                </TouchableOpacity>
            </View>

        </View>
    )
}