import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import ControlledInput from "../components/ControlledInput";
import { useForm, Controller } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackProps } from "../navigation/StackNavigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Define color palette
const colors = {
  primary: "#659287", // Main accent color
  secondary: "#B1C29E", // Secondary background
  tertiary: "#FFE6A9", // Highlight color
  cardBackground: "#DEAA79", // Card background color
  white: "#FFFFFF",
  textDark: "#000000",
};

type LoginScreenProps = NativeStackScreenProps<StackProps, "Login">;

const schema = z.object({
  password: z
    .string()
    .min(4, { message: "password atleast 4 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

type LoginFormData = z.infer<typeof schema>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  console.log(errors);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  // const handleLogin = async (data: LoginFormData) => {
  //   setIndicatorVisible(true);
  //   console.log("loginData:", data);
  //   try {
  //     const res = await signInWithEmailAndPassword(
  //       fireAuth,
  //       data.email,
  //       data.password
  //     );
  //     console.log("User Logged successfully:", res.user.uid);
  //     Toast.show({
  //       type: "success",
  //       text2: "Logged in Successfully",
  //     });
  //     navigation.replace("BottomTab");
  //   } catch (err: any) {
  //     // Firebase error handling
  //     let errorMessage = "An error occurred.";
  //     if (err.code === "auth/invalid-email") {
  //       errorMessage = "Invalid email address.";
  //     } else if (err.code === "auth/wrong-password") {
  //       errorMessage = "Incorrect password.";
  //     } else if (err.code === "auth/user-not-found") {
  //       errorMessage = "No user found with this email.";
  //     } else if (err.code === "auth/invalid-credential") {
  //       errorMessage = "email or password is wrong";
  //     }
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: errorMessage,
  //     });
  //     console.log("Can't log in:", err.message);
  //   } finally {
  //     setIndicatorVisible(false);
  //   }
  // };

  const handleLogin = async (data: LoginFormData) => {
    setIndicatorVisible(true);
    console.log("loginData:", data);

    try {
      const res = await signInWithEmailAndPassword(
        fireAuth,
        data.email,
        data.password
      );

      // Store user UID in AsyncStorage
      await AsyncStorage.setItem("userUUID", res.user.uid);

      console.log("User Logged in successfully:", res.user.uid);
      Toast.show({
        type: "success",
        text2: "Logged in Successfully",
      });

      // navigation.replace("BottomTab");
    } catch (err: any) {
      // Firebase error handling
      let errorMessage = "An error occurred.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Email or password is wrong.";
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
      console.log("Can't log in:", err.message);
    } finally {
      setIndicatorVisible(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#FFE6A9]">
      {/* style={styles.card}  */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Login</Text>
          <ControlledInput
            name="email"
            label="Enter your email"
            control={control}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
          <ControlledInput
            name="password"
            label="Enter your password"
            control={control}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          <Pressable onPress={handleSubmit(handleLogin)} style={styles.button}>
            {indicatorVisible ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
