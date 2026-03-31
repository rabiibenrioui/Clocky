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
          animationType="slide"
          onRequestClose={onClose}
          statusBarTranslucent={true}
        >
            {/* Backdrop */}
            <Pressable className="flex-1" onPress={onClose} >
                
                <View className="flex-1 justify-center items-center bg-black/40">

                    {/* Menu container */}
                    <Pressable 
                    className="flex-col bg-white rounded-2xl shadow-lg relative overflow-hidden"
                    style={{ width: "85%", maxHeight: "70%"}}
                    onPress={(e) => e.stopPropagation()}
                    >
                        <View className="py-6 px-4">
                            {/* Title */}
                            <Text className="text-lg font-light mb-6">{title}</Text>

                            {/* Options */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ rowGap: 24 }}>
                                    {options.map((option) => (
                                        <TouchableOpacity 
                                            key={option.id} 
                                            className="flex-row items-center justify-between" 
                                            onPress={() => handleSelect(option.id)}>

                                            <Text className="text-xl text-gray-800">{option.label}</Text>

                                            <Ionicons 
                                                name={selectedId === option.id ? "radio-button-on" : "radio-button-off"} 
                                                size={22} 
                                                color={selectedId === option.id ? "#1E6FFE" : "#52525250"}/>

                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Border */}
                        <View className="h-px bg-gray-200" />

                        {/* Action */}
                        <View className="flex-row">
                            <TouchableOpacity
                              className="flex-1 justify-center items-center p-6 active:bg-gray-100" 
                              activeOpacity={1}
                              onPress={onClose}>
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>
                        </View>

                    </Pressable>

                </View>

            </Pressable>
        </Modal>
    )
}
