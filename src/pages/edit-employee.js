/** @format */
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import "../styles/pages/createEmployee.css";

function EditEmployee() {
  const navigateTo = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigateTo("/");
    }
  }, []);
  return (
    <div className="createContainer">
      <h1>Edit Employee</h1>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          telNo: "",
          emailAddress: "",
          manager: "",
          status: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="inputWrapper">
            <label>Name</label>
            <Field name="name" />
          </div>
          <div className="inputWrapper">
            <label>Surname</label>
            <Field name="surname" />
          </div>
          <div className="inputWrapper">
            <label>Telephone Number</label>
            <Field name="telNo" />
          </div>
          <div className="inputWrapper">
            <label>Email Address</label>
            <Field name="emailAddress" />
          </div>
          <div className="inputWrapper">
            <label>Manager</label>
            <Field as="select" name="manager">
              <option value="">-Select-</option>
              <option value="Erica Steward">Erica Steward</option>
              <option value="Steve Bob">Steve Bob</option>
              <option value="Chad Davies">Chad Davies</option>
            </Field>
          </div>
          <div className="inputWrapper">
            <label>Status</label>
            <Field as="select" name="status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
          </div>
          <div className="buttons">
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditEmployee;
