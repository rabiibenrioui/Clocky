import ClockComponent from "@/components/Clock";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Clock() {
    return (
        <SafeAreaView>
            <ClockComponent />
        </SafeAreaView>
    )
}