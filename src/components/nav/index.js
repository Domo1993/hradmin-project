/** @format */
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./nav.css";

function Navigation() {
  const navData = [
    { name: "Employees", path: "/employees", id: 2 },
    { name: "Departments", path: "/departments", id: 3 },
    { name: "Create Employee", path: "/create-employee", id: 5 },
    { name: "Create Department", path: "/create-department", id: 4 },
  ];
  const managerNavData = [
    { name: "Employees", path: "/employees", id: 1 },
    { name: "Edit Info", path: "/edit-employee", id: 2 },
  ];
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="navContainer">
      <div className="navInner">
        {user && user.userType === "manager" ? (
          managerNavData.map((i) => (
            <Link
              key={i.id}
              to={i.path}
              className={`navLink${
                location.pathname === i.path ? " activeNav" : ""
              }`}
            >
              {i.name}
            </Link>
          ))
        ) : user.userType === "hradmin" ? (
          navData.map((i) => (
            <Link
              key={i.id}
              to={i.path}
              className={`navLink${
                location.pathname === i.path ? " activeNav" : ""
              }`}
            >
              {i.name}
            </Link>
          ))
        ) : (
          <></>
        )}
        <button className="logoutBtn" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navigation;
