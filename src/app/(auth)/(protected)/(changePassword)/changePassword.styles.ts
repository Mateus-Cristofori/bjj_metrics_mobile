import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#121821",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#9ca3af",
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 16,
    color: "#d1d5db",
    marginBottom: 8,
  },
  instruction: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#d1d5db",
    marginBottom: 8,
  },
  input: { flex: 1, fontSize: 16, color: "#fff", height: "100%" },
  button: {
    backgroundColor: "#2e7d9c",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  backgroundGlowTop: {
    position: "absolute",
    top: -100,
    left: 0,
    right: 0,
    height: 500,
    width: 500,
    alignSelf: "center",
    borderRadius: 250,
  },
  backgroundGlowBottom: {
    position: "absolute",
    bottom: -150,
    right: -150,
    height: 300,
    width: 300,
    borderRadius: 150,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
  },
});
