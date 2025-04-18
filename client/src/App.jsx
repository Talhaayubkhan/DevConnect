import Body from "./components/Body";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
