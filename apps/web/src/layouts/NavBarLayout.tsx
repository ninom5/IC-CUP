import { NavBar } from "@components/index";
import { Outlet } from "react-router-dom";

export const NavBarLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
