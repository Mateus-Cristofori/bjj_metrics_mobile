import { colors } from "../types/types.styles";

const barChartConfig = {
  backgroundColor: colors.cardBackground,
  backgroundGradientFrom: colors.cardBackground,
  backgroundGradientTo: colors.cardBackground,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  fillShadowGradient: "#3B82F6",
  fillShadowGradientOpacity: 1,
  propsForBars: {
    rx: 4,
  },
  barPercentage: 0.6,
};

const lineChartConfig = {
  backgroundColor: colors.cardBackground,
  backgroundGradientFrom: colors.cardBackground,
  backgroundGradientTo: colors.cardBackground,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#3B82F6",
    fill: "#3B82F6",
  },
  fillShadowGradient: "#3B82F6",
  fillShadowGradientOpacity: 0.5,
};

export { barChartConfig, lineChartConfig };

