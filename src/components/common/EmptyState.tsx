import React from "react";
import { Text, View } from "react-native";

interface Props {
  message: string;
}

export default function EmptyState(props: Props) {
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text style={{ color: "#999" }}>{props.message}</Text>
    </View>
  );
}
