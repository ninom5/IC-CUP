import { MobileNavBar } from "@components/index";
import { Outlet } from "react-router-dom";

export const MobileLayout = () => {
  return (
    <>
      <MobileNavBar />
      <Outlet />
    </>
  );
};
