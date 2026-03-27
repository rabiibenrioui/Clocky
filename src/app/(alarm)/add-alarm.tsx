import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddAlarm() {
    return(
        <SafeAreaView className="flex-1">
            <View className="justify-center items-center">
                <Text>Add Alarm page</Text>
            </View>
        </SafeAreaView>
    )
}