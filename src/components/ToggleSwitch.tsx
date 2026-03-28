import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface ToggleSwitchProps {
    enabled: boolean;
}

export default function ToggleSwitch({ enabled }: ToggleSwitchProps) {
    // switch toggle
    const [isEnabled, setIsEnabled] = useState(enabled);

    const toggleSwitch = () => {
        setIsEnabled(isEnabled => !isEnabled)
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