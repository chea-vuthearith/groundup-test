import { Suspense } from "react";
import { cn } from "~/lib/utils";
import Content from "./_components/main/content";
import Sidebar from "./_components/main/sidebar";
import Topbar from "./_components/main/topbar";
import Spinner from "./_components/spinner";

const AlertsPage = () => {
  return (
    <div className={cn("flex grow flex-col")}>
      <Topbar />
      <div className={cn("flex grow overflow-hidden")}>
        <Sidebar />
        <Suspense fallback={<Spinner />}>
          <Content />
        </Suspense>
      </div>
    </div>
  );
};

export default AlertsPage;
