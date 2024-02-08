import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

interface IInput extends TextInputProps {}

export function Input({ ...props }: IInput) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="h-32 rounded-md bg-slate-800 px-4 py-3 font-body text-sm text-white"
      {...props}
    />
  );
}
