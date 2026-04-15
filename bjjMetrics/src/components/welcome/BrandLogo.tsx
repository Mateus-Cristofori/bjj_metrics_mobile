import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./WelcomeStyles";

export function BrandLogo() {
  return (
    <Animated.View
      style={styles.topSection}
      entering={FadeInDown.duration(600).delay(200)}
    >
      <View style={styles.brandContainer}>
        <View style={styles.logoBackground}>
          <Icon name="shield-outline" size={40} color="#38A7B5" />
        </View>
        <Text style={styles.title}>BJJ Metrics</Text>
        <Text style={styles.subtitle}>BRAZIL</Text>
      </View>

      <Text style={styles.description}>
        Metrificando sua evolução no tatame. Registre treinos, analise lutas e
        acompanhe seu progresso.
      </Text>
    </Animated.View>
  );
}
