import { Ionicons } from "@expo/vector-icons"
import { Modal, Pressable, Text, TouchableOpacity, ScrollView, View } from "react-native"
import { useState, useEffect } from "react";
import { playAlarm, stopAlarm } from "@/lib/useAlarmSound";

interface Option {
    id: string;
    label: string;
}

interface RingtoneModalProps {
    visible: boolean;
    onClose: () => void;
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
    title: string;
}

export default function RingtoneModal({ visible, onClose, options, selectedId, onSelect, title }: RingtoneModalProps) {
    const [tempSelectedId, setTempSelectedId] = useState(selectedId);

    // Reset temp when modal opens
    useEffect(() => {
        if (visible) {
            setTempSelectedId(selectedId);
        } else {
            stopAlarm(); // Just in case it's still playing
        }
    }, [visible, selectedId]);

    const handleSelect = (id: string) => {
        setTempSelectedId(id);
        playAlarm(id); // Play preview
    };

    const handleSave = () => {
        onSelect(tempSelectedId);
        stopAlarm();
        onClose();
    };

    const handleCancel = () => {
        stopAlarm();
        onClose();
    };

    return (
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCancel}
          statusBarTranslucent={true}
        >
            {/* Backdrop */}
            <Pressable className="flex-1" onPress={handleCancel} >
                
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
                                                name={tempSelectedId === option.id ? "radio-button-on" : "radio-button-off"} 
                                                size={22} 
                                                color={tempSelectedId === option.id ? "#1E6FFE" : "#52525250"}/>

                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Border */}
                        <View className="h-px bg-gray-200" />

                        {/* Actions */}
                        <View className="flex-row">
                            <TouchableOpacity
                              className="flex-1 justify-center items-center p-6 active:bg-gray-100" 
                              activeOpacity={1}
                              onPress={handleCancel}>
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              className="flex-1 justify-center items-center p-6 active:bg-blue-50" 
                              activeOpacity={1}
                              onPress={handleSave}>
                                <Text className="text-blue-500 font-semibold text-lg">SAVE</Text>
                            </TouchableOpacity>
                        </View>

                    </Pressable>

                </View>

            </Pressable>
        </Modal>
    )
}
