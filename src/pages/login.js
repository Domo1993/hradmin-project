/** @format */
import { Formik, Field, Form } from "formik";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import * as Yup from "yup";
import "../styles/pages/login.css";

const LoginErrorSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

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
          validationSchema={LoginErrorSchema}
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            // navigateTo("/employees");
            if (values.username === "hradmin@test.com") {
              login({
                username: values.username,
                password: values.password,
                userType: "hradmin",
              });
            } else {
              login({
                username: values.username,
                password: values.password,
                userType: "employee",
              });
            }

            // alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched }) => (
            <Form className="loginForm">
              <div className="inputField">
                <label htmlFor="username">Username</label>
                <Field
                  id="username"
                  name="username"
                  placeholder="jane@acme.com"
                  type="text"
                />
                {touched.username && errors.username && (
                  <div style={{ color: "red" }}>{errors.username}</div>
                )}
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
                {touched.password && errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
              <button className="button" type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </fieldset>
    </div>
  );
}

export default Login;
