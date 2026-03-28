import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Clock from "@/components/Clock"
import AlarmCard from "@/components/AlarmCard";
import { alarms } from "@/lib/utils";

export default function Alarm() {
    // expo router
    const router = useRouter();
    
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
                    <Clock />
                </View>
              )}
              renderItem={({ item }) => (
                <AlarmCard 
                  time={item.time}
                  period={item.period}
                  label={item.label}
                  frequency={item.frequency}
                  enabled={item.isOn}
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