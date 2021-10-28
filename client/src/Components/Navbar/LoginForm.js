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
        validate={(values) => {
          const errors = {};

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
                <div className="flex-auto flex flex-row p-2">
                  <label htmlFor="email" className="p-2">
                    Email
                  </label>
                  <Field
                    className=" p-2"
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
                <div className="flex-auto p-2">
                  <label htmlFor="firstName" className="p-2">
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="Jana"
                    className="p-2"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <div className="flex-auto p-2">
                  <label htmlFor="password" className="p-2">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    placeholder=""
                    className="p-2"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />

                <div className="flex-auto p-2">
                  <label htmlFor="lastName" className="p-2">
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="p-2"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500"
                />
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
