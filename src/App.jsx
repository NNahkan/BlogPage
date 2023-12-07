import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
 
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <div className="container">
           <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route exact path="/posts/:id" element={<Single />} />
              <Route exact path="/write" element={<Write />} />
            </Route>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
       </div>
    </div>
  );
}

export default App;

// TO DO
// login error handling
