import { View, Text, Pressable } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: Props) => {
  return (
    <Pressable
      className="bg-[#659287] w-[100] h-[40] items-center justify-center rounded-[10] m-[10]"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </Pressable>
  );
};

export default Button;
