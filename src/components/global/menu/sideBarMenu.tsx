import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../assets/logo.png";
import { styles } from "./sideBarMenu.styles";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: "Dashboard" | "Treinos" | "Conta";
  onNavigate: (route: "/dashboard" | "/userTrainings" | "/account") => void;
}

export function SidebarMenu({
  isOpen,
  onClose,
  currentRoute,
  onNavigate,
}: SidebarMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/login");
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.drawerContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.drawerHeader}>
            <View style={styles.drawerHeaderInfo}>
              <View style={styles.drawerLogoContainer}>
                <Image source={logo} style={styles.logoImage} />
              </View>
              <View>
                <Text style={styles.drawerAppTitle}>BJJ Metrics</Text>
                <Text style={styles.drawerAppSubtitle}>B R A Z I L</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={22} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <View style={styles.drawerContent}>
            <Text style={styles.menuSectionLabel}>MENU</Text>

            <TouchableOpacity
              style={[
                styles.menuItem,
                currentRoute === "Dashboard" && styles.menuItemActive,
              ]}
              onPress={() => {
                onNavigate("/dashboard");
                onClose();
              }}
            >
              <Icon
                name="view-grid-outline"
                size={20}
                color={currentRoute === "Dashboard" ? "#22c55e" : "#9ca3af"}
              />
              <Text
                style={[
                  styles.menuItemText,
                  currentRoute === "Dashboard" && styles.menuItemTextActive,
                ]}
              >
                Dashboard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                currentRoute === "Treinos" && styles.menuItemActive,
              ]}
              onPress={() => {
                onNavigate("/userTrainings");
                onClose();
              }}
            >
              <Icon
                name="dumbbell"
                size={20}
                color={currentRoute === "Treinos" ? "#22c55e" : "#9ca3af"}
              />
              <Text
                style={[
                  styles.menuItemText,
                  currentRoute === "Treinos" && styles.menuItemTextActive,
                ]}
              >
                Treinos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                currentRoute === "Conta" && styles.menuItemActive,
              ]}
              onPress={() => {
                onNavigate("/account");
                onClose();
              }}
            >
              <Icon
                name="account-outline"
                size={20}
                color={currentRoute === "Conta" ? "#22c55e" : "#9ca3af"}
              />
              <Text
                style={[
                  styles.menuItemText,
                  currentRoute === "Conta" && styles.menuItemTextActive,
                ]}
              >
                Conta
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerFooter}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                handleLogout();
              }}
            >
              <Icon name="logout" size={20} color="#ef4444" />
              <Text style={[styles.menuItemText, { color: "#ef4444" }]}>
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
