import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import passwordValidator from "password-validator";

const schema = new passwordValidator();
schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

function emailErrorHandle(email, errors) {
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
}

function passwordErrorHandle(password, errors) {
  if (!password) {
    errors.password = "Required";
  } else if (!schema.validate(password)) {
    errors.password = "Invalid password";
  }
}

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
        validate={(values) => {
          const errors = {};

          emailErrorHandle(values.email, errors);
          passwordErrorHandle(values.password, errors);

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <div className="flex-auto">
                  <label htmlFor="password">Password</label>
                  <Field id="password" name="password" placeholder="" />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
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
              className="bg-yellow-500 hover:bg-blue-700 transition duration-200 text-white font-bold py-2 px-4 rounded mt-12"
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
