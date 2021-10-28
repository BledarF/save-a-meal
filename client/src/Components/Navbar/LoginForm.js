import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function UserRegisterForm(props) {
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

          alert(JSON.stringify(values, null, 2));

          // POST REQUEST HERE
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
                  placeholder="jane@acme.com"
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
                  placeholder=""
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
    </div>
  );
}

export default UserRegisterForm;
