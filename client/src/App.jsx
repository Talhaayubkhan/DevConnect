import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
