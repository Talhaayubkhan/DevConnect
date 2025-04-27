import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useAuthUser from "../hooks/useAuthUser";

const Body = () => {
  useAuthUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
