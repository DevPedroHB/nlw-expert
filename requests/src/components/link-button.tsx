import { Link, LinkProps } from "expo-router";

interface ILinkButton extends LinkProps<string> {
  title: string;
}

export function LinkButton({ title, ...props }: ILinkButton) {
  return (
    <Link className="text-center font-body text-base text-slate-300" {...props}>
      {title}
    </Link>
  );
}
