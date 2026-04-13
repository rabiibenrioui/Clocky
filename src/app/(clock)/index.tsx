import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ClockComponent from "@/components/Clock";
import TimezoneCard from "@/components/TimezoneCard";
import { clearPendingTimezone, pendingTimezone, WorldClock } from "./add-timezone";

const STORAGE_KEY = "clocky_timezones";

export default function Clock() {
    const router = useRouter();
    const [timezones, setTimezones] = useState<WorldClock[]>([]);

    // Popup state — mirrors the alarm screen pattern
    const [popup, setPopup] = useState<{
        visible: boolean;
        city?: string;
        anchorY?: number;
    }>({ visible: false });

    const cardRefs = useRef<Record<string, View | null>>({});

    // Load saved timezones and pick up any pending addition on every focus
    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                try {
                    const stored = await AsyncStorage.getItem(STORAGE_KEY);
                    let list: WorldClock[] = stored ? JSON.parse(stored) : [];

                    if (pendingTimezone) {
                        const already = list.some((tz) => tz.city === pendingTimezone!.city);
                        if (!already) {
                            list = [...list, pendingTimezone];
                            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
                        }
                        clearPendingTimezone();
                    }

                    setTimezones(list);
                } catch (e) {
                    console.error("Failed to load timezones:", e);
                }
            };
            load();
        }, [])
    );

    const removeTimezone = async (city: string) => {
        const updated = timezones.filter((tz) => tz.city !== city);
        setTimezones(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <SafeAreaView className="flex-1 bg-[#fafafa]">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Main clock */}
                <View className="mt-2 mb-10">
                    <ClockComponent />
                </View>

                {/* Timezones section */}
                {timezones.length > 0 ? (
                    <View className="px-4 gap-y-6">
                        {timezones.map((tz) => (
                            <View
                                key={tz.city}
                                ref={(ref) => { cardRefs.current[tz.city] = ref; }}
                            >
                                <TimezoneCard
                                    city={tz.city}
                                    region={tz.region}
                                    utcOffset={tz.utcOffset}
                                    onLongPress={() => {
                                        const ref = cardRefs.current[tz.city];
                                        if (ref) {
                                            ref.measure((_x, _y, _w, _h, _px, pageY) => {
                                                setPopup({ visible: true, city: tz.city, anchorY: pageY });
                                            });
                                        }
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="items-center mt-16 px-10">
                        <Ionicons name="earth-outline" size={56} color="#ddd" />
                        <Text className="text-lg font-semibold text-gray-300 mt-4 text-center">
                            No world clocks yet
                        </Text>
                        <Text className="text-sm text-gray-300 mt-1.5 text-center">
                            Tap the + button to add clocks from around the world
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Floating add button */}
            <View className="absolute bottom-[90px] left-0 right-0 items-center">
                <TouchableOpacity
                    onPress={() => router.push("/(clock)/add-timezone")}
                    activeOpacity={0.85}
                    className="bg-blue-500 w-[58px] h-[58px] rounded-full justify-center items-center"
                    style={{
                        shadowColor: "#3b82f6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Delete popup — same pattern as alarm screen */}
            {popup.visible && (
                <>
                    <Pressable
                        className="absolute inset-0"
                        onPress={() => setPopup((p) => ({ ...p, visible: false }))}
                    />
                    <TimezonePopup
                        anchorY={popup.anchorY}
                        city={popup.city}
                        onClose={() => setPopup((p) => ({ ...p, visible: false }))}
                        onDelete={async (city) => {
                            await removeTimezone(city);
                            setPopup((p) => ({ ...p, visible: false }));
                        }}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

// ── Popup (mirrors AlarmPopup from alarm/index.tsx) ──────────────────────────
function TimezonePopup({ anchorY, city, onClose, onDelete }: { anchorY?: number; city?: string; onClose: () => void; onDelete: (city: string) => void }) {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
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

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: (anchorY ?? 0) - 140,
                left: 0,
                right: 0,
                zIndex: 999,
                elevation: 10,
                alignItems: "center",
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
            }}
        >
            <Animated.View
                className="bg-white rounded-xl shadow-lg py-3 px-2 max-w-[160px]"
                style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}
            >
                <TouchableOpacity
                    onPress={() => city && onDelete(city)}
                    className="flex-row items-center gap-x-1"
                >
                    <Ionicons name="close-outline" size={20} color="red" />
                    <Text className="text-lg">Remove Clock</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}