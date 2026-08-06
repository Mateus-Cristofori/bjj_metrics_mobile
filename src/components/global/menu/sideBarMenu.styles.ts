import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
  },
  drawerContainer: {
    width: "78%",
    maxWidth: 320,
    height: "100%",
    backgroundColor: "#0b0f14",
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: "#1f2937",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  drawerHeaderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  drawerLogoContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#121821",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  drawerAppTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  drawerAppSubtitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#9ca3af",
  },
  drawerContent: {
    flex: 1,
  },
  menuSectionLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: "#6b7280",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  menuItemActive: {
    backgroundColor: "#121821",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  menuItemText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  menuItemTextActive: {
    color: "#22c55e",
    fontWeight: "600",
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    paddingTop: 12,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    resizeMode: "contain",
  },
});
