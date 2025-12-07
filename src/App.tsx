import { Route, Routes } from "react-router-dom";
import Nav from "./components/header/navbar";
import Home from "./pages/home/home";
import UserRegistration from "./pages/registration/user-registration";
import "./App.css";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
      </Routes>
    </>
  );
}

export default App;
