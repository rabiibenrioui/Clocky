import { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Timer() {
    const [elapsedMs, setElapsedMs] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
    const startTimeRef = useRef<number>(0);
    const accumulatedRef = useRef<number>(0);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now();
            intervalRef.current = setInterval(() => {
                const now = Date.now();
                setElapsedMs(accumulatedRef.current + (now - startTimeRef.current));
            }, 30);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    const handlePlayPause = () => {
        if (isRunning) {
            accumulatedRef.current += Date.now() - startTimeRef.current;
        }
        setIsRunning((r) => !r);
    };

    const handleRestart = () => {
        setIsRunning(false);
        accumulatedRef.current = 0;
        setElapsedMs(0);
    };

    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((elapsedMs % 1000) / 10); // 0–99

    const pad  = (n: number) => n.toString().padStart(2, "0");

    return (
        <SafeAreaView className="flex-1 bg-[#fafafa] justify-between items-center">

            {/* Timer display */}
            <View className="flex-row items-baseline justify-center mb-16">
                {/* HH:MM:SS */}
                <Text
                    className="font-light text-gray-900 tracking-tighter"
                    style={{ fontSize: 72, fontVariant: ["tabular-nums"] }}
                >
                    {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                </Text>

                {/* Centiseconds — smaller, right by the side */}
                <Text
                    className="font-light text-gray-400 tracking-tighter ml-1"
                    style={{ fontSize: 36, fontVariant: ["tabular-nums"] }}
                >
                    :{pad(centiseconds)}
                </Text>
            </View>

            {/* Control Buttons */}
            <View className="flex-row absolute bottom-32 justify-center items-center gap-x-8">
                {/* Restart */}
                <TouchableOpacity
                    onPress={handleRestart}
                    activeOpacity={0.7}
                    className="bg-gray-200 w-[64px] h-[64px] rounded-full justify-center items-center"
                >
                    <Ionicons name="refresh" size={28} color="#4b5563" />
                </TouchableOpacity>

                {/* Play / Pause */}
                <TouchableOpacity
                    onPress={handlePlayPause}
                    activeOpacity={0.85}
                    className="bg-blue-500 w-[64px] h-[64px] rounded-full justify-center items-center"
                    style={{
                        shadowColor: "#3b82f6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Ionicons name={isRunning ? "pause" : "play"} size={28} color="#fff" style={{ marginLeft: isRunning ? 0 : 4 }} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}