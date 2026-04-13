import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Clock from "@/components/Clock";
import MultiSelectModal from "@/components/MultiSelectModal";
import OptionCard from "@/components/OptionCard";
import OptionModal from "@/components/OptionModal";
import RingtoneModal from "@/components/RingtoneModal";
import TextInputModal from "@/components/TextInputModal";
import { formatRepeatLabel, getSelectedRingtoneValue, getSelectedSnoozeValue, repeatModalOptions, ringtoneModalOptions, snoozeModalOptions, snoozeOptions } from "@/lib/utils";
import CustomHeader from "@/components/CustomHeader";
import { saveAlarm } from "@/lib/alarmStorage";
import "../../../global.css";

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
        <CustomHeader
          title="Add Alarm"
          shouldSave = {true}
          onSave= {handleSave}
        />
      )
    })
  })

  // Handle alarm save
  const router = useRouter();

  const handleSave = async () => {
    try {
      const snoozeDuration = snoozeOptions.find(opt => opt.id === selectedSnoozeId)?.duration || 5;

      const newAlarm = {
        id: Date.now().toString(),
        time: time,
        label: alarmLabel,
        repeat: selectedRepeatDays,
        isEnabled: true,
        snooze: snoozeDuration,
        ringtoneId: selectedRingtoneId,
      };

      await saveAlarm(newAlarm); // Save the new alarm in the storage
      router.replace({ pathname: '/(alarm)', params: { newAlarmId: newAlarm.id } }); // Go back to the alarms screen

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

        <OptionCard title="Repeat" value={formatRepeatLabel(selectedRepeatDays)} onPress={() => setRepeatModalShown(true)} />
        <OptionCard title="Label" value={alarmLabel} onPress={() => setLabelModalShown(true)} />
        <View className="h-px bg-gray-200" />
        <OptionCard title="Ringtone" value={getSelectedRingtoneValue(selectedRingtoneId)} onPress={() => setRingtoneModalShown(true)} />
        <OptionCard title="Snooze" value={getSelectedSnoozeValue(selectedSnoozeId)} onPress={() => setSnoozeModalShown(true)} />

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
      <RingtoneModal
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