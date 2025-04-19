import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useAuthUser from "../hooks/useAuthUser";

const Body = () => {
  useAuthUser();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
