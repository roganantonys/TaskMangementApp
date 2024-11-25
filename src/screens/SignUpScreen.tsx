import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

// Define color palette
const colors = {
  primary: "#659287", // Main accent color
  secondary: "#B1C29E", // Secondary background
  tertiary: "#FFE6A9", // Highlight color
  cardBackground: "#DEAA79", // Card background color
  white: "#FFFFFF",
  textDark: "#000000",
};

type SignUpScreenProps = {};

const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    // Handle signup logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            activeOutlineColor={colors.primary}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            activeOutlineColor={colors.primary}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            activeOutlineColor={colors.primary}
          />
          <Pressable onPress={handleSignUp} style={styles.button}>
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
