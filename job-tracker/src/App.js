import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import CreateApp from "./components/CreateApp/CreateApp"
import Applications from "./components/Applications/Applications"
import Admin from "./components/Admin/Admin"
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<Admin />} />  */}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="createapp" element={<CreateApp />} />{" "}
            <Route path="applications" element={<Applications />} />
          </Route>
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
