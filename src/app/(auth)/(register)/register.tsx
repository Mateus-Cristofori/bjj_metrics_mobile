import { InputGroup } from "@/components/register/InputGroup";
import fetch from "@/services/api";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../assets/logo.png";
import styles from "./register.styles";
import FormData from "./types/FormData";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
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

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthDate: "",
    belt: "",
    weight: "",
    academyName: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const showRegisterSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Conta criada!",
    });
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  const formatDateToBackend = (date: string) => {
    if (!date) return null;

    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        belt: formData.belt,
        weight: parseFloat(formData.weight),
        birthDate: formatDateToBackend(formData.birthDate),
        academy: {
          academyName: formData.academyName,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      };
      await fetch.post("/onboarding", payload);

      showRegisterSuccess();
    } catch (error: any) {
      console.log("Erro:", error?.response?.data || error);
      alert("Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
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
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.registerLogoPlaceholder}>
                <Image source={logo} style={styles.logoImage} />
              </View>
              <Text style={styles.title}>BJJ Metrics</Text>
              <Text style={styles.subtitle}>BRAZIL</Text>
              <Text style={styles.createAccountText}>Criar nova conta</Text>
            </View>
            <Text style={styles.sectionHeader}>DADOS PESSOAIS</Text>
            <InputGroup
              label="Nome"
              placeholder="Seu nome"
              value={formData.name}
              onChangeText={(name) => handleInputChange("name", name)}
            />
            <InputGroup
              label="Sobrenome"
              placeholder="Seu sobrenome"
              value={formData.lastname}
              onChangeText={(lastname) =>
                handleInputChange("lastname", lastname)
              }
            />
            <InputGroup
              label="Email"
              placeholder="seu@email.com"
              value={formData.email}
              onChangeText={(email) => handleInputChange("email", email)}
              keyboardType="email-address"
            />
            <InputGroup
              label="Senha"
              placeholder="********"
              value={formData.password}
              onChangeText={(password) =>
                handleInputChange("password", password)
              }
              secureTextEntry
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de Nascimento</Text>

              <MaskedTextInput
                style={styles.textInput}
                placeholderTextColor="#94A3B8"
                placeholder="dd/mm/aaaa"
                mask="99/99/9999"
                value={formData.birthDate}
                onChangeText={(text) => handleInputChange("birthDate", text)}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.sectionHeader}>INFORMAÇÕES EXTRAS</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Faixa</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formData.belt}
                  onValueChange={(belt) => handleInputChange("belt", belt)}
                  style={styles.picker}
                  dropdownIconColor="#fff"
                >
                  <Picker.Item
                    label="Selecione sua faixa"
                    value=""
                    color="#94A3B8"
                  />
                  <Picker.Item label="Branca" value="WHITE" />
                  <Picker.Item label="Azul" value="BLUE" />
                  <Picker.Item label="Roxa" value="PURPLE" />
                  <Picker.Item label="Marrom" value="BROWN" />
                  <Picker.Item label="Preta" value="BLACK" />
                </Picker>
              </View>
            </View>
            <InputGroup
              label="Peso (kg)"
              placeholder="ex: 75.5"
              value={formData.weight}
              onChangeText={(weight) => handleInputChange("weight", weight)}
              keyboardType="decimal-pad"
            />
            <Text style={styles.sectionHeader}>DADOS DA ACADEMIA</Text>
            <InputGroup
              label="Nome da Academia"
              placeholder="ex: Gracie Barra SP"
              value={formData.academyName}
              onChangeText={(academyName) =>
                handleInputChange("academyName", academyName)
              }
            />
            <InputGroup
              label="Cidade"
              placeholder="ex: São Paulo"
              value={formData.city}
              onChangeText={(city) => handleInputChange("city", city)}
            />
            <InputGroup
              label="Estado"
              placeholder="ex: SP"
              value={formData.state}
              onChangeText={(state) => handleInputChange("state", state)}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>País</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formData.country}
                  onValueChange={(value) => handleInputChange("country", value)}
                  style={styles.picker}
                  dropdownIconColor="#fff"
                >
                  <Picker.Item label="Selecione seu país" value={undefined} />
                  <Picker.Item label="Brasil" value="BRA" />
                  <Picker.Item label="Argentina" value="ARG" />
                  <Picker.Item label="Estados Unidos" value="USA" />
                </Picker>
              </View>
            </View>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleRegister}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Criar conta</Text>
              )}
              <Icon name="chevron-right" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem conta? </Text>
              <TouchableOpacity onPress={handleRedirectToLogin}>
                <Text style={styles.footerLink}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}
