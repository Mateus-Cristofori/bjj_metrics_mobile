import styles from "@/app/(dashboard)/dashboard.styles";
import React from "react";
import { Text } from "react-native";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader(props: SectionHeaderProps) {
  return <Text style={styles.sectionHeader}>{props.title.toUpperCase()}</Text>;
}
