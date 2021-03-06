import { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userContext } from "../../App";
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";

function LoginForm(props) {
  const { user, setUser } = useContext(userContext);
  const [SessionCount, setSessionCount] = useState(0);
  const [error, setError] = useState("");

  async function postSession(values) {
    setSessionCount(1);
    try {
      const response = await fetch(`${SERVER_URL}/api/sessions/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));

          const requestOptions = {
            method: "POST",
            headers: {
              Access: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          };
          const response = await fetch(
            `${SERVER_URL}/users/verify`,
            requestOptions
          );
          const json = await response.json();
          console.log(json);
          console.log(response.status);
          if (response.status !== 200) {
            setError("Error: Incorrect Credentials");
          }

          if (json.status === "loggedIn") {
            setError("");
            setUser(json.id);
            props.setShowModal(false);
            postSession(values);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="flex flex-column">
                <label htmlFor="email" className="pt-2 ">
                  Email
                </label>
                <Field
                  className="p-2 rounded-sm border border-solid border-gray-100"
                  id="email"
                  name="email"
                  placeholder="janesmith@gmail.com"
                  type="email"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <label htmlFor="password" className="pt-2">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  placeholder="password"
                  className="p-2  rounded-sm border-2 border-solid border-gray-100"
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <button
              className="bg-yellow-500 hover:bg-blue-700 transition duration-200 text-white font-bold py-2 px-4 rounded mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-red-500"> {error} </div>
    </div>
  );
}

export default LoginForm;
