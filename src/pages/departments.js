/** @format */
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeData from "../data/employeeData";
import DepartmentData from "../data/departmentData";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/employees.css";

function Departments() {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const [tableData, setData] = useState(DepartmentData);
  const [sortType, setSortType] = useState("");
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    if (!user || user.username !== "hradmin@test.com") {
      navigateTo("/");
    }
  }, []);

  useEffect(() => {}, [sortType, searchInput]);

  const filterSort = (value) => {
    let newTableData = DepartmentData;
    if (value.status !== "all") {
      let filterOptions = newTableData.filter(
        (item) => item.status === value.status
      );
      // let filterOptionsManager = filterOptions.filter(
      //   (item) => item.manager === value.manager
      // );

      setData(filterOptions);
    } else {
      setData(DepartmentData);
    }
  };

  const clearFilter = () => {
    setData(DepartmentData);
  };

  const sortName = () => {
    let sorted = tableData.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    setData(sorted);
  };

  const sortManagers = () => {
    let sorted = tableData.sort((a, b) =>
      a.manager > b.manager ? 1 : b.manager > a.manager ? -1 : 0
    );
    setData(sorted);
  };

  const sortStatus = () => {
    let sorted = tableData.sort((a, b) =>
      a.status > b.status ? 1 : b.status > a.status ? -1 : 0
    );
    setData(sorted);
  };

  const searchFunc = () => {
    let newTableData = EmployeeData;
    if (searchInput.length > 2) {
      let searchData = newTableData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.manager.toLowerCase().includes(searchInput.toLowerCase())
      );
      setData(searchData);
    } else {
      setData(EmployeeData);
    }
    // setsearchInput(value);

    // setsearchInput(value);

    // console.log(searchData, "===Search Data");
  };

  return (
    <div className="employeesContainer">
      <h1>Departments</h1>
      <Formik
        initialValues={{
          status: "",
        }}
        onSubmit={async (values) => {
          // await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          filterSort(values);
        }}
      >
        <Form className="filterSection">
          <fieldset>
            <legend>Filters</legend>
            <div className="dropdownWrapper">
              <label>Satus</label>
              <Field as="select" name="status">
                <option value="">-Select-</option>
                <option value="active">Active Only</option>
                <option value="all">All</option>
                <option value="inactive">Inactive Only</option>
              </Field>
            </div>
            <button className="filterBtn" type="submit">
              <i className="fa">&#xf0b0;</i>
              <span>Filter</span>
            </button>
            <button
              className="filterBtn"
              type="button"
              onClick={() => {
                clearFilter();
              }}
            >
              <span>Clear</span>
            </button>
          </fieldset>
        </Form>
      </Formik>

      <div className="tableSection">
        <div className="moreFiltersSection">
          <div className="showPerPage">
            <label>Show per Page</label>
            <select name="itemsPerPage">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="searchWrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchFunc();
                console.log(searchInput);
              }}
            >
              <i className="fa">&#xf002;</i>
              <input
                type="search"
                placeholder="search"
                onChange={(e) => {
                  setsearchInput(e.target.value);
                  // searchFunc(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>
                <span>Name</span>
                <button
                  onClick={() => {
                    setSortType("name");
                    sortName();
                  }}
                >
                  <i className="fa">&#xf0dc;</i>
                </button>
              </th>
              <th>
                <span>Manager</span>
                <button
                  onClick={() => {
                    setSortType("managers");
                    sortManagers();
                  }}
                >
                  <i className="fa">&#xf0dc;</i>
                </button>
              </th>
              <th>
                <span>Status</span>
                <button
                  onClick={() => {
                    setSortType("status");
                    sortStatus();
                  }}
                >
                  <i className="fa">&#xf0dc;</i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {DepartmentData.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <Link to="/edit-department">Edit</Link>
                  <button>Activate</button>
                </td>
                <td>{item.name}</td>
                <td>{item.manager}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
}

export default Departments;
