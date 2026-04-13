import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomHeaderProps {
    title: string;
    shouldSave: boolean;
    onSave?: () => void;
}

export default function CustomHeader({ title, onSave, shouldSave }: CustomHeaderProps) {
    const router = useRouter();
    
    return (
        <SafeAreaView className="pt-6 pb-4 px-4">
            <View className="flex-row justify-between items-center">

                <View className="flex-row items-center gap-x-4">
                    
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close-outline" size={30} color="#555" />
                    </TouchableOpacity>
                    
                    <Text className="text-2xl font-medium color-neutral-800">{title}</Text>
                    
                </View>

                {shouldSave &&
                    <View>
                        <TouchableOpacity onPress={onSave}>
                            <Ionicons name="checkmark" size={30} color="#555" />
                        </TouchableOpacity>
                    </View>
                }
                
            </View>
        </SafeAreaView>
    )
}