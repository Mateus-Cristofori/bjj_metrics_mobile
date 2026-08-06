import { OptionButton } from "@/components/Training/createTraining/OptionButton";
import fetch from "@/services/api";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import RollFormCard from "./components/RollFormCard";
import { styles } from "./createTraining.styles";
import { TrainingFormData, TrainingRolls } from "./form/trainingFormData";
import {
  intensityType,
  modalityType,
  performanceType,
  trainingType,
} from "./form/types";
import { formatDate, formatDateToApi } from "./utils/dateUtils";

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export default function RegisterTrainingModal() {
  const { title, route } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCloseTrainingForm = () => {
    console.log("Closing training form, navigating to:", route);
    router.replace(route as RelativePathString);
  };

  const handleInputChange = (
    key: keyof TrainingFormData,
    value: string | boolean,
  ) => {
    setTrainingFormData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [trainingFormData, setTrainingFormData] = useState<TrainingFormData>({
    trainingDate: "",
    trainingType: trainingType[0].value,
    durationMinutes: "",
    intensity: intensityType[0].value,
    gi: true,
    athletePerformance: performanceType[0].value,
    notes: "",
    rolls: [],
  });

  const handleAddNewTrainingRoll = () => {
    const newTrainingRoll: TrainingRolls = {
      id: Date.now().toString(),
      partnerName: "",
      partnerBelt: "",
      durationMinutes: "",
      intensity: "",
      startPosition: "",
      submissionsApplied: "0",
      submissionsSuffered: "0",
      sweeps: "0",
      passes: "0",
      notes: "",
    };

    setTrainingFormData((prevState: any) => ({
      ...prevState,
      rolls: [...prevState.rolls, newTrainingRoll],
    }));
  };

  const handleRemoveRoll = (idToRemove: string) => {
    setTrainingFormData((prevState) => ({
      ...prevState,
      rolls: prevState.rolls.filter((roll) => roll.id !== idToRemove),
    }));
  };

  const handleRollInputChange = (
    id: string,
    field: keyof TrainingRolls,
    value: any,
  ) => {
    setTrainingFormData((prevState) => ({
      ...prevState,
      rolls: prevState.rolls.map((roll) =>
        roll.id === id ? { ...roll, [field]: value } : roll,
      ),
    }));
  };

  const handleCreateTraining = async () => {
    setLoading(true);

    try {
      const { rolls, ...trainingData } = trainingFormData;

      const trainingDuration = parseInt(trainingFormData.durationMinutes, 10);

      if (isNaN(trainingDuration)) {
        Toast.show({
          type: "error",
          text1: "Duração inválida!",
        });
        return;
      }

      const formatedPayload = {
        trainingRequest: {
          ...trainingData,
          trainingDate: formatDateToApi(trainingData.trainingDate),
          durationMinutes: parseInt(trainingData.durationMinutes, 10) || 0,
        },
        rollRequest: {
          rolls: rolls,
        },
      };

      await fetch.post("/training/create/with-rolls", formatedPayload);

      router.replace("/dashboard");

      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Treino cadastrado com sucesso!",
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Falha na criação de treino!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible transparent animationType="fade">
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>

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
                value={trainingFormData.trainingDate}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#5A6372"
                style={styles.input}
                maxLength={10}
                onChangeText={(trainingDate) =>
                  handleInputChange("trainingDate", formatDate(trainingDate))
                }
              />
            </View>

            <View style={styles.section}>
              <SectionTitle title="TIPO DE TREINO" />

              <View style={styles.rowWrap}>
                {trainingType.map((item) => (
                  <OptionButton
                    key={item.value}
                    label={item.label}
                    styles={styles}
                    selected={trainingFormData.trainingType === item.value}
                    onPress={() =>
                      handleInputChange("trainingType", item.value)
                    }
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
                value={trainingFormData.durationMinutes}
                onChangeText={(durationMinutes) => {
                  handleInputChange("durationMinutes", durationMinutes);
                }}
              />
            </View>

            <View style={styles.section}>
              <SectionTitle title="INTENSIDADE" />

              <View style={styles.rowWrap}>
                {intensityType.map((item) => (
                  <OptionButton
                    key={item.value}
                    label={item.label}
                    styles={styles}
                    selected={trainingFormData.intensity === item.value}
                    onPress={() => {
                      handleInputChange("intensity", item.value);
                    }}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="MODALIDADE" />

              <View style={styles.rowWrap}>
                {modalityType.map((item) => (
                  <OptionButton
                    key={item.label}
                    label={item.label}
                    styles={styles}
                    selected={trainingFormData.gi === item.value}
                    onPress={() => handleInputChange("gi", item.value)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionTitle title="SEU DESEMPENHO" />

              <View style={styles.rowWrap}>
                {performanceType.map((item) => (
                  <OptionButton
                    key={item.value}
                    label={item.label}
                    styles={styles}
                    selected={
                      trainingFormData.athletePerformance === item.value
                    }
                    onPress={() =>
                      handleInputChange("athletePerformance", item.value)
                    }
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
                value={trainingFormData.notes}
                onChangeText={(notes) => {
                  handleInputChange("notes", notes);
                }}
              />
            </View>

            <View style={styles.section}>
              <SectionTitle title="ROLAS DESTE TREINO" />
              {trainingFormData.rolls.map((rola, index) => (
                <RollFormCard
                  key={rola.id}
                  index={index + 1}
                  data={rola}
                  onChange={(field, value) =>
                    handleRollInputChange(rola.id, field, value)
                  }
                  onRemove={() => handleRemoveRoll(rola.id)}
                />
              ))}
              <TouchableOpacity
                style={styles.addRollButton}
                activeOpacity={0.8}
                onPress={handleAddNewTrainingRoll}
              >
                <Text style={styles.addRollButtonText}>Adicionar rola</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitButton}
              onPress={handleCreateTraining}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Salvar treino</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
