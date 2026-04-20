import React from "react";
import { Image, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import logo from "../../assets/logo.png";
import styles from "./WelcomeStyles";

export function BrandLogo() {
  return (
    <Animated.View
      style={styles.topSection}
      entering={FadeInDown.duration(600).delay(200)}
    >
      <View style={styles.topSection}>
        <View style={styles.brandContainer}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.title}>BJJ Metrics</Text>
          <Text style={styles.subtitle}>BRAZIL</Text>
        </View>

        <Text style={styles.description}>
          Metrificando sua evolução no tatame. Registre treinos, analise lutas e
          acompanhe seu progresso.
        </Text>
      </View>
    </Animated.View>
  );
}
