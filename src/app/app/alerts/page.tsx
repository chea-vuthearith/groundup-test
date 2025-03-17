import { cn } from "~/lib/utils";
import Content from "./_components/main/content";
import Sidebar from "./_components/main/sidebar";
import Topbar from "./_components/main/topbar";

const AlertsPage = () => {
  return (
    <div className={cn("flex grow flex-col")}>
      <Topbar />
      <div className={cn("flex grow")}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default AlertsPage;
