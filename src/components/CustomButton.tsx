import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonStyle } from "../utils/ButtonStyle";
import { clsx } from "clsx";

type Props = {
  title: string;
  onPress: () => void;
  size?: "sm" | "md" | "lg" | "login";
  variant?: "primary" | "secondary" | "danger" | "loginSize";
};

const CustomButton = ({ title, onPress, size, variant }: Props) => {
  return (
    // <Pressable
    //   className="bg-[#659287] w-[100] h-[40] items-center justify-center rounded-[10] m-[10]"
    //   onPress={onPress}
    // >
    //   <Text className="text-white font-bold text-lg">{title}</Text>
    // </Pressable>

    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "w-[100] h-[40px] m-[10] justify-center items-center",
        ButtonStyle({ size, variant })
      )}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
