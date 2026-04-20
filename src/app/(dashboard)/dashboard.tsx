import { ProgressBar } from "@/components/dashboard/ProgressBar";
import SectionHeader from "@/components/dashboard/SectionHeader";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../assets/logo.png";
import { barChartConfig, lineChartConfig } from "./config/chartConfig";
import styles from "./dashboard.styles";
import {
  sortedBeltData,
  topTechniquesData,
  trainingSequenceData,
  weeklyTrainingData,
} from "./mock/mockData";
import { colors } from "./types/types";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder}>
              <Image source={logo} style={styles.logoImage} />
            </View>
            <View>
              <Text style={styles.appName}>BJJ METRICS</Text>
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
          <BarChart
            data={{
              labels: weeklyTrainingData.map((p) => p.day),
              datasets: [
                {
                  data: weeklyTrainingData.map((p) => p.treinos),
                },
              ],
            }}
            width={Dimensions.get("window").width - 45}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero={true}
            showValuesOnTopOfBars={false}
            showBarTops={false}
            chartConfig={barChartConfig}
            style={{
              borderRadius: 16,
              paddingRight: 40,
            }}
          />
        </View>
        {/* Gráfico de linhas */}
        <SectionHeader title="Sequência de Treinos (Últimas 6 Semanas)" />
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: trainingSequenceData.map((p) => `S${p.week}`),
              datasets: [
                {
                  data: trainingSequenceData.map((p) => p.count),
                },
              ],
            }}
            width={Dimensions.get("window").width - 45}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero={true}
            chartConfig={lineChartConfig}
          />
        </View>
        {/* Gráfico de rosquina */}
        <SectionHeader title="Top 3 Técnicas Treinadas" />
        <View
          style={[
            styles.card,
            { flexDirection: "row", alignItems: "center", gap: 16 },
          ]}
        >
          <PieChart
            data={topTechniquesData.map((item) => ({
              name: item.technique,
              population: item.percentage,
              color:
                item.technique === "Finalização"
                  ? colors.donutSegment1
                  : item.technique === "Guarda"
                    ? colors.donutSegment2
                    : colors.donutSegment3,
              legendFontColor: colors.text,
              legendFontSize: 12,
            }))}
            width={150}
            height={120}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"40"}
            center={[0, 0]}
            hasLegend={false}
            absolute
          />
          <View style={{ flex: 1 }}>
            {topTechniquesData.map((item) => (
              <View key={item.technique} style={styles.legendItem}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View
                    style={[
                      styles.legendColorBox,
                      {
                        backgroundColor:
                          item.technique === "Finalização"
                            ? colors.donutSegment1
                            : item.technique === "Guarda"
                              ? colors.donutSegment2
                              : colors.donutSegment3,
                      },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{item.technique}</Text>
                </View>
                <Text style={styles.legendPercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Porcetagem de faixas */}
        <SectionHeader title="Faixas com quem rolou" />
        <View style={styles.card}>
          {sortedBeltData.map((belt) => (
            <ProgressBar key={belt.label} {...belt} />
          ))}
        </View>

        <TouchableOpacity style={styles.registerButton}>
          <Icon name="plus" size={20} color={colors.white} />
          <Text style={styles.registerButtonText}>Registrar Treino</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
