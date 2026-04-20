import { Dimensions } from "react-native";

const colors = {
  background: "#1A1E24",
  cardBackground: "#2D333B",
  accent: "#3F8C8C",
  text: "#E5E7EB",
  textMuted: "#9CA3AF",
  textDark: "#4B5563",
  white: "#FFFFFF",
  purple: "#9B59B6",
  blue: "#4A90E2",
  brown: "#964B00",
  fullDark: "#000",
  donutSegment1: "#3F8C8C",
  donutSegment2: "#2F6B6B",
  donutSegment3: "#1F4A4A",
};

const fonts = {
  main: "monospace",
};

const { width } = Dimensions.get("window");
const PADDING = 16;
const SUMMARY_CARD_WIDTH = (width - PADDING * 2 - 12 * 2) / 3;

export { colors, fonts, PADDING, SUMMARY_CARD_WIDTH, width };
