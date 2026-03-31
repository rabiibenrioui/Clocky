import { useState, useEffect } from "react"
import { Modal, Pressable, Text, TouchableOpacity, View, TextInput } from "react-native"

interface TextInputModalProps {
    visible: boolean;
    onClose: () => void;
    value: string;
    onSave: (val: string) => void;
    title: string;
}

export default function TextInputModal({ visible, onClose, value, onSave, title }: TextInputModalProps) {
    const [localValue, setLocalValue] = useState("");

    useEffect(() => {
        if (visible) {
            setLocalValue(value);
        }
    }, [visible, value]);

    const handleSave = () => {
        onSave(localValue);
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
                    className="flex-col bg-white rounded-2xl shadow-lg relative"
                    style={{ width: "85%", paddingVertical: 24, paddingHorizontal: 20}}
                    onPress={(e) => e.stopPropagation()}
                    >
                        <Text className="text-2xl font-semibold mb-6">{title}</Text>

                        {/* Input Field */}
                        <TextInput
                            className="bg-gray-100 px-4 py-3 rounded-xl text-lg text-gray-800"
                            placeholder="e.g. Alarm"
                            value={localValue}
                            onChangeText={setLocalValue}
                            autoFocus={false}
                        />

                        {/* Actions */}
                        <View className="flex-row justify-end mt-8 gap-x-6">
                            <TouchableOpacity onPress={onClose}>
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave}>
                                <Text className="text-[#1E6FFE] font-semibold text-lg">OK</Text>
                            </TouchableOpacity>
                        </View>

                    </Pressable>

                </View>

            </Pressable>
        </Modal>
    )
}
