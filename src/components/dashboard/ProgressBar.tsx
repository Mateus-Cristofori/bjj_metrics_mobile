import styles from "@/app/(dashboard)/dashboard.styles";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string;
  index: number;
}
export default function ProgressBar({
  label,
  percentage,
  color,
  index,
}: ProgressBarProps) {
  return (
    <Animated.View entering={FadeIn.duration(1000).delay(index * 100)}>
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
    </Animated.View>
  );
}
