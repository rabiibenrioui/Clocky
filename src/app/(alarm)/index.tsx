import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Clock from "@/components/Clock"
import AlarmCard from "@/components/AlarmCard";

export default function Alarm() {
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
            
                <View className="flex-col gap-y-24 mt-14">
                    
                    {/* Alarm */}
                    <View>
                        <Clock />
                    </View>

                    {/* Alarms list */}
                    <View className="flex-col gap-y-4 px-4">
                        <AlarmCard time="12:45" period="AM" label="Alarm" frequency="Every Day" />
                        <AlarmCard time="11:30" period="AM" label="Alarm" frequency="Every Day" />
                        <AlarmCard time="06:00" period="PM" label="Alarm" frequency="Once" />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}