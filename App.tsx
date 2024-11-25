import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppOverViewScreen from "./src/screens/AppOverViewScreen";
import "./global.css";

import { verifyInstallation } from "nativewind";

export default function App() {
  verifyInstallation();
  return <AppOverViewScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
