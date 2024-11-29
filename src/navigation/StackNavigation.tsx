// import { View, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import AppOverViewScreen from "../screens/AppOverViewScreen";
// import BottomTabNavigation from "./BottomTabNavigation";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { fireAuth } from "../firebase";

// export type StackProps = {
//   OnBoarding: undefined;
//   Login: undefined;
//   SignUp: undefined;
//   BottomTab: undefined;
// };

// const StackNavigation = () => {
//   const stack = createNativeStackNavigator<StackProps>();

//   const [user, setUser] = useState<User | null>(null);
//   useEffect(() => {
//     onAuthStateChanged(fireAuth, (user) => {
//       setUser(user);
//       console.log("user:", user);
//     });
//   }, []);
//   return (
//     <stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "white" },
//       }}
//     >
//       <stack.Screen name="BottomTab" component={BottomTabNavigation} />

//       <stack.Screen name="Login" component={LoginScreen} />

//       <stack.Screen name="SignUp" component={SignUpScreen} />
//       <stack.Screen name="OnBoarding" component={AppOverViewScreen} />
//     </stack.Navigator>
//   );
// };

// export default StackNavigation;

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AppOverViewScreen from "../screens/AppOverViewScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StackProps = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  BottomTab: undefined;
};

const StackNavigation = () => {
  const stack = createNativeStackNavigator<StackProps>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    onAuthStateChanged(fireAuth, async (user) => {
      setUser(user);
      if (user) {
        // If the user is authenticated, store their uid in AsyncStorage
        await AsyncStorage.setItem("userUid", user.uid);
      }
    });
  }, []);

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      {user ? (
        <stack.Screen name="BottomTab" component={BottomTabNavigation} />
      ) : (
        <>
          <stack.Screen name="OnBoarding" component={AppOverViewScreen} />
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </stack.Navigator>
  );
};

export default StackNavigation;
