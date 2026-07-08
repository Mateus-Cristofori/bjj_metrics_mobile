import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#0F1723",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1B2634",
    padding: 20,
    marginBottom: 24,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B2634",
  },

  cardTitle: {
    color: "#F4F7FB",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  removeButton: {
    color: "#E57373",
    fontSize: 26,
    lineHeight: 26,
    paddingHorizontal: 8,
    marginTop: -2,
  },

  fieldGroup: {
    marginBottom: 16,
  },

  fieldLabel: {
    color: "#5A6372",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: "uppercase",
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

  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },

  counterColumn: {
    flex: 1,
  },

  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#040B14",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2A38",
    height: 58,
  },

  counterButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  counterButtonText: {
    color: "#38A7B5",
    fontSize: 22,
    fontWeight: "500",
  },

  counterValue: {
    flex: 1,
    textAlign: "center",
    color: "#F2F5F9",
    fontSize: 18,
    fontWeight: "600",
  },
});
