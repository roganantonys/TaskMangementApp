import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import ControlledInput from "../components/ControlledInput";
import { useForm, Controller } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackProps } from "../navigation/StackNavigation";
// Define color palette
const colors = {
  primary: "#659287", // Main accent color
  secondary: "#B1C29E", // Secondary background
  tertiary: "#FFE6A9", // Highlight color
  cardBackground: "#DEAA79", // Card background color
  white: "#FFFFFF",
  textDark: "#000000",
};

type formData = {
  email: string;
  passWord: string;
};
type LoginScreenProps = NativeStackScreenProps<StackProps, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<formData>();

  // const navigation = useNavigation();

  const handleLogin = (data: any) => {
    // Handle login logic here
    console.log("loginData:", data);
  };

  return (
    //  style={styles.container}
    <View className="flex-1 justify-center items-center bg-[#FFE6A9]">
      {/* style={styles.card}  */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Login</Text>
          <ControlledInput
            name="email"
            label="Enter your email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ControlledInput
            name="password"
            label="Enter your password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            secureTextEntry
          />
          <Pressable onPress={handleSubmit(handleLogin)} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Button
            mode="text"
            onPress={() => console.log("Forgot Password Pressed")}
            textColor={colors.primary}
          >
            Forgot Password?
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("SignUp")} // Navigate to the Sign Up screen
            textColor={colors.primary}
          >
            New user? Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: colors.tertiary, // Background color
  //   },

  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.cardBackground, // Card background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.textDark, // Text color
  },
  input: {
    marginBottom: 15,
    backgroundColor: colors.secondary, // Input background
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.primary, // Primary button background
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.white, // Button text color
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
