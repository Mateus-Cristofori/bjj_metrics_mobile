import { OptionButton } from "@/components/Training/createTraining/OptionButton";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles as mainStyles } from "../createTraining.styles";
import { TrainingRolls } from "../form/trainingFormData";
import { intensityType } from "../form/types";
import { styles } from "./style/rollForm.styles";

export const beltTypes = [
  { label: "Branco", value: "WHITE" },
  { label: "Azul", value: "BLUE" },
  { label: "Roxa", value: "PURPLE" },
  { label: "Marrom", value: "BROWN" },
  { label: "Preta", value: "BLACK" },
];

export const startingPositionTypes = [
  { label: "Em pé", value: "STANDING" },
  { label: "Guarda fechada", value: "CLOSED_GUARD" },
  { label: "Guarda aberta", value: "OPEN_GUARD" },
  { label: "Meia guarda", value: "HALF_GUARD" },
  { label: "De joelhos", value: "ON_KNEES" },
  { label: "Lateral", value: "SIDE" },
  { label: "Montada", value: "MOUNT" },
  { label: "Costas", value: "BACK_CONTROL" },
  { label: "Joelho na barriga", value: "KNEE_ON_BELLY" },
];

interface RollFormCardProps {
  index: number;
  data: TrainingRolls;
  onChange: (field: keyof TrainingRolls, value: any) => void;
  onRemove: () => void;
}

function NumericCounter({
  label,
  value,
  onDecrement,
  onIncrement,
}: {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <View style={styles.counterColumn}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.counterControls}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={onDecrement}
          activeOpacity={0.7}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.counterValue}>{value}</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={onIncrement}
          activeOpacity={0.7}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RollFormCard({
  index,
  data,
  onChange,
  onRemove,
}: RollFormCardProps) {
  const handleCounterChange = (field: keyof TrainingRolls, change: number) => {
    const currentValue = parseInt(data[field] as string) || 0;
    const newValue = Math.max(0, currentValue + change);
    onChange(field, newValue.toString());
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Rola {index}</Text>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
          <Text style={styles.removeButton}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>PARCEIRO</Text>
        <TextInput
          value={data.partnerName}
          placeholder="Nome do parceiro"
          placeholderTextColor="#5A6372"
          style={styles.input}
          onChangeText={(value) => onChange("partnerName", value)}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>FAIXA DO PARCEIRO</Text>
        <View style={styles.rowWrap}>
          {beltTypes.map((item) => (
            <OptionButton
              key={item.value}
              label={item.label}
              styles={mainStyles}
              selected={data.partnerBelt === item.value}
              onPress={() => onChange("partnerBelt", item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>DURAÇÃO (MIN)</Text>
        <TextInput
          placeholder="ex: 6"
          placeholderTextColor="#5A6372"
          keyboardType="numeric"
          style={styles.input}
          value={String(data.durationMinutes)}
          onChangeText={(value) => onChange("durationMinutes", value)}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>INTENSIDADE</Text>

        <View style={styles.rowWrap}>
          {intensityType.map((item) => (
            <OptionButton
              key={item.value}
              label={item.label}
              styles={mainStyles}
              selected={data.intensity === item.value}
              onPress={() => {
                onChange("intensity", item.value);
              }}
            />
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>POSIÇÃO INICIAL</Text>
        <View style={styles.rowWrap}>
          {startingPositionTypes.map((item) => (
            <OptionButton
              key={item.value}
              label={item.label}
              styles={mainStyles}
              selected={data.startPosition === item.value}
              onPress={() => onChange("startPosition", item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.counterRow}>
        <NumericCounter
          label="FINALIZ. APLICADAS"
          value={parseInt(data.submissionsApplied)}
          onDecrement={() => handleCounterChange("submissionsApplied", -1)}
          onIncrement={() => handleCounterChange("submissionsApplied", 1)}
        />
        <NumericCounter
          label="FINALIZ. SOFRIDAS"
          value={parseInt(data.submissionsSuffered)}
          onDecrement={() => handleCounterChange("submissionsSuffered", -1)}
          onIncrement={() => handleCounterChange("submissionsSuffered", 1)}
        />
      </View>

      <View style={styles.counterRow}>
        <NumericCounter
          label="RASPAGENS"
          value={parseInt(data.sweeps)}
          onDecrement={() => handleCounterChange("sweeps", -1)}
          onIncrement={() => handleCounterChange("sweeps", 1)}
        />
        <NumericCounter
          label="PASSES"
          value={parseInt(data.passes)}
          onDecrement={() => handleCounterChange("passes", -1)}
          onIncrement={() => handleCounterChange("passes", 1)}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>NOTAS</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="Anotações do rola..."
          placeholderTextColor="#5A6372"
          style={styles.notesInput}
          value={data.notes}
          onChangeText={(value) => onChange("notes", value)}
        />
      </View>
    </View>
  );
}
