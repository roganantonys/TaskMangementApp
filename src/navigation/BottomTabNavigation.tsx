import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import TaskScreen from "../screens/TaskScreen";
import ProfileScreen from "../screens/ProfileScreen";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {};

type TabProps = {
  Dashboard: undefined;
  Task: undefined;
  Profile: undefined;
};

const BottomTabNavigation = (props: Props) => {
  const Tab = createBottomTabNavigator<TabProps>();
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarStyle: { backgroundColor: "#A1EEBD" },
        tabBarStyle: {
          backgroundColor: "#A1EEBD",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5, // For Android shadow
        },

        // tabBarActiveTintColor: "#DEAA79",
        // tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <MaterialIcons
              name="dashboard"
              size={focused ? 26 : 24}
              color={focused ? "#DEAA79" : "black"}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#DEAA79" : "gray",
              }}
            >
              Dashboard
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <MaterialIcons
              name="task"
              size={focused ? 26 : 24}
              color={focused ? "#DEAA79" : "black"}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#DEAA79" : "gray",
              }}
            >
              Task
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AntDesign
              name="user"
              size={focused ? 26 : 24}
              color={focused ? "#DEAA79" : "black"}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#DEAA79" : "gray",
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
