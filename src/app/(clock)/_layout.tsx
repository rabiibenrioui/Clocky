import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClockLayout() {
    // Dropdown menu
    const [menuVisible, setMenuVisible] = useState(false);
    
    return (
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: '#fafafa' },
            header: () => (
                <SafeAreaView className="pt-6 pb-4 px-3">
                    <View className="flex-row justify-between items-center">

                        <Text className="text-2xl font-medium color-neutral-800">Clock</Text>

                        {/* Dropdown menu */}

                        {/* Button */}
                        <TouchableOpacity onPress={() => setMenuVisible(true)}>
                            <Ionicons name="ellipsis-vertical" size={20}/>
                        </TouchableOpacity>

                        {/* Menu view */}
                        <Modal
                          visible={menuVisible}
                          transparent={true}
                          animationType="fade"
                          onRequestClose={() => setMenuVisible(false)}
                        >
                            {/* Backdrop */}
                            <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
                                <View className="flex-1 items-end pt-14 pr-8">
                                    {/* Menu container */}
                                    <View className="bg-white rounded-lg shadow-lg w-40 py-2">
                                        
                                        {/* Options */}
                                        <TouchableOpacity className="px-4 py-3" onPress={() => setMenuVisible(false)}>
                                            <Text className="text-base">Theme: Light</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="px-4 py-3" onPress={() => setMenuVisible(false)}>
                                            <Text className="text-base">About</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                        
                    </View>
                </SafeAreaView>
            ),
        }}>

            <Stack.Screen name="index" options={{ title: "Clock" }} />

        </Stack>
    )
}