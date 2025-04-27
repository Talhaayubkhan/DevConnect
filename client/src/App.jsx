import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./app/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Error from "./components/Error";
import Requestes from "./components/Requestes";
import HomePage from "./pages/Home";
// import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="login" element={<Auth />} />
          <Route path="/" element={<Body />}>
            <Route index element={<HomePage />} />
            <Route
              path="feed"
              element={
                // <ProtectedRoute>
                <Feed />
                // </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                // <ProtectedRoute>
                <Profile />
                // </ProtectedRoute>
              }
            />
            <Route
              path="connections"
              element={
                // <ProtectedRoute>
                <Connections />
                // </ProtectedRoute>
              }
            />
            <Route
              path="requestes"
              element={
                // <ProtectedRoute>
                <Requestes />
                // </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
