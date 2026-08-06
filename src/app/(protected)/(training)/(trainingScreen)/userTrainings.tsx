import { SidebarMenu } from "@/components/global/menu/sideBarMenu";
import fetch from "@/services/api";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getIntensityColor } from "./functions/colorSwitchFunction";
import {
  athletePerformanceMap,
  formatDate,
  giOrNoGi,
  intensity,
  UserTrainings,
} from "./types/userTrainingTypes";
import { styles } from "./userTraining.style";
import { LinearGradient } from "expo-linear-gradient";

export default function UserTraining() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userTrainins, setUserTrainins] = useState<UserTrainings[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserTrainings() {
      try {
        const response = await fetch.get("/roll/list-all");

        const formattedTrainings = response.data.map((item: any) => ({
          trainingId: item.training.trainingId,
          trainingType: item.training.trainingType,
          durationMinutes: item.training.durationMinutes,
          intensity: intensity[item.training.intensity],
          gi: giOrNoGi[item.training.gi],
          athleteTrainingPerformance:
            athletePerformanceMap[item.training.athleteTrainingPerformance],
          academyId: item.training.academyId,
          trainingDate: formatDate(item.training.trainingDate),
          notes: item.training.notes,
          rolas: item.training.rolls,
        }));

        setUserTrainins(formattedTrainings);
      } catch (error) {
        console.error("Error fetching user trainings:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao buscar treinos",
          text2: "Não foi possível carregar os treinos.",
        });
      }
    }

    fetchUserTrainings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
        style={styles.backgroundGlowTop}
      />
      <LinearGradient
        colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
        style={styles.backgroundGlowBottom}
      />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(true)}
        >
          <Icon name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Meus Treinos
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            6 treino(s) registrado(s)
          </Text>
        </View>
      </View>

      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentRoute="Treinos"
        onNavigate={(route) => {
          router.push(route as RelativePathString);
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userTrainins.map((training) => (
          <TouchableOpacity
            key={training.trainingId}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              router.push({
                pathname:
                  "/(protected)/(training)/(trainingScreen)/trainingDetails" as RelativePathString,
                params: { trainingData: JSON.stringify(training) },
              });
            }}
          >
            {/* Topo do Card */}
            <View style={styles.cardHeader}>
              <View style={styles.cardDateContainer}>
                <Icon name="dumbbell" size={16} color="#9ca3af" />
                <Text style={styles.cardDateText}>{training.trainingDate}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{training.trainingType}</Text>
              </View>
            </View>

            {/* Estatísticas do treino */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Icon name="clock-outline" size={18} color="#9ca3af" />
                <Text style={styles.statValue}>{training.durationMinutes}</Text>
                <Text style={styles.statLabel}>min</Text>
              </View>

              <View style={styles.statItem}>
                <Icon
                  name="fire"
                  size={18}
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

              <View style={styles.statItem}>
                <Icon name="shield-outline" size={18} color="#9ca3af" />
                <Text style={styles.statValue}>{training.gi}</Text>
                <Text style={styles.statLabel}>modal</Text>
              </View>

              <View style={styles.statItem}>
                <Icon name="karate" size={18} color="#9ca3af" />
                <Text style={styles.statValue}>{training.rolas.length}</Text>
                <Text style={styles.statLabel}>Lutas</Text>
              </View>
            </View>

            {/* Desempenho e Anotações */}
            <View style={styles.performanceContainer}>
              <Text style={styles.performanceText}>
                Desempenho:{" "}
                <Text style={styles.performanceValue}>
                  {training.athleteTrainingPerformance}
                </Text>
              </Text>
              {training.notes && (
                <Text style={styles.annotationsText}>{training.notes}</Text>
              )}
            </View>

            {/* Ações (Editar / Excluir) */}
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="pencil-outline" size={14} color="#9ca3af" />
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="delete-outline" size={14} color="#9ca3af" />
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão Fixo Inferior */}
      {/* <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.registerButton} activeOpacity={0.8}>
          <Icon name="plus" size={18} color="#ffffff" />
          <Text style={styles.registerButtonText}>Registrar Treino</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
