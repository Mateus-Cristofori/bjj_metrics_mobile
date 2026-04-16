import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";''
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandLogo } from "../components/welcome/BrandLogo";
import { FeaturePills } from "../components/welcome/FeaturePills";
import styles from "../components/welcome/WelcomeStyles";

export default function Welcome() {
  const router = useRouter();

  const screenOpacity = useSharedValue(1);

  const animatedScreenStyle = useAnimatedStyle(() => {
    return {
      opacity: screenOpacity.value,
    };
  });

  const handleRedirectToLogin = () => {
    const navigate = () => {
      router.replace("/login");
    };

    screenOpacity.value = withTiming(0, { duration: 70 }, () => {
      runOnJS(navigate)();
    });
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedScreenStyle]}>
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
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
