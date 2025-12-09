import { Route, Routes } from "react-router-dom";
import Nav from "./components/header/navbar";
import Home from "./pages/home/home";
import UserRegistration from "./pages/registration/user-registration";
import UserDetail from "./pages/userInfo/user-detail";
import UserLogin from "./pages/login/user-login";
import "./App.css";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route path="/user-login" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
