import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Options {
    id: string;
    name: string;
}

interface OptionCardProps {
    title: string;
    value: string;
    onPress?: () => void;
}

export default function OptionCard({ title, value, onPress }: OptionCardProps) {
    return (
        <View>
            <TouchableOpacity className="flex-row justify-between items-center" onPress={onPress}>

                <View className="items-center">
                    <Text className="text-xl tracking-tighter">{title}</Text>
                </View>

                <View className="flex-row items-center justify-center gap-x-2">
                    <Text className="text-xl text-[#444]">{value}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#444" />
                </View>

            </TouchableOpacity>
        </View>
    )
}