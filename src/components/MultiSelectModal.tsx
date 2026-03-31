import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { Modal, Pressable, Text, TouchableOpacity, View, ScrollView } from "react-native"

interface Option {
    id: string;
    label: string;
}

interface MultiSelectModalProps {
    visible: boolean;
    onClose: () => void;
    options: Option[];
    selectedIds: string[];
    onSelect: (ids: string[]) => void;
    title: string;
}

export default function MultiSelectModal({ visible, onClose, options, selectedIds, onSelect, title }: MultiSelectModalProps) {
    // Keep local state while modal is open to allow cancel
    const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (visible) {
            setLocalSelectedIds(selectedIds);
        }
    }, [visible, selectedIds]);

    const toggleSelection = (id: string) => {
        setLocalSelectedIds((prev) => 
            prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
    };

    const handleSave = () => {
        onSelect(localSelectedIds);
        onClose();
    };

    return (
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onClose}
        >
            <Pressable className="flex-1" onPress={onClose}>
                
                <View className="flex-1 justify-center items-center bg-black/40">

                    <Pressable 
                    className="flex-col bg-white rounded-2xl shadow-lg relative overflow-hidden"
                    style={{ width: "85%", maxHeight: "70%" }}
                    onPress={(e) => e.stopPropagation()}
                    >
                        <View className="py-6 px-2">
                            <Text className="text-lg font-light tracking-tight mb-9 pl-2">{title}</Text>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="gap-y-2">
                                    {options.map((option) => {
                                        const isSelected = localSelectedIds.includes(option.id);
                                        return (
                                            <TouchableOpacity 
                                                key={option.id} 
                                                className="flex-row items-center justify-between py-3 px-4 active:bg-gray-100" 
                                                onPress={() => toggleSelection(option.id)}
                                                activeOpacity={0.8}>

                                                <Text className="text-lg">{option.label}</Text>

                                                <Ionicons 
                                                    name={isSelected ? "checkbox" : "square-outline"} 
                                                    size={22} 
                                                    color={isSelected ? "#1E6FFE" : "#52525250"}/>

                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Border */}
                        <View className="h-px bg-gray-200" />

                        {/* Actions */}
                        <View className="flex-row">

                            <TouchableOpacity 
                                onPress={onClose}
                                className="flex-1 items-center justify-center py-6 active:bg-gray-100"
                                activeOpacity={1}
                            >
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleSave}
                                className="flex-1 items-center justify-center py-6 active:bg-gray-100"
                                activeOpacity={1}
                            >
                                <Text className="text-[#1E6FFE] font-semibold text-lg">OK</Text>
                            </TouchableOpacity>

                        </View>

                    </Pressable>

                </View>

            </Pressable>
        </Modal>
    )
}
