import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function UserRegisterForm(props) {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="flex">
            <div>
              <div className="flex-auto flex flex-row">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
              </div>

              <div className="flex-auto">
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" placeholder="" />
              </div>
            </div>
            <div>
              <div className="flex-auto">
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" placeholder="Jana" />
              </div>

              <div className="flex-auto">
                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Doe" />
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 transition duration-200 text-white font-bold py-2 px-4 rounded mt-12"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default UserRegisterForm;
