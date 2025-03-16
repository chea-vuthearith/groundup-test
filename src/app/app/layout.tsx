import type { ReactNode } from "react";

type Props = { children: ReactNode };

const AppLayout = (props: Props) => {
  return (
    <div className="flex h-full w-full grow border-[#F8F8FF] border-[20px]">
      <div className="grow rounded-lg border border-[#A2AEBC]">
        {props.children}
      </div>
    </div>
  );
};

export default AppLayout;
