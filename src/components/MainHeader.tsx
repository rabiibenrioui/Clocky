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
    // About overlay
    const [aboutVisible, setAboutVisible] = useState(false);

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
                        <View className="flex-1 items-end pt-20 pr-10">
                            {/* Menu container */}
                            <View className="bg-white rounded-xl shadow-lg w-48 py-1">
                                
                                {/* Options */}
                                <TouchableOpacity 
                                    className="px-4 py-3" 
                                    onPress={() => {
                                        setMenuVisible(false);
                                        setAboutVisible(true);
                                    }}
                                >
                                    <Text className="text-base">About</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Pressable>
                </Modal>

                {/* About overlay */}
                <Modal
                    visible={aboutVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setAboutVisible(false)}
                >
                    <Pressable 
                        className="flex-1 justify-center items-center bg-black/40 px-6" 
                        onPress={() => setAboutVisible(false)}
                    >
                        <Pressable 
                            className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
                            onPress={(e) => e.stopPropagation()}
                        >
                            <View className="flex-row justify-between items-center px-6 py-4">
                                <Text className="text-xl font-semibold text-gray-800">About</Text>
                                <TouchableOpacity 
                                    onPress={() => setAboutVisible(false)} 
                                    className="bg-gray-100 rounded-full h-8 w-8 items-center justify-center"
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="close" size={20} color="#555" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-col items-center gap-y-4 px-6 py-5">
                                <Text className="text-lg text-center text-gray-600 leading-relaxed">
                                    Clocky is a simple and easy-to-use clock app that helps you keep track of time. 
                                </Text>
                                <Text className="text-center text-gray-600 leading-relaxed">
                                    Made with <Text className="text-sm">{"💙"}</Text> by <Text className="text-gray-900">Rabii</Text>
                                </Text>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
                
            </View>
        </SafeAreaView>
    )
}