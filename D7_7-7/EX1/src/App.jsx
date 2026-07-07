// src/App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./page/Home";
import NavBar from "./layout/Navbar";
import Delete from "./components/Delete";
import StudentList from "./page/student/StudentList";
import AddStudent from "./page/student/AddStudent";
import EditStudent from "./page/student/EditStudent";
import Footer from "./layout/Footer";
import LoginForm from "./components/LoginForm";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-danger">Chưa Đăng Nhập</h1>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/delete"} element={<Delete />} />
        <Route path={"/login"} element={<LoginForm />} />

        <Route
          path={"/dashboard"}
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/dashboard/add"}
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/dashboard/edit/:id"}
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
