import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { auth } from "~/server/auth";
import Navbar from "./_components/navbar";

type Props = { children: ReactNode };

const AppLayout = async (props: Props) => {
  const session = await auth();
  if (!session?.user?.name) return null;
  return (
    <>
      <Navbar username={session.user.name} />
      <div
        className={cn(
          "flex h-full w-full grow overflow-hidden border-[#F8F8FF] border-[20px]",
        )}
      >
        <div className={cn("flex grow rounded-lg border")}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
