import { Ionicons } from "@expo/vector-icons"
import { Modal, Pressable, Text, TouchableOpacity, ScrollView, View } from "react-native"

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
          animationType="fade"
          onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable className="flex-1" onPress={onClose} >
                
                <View className="flex-1 justify-center items-center bg-black/40">

                    {/* Menu container */}
                    <Pressable 
                    className="flex-col bg-white rounded-2xl shadow-lg relative"
                    style={{ width: "85%", maxHeight: "70%", paddingVertical: 24, paddingHorizontal: 20}}
                    onPress={(e) => e.stopPropagation()}
                    >
                        {/* Title */}
                        <Text className="text-2xl font-semibold mb-6">{title}</Text>

                        {/* Options */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ rowGap: 24 }}>
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
                        </ScrollView>

                        {/* Actions */}
                        <View className="flex-row justify-end mt-8 gap-x-6">
                            <TouchableOpacity onPress={onClose}>
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>
                        </View>

                    </Pressable>

                </View>

            </Pressable>
        </Modal>
    )
}