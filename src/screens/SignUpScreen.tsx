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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SaveCancelButton from "../components/SaveCancelButton";
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

// type formType = {
//   userName: string;
//   email: string;
//   passWord: string;
// };

const schema = z.object({
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "password atleast 6 character long" }),
});

type SignInFormData = z.infer<typeof schema>;
const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  // const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(schema) });

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
            // navigation.replace("Login");
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
            right={
              <TextInput.Icon
                icon={() => (
                  <FontAwesome name="user-o" size={24} color="black" />
                )}
              />
            }
          />

          {errors.userName && (
            <Text style={styles.errorText}>{errors.userName.message}</Text>
          )}
          <ControlledInput
            name="email"
            label="Enter your email"
            control={control}
            keyboardType="email-address"
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="email" size={24} color="black" />
                )}
              />
            }
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
          <ControlledInput
            name="password"
            label="Enter your password"
            control={control}
            secureTextEntry={passVisible}
            right={
              <TextInput.Icon
                icon={() => <FontAwesome name="eye" size={24} color="black" />}
                onPress={() => {
                  setPassVisible(!passVisible);
                }}
              />
            }
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          {/* <Pressable onPress={handleSubmit(handleSignUp)} style={styles.button}>
            {indicatorVisible ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.buttonText}>SignUp</Text>
            )}
          </Pressable> */}
          <SaveCancelButton
            variant="loginSize"
            isLoading={indicatorVisible}
            onPress={handleSubmit(handleSignUp)}
            size="login"
          >
            Sign up
          </SaveCancelButton>
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUpScreen;
