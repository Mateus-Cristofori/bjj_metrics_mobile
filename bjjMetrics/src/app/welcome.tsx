import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandLogo } from "../components/welcome/BrandLogo";
import { FeaturePills } from "../components/welcome/FeaturePills";
import styles from "../components/welcome/WelcomeStyles";

export default function Welcome() {
  const handleRedirectToLogin = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
          style={styles.backgroundGlowTop}
        />
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
          style={styles.backgroundGlowBottom}
        />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <BrandLogo />
          <FeaturePills />
        </View>

        <Animated.View
          style={styles.bottomSection}
          entering={FadeInDown.duration(600).delay(1200)}
        >
          <TouchableOpacity
            onPress={handleRedirectToLogin}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Ao continuar, você concorda com nossos Termos de Uso
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
