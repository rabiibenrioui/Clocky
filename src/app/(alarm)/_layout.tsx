import MainHeader from "@/components/MainHeader";
import SetAlarmHeader from "@/components/SetAlarmHeader";
import { Stack } from "expo-router";

export default function AlarmLayout() {
    return (
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: '#fafafa' },
            animation: "slide_from_right",
            animationDuration: 250,
            gestureEnabled: true,
            header: () => <MainHeader title="Alarm" />
        }}>

            <Stack.Screen 
              name="index" 
              options={{ 
                title: "Alarm" 
              }}/>

            <Stack.Screen 
              name="add-alarm" 
              options={{
                title: "Add alarm",
                header: () => <SetAlarmHeader title="Add alarm" />
              }}/>

        </Stack>
    )
}