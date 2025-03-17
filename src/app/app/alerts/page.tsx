import { Suspense } from "react";
import { cn } from "~/lib/utils";
import { HydrateClient } from "~/trpc/server";
import Content from "./_components/main/content";
import Sidebar from "./_components/main/sidebar";
import Topbar from "./_components/main/topbar";
import Spinner from "./_components/spinner";

const AlertsPage = async () => {
  return (
    <HydrateClient>
      <div className={cn("flex grow flex-col")}>
        <Topbar />
        <div className={cn("flex grow overflow-hidden")}>
          <Suspense fallback={<Spinner />}>
            <Sidebar />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Content />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
};

export default AlertsPage;
