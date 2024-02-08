import { ReactNode } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface IButton extends TouchableOpacityProps {}

function Button({ children, ...props }: IButton) {
  return (
    <TouchableOpacity
      className="h-12 flex-row items-center justify-center rounded-md bg-lime-400"
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

interface IButtonText extends TextProps {}

function ButtonText({ children, ...props }: IButtonText) {
  return (
    <Text className="mx-2 font-heading text-base text-black" {...props}>
      {children}
    </Text>
  );
}

interface IButtonIcon {
  children: ReactNode;
}

function ButtonIcon({ children }: IButtonIcon) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
