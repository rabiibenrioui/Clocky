import MainHeader from "@/components/MainHeader";
import { Stack } from "expo-router";

export default function ClockLayout() {
    return (
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: '#fafafa' },
            header: () => <MainHeader title="Clock" />
        }}>

            <Stack.Screen name="index" options={{ title: "Clock" }} />

        </Stack>
    )
}