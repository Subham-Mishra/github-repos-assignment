import { Outlet } from "react-router-dom";

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <div id="app" className="">
      <Outlet />
    </div>
  );
};

export default Dashboard;
