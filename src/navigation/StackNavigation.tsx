import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AppOverViewScreen from "../screens/AppOverViewScreen";

export type StackProps = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
};

const StackNavigation = () => {
  const stack = createNativeStackNavigator<StackProps>();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <stack.Screen name="OnBoarding" component={AppOverViewScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="SignUp" component={SignUpScreen} />
    </stack.Navigator>
  );
};

export default StackNavigation;
