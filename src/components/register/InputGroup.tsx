import styles from "@/app/(auth)/(register)/register.styles";
import InputGroupProps from "@/app/(auth)/(register)/types/InputGroupProps";
import React from "react";
import { Text, TextInput, View } from "react-native";

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);
