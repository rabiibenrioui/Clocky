import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import "../global.css";

export default function RootLayout() {
  const iconSize = 28;

  return (
    <Tabs 
      screenOptions={{
        animation: "shift",
        headerShown: false, 
        tabBarShowLabel: true, 
        tabBarStyle: {
          backgroundColor: "#fff", 
          borderRadius: 30, 
          overflow: "hidden", 
          paddingHorizontal: 5, 
          marginHorizontal: 65, 
          marginBottom: 18, 
          height: 59,
          position: "absolute",
          flexDirection: "column",
        },
        tabBarIconStyle: { 
          marginTop: 'auto', 
          marginBottom: 'auto',
          height: iconSize, 
          width: iconSize, 
        }, 
        tabBarLabelStyle: { 
          fontSize: 11.5,
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
