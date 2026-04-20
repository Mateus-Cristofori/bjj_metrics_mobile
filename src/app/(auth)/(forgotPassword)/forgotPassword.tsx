import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../assets/logo.png";
import styles from "./forgotPassword.styles";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // ! Chamada para o backend
  const handleSendInstructions = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, digite seu email para continuar.");
      return;
    }
    router.replace("/login");
  };

  const handleGoBack = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
          style={styles.backgroundGlowTop}
        />
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
          style={styles.backgroundGlowBottom}
        />

        <View style={styles.logoPlaceholder}>
          <Image source={logo} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>BJJ Metrics</Text>
        <Text style={styles.subtitle}>BRAZIL</Text>

        <Text style={styles.instructionText}>
          Digite seu email e enviaremos instruções para recuperar sua senha.
        </Text>

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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSendInstructions}
        >
          <Text style={styles.submitButtonText}>Trocar senha</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.backToLoginLink}>Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
