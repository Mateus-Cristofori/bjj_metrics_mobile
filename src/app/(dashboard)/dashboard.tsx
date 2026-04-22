import ProgressBar from "@/components/dashboard/ProgressBar";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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
import logo from "../../assets/logo.png";
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
        </View>
        {/* Gráfico de linhas */}
        <SectionHeader title="Sequência de Treinos (Últimas 6 Semanas)" />
        <View style={styles.chartCard}>
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
        </View>
        {/* Gráfico de rosquina */}
        <SectionHeader title="Top 3 Técnicas Treinadas" />
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
        {/* Porcetagem de faixas */}
        <SectionHeader title="Faixas com quem rolou" />
        <View style={styles.card}>
          {sortedBeltData.map((belt, index) => (
            <ProgressBar key={belt.label} {...belt} index={index} />
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
