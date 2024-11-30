import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import SwiperComponent from "../components/SwiperComponent";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackProps } from "../navigation/StackNavigation";
import CustomButton from "../components/CustomButton";

type props = {};

type AppOverViewScreen = NativeStackScreenProps<StackProps, "OnBoarding">;
const AppOverViewScreen: React.FC<AppOverViewScreen> = ({ navigation }) => {
  const swiperRef = useRef(null);
  return (
    <>
      <View className="flex-1">
        <Swiper
          ref={swiperRef}
          loop={false}
          dotColor="#DEAA79"
          activeDotColor="#FFE6A9"
        >
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
          <CustomButton
            title="Skip"
            size="md"
            variant="primary"
            onPress={() => navigation.replace("Login")}
          />
          <CustomButton
            title="Next"
            size="md"
            variant="primary"
            onPress={() => swiperRef.current.scrollBy(1)}
          />
        </View>
      </View>
    </>
  );
};

export default AppOverViewScreen;
