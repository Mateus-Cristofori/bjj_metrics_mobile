import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../../assets/logo.png";
import {
  sendCodeChangePassword,
  verifyPasswordRecoveryCode,
} from "../service/recoveryService";
import { styles } from "./verifyCode.styles";

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    try {
      if (!email || !code) {
        Toast.show({
          type: "error",
          text1: "Por favor, preencha o email e o código de recuperação.",
        });
        setLoading(false);
        return;
      }

      const recoveryToken = await verifyPasswordRecoveryCode({ email, code });

      router.replace({
        pathname: "/changePassword",
        params: { recoveryToken },
      });
    } catch (error: any) {
      console.error("Erro ao verificar código:", error);
      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          "Ocorreu um erro ao verificar o código. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.replace("/forgotPassword");
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
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoPlaceholder}>
              <Image source={logo} style={styles.logoImage} />
            </View>
            <Text style={styles.screenTitle}>Verificar código</Text>
            <Text style={styles.instruction}>
              Digite seu email e o código de recuperação que você recebeu.
            </Text>
          </View>

          <View style={styles.form}>
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
                  placeholder="seu@email.com"
                  placeholderTextColor="#6b7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Código de recuperação</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.codeInput]}
                  placeholder="0 0 0 0 0 0"
                  placeholderTextColor="#6b7280"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={code}
                  onChangeText={setCode}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleVerify}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verificar código</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.linkText}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.separator}>|</Text>

            <TouchableOpacity onPress={() => sendCodeChangePassword({ email })}>
              <Text style={styles.linkText}>Reenviar código</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
