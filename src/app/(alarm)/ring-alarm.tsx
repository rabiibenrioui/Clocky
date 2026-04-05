import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { getAlarms } from "@/lib/alarmStorage";
import { scheduleAlarm } from "@/lib/alarmScheduler";
import { playAlarm, stopAlarm } from "@/lib/useAlarmSound";

export default function RingingScreen() {
    const router = useRouter();
    const { alarmId } = useLocalSearchParams<{ alarmId?: string }>();

    // Alarm label looked up from storage
    const [alarmLabel, setAlarmLabel] = useState("Alarm");
    const [currentTime, setCurrentTime] = useState(new Date());

    // --- Animations ---
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const ringAnim  = useRef(new Animated.Value(0)).current;
    const fadeAnim  = useRef(new Animated.Value(0)).current;

    // ---- Setup ----
    useEffect(() => {
        // Fade entire screen in
        Animated.timing(fadeAnim, {
            toValue: 1, duration: 400, useNativeDriver: true,
        }).start();

        // Pulsing ring
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.18, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1,    duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();

        // Rotating outer ring
        Animated.loop(
            Animated.timing(ringAnim, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })
        ).start();

        // Load alarm label & play sound
        (async () => {
            let selectedRingtoneId = '1';
            
            if (alarmId) {
                const alarms = await getAlarms();
                const found = alarms.find(a => a.id === alarmId);
                if (found) {
                    setAlarmLabel(found.label || "Alarm");
                    if (found.ringtoneId) selectedRingtoneId = found.ringtoneId;
                }
            }
            
            // Start playing sound
            playAlarm(selectedRingtoneId);
        })();

        // Live clock tick
        const tick = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
            clearInterval(tick);
            stopAlarm();
        };
    }, []);

    // ---- Actions ----
    const handleDismiss = async () => {
        await stopAlarm();
        router.canGoBack() ? router.back() : router.replace("/(alarm)");
    };

    const handleSnooze = async () => {
        await stopAlarm();

        if (alarmId) {
            const alarms = await getAlarms();
            const original = alarms.find(a => a.id === alarmId);
            if (original) {
                const snoozeDuration = original.snooze || 5;
                const snoozeTime = new Date(Date.now() + snoozeDuration * 60 * 1000);
                
                await scheduleAlarm({
                    ...original,
                    time: snoozeTime,
                    label: original.label || "Snooze",
                });
            }
        }

        router.canGoBack() ? router.back() : router.replace("/(alarm)");
    };

    // Format time
    const hours   = currentTime.getHours();
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const period  = hours >= 12 ? "PM" : "AM";
    const display = `${hours % 12 || 12}:${minutes}`;

    const spin = ringAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

    return (
        <Animated.View className="flex-1 bg-[#0f0c29] items-center justify-center px-8" style={{ opacity: fadeAnim }}>

            {/* Background glow blobs */}
            <View className="absolute -top-[80px] -left-[80px] w-[320px] h-[320px] rounded-[160px] bg-[#7c6fcd]/25" />
            <View className="absolute -bottom-[100px] -right-[80px] w-[350px] h-[350px] rounded-[175px] bg-[rgba(88,161,255,0.18)]" />

            {/* Time */}
            <View className="flex-row items-end mb-1.5">
                <Text className="text-[80px] font-extralight text-white tracking-[-2px]">{display}</Text>
                <Text className="text-[22px] font-normal text-white/55 mb-4 ml-1.5">{period}</Text>
            </View>

            {/* Label */}
            <Text className="text-lg font-medium text-white/70 tracking-[1.5px] uppercase mb-14">{alarmLabel}</Text>

            {/* Pulsing alarm icon */}
            <View className="w-[180px] h-[180px] items-center justify-center mb-16">
                {/* Spinning dashed ring */}
                <Animated.View className="absolute w-[170px] h-[170px] rounded-[85px] border-2 border-[#7c6fcd]/60 border-dashed" style={{ transform: [{ rotate: spin }] }} />

                {/* Pulsing inner circle */}
                <Animated.View 
                    className="w-[130px] h-[130px] rounded-[65px] bg-[#7c6fcd] items-center justify-center" 
                    style={{ 
                        transform: [{ scale: pulseAnim }],
                        shadowColor: "#7c6fcd",
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 40,
                        shadowOpacity: 0.9,
                        elevation: 20, 
                    }}>
                    <Ionicons name="alarm" size={64} color="#fff" />
                </Animated.View>
            </View>

            {/* Buttons */}
            <View className="w-full gap-[14px]">

                {/* Snooze */}
                <TouchableOpacity className="flex-row items-center justify-center gap-2 py-4 rounded-[18px] border-[1.5px] border-[#7c6fcd]/50 bg-[#7c6fcd]/12" onPress={handleSnooze} activeOpacity={0.8}>
                    <Ionicons name="time-outline" size={20} color="#7c6fcd" />
                    <Text className="text-[#a89fe0] text-base font-semibold">Snooze</Text>
                </TouchableOpacity>

                {/* Dismiss */}
                <TouchableOpacity 
                    className="items-center justify-center py-[18px] rounded-[18px] bg-[#7c6fcd]" 
                    onPress={handleDismiss} 
                    activeOpacity={0.8}
                    style={{
                        shadowColor: "#7c6fcd",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.5,
                        shadowRadius: 16,
                        elevation: 10
                    }}>
                    <Text className="text-white text-[17px] font-bold tracking-[0.5px]">Dismiss</Text>
                </TouchableOpacity>

            </View>

        </Animated.View>
    );
}
