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
          statusBarTranslucent={true}
        >
            <Pressable className="flex-1" onPress={onClose}>
                
                <View className="flex-1 justify-center items-center bg-black/40">

                    <Pressable 
                    className="flex-col bg-white rounded-2xl shadow-lg relative overflow-hidden"
                    style={{ width: "85%" }}
                    onPress={(e) => e.stopPropagation()}
                    >
                        <View className="pt-6 px-4">
                            <Text className="text-lg font-semibold mb-8">{title}</Text>

                            {/* Input Field */}
                            <TextInput
                                className="rounded-xl text-lg text-gray-800"
                                style={{ padding: 0, paddingHorizontal: 2, paddingBottom: 6 }}
                                placeholder="e.g. Alarm"
                                value={localValue}
                                onChangeText={setLocalValue}
                                autoFocus={true}
                            />
                        

                            {/* Divider */}
                            <View className="h-px bg-gray-200" />

                        </View>

                        {/* Actions */}
                        <View className="flex-row">

                            <TouchableOpacity 
                                onPress={onClose}
                                className="flex-1 items-center justify-center p-6 active:bg-gray-100"
                                activeOpacity={1}
                            >
                                <Text className="text-gray-500 font-semibold text-lg">CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleSave}
                                className="flex-1 items-center justify-center p-6 active:bg-gray-100"
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
