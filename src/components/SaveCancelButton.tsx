import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { ButtonStyle } from "../utils/ButtonStyle";
import clsx from "clsx";

type ButtonProps = {
  variant?: "save" | "cancel" | "primary" | "secondary" | "loginSize";
  size?: "sm" | "md" | "lg" | "login";
  width?: "small" | "medium" | "large" | "full";
  height?: "small" | "medium" | "large";
  isLoading?: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  width = "medium",
  height,
  isLoading = false,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      className={clsx(
        "w-[40%] h-[30px] m-[10] justify-center items-center",
        ButtonStyle({ size, variant, width, height })
      )}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className={clsx(ButtonStyle({ size, variant, width, height }))}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
