import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
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
import logo from "../../../assets/logo.png";
import styles from "./register.styles";
import FormData from "./types/FormData";
import InputGroupProps from "./types/InputGroupProps";

export default function RegisterScreen() {
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

  const InputGroup: React.FC<InputGroupProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );

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

  const handleRegister = () => {
    console.log("Dados do registro:", formData);
    alert("Cadastro realizado com sucesso! (simulação)");
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
            onChangeText={(lastname) => handleInputChange("lastname", lastname)}
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
            onChangeText={(password) => handleInputChange("password", password)}
            secureTextEntry
          />
          <InputGroup
            label="Data de Nascimento"
            placeholder="dd/mm/aaaa"
            value={formData.birthDate}
            onChangeText={(birthDate) =>
              handleInputChange("birthDate", birthDate)
            }
            keyboardType="numeric"
          />

          <Text style={styles.sectionHeader}>INFORMAÇÕES EXTRAS</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Faixa</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.belt}
                onValueChange={(belt) => handleInputChange("belt", belt)}
                style={styles.picker}
                dropdownIconColor="#E2E8F0"
              >
                <Picker.Item
                  label="Selecione sua faixa"
                  value=""
                  color="#64748B"
                />
                <Picker.Item label="Branca" value="branca" color="#000" />
                <Picker.Item label="Azul" value="azul" color="#000" />
                <Picker.Item label="Roxa" value="roxa" color="#000" />
                <Picker.Item label="Marrom" value="marrom" color="#000" />
                <Picker.Item label="Preta" value="preta" color="#000" />
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
          <InputGroup
            label="País"
            placeholder="ex: Brasil"
            value={formData.country}
            onChangeText={(country) => handleInputChange("country", country)}
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleRegister}
          >
            <Text style={styles.createButtonText}>Criar conta</Text>
            <Icon name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta? </Text>
            <TouchableOpacity onPress={handleRedirectToLogin}>
              <Text style={styles.footerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
