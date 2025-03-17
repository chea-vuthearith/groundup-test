import type { ReactNode } from "react";
import { auth } from "~/server/auth";
import Navbar from "./_components/navbar";

type Props = { children: ReactNode };

const AppLayout = async (props: Props) => {
  const session = await auth();
  if (!session?.user?.name) return null;
  return (
    <>
      <Navbar username={session.user.name} />
      <div className="flex h-full w-full grow border-[#F8F8FF] border-[20px]">
        <div className="flex grow rounded-lg border border-[#A2AEBC]">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
