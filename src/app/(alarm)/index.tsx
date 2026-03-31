import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { Animated, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AlarmCard from "@/components/AlarmCard";
import Clock from "@/components/Clock";
import { deleteAlarm, getAlarms, type Alarm } from "@/lib/alarmStorage";
import { formatRepeatLabel } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Alarm() {
    // expo router
    const router = useRouter();

    // alarms state
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    // Refs to measure actual screen positions
    const alarmRefs = useRef<Record<string, View | null>>({});

    // Load alarms whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadAlarms();
        }, [])
    )

    const loadAlarms = async () => {
        try {
            const savedAlarms = await getAlarms();
            setAlarms(savedAlarms);
        }
        catch (error) {
            console.error("Error loading alarms: ", error);
        }
    }

    // Spacing value
    let spacingBottom = alarms.length * 50;

    // Popup on long press
    const [popup, setPopup] = useState<{
        visible: boolean;
        alarmId?: string;
        anchorY?: number;
        height?: number;
    }>({
        visible: false,
    })

    return (
        <SafeAreaView className="flex-1">
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: spacingBottom }}
                ListHeaderComponent={() => (
                    <View className="mt-14 mb-8">
                        <Clock mode="live" />
                    </View>
                )}
                renderItem={({ item }) => (
                    <View
                        ref={(ref) => {
                            if(ref) {
                                alarmRefs.current[item.id] = ref;
                            }
                        }}
                    >
                        <AlarmCard
                            time={item.time.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            }).split(' ')[0]}
                            period={item.time.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            }).split(' ')[1]}
                            label={item.label}
                            frequency={formatRepeatLabel(item.repeat)}
                            enabled={item.isEnabled}
                            onLongPress={(pos) => {
                                const ref = alarmRefs.current[item.id];
                                if (ref) {
                                    ref.measure((x, y, width, height, pageX, pageY) => {
                                        setPopup({
                                            visible: true,
                                            alarmId: item.id,
                                            anchorY: pageY,
                                            height: height
                                        })
                                    });
                                }
                                
                            }}
                        />
                    </View>
                )}
                ItemSeparatorComponent={() => <View className="h-4" />}
                className="px-4"
                decelerationRate="fast"
                snapToAlignment="start"
            />

            {/* Add alarm */}
            <View className="absolute bottom-28 left-0 right-0 items-center z-50 bg-transparent">
                <View className="bg-blue-500 p-4 rounded-full shadow-lg">

                    <TouchableOpacity onPress={() => router.push("/(alarm)/add-alarm")}>
                        <Ionicons name="add" size={28} color={"#fff"} />
                    </TouchableOpacity>

                </View>
            </View>

            {popup.visible && (
                <>
                    {/* Backdrop */}
                    <Pressable 
                      className="absolute inset-0" 
                      onPress={() => setPopup(p => ({ ...p, visible: false }))} />
                    
                    {/* Popup component */}
                    <AlarmPopup
                        anchorY={popup.anchorY}
                        height={popup.height}
                        alarmId={popup.alarmId}
                        onClose={() => setPopup(p => ({ ...p, visible: false }))}
                        refresh={loadAlarms} 
                    />
                </>
            )}

        </SafeAreaView>
    )
}

// Popup Screen
function AlarmPopup({ anchorY, height, alarmId, onClose, refresh }: any) {
    // Animation at popping
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate in
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 100,
                friction: 8,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    
    // Handle delete function
    const handleDelete = async () => {
        if (!alarmId) return;

        await deleteAlarm(alarmId);
        await refresh();
        onClose();
    }

    return (
        <Animated.View
            style={{ 
                position: "absolute", 
                top: (anchorY ?? 0) - 140, 
                left: 0, right: 0, 
                zIndex: 999, 
                elevation: 10,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
                alignItems: 'center'
            }}
        >

            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              }}
              className="bg-white rounded-xl shadow-lg py-3 px-2 max-w-40"
              >

                <TouchableOpacity onPress={handleDelete} className="flex-row items-center gap-x-1">
                    <Ionicons name="close-outline" size={20} color={"red"} />
                    <Text className="text-lg">Delete Alarm</Text>
                </TouchableOpacity>

            </Animated.View>

        </Animated.View>
    )
}