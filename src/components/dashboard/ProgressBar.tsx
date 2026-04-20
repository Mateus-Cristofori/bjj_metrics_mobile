import styles from "@/app/(dashboard)/dashboard.styles";
import React from "react";
import { Text, View } from "react-native";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  color,
}) => {
  return (
    <View style={styles.progressItem}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressPercentage}>{`${percentage}%`}</Text>
    </View>
  );
};

export { ProgressBar };
