import { clsx } from "clsx";
import { Pressable, PressableProps, Text } from "react-native";

interface ICategoryButton extends PressableProps {
  title: string;
  isSelected?: boolean;
}

export function CategoryButton({
  title,
  isSelected,
  ...props
}: ICategoryButton) {
  return (
    <Pressable
      className={clsx(
        "h-10 justify-center rounded-md bg-slate-800 px-4",
        isSelected && "border-2 border-lime-300",
      )}
      {...props}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  );
}
