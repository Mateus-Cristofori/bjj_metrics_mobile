import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { changePassword } from "../service/recoveryService";
import { styles } from "./changePassword.styles";

export default function NewPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { recoveryToken } = useLocalSearchParams<{
    recoveryToken: string;
  }>();

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (!recoveryToken) {
        Toast.show({
          type: "error",
          text1: "Token de recuperação não encontrado.",
        });
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "As senhas não coincidem.",
        });
        setLoading(false);
        return;
      }

      await changePassword({ recoveryToken, newPassword });

      Toast.show({
        type: "success",
        text1: "Senha alterada com sucesso!",
      });

      router.replace("/login");
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);
      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          "Ocorreu um erro ao alterar a senha. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
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
            <View style={styles.iconContainer}>
              <Image source={logo} style={styles.logoImage} />
            </View>
            <Text style={styles.title}>BJJ Metrics</Text>
            <Text style={styles.subtitle}>B R A Z I L</Text>
            <Text style={styles.screenTitle}>Nova senha</Text>
            <Text style={styles.instruction}>
              Escolha uma nova senha para a sua conta.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nova senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Icon
                    name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar nova senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Redefinir senha</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
