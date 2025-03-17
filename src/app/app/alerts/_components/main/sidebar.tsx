import AlertCard from "../alert-card";

const Sidebar = () => {
  return (
    <div className="h-full min-w-80">
      <AlertCard
        anomalyId={88813211}
        timestamp="1394104654000"
        machineName="CNC"
        anomalyLevel="mild"
        suspectedReason={"blank"}
      />
    </div>
  );
};

export default Sidebar;
