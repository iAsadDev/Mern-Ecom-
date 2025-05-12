import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./components/Admin";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Footer from "./components/footer";
import AboutUs from "./pages/AboutUS";
import PrivacyPolicy from "./pages/PrivacyPage";
import Contact from "./pages/contact";
import Blog from "./pages/Blog";
import NotFoundPage from "./pages/ErrorPage";
import Kitchen from "./pages/kitchen";
import BlogDetails from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [adminAuth, setAdminAuth] = useState(false);

  return (
    <>
      <Navbar /> {/* The Navbar is always displayed, regardless of the route */}
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Shop" element={<Shop />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route
            path="/categories/kitchenaccessories"
            element={<Kitchen />}
          ></Route>
          {/* Admin Routes */}
          <Route
            path="/admin-login"
            element={<AdminLogin setAdminAuth={setAdminAuth} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />{" "}
          {/* Fallback Route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
