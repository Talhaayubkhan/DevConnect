import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./app/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Error from "./components/Error";
import Requestes from "./components/Requestes";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Routes without layout (no Header/Footer) */}
          <Route path="/login" element={<Login />} />
          {/* Routes with Header/Footer */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requestes" element={<Requestes />} />
          </Route>

          {/* Catch-all for errors */}
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
