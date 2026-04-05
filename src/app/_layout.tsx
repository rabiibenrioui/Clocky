import * as Notifications from 'expo-notifications';
import { Tabs, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import "../../global.css";
import { requestPermissions } from "@/lib/alarmScheduler";

export default function RootLayout() {
  // Expo router
  const router = useRouter();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // Tab icons size
  const iconSize = 30;

  // Hide tab bar variable
  const segments = useSegments() as string[];
  const hideTabBar = segments.includes("add-alarm") || segments.includes("ring-alarm");

  // Request permissions once at startup
  useEffect(() => {
    requestPermissions();

    // Listener for when notification is received while app is open
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      const data = notification.request.content.data;

      if (data?.screen === 'ring-alarm' && data?.alarmId) {
        router.push({
          pathname: '/(alarm)/ring-alarm',
          params: { alarmId: String(data.alarmId) },
        })
      }
    })
    
    // Listen for when user taps the notification
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;

      if (data?.screen === 'ring-alarm' && data?.alarmId) {
        router.push({
          pathname: '/(alarm)/ring-alarm',
          params: { alarmId: String(data.alarmId) },
        })
      }
    });

    return () => {
      foregroundSubscription.remove();
      subscription.remove();
    };
  }, []);

  // Handle app launch from notification
  useEffect(() => {
    if (lastNotificationResponse) {
      const data = lastNotificationResponse.notification.request.content.data;
      
      if (data?.screen === 'alarm-ringing' && data?.alarmId) {
        router.push({
            pathname: '/(alarm)/ring-alarm',
            params: { alarmId: String(data.alarmId) },
        });
      }
    }
  }, [lastNotificationResponse]);

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
