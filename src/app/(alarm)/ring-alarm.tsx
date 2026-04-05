import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

            {/* Background glow blobs */}
            <View style={styles.blobTop} />
            <View style={styles.blobBottom} />

            {/* Time */}
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{display}</Text>
                <Text style={styles.periodText}>{period}</Text>
            </View>

            {/* Label */}
            <Text style={styles.labelText}>{alarmLabel}</Text>

            {/* Pulsing alarm icon */}
            <View style={styles.iconWrapper}>
                {/* Spinning dashed ring */}
                <Animated.View style={[styles.spinRing, { transform: [{ rotate: spin }] }]} />

                {/* Pulsing inner circle */}
                <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
                    <Ionicons name="alarm" size={64} color="#fff" />
                </Animated.View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsRow}>

                {/* Snooze */}
                <TouchableOpacity style={styles.snoozeBtn} onPress={handleSnooze} activeOpacity={0.8}>
                    <Ionicons name="time-outline" size={20} color="#7c6fcd" />
                    <Text style={styles.snoozeBtnText}>Snooze</Text>
                </TouchableOpacity>

                {/* Dismiss */}
                <TouchableOpacity style={styles.dismissBtn} onPress={handleDismiss} activeOpacity={0.8}>
                    <Text style={styles.dismissBtnText}>Dismiss</Text>
                </TouchableOpacity>

            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0c29",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
    },

    // --- Background blobs ---
    blobTop: {
        position: "absolute",
        top: -80,
        left: -80,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: "rgba(124, 111, 205, 0.25)",
    },
    blobBottom: {
        position: "absolute",
        bottom: -100,
        right: -80,
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: "rgba(88, 161, 255, 0.18)",
    },

    // --- Time ---
    timeRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 6,
    },
    timeText: {
        fontSize: 80,
        fontWeight: "200",
        color: "#ffffff",
        letterSpacing: -2,
    },
    periodText: {
        fontSize: 22,
        fontWeight: "400",
        color: "rgba(255,255,255,0.55)",
        marginBottom: 16,
        marginLeft: 6,
    },

    // --- Label ---
    labelText: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgba(255,255,255,0.7)",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 56,
    },

    // --- Icon ---
    iconWrapper: {
        width: 180,
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 64,
    },
    spinRing: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 85,
        borderWidth: 2,
        borderColor: "rgba(124, 111, 205, 0.6)",
        borderStyle: "dashed",
    },
    iconCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#7c6fcd",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#7c6fcd",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 40,
        shadowOpacity: 0.9,
        elevation: 20,
    },

    // --- Buttons ---
    buttonsRow: {
        width: "100%",
        gap: 14,
    },
    snoozeBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 16,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: "rgba(124,111,205,0.5)",
        backgroundColor: "rgba(124,111,205,0.12)",
    },
    snoozeBtnText: {
        color: "#a89fe0",
        fontSize: 16,
        fontWeight: "600",
    },
    dismissBtn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        borderRadius: 18,
        backgroundColor: "#7c6fcd",
        shadowColor: "#7c6fcd",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 10,
    },
    dismissBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});
