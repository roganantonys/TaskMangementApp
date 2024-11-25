import {
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
} from "react-native-paper";

import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TextInputProps, View } from "react-native";

type inputType = {
  name: string;
  label: string;
  rules?: Record<string, any>;
  control?: Control<any>;
  //   keyboardType?: string;
} & PaperTextInputProps;

const colors = {
  primary: "#659287", // Main accent color
  secondary: "#B1C29E", // Secondary background
  tertiary: "#FFE6A9", // Highlight color
  cardBackground: "#DEAA79", // Card background color
  white: "#FFFFFF",
  textDark: "#000000",
};

const ControlledInput = ({
  name,
  label,
  control,
  rules,
  ...props
}: inputType) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
      <>
        <View className="mb-[10]">
          <PaperTextInput
            label={label}
            value={value}
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            outlineColor={error ? "red" : colors.secondary}
            activeOutlineColor={colors.primary}
            {...props}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      </>
    )}
  />
);

export default ControlledInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 0,
    backgroundColor: colors.secondary, // Input background
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});
