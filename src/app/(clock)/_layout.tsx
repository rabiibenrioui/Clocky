import MainHeader from "@/components/MainHeader";
import { Stack } from "expo-router";

export default function ClockLayout() {
    return (
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: '#fafafa' },
            animation: "slide_from_right",
            animationDuration: 250,
            gestureEnabled: true,
            header: () => <MainHeader title="Clock" />
        }}>

            <Stack.Screen 
              name="index" 
              options={{ 
                title: "Clock" 
              }} />

            <Stack.Screen 
              name="add-timezone" 
              options={{ 
                title: "Add a clock" 
              }} />

        </Stack>
    )
}