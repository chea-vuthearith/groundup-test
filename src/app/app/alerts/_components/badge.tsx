import type { ReactNode } from "react";

type Props = { bgColor?: string; color?: string; children?: ReactNode };
const Badge = (props: Props) => {
  return (
    <p
      className="min-w-16 rounded-full px-2 py-[1px] text-center text-sm"
      style={{ backgroundColor: props.bgColor, color: props.color }}
    >
      {props.children}
    </p>
  );
};

export default Badge;
