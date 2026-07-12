import { colors } from "@/configuration/types/types.styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0A1018",
  },

  container: {
    flex: 1,
    backgroundColor: "#0F1723",
    borderTopWidth: 1,
    borderColor: "#1B2634",
  },

  header: {
    height: 78,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1B2634",
  },

  headerTitle: {
    color: "#F4F7FB",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  closeButton: {
    color: "#8B94A3",
    fontSize: 26,
    lineHeight: 26,
    marginTop: -2,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    color: "#7F8898",
    fontSize: 11,
    letterSpacing: 2.2,
    marginBottom: 12,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2A38",
    backgroundColor: "#040B14",
    paddingHorizontal: 16,
    color: "#F2F5F9",
    fontSize: 18,
  },

  notesInput: {
    width: "100%",
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2A38",
    backgroundColor: "#040B14",
    paddingHorizontal: 16,
    paddingTop: 16,
    color: "#F2F5F9",
    fontSize: 17,
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  optionButton: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#273240",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  optionButtonSelected: {
    backgroundColor: "rgba(74, 222, 235, 0.12)",
    borderColor: "#2C8D99",
  },

  optionButtonText: {
    color: "#C7CFDB",
    fontSize: 16,
    fontWeight: "500",
  },

  optionButtonTextSelected: {
    color: "#7EE7F3",
  },

  submitButton: {
    marginTop: 12,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#38A7B5",
    alignItems: "center",
    justifyContent: "center",
  },

  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  addRollButton: {
    height: 62,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#38A7B5",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  addRollButtonText: {
    color: "#7EE7F3",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
