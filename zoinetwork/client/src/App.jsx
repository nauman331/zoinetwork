import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Mining from "./pages/Mining";
import More from "./pages/More";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import Adminusers from "./pages/Adminusers";
import Admincontacts from "./pages/Admincontacts";
import Zoipdf from "./pages/Zoipdf";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import Reffer from "./pages/Reffer";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/more" element={<More />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/reffer" element={<Reffer />} />
          <Route path="/zoipdf" element={<Zoipdf />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/admin" element={<Admin />} >
          <Route path="users" element={<Adminusers />} />
          <Route path="contacts" element={<Admincontacts />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
