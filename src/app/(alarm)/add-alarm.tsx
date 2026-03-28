import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Clock from "@/components/Clock";
import OptionCard from "@/components/OptionCard";
import { getSelectedSnoozeValue, getSelectedRepeatValue, snoozeModalOptions, repeatModalOptions } from "@/lib/utils";
import OptionModal from "@/components/OptionModal";

import "../../../global.css"

export default function AddAlarm() {
    // Modal states
    const [snoozeModalShown, setSnoozeModalShown] = useState(false);
    const [repeatModalShown, setRepeatModalShown] = useState(false);
    const [labelModalShown, setLabelModalShown] = useState(false);
    const [ringtoneModalShown, setRingtoneModalShown] = useState(false);

    // Selected values
    const [selectedSnoozeId, setSelectedSnoozeId] = useState<string>("2");
    const [selectedRepeatId, setSelectedRepeatId] = useState<string>("1");
    
    return (
        <SafeAreaView className="flex-1">

            {/* Alarm time selector */}
            <View className="mb-10">
                <Clock />
            </View>

            {/*===== Options =====*/}

            <View className="flex-col gap-y-10 px-6">

                <OptionCard title="Repeat" value={getSelectedRepeatValue(selectedRepeatId)} onPress={() => setRepeatModalShown(true)}/>
                <OptionCard title="Label" value="Alarm" onPress={() => setLabelModalShown(true)}/>
                <View className="h-px bg-gray-500" />
                <OptionCard title="Ringtone" value="Default" onPress={() => setRingtoneModalShown(true)}/>
                <OptionCard title="Snooze" value={getSelectedSnoozeValue(selectedSnoozeId)} onPress={() => setSnoozeModalShown(true)}/>

            </View>

            {/*===== Modals =====*/}

            {/* Repeat Modal */}
            <OptionModal
              title="Repeat"
              visible={repeatModalShown}
              onClose={() => setRepeatModalShown(false)}
              options={repeatModalOptions}
              selectedId={selectedRepeatId}
              onSelect={setSelectedRepeatId}
            />

            {/* Label Modal */}
            <OptionModal
              title="Label"
              visible={labelModalShown}
              onClose={() => setLabelModalShown(false)}
              options={snoozeModalOptions}
              selectedId={selectedSnoozeId}
              onSelect={setSelectedSnoozeId}
            />

            {/* Ringtone Modal */}
            <OptionModal
              title="Ringtone"
              visible={ringtoneModalShown}
              onClose={() => setRingtoneModalShown(false)}
              options={snoozeModalOptions}
              selectedId={selectedSnoozeId}
              onSelect={setSelectedSnoozeId}
            />

            {/* Snooze Modal */}
            <OptionModal
              title="Snooze"
              visible={snoozeModalShown}
              onClose={() => setSnoozeModalShown(false)}
              options={snoozeModalOptions}
              selectedId={selectedSnoozeId}
              onSelect={setSelectedSnoozeId}
            />

        </SafeAreaView>
    )
}