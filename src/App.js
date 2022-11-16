/** @format */

import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/employees";
import CreateEmployee from "./pages/create-employee";
import EditEmployee from "./pages/edit-employee";
import Departments from "./pages/departments";
import CreateDepartment from "./pages/create-department";
import EditDepartment from "./pages/edit-department";
import Nav from "./components/nav";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
  const location = useLocation();
  const { user } = useAuth();

  console.log(user, "===App User");

  return (
    <div className="layoutContainer">
      {location.pathname !== "/" && (
        <div className="titleBox">
          <h1>HR Administration System</h1>
        </div>
      )}
      <div className="layoutInner">
        {location.pathname !== "/" && <Nav />}

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/departments" element={<Departments />} />
          <Route exact path="/create-employee" element={<CreateEmployee />} />
          <Route
            exact
            path="/create-department"
            element={<CreateDepartment />}
          />
          <Route exact path="/edit-department" element={<EditDepartment />} />
          <Route exact path="/employees" element={<Employees />} />
          <Route exact path="/edit-employee" element={<EditEmployee />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
