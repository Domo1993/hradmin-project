/** @format */
import { Formik, Field, Form } from "formik";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import "../styles/pages/login.css";

function Login() {
  //   const navigateTo = useNavigate();
  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changePasswordInputType = () => {
    if (passwordVisible) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };
  return (
    <div className="loginContainer">
      <fieldset className="containerInner">
        <legend>Login</legend>
        <h1>Login</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            // navigateTo("/employees");
            login({
              username: values.username,
              password: values.password,
              userType: "hradmin",
            });
            // alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className="loginForm">
            <div className="inputField">
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                placeholder="jane@acme.com"
                type="text"
              />
            </div>
            <div className="inputField">
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => changePasswordInputType()}
                className="passwordEyeBtn"
              >
                {passwordVisible ? (
                  <i className="fa">&#xf070;</i>
                ) : (
                  <i className="fa">&#xf06e;</i>
                )}
              </button>
              {/* <i className="fa">&#xf070;</i> */}
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </fieldset>
    </div>
  );
}

export default Login;
