import { useState, useLayoutEffect } from "react";
import { View, Platform, TouchableOpacity } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker"

import Clock from "@/components/Clock";
import OptionCard from "@/components/OptionCard";
import { getSelectedSnoozeValue, formatRepeatLabel, snoozeModalOptions, repeatModalOptions, getSelectedRingtoneValue, ringtoneModalOptions } from "@/lib/utils";
import OptionModal from "@/components/OptionModal";
import MultiSelectModal from "@/components/MultiSelectModal";
import TextInputModal from "@/components/TextInputModal";

import "../../../global.css"
import { saveAlarm } from "@/lib/alarmStorage";
import SetAlarmHeader from "@/components/SetAlarmHeader";

export default function AddAlarm() {
  // Time state
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  // Modal states
  const [snoozeModalShown, setSnoozeModalShown] = useState(false);
  const [repeatModalShown, setRepeatModalShown] = useState(false);
  const [labelModalShown, setLabelModalShown] = useState(false);
  const [ringtoneModalShown, setRingtoneModalShown] = useState(false);

  // Selected values
  const [selectedSnoozeId, setSelectedSnoozeId] = useState<string>("2");
  const [selectedRepeatDays, setSelectedRepeatDays] = useState<string[]>([]);
  const [alarmLabel, setAlarmLabel] = useState<string>("Alarm");
  const [selectedRingtoneId, setSelectedRingtoneId] = useState<string>("1");

  // Set the header with the handleSave function
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SetAlarmHeader 
          title="Add Alarm"
          onSave={handleSave}
        />
      )
    })
  })

  // Handle alarm save
  const router = useRouter();

  const handleSave = async () => {
    try {
      const newAlarm = {
        id: Date.now().toString(),
        time: time,
        label: alarmLabel,
        repeat: selectedRepeatDays,
        isEnabled: true,
      };

      await saveAlarm(newAlarm); // Save the new alarm in the storage
      router.back(); // Go back to the alarms screen

    }
    catch (error) {
      console.error("Error saving alarm: ", error);
      throw error;
    }
  }
    
  return (
      <SafeAreaView className="flex-1">

          {/* Alarm time selector */}
          <View className="mb-10">
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Clock mode="static" time={time} />
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker 
                  value={time}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedTime) => {
                    setShowPicker(Platform.OS === "ios");
                    if (selectedTime) setTime(selectedTime);
                  }}
                />
              )}
          </View>

          {/*===== Options =====*/}

          <View className="flex-col gap-y-10 px-6">

              <OptionCard title="Repeat" value={formatRepeatLabel(selectedRepeatDays)} onPress={() => setRepeatModalShown(true)}/>
              <OptionCard title="Label" value={alarmLabel} onPress={() => setLabelModalShown(true)}/>
              <View className="h-px bg-gray-200" />
              <OptionCard title="Ringtone" value={getSelectedRingtoneValue(selectedRingtoneId)} onPress={() => setRingtoneModalShown(true)}/>
              <OptionCard title="Snooze" value={getSelectedSnoozeValue(selectedSnoozeId)} onPress={() => setSnoozeModalShown(true)}/>

          </View>

          {/*===== Modals =====*/}

          {/* Repeat Modal */}
          <MultiSelectModal
            title="Repeat"
            visible={repeatModalShown}
            onClose={() => setRepeatModalShown(false)}
            options={repeatModalOptions}
            selectedIds={selectedRepeatDays}
            onSelect={setSelectedRepeatDays}
          />

          {/* Label Modal */}
          <TextInputModal
            title="Label"
            visible={labelModalShown}
            onClose={() => setLabelModalShown(false)}
            value={alarmLabel}
            onSave={setAlarmLabel}
          />

          {/* Ringtone Modal */}
          <OptionModal
            title="Ringtone"
            visible={ringtoneModalShown}
            onClose={() => setRingtoneModalShown(false)}
            options={ringtoneModalOptions}
            selectedId={selectedRingtoneId}
            onSelect={setSelectedRingtoneId}
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