import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function RoundKey({ onPress = null, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.keysContainer}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  keysContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
