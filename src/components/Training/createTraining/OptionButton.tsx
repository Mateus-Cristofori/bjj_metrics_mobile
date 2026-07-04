import React from "react";
import { Text, TouchableOpacity } from "react-native";

export function OptionButton({
  label,
  selected,
  onPress,
  styles
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  styles: any
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
    >
      <Text
        style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}