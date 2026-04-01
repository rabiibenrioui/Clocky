import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface ToggleSwitchProps {
    enabled: boolean;
    onToggle?: (enabled: boolean) => void;
}

export default function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
    // Switch toggle
    const [isEnabled, setIsEnabled] = useState(enabled);

    const toggleSwitch = () => {
        const next = !isEnabled;
        setIsEnabled(next);
        onToggle?.(next);
    }
    
    return (
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
    )
}