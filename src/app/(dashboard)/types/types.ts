import { Dimensions } from "react-native";

const colors = {
  accent: "#3B82F6",
  accentSecondary: "#22C55E",
  accentTertiary: "#F59E0B",
  textMuted: "#94A3B8",
  cardBackground: "#1E293B",
  background: "#0C0E10",
  text: "#E5E7EB",
  textDark: "#4B5563",
  white: "#FFFFFF",
  purple: "#9B59B6",
  blue: "#4A90E2",
  brown: "#964B00",
  fullDark: "#000",
  donutSegment1: "#2563EB",
  donutSegment2: "#059669",
  donutSegment3: "#D97706",
};

const fonts = {
  main: "monospace",
};

const { width } = Dimensions.get("window");
const PADDING = 16;
const SUMMARY_CARD_WIDTH = (width - PADDING * 2 - 12 * 2) / 3;

export { colors, fonts, PADDING, SUMMARY_CARD_WIDTH, width };

