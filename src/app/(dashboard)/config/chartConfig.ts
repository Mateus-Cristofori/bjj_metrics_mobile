import { colors } from "../types/types";

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
  color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
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
    stroke: "#22C55E",
    fill: "#22C55E",
  },
  fillShadowGradient: "#22C55E",
  fillShadowGradientOpacity: 0.2,
};

export { barChartConfig, lineChartConfig };
