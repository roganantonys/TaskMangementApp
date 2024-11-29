import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import SwiperComponent from "../components/SwiperComponent";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackProps } from "../navigation/StackNavigation";

type props = {};

type AppOverViewScreen = NativeStackScreenProps<StackProps, "OnBoarding">;
const AppOverViewScreen: React.FC<AppOverViewScreen> = ({ navigation }) => {
  return (
    <>
      <View className="flex-1">
        <Swiper loop={false} dotColor="#DEAA79" activeDotColor="#FFE6A9">
          <SwiperComponent
            title="Create Tasks Effortlessly"
            description="Organize your tasks with ease."
            url={require("../../assets/images/task.jpg")}
          />
          <SwiperComponent
            title="Track Your Progress"
            description="See how far you've come."
            url={require("../../assets/images/progressBar.png")}
          />
          <SwiperComponent
            title="Edit the task"
            description="Mark as completed once you finish."
            url={require("../../assets/images/edit.jpg")}
          />
        </Swiper>
        <View className="bg-[#A1EEBD] flex-row justify-between">
          <Button title="Skip" onPress={() => navigation.replace("Login")} />
          <Button title="Next" onPress={() => console.log("Next")} />
        </View>
      </View>
    </>
  );
};

export default AppOverViewScreen;
