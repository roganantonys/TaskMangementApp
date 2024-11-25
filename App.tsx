import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppOverViewScreen from "./src/screens/AppOverViewScreen";
import "./global.css";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#A1EEBD" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
