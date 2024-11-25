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
        <Text className="text-2xl font-bold mt-5 mb-2 text-center">
          {title}
        </Text>
        <Text className="text-base text-center text-black">{description}</Text>
      </View>
    </View>
  );
};

export default SwiperComponent;

const styles = StyleSheet.create({
  slide: { flex: 1, marginTop: 10 },
  image: { width: 300, height: 300, marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 20,
  },
  description: { fontSize: 16, color: "#666", textAlign: "center" },
});
