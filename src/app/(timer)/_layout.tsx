import MainHeader from "@/components/MainHeader";
import { Stack } from "expo-router";

export default function TimerLayout() {
    return (
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: '#fafafa' },
            header: () => <MainHeader title="Timer" />
        }}>

            <Stack.Screen name="index" options={{ title: "Timer" }} />

        </Stack>
    )
}