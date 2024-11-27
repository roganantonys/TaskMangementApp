import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#A1EEBD" />
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
          <Toast position="bottom" />
        </NavigationContainer>
      </Provider>
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
