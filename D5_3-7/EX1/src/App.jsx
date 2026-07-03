// import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import NavBar from "./layout/Navbar";
import Delete from "./components/Delete";
import StudentList from "./page/student/StudentList";
import AddStudent from "./page/student/AddStudent";
import EditStudent from "./page/student/EditStudent";
import Footer from "./layout/Footer";

function App() {
  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/delete"} element={<Delete/>} />
        <Route path={"/dashboard"} element={<StudentList/>}/>
        <Route path={"/dashboard/add"} element={<AddStudent/>}></Route>
        <Route path={"/dashboard/edit/:id"} element={<EditStudent/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
