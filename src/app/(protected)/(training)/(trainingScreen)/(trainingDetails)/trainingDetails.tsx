import {
  beltColorMap,
  beltLabelMap,
} from "@/app/(protected)/(dashboard)/types";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIntensityColor } from "../functions/colorSwitchFunction";
import { startPositionMap, UserTrainings } from "../types/userTrainingTypes";
import { styles } from "./trainingDetails.style";

export default function TrainingDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const training: UserTrainings = params.trainingData
    ? JSON.parse(params.trainingData as string)
    : null;

  if (!training) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
          Treino não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
          style={styles.backgroundGlowTop}
        />
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
          style={styles.backgroundGlowBottom}
        />

        {/* Título e Subtítulo */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{training.trainingDate}</Text>
          <Text style={styles.subtitle}>
            {training.trainingType} • {training.gi ? "Gi" : "No-Gi"}
          </Text>
        </View>

        {/* Cards de Estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Icon name="clock-outline" size={20} color="#9ca3af" />
            <Text style={styles.statValue}>{training.durationMinutes}</Text>
            <Text style={styles.statLabel}>Duração (min)</Text>
          </View>

          <View style={styles.statCard}>
            <Icon
              name="fire"
              size={20}
              color={getIntensityColor(training.intensity)}
            />
            <Text
              style={[
                styles.statValue,
                { color: getIntensityColor(training.intensity) },
              ]}
            >
              {training.intensity}
            </Text>
            <Text style={styles.statLabel}>Intensidade</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="karate" size={20} color="#9ca3af" />
            <Text style={styles.statValue}>{training.rolas?.length || 0}</Text>
            <Text style={styles.statLabel}>Lutas</Text>
          </View>
        </View>

        {/* Desempenho */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>DESEMPENHO</Text>
          <Text style={styles.sectionContentValue}>
            {training.athleteTrainingPerformance}
          </Text>
          {training.notes ? (
            <Text style={styles.notesText}>{training.notes}</Text>
          ) : null}
        </View>

        {/* Lista de Rolas */}
        <View style={styles.rollsSectionHeader}>
          <Text style={styles.sectionTitle}>
            LUTAS ({training.rolas?.length || 0})
          </Text>
        </View>

        {!training.rolas || training.rolas.length === 0 ? (
          <Text style={styles.noRollsText}>Nenhuma rola registrada.</Text>
        ) : (
          training.rolas.map((rola, index) => (
            <View key={index} style={styles.rollCard}>
              <Text style={styles.rollPartner}>
                Parceiro: {rola.partnerName}
              </Text>
              <Text style={styles.rollPartner}>
                Faixa:{" "}
                <Text
                  style={{ color: beltColorMap[rola.partnerBelt] || "#FFFFFF" }}
                >
                  {beltLabelMap[rola.partnerBelt] || rola.partnerBelt}
                </Text>
              </Text>
              <Text style={styles.rollDetails}>
                Duração: {rola.durationMinutes} min • Posição:{" "}
                {startPositionMap[rola.startPosition]}
              </Text>
              <Text style={styles.rollDetails}>
                Sub. Aplicadas: {rola.submissionsApplied} | Sub. Sofridas:{" "}
                {rola.submissionsSuffered}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Ações Inferiores (Editar e Excluir) */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() => {
            router.replace({
              pathname: "/createTraining",
              params: {
                title: "Editar Treino",
                route:
                  "/(protected)/(training)/(trainingScreen)/trainingDetails",
                trainingData:
                  typeof params.trainingData === "string"
                    ? params.trainingData
                    : JSON.stringify(params.trainingData),
              },
            });
          }}
        >
          <Icon name="pencil-outline" size={18} color="#0f172a" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}>
          <Icon name="delete-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
