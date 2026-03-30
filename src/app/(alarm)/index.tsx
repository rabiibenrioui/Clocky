import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";

import Clock from "@/components/Clock"
import AlarmCard from "@/components/AlarmCard";
import { useCallback, useState } from "react";
import { getAlarms, type Alarm } from "@/lib/alarmStorage";
import { formatRepeatLabel } from "@/lib/utils";

export default function Alarm() {
    // expo router
    const router = useRouter();

    // alarms state
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    // Load alarms whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadAlarms();
        }, [])
    )

    const loadAlarms = async () => {
        try {
            const savedAlarms = await getAlarms();
            setAlarms(savedAlarms);
        }
        catch (error) {
            console.error("Error loading alarms: ", error);
        }
    }
    
    // Spacing value
    let spacingBottom = alarms.length * 50;

    return (
        <SafeAreaView className="flex-1">
            <FlatList
              data={alarms}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: spacingBottom }}
              ListHeaderComponent={() => (
                <View className="mt-14 mb-8">
                    <Clock mode="live" />
                </View>
              )}
              renderItem={({ item }) => (
                <AlarmCard 
                  time={item.time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }).split(' ')[0]}
                  period={item.time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }).split(' ')[1]}
                  label={item.label}
                  frequency={formatRepeatLabel(item.repeat)}
                  enabled={item.isEnabled}
                />
              )}
              ItemSeparatorComponent={() => <View className="h-4" />}
              className="px-4"
              decelerationRate="fast"
              snapToAlignment="start"
            />

            {/* Add alarm */}
            <View className="absolute bottom-28 left-0 right-0 items-center z-50 bg-transparent">
                <View className="bg-blue-500 p-4 rounded-full shadow-lg">
                    
                    <TouchableOpacity onPress={() => router.push("/(alarm)/add-alarm")}>
                        <Ionicons name="add" size={28} color={"#fff"}/>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}