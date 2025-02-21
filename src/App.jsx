import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { loginResponseContext } from "./context/ContextApi";
import UserHome from "./pages/UserHome";
import AdminPage from "./pages/AdminPage";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import Users from "./pages/Users";
import Lectures from "./pages/Lectures";
import StudyCourse from "./components/StudyCourse";
import AddCoupons from "./components/AddCoupons";
import AdminCoupons from "./pages/AdminCoupons";
import PagenotFound from "./pages/PagenotFound";
import RoleBasedRoute from "./components/protectedroutes/RoleBasedRoute";
import AdminProtectedRoute from "./components/protectedroutes/AdminProtectedRoute";

function App() {
  const { loginResponse } = useContext(loginResponseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser")) || null;

    // if (!user) {
    //   navigate("/login", { replace: true }); // Redirect only if user is not logged in
    // }
  }, [navigate]);


  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<UserHome />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth register={true} />} />

      {/* ✅ User Routes (Protected) */}
      <Route
        path="/dashboard"
        element={
          <RoleBasedRoute>
            <Dashboard />
          </RoleBasedRoute>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <RoleBasedRoute>
            <Course />
          </RoleBasedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <RoleBasedRoute>
            <PaymentSuccess />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/study/:courseId"
        element={
          <RoleBasedRoute>
            <StudyCourse />
          </RoleBasedRoute>
        }
      />

      {/* ✅ Admin Routes (Protected) */}
      <Route
        path="/adminPage"
        element={
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/allcoupons"
        element={
          <AdminProtectedRoute>
            <AdminCoupons />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/addlectures/:courseId"
        element={
          <AdminProtectedRoute>
            <Lectures />
          </AdminProtectedRoute>
        }
      />


      <Route
        path="/userdetails"
        element={
          <AdminProtectedRoute>
            <Users />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/addcoupons/:courseId"
        element={
          <AdminProtectedRoute>
            <AddCoupons />
          </AdminProtectedRoute>
        }
      />

      {/* ✅ Page Not Found */}
      <Route path="*" element={<PagenotFound />} />
    </Routes>
  );
}

export default App;
