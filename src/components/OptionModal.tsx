import { Ionicons } from "@expo/vector-icons"
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"

interface Option {
    id: string;
    label: string;
}

interface OptionModalProps {
    visible: boolean;
    onClose: () => void;
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
    title: string;
}

export default function OptionModal({ visible, onClose, options, selectedId, onSelect, title }: OptionModalProps) {
    const handleSelect = (id:string) => {
        onSelect(id);
        onClose();
    }

    return (
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable className="flex-1" onPress={onClose} >
                
                <View className="flex-1 justify-end items-center bg-black/40">

                    {/* Menu container */}
                    <View 
                    className="flex-col bg-white rounded-xl shadow-lg"
                    style={{ width: "95%", height: "70%", rowGap: 24, paddingVertical: 24, paddingHorizontal: 18}}
                    >
                        {/* Title */}
                        <Text className="text-2xl font-semibold mb-4">{title}</Text>

                        {/* Options */}
                        {options.map((option) => (
                            <TouchableOpacity 
                                key={option.id} 
                                className="flex-row items-center justify-between" 
                                onPress={() => handleSelect(option.id)}>

                                <Text className="text-xl">{option.label}</Text>

                                <Ionicons 
                                    name={selectedId === option.id ? "radio-button-on" : "radio-button-off"} 
                                    size={20} 
                                    color={selectedId === option.id ? "#1E6FFE" : "#52525250"}/>

                            </TouchableOpacity>
                        ))}

                    </View>

                </View>

            </Pressable>
        </Modal>
    )
}