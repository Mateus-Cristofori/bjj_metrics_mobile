import { OptionButton } from "@/components/Training/createTraining/OptionButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./createTraining.styles";

const trainingTypes = ["Drill", "Sparring", "Competição"];
const intensityOptions = ["Baixa", "Média", "Alta"];
const modalityOptions = ["Gi", "No-Gi"];
const performanceOptions = ["Péssimo", "Ruim", "Médio", "Bom", "Ótimo"];

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export default function RegisterTrainingModal() {
  const router = useRouter();
  const [trainingType, setTrainingType] = useState("Drill");
  const [intensity, setIntensity] = useState("");
  const [modality, setModality] = useState("Gi");
  const [performance, setPerformance] = useState("");

  const handleCloseTrainingForm = () => {
    router.replace("/dashboard");
  };

  return (
    <Modal visible transparent animationType="fade">
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Registrar Treino</Text>

            <TouchableOpacity
              onPress={handleCloseTrainingForm}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <SectionTitle title="DATA DO TREINO" />

              <TextInput
                value="13/05/2026"
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#5A6372"
                style={styles.input}
              />
            </View>

            <View style={styles.section}>
              <SectionTitle title="TIPO DE TREINO" />

              <View style={styles.rowWrap}>
                {trainingTypes.map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    styles={styles}
                    selected={trainingType === item}
                    onPress={() => setTrainingType(item)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="DURAÇÃO (MINUTOS)" />

              <TextInput
                placeholder="ex: 90"
                placeholderTextColor="#5A6372"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.section}>
              <SectionTitle title="INTENSIDADE" />

              <View style={styles.rowWrap}>
                {intensityOptions.map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    styles={styles}
                    selected={intensity === item}
                    onPress={() => setIntensity(item)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="MODALIDADE" />

              <View style={styles.rowWrap}>
                {modalityOptions.map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    styles={styles}
                    selected={modality === item}
                    onPress={() => setModality(item)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="SEU DESEMPENHO" />

              <View style={styles.rowWrap}>
                {performanceOptions.map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    styles={styles}
                    selected={performance === item}
                    onPress={() => setPerformance(item)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="NOTAS" />

              <TextInput
                multiline
                textAlignVertical="top"
                placeholder="Anotações sobre o treino..."
                placeholderTextColor="#5A6372"
                style={styles.notesInput}
              />
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Salvar treino</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
