import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

type Props = {
  description: string;
  title: string;
  url: object;
};

const SwiperComponent = ({ url, title, description }: Props) => {
  return (
    <View className="flex-[1] mt-10">
      <View className="h-[60%] items-center justify-center">
        <Image source={url} style={styles.image} resizeMode="contain" />
      </View>
      <View className="flex-[1] bg-[#A1EEBD]">
        <Text className="text-2xl font-bold mt-5 mb-2 text-center tracking-[5]">
          {title}
        </Text>
        <Text className="text-center text-black text-[20px]">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default SwiperComponent;

const styles = StyleSheet.create({
  image: { width: 300, height: 300, marginBottom: 20 },
});
