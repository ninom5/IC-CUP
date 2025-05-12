import { SearchBar } from "@components/index";
import { Outlet } from "react-router-dom";

export const SearchBarLayout = () => {
  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  );
};
