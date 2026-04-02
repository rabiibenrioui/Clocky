import { Tabs, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import "../../global.css";
import { useEffect } from "react";
import { requestPermissions } from "@/lib/alarmScheduler";

export default function RootLayout() {
  // tab icons size
  const iconSize = 30;

  // hide tab bar variable
  const segments = useSegments() as string[];
  const hideTabBar = segments.includes("add-alarm");

  // request permissions once at startup
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Tabs 
      screenOptions={{
        animation: "shift",
        tabBarHideOnKeyboard: true,
        headerShown: false, 
        tabBarShowLabel: true, 
        tabBarStyle: {
          display: hideTabBar ? "none" : "flex",
          backgroundColor: "#fff", 
          borderRadius: 30, 
          overflow: "hidden", 
          paddingHorizontal: 5, 
          marginHorizontal: 70, 
          marginBottom: 15,
          height: 55,
          position: "absolute",
        },
        tabBarIconStyle: { 
          marginTop: 'auto', 
          marginBottom: 'auto',
          height: iconSize, 
          width: iconSize, 
        }, 
        tabBarLabelStyle: { 
          fontSize: 11,
        }
      }}
      >

      <Tabs.Screen 
        name="(alarm)" 
        options={{ 
          title:"Alarm",
          tabBarIcon: ({ color, focused}) => ( 
            <Ionicons name={focused ? 'alarm' : 'alarm-outline'} 
            size={iconSize} 
            color={color} /> 
          )
        }}/>

      <Tabs.Screen 
        name="(clock)" 
        options={{ 
          title:"Clock",
          tabBarIcon: ({ color, focused}) => ( 
            <Ionicons name={focused ? 'time' : 'time-outline'} 
            size={iconSize} 
            color={color} /> 
          )
        }}/>

      <Tabs.Screen 
        name="(timer)" 
        options={{ 
          title:"Timer",
          tabBarIcon: ({ color, focused}) => ( 
            <Ionicons name={focused ? 'stopwatch' : 'stopwatch-outline'} 
            size={iconSize} 
            color={color} /> 
          )
        }}/>

    </Tabs>
  )
}
