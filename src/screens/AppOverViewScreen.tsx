import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import SwiperComponent from "../components/SwiperComponent";

type props = {};
const AppOverViewScreen: React.FC<props> = () => {
  return (
    <Swiper loop={false} dotColor="#DEAA79" activeDotColor="#FFE6A9">
      <SwiperComponent
        title="Create Tasks Effortlessly"
        description="Organize your tasks with ease."
        url={require("../../assets/images/task.jpg")}
      />
      <SwiperComponent
        title="Create Tasks Effortlessly"
        description="Organize your tasks with ease."
        url={require("../../assets/images/progressBar.png")}
      />
    </Swiper>
  );
};

export default AppOverViewScreen;
