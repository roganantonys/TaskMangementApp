import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardTypeOptions, Pressable, StyleSheet, View } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import ControlledInput from "../components/ControlledInput";
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

type SignUpScreenProps = NativeStackScreenProps<StackProps, "SignUp">;

type formType = {
  userName: string;
  email: string;
  passWord: string;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  // const navigation = useNavigation();

  const { control, handleSubmit } = useForm<formType>();

  const handleSignUp = (data: any) => {
    // Handle signup logic here
    console.log("data:", data);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Sign Up</Text>
          <ControlledInput
            name="userName"
            label="Enter your name"
            control={control}
            rules={{ required: "Name is required" }}
          />
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

          <Pressable onPress={handleSubmit(handleSignUp)} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")} // Navigate back to login
            textColor={colors.primary}
          >
            Already have an account? Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary, // Background color
  },
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

export default SignUpScreen;
