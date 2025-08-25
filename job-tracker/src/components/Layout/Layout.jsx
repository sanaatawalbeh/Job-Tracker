import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div
      style={{
        backgroundColor: "#fbfdfdff",
        minHeight: "100vh",
        color: "#000000ff",
      }}
    >
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
