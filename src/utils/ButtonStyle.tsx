import { View, Text } from "react-native";
import React from "react";
import { cva } from "class-variance-authority";

type Props = {};

export const ButtonStyle = cva("text-center flex items-center justify-center", {
  variants: {
    size: {
      sm: "text-sm py-2 px-3",
      md: "text-[16px] py-2 px-3",
      lg: "text-lg",
      login: "w-[100%] text-[20px]",
    },
    variant: {
      primary: "rounded-full bg-[#659287] text-white",
      secondary: "bg-gray-500 text-black",
      danger: "bg-red-500 text-white",
      save: "rounded-[10px] bg-[#4CAF50] text-white",
      cancel: "rounded-[10px] bg-[#f44336] text-white",
      loginSize: "rounded-full bg-[#659287] text-white",
    },
    width: {
      small: "w-[80px]",
      medium: "w-[120px]",
      large: "w-[200px]",
      full: "w-full",
    },
    height: {
      small: "h-[32px]",
      medium: "h-[48px]",
      large: "h-[50px]",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});
