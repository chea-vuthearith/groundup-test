import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = { bgColor?: string; color?: string; children?: ReactNode };
const Badge = (props: Props) => {
  return (
    <p
      className={cn("min-w-16 rounded-full px-2 py-[1px] text-center")}
      style={{ backgroundColor: props.bgColor, color: props.color }}
    >
      {props.children}
    </p>
  );
};

export default Badge;
