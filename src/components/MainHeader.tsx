import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainHeaderProps {
    title: string;
}

export default function MainHeader({ title }: MainHeaderProps) {
    // Dropdown menu
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <SafeAreaView className="pt-6 pb-4 px-4">
            <View className="flex-row justify-between items-center">

                <Text className="text-2xl font-medium color-neutral-800">{title}</Text>

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
                            <View className="bg-white rounded-xl shadow-lg w-48 py-2">
                                
                                {/* Options */}
                                <TouchableOpacity className="px-4 py-2" onPress={() => setMenuVisible(false)}>
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
    )
}