import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
};

const FilterButtons = ({ title }: Props) => {
  return (
    <View>
      <TouchableOpacity className="bg-white w-[80px] h-[40px] rounded-[10px] border border-white justify-center items-center">
        <Text className="text-black font-semibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
