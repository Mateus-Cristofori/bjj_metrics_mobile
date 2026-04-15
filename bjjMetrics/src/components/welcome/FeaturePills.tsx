import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./WelcomeStyles";

const features = [
  { icon: "chart-bar", label: "Métricas de treino" },
  { icon: "trending-up", label: "Evolução contínua" },
  { icon: "target", label: "Análise de lutas" },
];

export function FeaturePills() {
  return (
    <View style={styles.featuresContainer}>
      {features.map((feature, index) => (
        <Animated.View
          key={feature.label}
          style={styles.featurePill}
          entering={FadeInDown.duration(500).delay(600 + index * 100)}
        >
          <Icon name={feature.icon} size={16} color="#38A7B5" />
          <Text style={styles.featureLabel}>{feature.label}</Text>
        </Animated.View>
      ))}
    </View>
  );
}
