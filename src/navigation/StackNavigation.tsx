import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AppOverViewScreen from "../screens/AppOverViewScreen";

type Props = {};

const StackNavigation = (props: Props) => {
  const stack = createNativeStackNavigator();
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
