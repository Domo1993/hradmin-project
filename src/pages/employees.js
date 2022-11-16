/** @format */
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeData from "../data/employeeData";
import { useAuth } from "../hooks/useAuth";

import "../styles/pages/employees.css";

function Employees() {
  const navigateTo = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.userType === "employee") {
      navigateTo("/");
    }
  }, []);

  const [tableData, setData] = useState(EmployeeData);
  const [copiedTableData, setCopiedData] = useState(EmployeeData);
  const [sortType, setSortType] = useState("default");
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {}, [sortType, searchInput, tableData]);

  const filterSort = (value) => {
    let newTableData = EmployeeData;
    if (value.status !== "all") {
      console.log(value.manager, "====Item.Manager");
      let filterOptions = newTableData.filter(
        (item) => item.status === value.status || item.manager === value.manager
      );
      // let filterOptionsManager = filterOptions.filter(
      //   (item) => item.manager === value.manager
      // );

      setData(filterOptions);
    } else {
      setData(EmployeeData);
    }
  };

  const clearFilter = () => {
    setData(EmployeeData);
  };

  const sortFirstNameDescending = () => {
    let sorted = tableData.sort((a, b) =>
      a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0
    );
    setData(sorted);
  };
  const sortFirstNameAscending = () => {
    let sorted = tableData.sort((a, b) => (a.firstName > b.firstName ? -1 : 0));
    setData(sorted);
  };

  const sortLastName = () => {
    let sorted = tableData.sort((a, b) =>
      a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
    );
    setData(sorted);
  };

  const sortDefault = () => {
    let sorted = EmployeeData.sort((a, b) =>
      a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
    );
    setData(sorted);
    // let copiedData = [...EmployeeData];
    // setData(copiedData);
  };

  const sortStatus = () => {
    let sorted = tableData.sort((a, b) =>
      a.status > b.status ? 1 : b.status > a.status ? -1 : 0
    );
    setData(sorted);
  };

  const sortManagers = () => {
    let sorted = tableData.sort((a, b) =>
      a.manager > b.manager ? 1 : b.manager > a.manager ? -1 : 0
    );
    setData(sorted);
  };

  const searchFunc = () => {
    let newTableData = EmployeeData;
    if (searchInput.length > 2) {
      let searchData = newTableData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
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
      <h1>Employees</h1>
      <Formik
        initialValues={{
          status: "",
          department: "",
          manager: "",
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
            {/* <div className="dropdownWrapper">
              <label>Department</label>
              <Field as="select" name="department">
                <option value="">-Select-</option>
                {DepartmentData.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
            </div> */}
            <div className="dropdownWrapper">
              <label>Manager</label>
              <Field as="select" name="manager">
                <option value="red">-Select-</option>
                {EmployeeData.map(
                  (item) =>
                    item.manager === "" && (
                      <option
                        value={`${item.firstName} ${item.lastName}`}
                        key={item.id}
                      >
                        {item.firstName + " " + item.lastName}
                      </option>
                    )
                )}
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
              {user && user.userType !== "manager" && <th>Actions</th>}
              <th>
                <span>First Name</span>
                <button
                  onClick={() => {
                    if (sortType === "default") {
                      sortFirstNameDescending();
                      setSortType("firstName-descending");
                    } else if (sortType === "firstName-descending") {
                      sortFirstNameAscending();
                      setSortType("firstName-ascending");
                    } else {
                      sortDefault();
                      setSortType("default");
                    }
                    console.log(sortType, "====SortType");
                  }}
                >
                  {sortType === "firstName-descending" ? (
                    <i className="fa">&#xf0dd;</i>
                  ) : sortType === "firstName-ascending" ? (
                    <i className="fa">&#xf0de;</i>
                  ) : (
                    <i className="fa">&#xf0dc;</i>
                  )}
                </button>
              </th>
              <th>
                <span>Last Name</span>
                <button
                  onClick={() => {
                    sortLastName();
                    setSortType("lastName");
                  }}
                >
                  <i className="fa">&#xf0dc;</i>
                </button>
              </th>
              <th>Telephone Number</th>
              <th>Email Address</th>
              <th>
                <span>Manager</span>
                <button
                  onClick={() => {
                    setSortType("manager");
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
            {tableData.map((item) => (
              <tr key={item.id}>
                {user && user.userType !== "manager" && (
                  <td>
                    <Link to="/edit-employee">Edit</Link>
                    <button>Activate</button>
                  </td>
                )}
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.telNo}</td>
                <td>{item.emailAddress}</td>
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

export default Employees;
