import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Nav from "./components/header/navbar";
import Home from "./pages/home/home";
import UserRegistration from "./pages/registration/user-registration";
import UserDetail from "./pages/userInfo/user-detail";
import UserLogin from "./pages/login/user-login";
import UserPosts from "./pages/postList/post-list";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Toaster position="bottom-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/users/:id/posts" element={<UserPosts />} />
      </Routes>
    </>
  );
}

export default App;
