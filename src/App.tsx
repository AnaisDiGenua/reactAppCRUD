import "./App.css";
import Nav from "./components/header/navbar";
import Home from "./pages/home/home";
import UserRegistration from "./pages/registration/user-registration";

function App() {
  return (
    <>
      <Nav />
      <Home />
      <UserRegistration />
    </>
  );
}

export default App;
