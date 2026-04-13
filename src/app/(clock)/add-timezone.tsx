import CustomHeader from "@/components/CustomHeader";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export type WorldClock = {
    city: string;
    region: string;
    timezone: string;
    utcOffset: number;
};

export const WORLD_CLOCKS: WorldClock[] = [
    // Africa
    { city: "Cairo",        region: "Africa",   timezone: "Africa/Cairo",        utcOffset: 2 },
    { city: "Casablanca",   region: "Africa",   timezone: "Africa/Casablanca",   utcOffset: 0 },
    { city: "Johannesburg", region: "Africa",   timezone: "Africa/Johannesburg", utcOffset: 2 },
    { city: "Lagos",        region: "Africa",   timezone: "Africa/Lagos",        utcOffset: 1 },
    { city: "Nairobi",      region: "Africa",   timezone: "Africa/Nairobi",      utcOffset: 3 },
    { city: "Tunis",        region: "Africa",   timezone: "Africa/Tunis",        utcOffset: 1 },

    // Americas
    { city: "Bogotá",       region: "Americas", timezone: "America/Bogota",                       utcOffset: -5 },
    { city: "Buenos Aires", region: "Americas", timezone: "America/Argentina/Buenos_Aires",        utcOffset: -3 },
    { city: "Chicago",      region: "Americas", timezone: "America/Chicago",                       utcOffset: -6 },
    { city: "Denver",       region: "Americas", timezone: "America/Denver",                        utcOffset: -7 },
    { city: "Los Angeles",  region: "Americas", timezone: "America/Los_Angeles",                   utcOffset: -8 },
    { city: "Mexico City",  region: "Americas", timezone: "America/Mexico_City",                   utcOffset: -6 },
    { city: "Miami",        region: "Americas", timezone: "America/New_York",                      utcOffset: -5 },
    { city: "New York",     region: "Americas", timezone: "America/New_York",                      utcOffset: -5 },
    { city: "Phoenix",      region: "Americas", timezone: "America/Phoenix",                       utcOffset: -7 },
    { city: "São Paulo",    region: "Americas", timezone: "America/Sao_Paulo",                     utcOffset: -3 },
    { city: "Santiago",     region: "Americas", timezone: "America/Santiago",                      utcOffset: -4 },
    { city: "Toronto",      region: "Americas", timezone: "America/Toronto",                       utcOffset: -5 },
    { city: "Vancouver",    region: "Americas", timezone: "America/Vancouver",                     utcOffset: -8 },

    // Asia
    { city: "Bangkok",      region: "Asia", timezone: "Asia/Bangkok",      utcOffset: 7   },
    { city: "Beijing",      region: "Asia", timezone: "Asia/Shanghai",     utcOffset: 8   },
    { city: "Dubai",        region: "Asia", timezone: "Asia/Dubai",        utcOffset: 4   },
    { city: "Hong Kong",    region: "Asia", timezone: "Asia/Hong_Kong",    utcOffset: 8   },
    { city: "Istanbul",     region: "Asia", timezone: "Europe/Istanbul",   utcOffset: 3   },
    { city: "Jakarta",      region: "Asia", timezone: "Asia/Jakarta",      utcOffset: 7   },
    { city: "Karachi",      region: "Asia", timezone: "Asia/Karachi",      utcOffset: 5   },
    { city: "Kolkata",      region: "Asia", timezone: "Asia/Kolkata",      utcOffset: 5.5 },
    { city: "Kuala Lumpur", region: "Asia", timezone: "Asia/Kuala_Lumpur", utcOffset: 8   },
    { city: "Riyadh",       region: "Asia", timezone: "Asia/Riyadh",       utcOffset: 3   },
    { city: "Seoul",        region: "Asia", timezone: "Asia/Seoul",         utcOffset: 9   },
    { city: "Shanghai",     region: "Asia", timezone: "Asia/Shanghai",      utcOffset: 8   },
    { city: "Singapore",    region: "Asia", timezone: "Asia/Singapore",     utcOffset: 8   },
    { city: "Taipei",       region: "Asia", timezone: "Asia/Taipei",        utcOffset: 8   },
    { city: "Tehran",       region: "Asia", timezone: "Asia/Tehran",        utcOffset: 3.5 },
    { city: "Tokyo",        region: "Asia", timezone: "Asia/Tokyo",         utcOffset: 9   },

    // Europe
    { city: "Amsterdam",  region: "Europe", timezone: "Europe/Amsterdam",  utcOffset: 1 },
    { city: "Athens",     region: "Europe", timezone: "Europe/Athens",     utcOffset: 2 },
    { city: "Barcelona",  region: "Europe", timezone: "Europe/Madrid",     utcOffset: 1 },
    { city: "Berlin",     region: "Europe", timezone: "Europe/Berlin",     utcOffset: 1 },
    { city: "Brussels",   region: "Europe", timezone: "Europe/Brussels",   utcOffset: 1 },
    { city: "Bucharest",  region: "Europe", timezone: "Europe/Bucharest",  utcOffset: 2 },
    { city: "Copenhagen", region: "Europe", timezone: "Europe/Copenhagen", utcOffset: 1 },
    { city: "Dublin",     region: "Europe", timezone: "Europe/Dublin",     utcOffset: 0 },
    { city: "Frankfurt",  region: "Europe", timezone: "Europe/Berlin",     utcOffset: 1 },
    { city: "Hamburg",    region: "Europe", timezone: "Europe/Berlin",     utcOffset: 1 },
    { city: "Helsinki",   region: "Europe", timezone: "Europe/Helsinki",   utcOffset: 2 },
    { city: "Kiev",       region: "Europe", timezone: "Europe/Kiev",       utcOffset: 2 },
    { city: "Lisbon",     region: "Europe", timezone: "Europe/Lisbon",     utcOffset: 0 },
    { city: "London",     region: "Europe", timezone: "Europe/London",     utcOffset: 0 },
    { city: "Madrid",     region: "Europe", timezone: "Europe/Madrid",     utcOffset: 1 },
    { city: "Milan",      region: "Europe", timezone: "Europe/Rome",       utcOffset: 1 },
    { city: "Moscow",     region: "Europe", timezone: "Europe/Moscow",     utcOffset: 3 },
    { city: "Oslo",       region: "Europe", timezone: "Europe/Oslo",       utcOffset: 1 },
    { city: "Paris",      region: "Europe", timezone: "Europe/Paris",      utcOffset: 1 },
    { city: "Prague",     region: "Europe", timezone: "Europe/Prague",     utcOffset: 1 },
    { city: "Rome",       region: "Europe", timezone: "Europe/Rome",       utcOffset: 1 },
    { city: "Stockholm",  region: "Europe", timezone: "Europe/Stockholm",  utcOffset: 1 },
    { city: "Vienna",     region: "Europe", timezone: "Europe/Vienna",     utcOffset: 1 },
    { city: "Warsaw",     region: "Europe", timezone: "Europe/Warsaw",     utcOffset: 1 },
    { city: "Zurich",     region: "Europe", timezone: "Europe/Zurich",     utcOffset: 1 },

    // Oceania
    { city: "Auckland",   region: "Oceania", timezone: "Pacific/Auckland",      utcOffset: 12 },
    { city: "Melbourne",  region: "Oceania", timezone: "Australia/Melbourne",   utcOffset: 10 },
    { city: "Sydney",     region: "Oceania", timezone: "Australia/Sydney",      utcOffset: 10 },
];

export default function AddTimezone() {
    const navigation = useNavigation();
    const router = useRouter();
    const [query, setQuery] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Add a clock" shouldSave={false} />,
        });
    });

    const filtered = WORLD_CLOCKS.filter(
        (c) =>
            c.city.toLowerCase().includes(query.toLowerCase()) ||
            c.region.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (clock: WorldClock) => {
        pendingTimezone = clock;
        router.back();
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-[#fafafa]"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={120}
        >
            <SafeAreaView className="flex-1">
                {/* Search bar */}
                <View className="flex-row items-center bg-white rounded-2xl mx-4 mt-3 mb-2 px-3.5 py-2.5 shadow-sm"
                    style={{ elevation: 2 }}>
                    <Ionicons name="search" size={18} color="#9ca3af" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Search city or region…"
                        placeholderTextColor="#9ca3af"
                        value={query}
                        onChangeText={setQuery}
                        className="flex-1 text-base text-gray-800"
                        autoFocus={false}
                        returnKeyType="search"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons name="close-circle" size={18} color="#d1d5db" />
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.city}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelect(item)}
                            activeOpacity={0.7}
                            className="flex-row justify-between items-center py-4 px-5 bg-white mx-4 mb-1 rounded-xl"
                            style={{ elevation: 1 }}
                        >
                            <View>
                                <Text className="text-[17px] font-medium text-gray-900">
                                    {item.city}
                                </Text>
                                <Text className="text-[13px] text-gray-400 mt-0.5">
                                    {item.region} · UTC{item.utcOffset >= 0 ? "+" : ""}{item.utcOffset}
                                </Text>
                            </View>
                            <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

// Module-level store — set before router.back() so useFocusEffect sees it immediately
export let pendingTimezone: WorldClock | null = null;
export function clearPendingTimezone() {
    pendingTimezone = null;
}