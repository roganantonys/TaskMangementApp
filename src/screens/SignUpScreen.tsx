import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import ControlledInput from "../components/ControlledInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackProps } from "../navigation/StackNavigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth, fireDB } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";
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
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  // const navigation = useNavigation();

  const { control, handleSubmit } = useForm<formType>();

  // onpress of signup button
  const handleSignUp = async (data: any) => {
    setIndicatorVisible(true);
    console.log("data:", data);
    await createUserWithEmailAndPassword(fireAuth, data.email, data.password)
      .then((res) => {
        console.log("User created successfully:", res.user);
        Toast.show({
          type: "success",
          text2: "User Created Successfully",
        });
        setDoc(doc(fireDB, "users", res.user.uid), {
          email: data.email,
          name: data.userName,
          createdAt: new Date().toDateString(),
        })
          .then(() => {
            console.log("User data stored in Firestore.");
            navigation.navigate("Login");
          })
          .catch((err) => {
            console.log("Error storing user data:", err);
          });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Can not add you at the moment",
        });
        console.log("Can't create user:", err);
      })
      .finally(() => {
        setIndicatorVisible(false);
      });
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
            {indicatorVisible ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.buttonText}>SignUp</Text>
            )}
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
