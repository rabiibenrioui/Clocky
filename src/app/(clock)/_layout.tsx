import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClockLayout() {
    return (
        <Stack 
          screenOptions={{
            header: () => (
                <SafeAreaView className="pt-6 pb-4 px-3">
                    <View className="flex-row justify-between items-center">

                        <Text className="text-2xl font-medium color-neutral-800">Clock</Text>

                        <TouchableOpacity>
                            <Ionicons name="ellipsis-vertical" size={20}/>
                        </TouchableOpacity>
                        
                    </View>
                </SafeAreaView>
            ),
        }}>

            <Stack.Screen name="index" options={{ title: "Clock" }} />

        </Stack>
    )
}