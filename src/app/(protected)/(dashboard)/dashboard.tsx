import EmptyState from "@/components/common/EmptyState";
import SectionHeader from "@/components/dashboard/SectionHeader";
import fetch from "@/services/api";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../assets/logo.png";
import {
  belt,
  beltColorMap,
  beltLabelMap,
  technique,
} from "../configuration/types/types";
import { colors } from "./../configuration/types/types.styles";
import styles from "./dashboard.styles";

export default function DashboardScreen() {
  const [weeklyTrainingData, setWeeklyTrainingData] = React.useState([]);
  const [trainingSequenceData, setTrainingSequenceData] = React.useState([]);
  const [topTechniquesData, setTopTechniquesData] = React.useState<technique[]>(
    [],
  );
  const [beltData, setBeltData] = React.useState<belt[]>([]);
  const [loading, setLoading] = React.useState(true);

  const hasTechniquesData = topTechniquesData.some((t) => t.value > 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await fetch("/statistics/dashboard");

        console.log(data);

        const weekly = (data.weeklyTrainings || []).map(
          (item: any, index: number) => ({
            id: `${item.day}-${index}`,
            value: item.value,
            label: item.day.slice(0, 3),
          }),
        );

        const sequence = (data.trainingSequence || []).map(
          (item: any, index: number) => ({
            id: `${item.week}-${index}`,
            value: item.value,
            label: item.week,
          }),
        );

        const techniques = (data.topTechniques || []).map(
          (item: any, index: number) => ({
            id: `${item.label}-${index}`,
            value: item.value,
            label: item.label,
            text: `${item.value}%`,
            color: ["#38A7B5", "#FF7F50", "#FFD700"][index % 3],
          }),
        );

        const belts = (data.beltStats || []).map(
          (item: any, index: number) => ({
            id: `${item.label}-${index}`,
            label: beltLabelMap[item.label] || item.label,
            percentage: item.percentage,
            color: beltColorMap[item.label] || "#38A7B5",
          }),
        );

        setWeeklyTrainingData(weekly);
        setTrainingSequenceData(sequence);
        setTopTechniquesData(techniques);
        setBeltData(belts);
      } catch (error) {
        console.log("Erro ao buscar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Text style={{ color: "white" }}>Carregando...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.1)", "transparent"]}
          style={styles.backgroundGlowTop}
        />
        <LinearGradient
          colors={["rgba(56, 167, 181, 0.05)", "transparent"]}
          style={styles.backgroundGlowBottom}
        />
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder}>
              <Image source={logo} style={styles.logoImage} />
            </View>
            <View>
              <Text style={styles.userName}>Olá, Mateus</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="cog-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        {/* Cartões de Resumo */}
        <SectionHeader title="Resumo" />
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Icon name="chart-bar" size={24} color={colors.accent} />
            <Text style={styles.summaryCardValue}>48</Text>
            <Text style={styles.summaryCardLabel}>Treinos</Text>
          </View>
          <View style={styles.summaryCard}>
            <Icon name="target" size={24} color={colors.accent} />
            <Text style={styles.summaryCardValue}>12</Text>
            <Text style={styles.summaryCardLabel}>Lutas</Text>
          </View>
          <View style={styles.summaryCard}>
            <Icon name="trending-up" size={24} color={colors.accent} />
            <Text style={styles.summaryCardValue}>6d</Text>
            <Text style={styles.summaryCardLabel}>Streak</Text>
          </View>
        </View>
        {/* Próxima Competição */}
        <SectionHeader title="Próxima Competição" />
        <View style={styles.card}>
          <View style={styles.competitionDetails}>
            <Icon name="calendar-star" size={24} color={colors.accent} />
            <View style={{ flex: 1 }}>
              <Text style={styles.competitionTitle}>Copa São Paulo de BJJ</Text>
              <Text style={styles.competitionDate}>09 de maio de 2024</Text>
            </View>
            <View style={styles.competitionDays}>
              <Text style={styles.competitionDaysValue}>22</Text>
              <Text style={styles.competitionDaysLabel}>DIAS</Text>
            </View>
          </View>
        </View>
        {/* Gráfico de barras */}
        <SectionHeader title="Treinos esta Semana" />
        <View style={styles.chartCard}>
          {weeklyTrainingData.length ? (
            <BarChart
              data={weeklyTrainingData}
              adjustToWidth
              barWidth={23}
              barBorderRadius={4}
              frontColor={colors.accent}
              gradientColor={"#FF7F50"}
              noOfSections={5}
              yAxisThickness={0}
              rulesColor={colors.textDark}
              rulesType="dashed"
              xAxisColor={colors.textMuted}
              yAxisTextStyle={{ color: colors.textMuted }}
              xAxisLabelTextStyle={{ color: colors.textMuted }}
              isAnimated
              animationDuration={400}
            />
          ) : (
            <EmptyState message="Nenhum treino essa semana" />
          )}
        </View>
        {/* Gráfico de linhas */}
        <SectionHeader title="Sequência de Treinos (Últimas 6 Semanas)" />
        <View style={styles.chartCard}>
          {trainingSequenceData.length ? (
            <LineChart
              data={trainingSequenceData}
              adjustToWidth
              isAnimated
              animationDuration={1000}
              color={colors.accent}
              thickness={3}
              dataPointsColor={colors.accent}
              dataPointsRadius={5}
              noOfSections={5}
              rulesColor={colors.textDark}
              rulesType="dashed"
              yAxisTextStyle={{ color: colors.textMuted }}
              xAxisLabelTextStyle={{ color: colors.textMuted }}
              yAxisThickness={0}
              xAxisThickness={0}
            />
          ) : (
            <EmptyState message="Nenhuma técnica registrada" />
          )}
        </View>
        {/* Gráfico de rosquina */}
        <SectionHeader title="Top 3 Técnicas Treinadas" />
        {hasTechniquesData ? (
          <Animated.View
            entering={FadeIn.duration(1000)}
            style={[
              styles.chartCard,
              { flexDirection: "row", alignItems: "center", gap: 16 },
            ]}
          >
            <PieChart
              data={topTechniquesData}
              donut
              radius={60}
              innerRadius={40}
              innerCircleColor="transparent"
              textColor={colors.text}
              textSize={12}
              isAnimated
              animationDuration={1200}
              focusOnPress
            />
            {/* Legenda customizada */}
            <View style={{ flex: 1 }}>
              {topTechniquesData.map((item, index) => (
                <Animated.View
                  key={item.label}
                  entering={FadeIn.duration(400).delay(index * 100)}
                  style={styles.legendItem}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={[
                        styles.legendColorBox,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text style={styles.legendLabel}>{item.label}</Text>
                  </View>

                  <Text style={styles.legendPercentage}>{item.text}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        ) : (
          <EmptyState message="Nenhuma técnica registrada" />
        )}
        {/* Porcetagem de faixas */}
        <SectionHeader title="Faixas com quem rolou" />
        {beltData.length ? (
          <View style={styles.card}>
            {beltData.map((belt, index) => (
              <View key={belt.id} style={styles.beltItem}>
                {/* Header */}
                <View style={styles.beltHeader}>
                  <Text style={styles.beltLabel}>{belt.label}</Text>
                  <Text style={styles.beltPercentage}>
                    {belt.percentage.toFixed(0)}%
                  </Text>
                </View>

                {/* Barra */}
                <View style={styles.beltBarBackground}>
                  <View
                    style={[
                      styles.beltBarFill,
                      {
                        width: `${belt.percentage}%`,
                        backgroundColor: belt.color || colors.accent,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <EmptyState message="Nenhum treino com faixas registrado" />
        )}
        <TouchableOpacity style={styles.registerButton}>
          <Icon name="plus" size={20} color={colors.white} />
          <Text style={styles.registerButtonText}>Registrar Treino</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
