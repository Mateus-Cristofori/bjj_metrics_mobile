import { LinearGradient } from "expo-linear-gradient";
import { RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../(login)/login.styles";
import logo from "../../../assets/logo.png";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const screenOpacity = useSharedValue(1);
  const animatedScreenStyle = useAnimatedStyle(() => {
    return {
      opacity: screenOpacity.value,
    };
  });
  const handleRedirect = (route: RelativePathString) => {
    const navigate = () => {
      router.replace(route);
    };

    screenOpacity.value = withTiming(0, { duration: 70 }, () => {
      runOnJS(navigate)();
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o email e a senha.");
      return;
    }
    console.log("Tentando logar com:", { email, password });
    Alert.alert("Login", `Bem-vindo, ${email}!`);
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedScreenStyle]}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
          style={styles.backgroundGlowTop}
        />
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
          style={styles.backgroundGlowBottom}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.logoPlaceholder}>
            <Image source={logo} style={styles.loginLogoImage} />
          </View>
          <Text style={styles.title}>BJJ Metrics Brazil</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={20}
                color="#64748B"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="lock-outline"
                size={20}
                color="#64748B"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() =>
                handleRedirect("/forgotPassword" as RelativePathString)
              }
            >
              <Text style={styles.linkText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <Text style={styles.separator}>|</Text>

            <TouchableOpacity
              onPress={() => handleRedirect("/register" as RelativePathString)}
            >
              <Text style={styles.linkText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}
