import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <h1>Dashboard layout</h1>
      <Outlet />
    </>
  );
}

export default Dashboard;

