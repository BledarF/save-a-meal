import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikStepper, FormikStep, InputField } from "formik-stepper";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Your business name is required"),
  description: Yup.string().required("A description is required"),
  email: Yup.string()
    .email("The email must be a valid email address.")
    .required("The Email field is required"),
  password: Yup.string()
    .required("The Password field is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d]{6,}$/,
      `Must Contain 8 Characters, One Uppercase, One Lowercase,
      One Number and one special case Character [@$!%*#?&-_]`
    ),
  streetname: Yup.string().required("The street name is required"),
  town: Yup.string().required("The town is required"),
  postcode: Yup.string()
    .required("The Postcode is required")
    .matches(
      "^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$",
      "Must be a valid UK Postcode"
    ),
  telephone: Yup.string().required("Telephone is required"),
  passwordConfirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

async function postRegister(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Access: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };
  const response = await fetch(
    "http://localhost:8080/api/users/restaurant",
    requestOptions
  );
  const json = await response.json();
  console.log(json.Message);
}

function BuisnessRegistrationForm() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    // FETCH POST REQUEST
    try {
      postRegister(values);
      setMessage("Success: User Created! Please Login.");
    } catch {
      setError("Error: not connected to the server");
    }

    setSubmitting(false); //// Important
  };

  return (
    <div>
      <FormikStepper
        /// Accept all Formik props
        onSubmit={onSubmit} /// onSubmit Function
        initialValues={{
          name: "",
          email: "",
          password: "",
          privacy: false,
          description: "",
          town: "",
          postcode: "",
          streetname: "",
          telephone: "",
          M: false,
          TU: false,
          W: false,
          TH: false,
          F: false,
          SA: false,
          SU: false,
          startTime: "",
          endTime: "",
          passwordConfirmation: "",
          current_slots: "",
        }}
        validationSchema={validationSchema}
        labelsColor="secondary" /// The text label color can be root variables or css => #fff
        withStepperLine /// false as default and If it is false, it hides stepper line
        nextBtnLabel="Next" /// Next as default
        prevBtnLabel="Back" /// Prev as default
        submitBtnLabel="Submit" /// Submit as default
        nextBtnColor="warning" /// as default and The color can be root variables or css => #fff
        prevBtnColor="danger" /// as default and The color can be root variables or css => #fff
        submitBtnColor="success" /// as default and The color can be root variables or css => #fff
      >
        {/*  First Step */}
        <FormikStep
          label="Buisness Information" /// The text label of Step
          withIcons="fa fa-user" // to add icon into the circle must add icon as className Name like Fontawesome
          withNumbers /// If true, it hides the icon and shows the step number
          iconColor="white" /// The color can be root variables or css => #fff
          circleColor="#F59E0B" /// The color can be root variables or css => #fff
        >
          <InputField name="name" label="Business Name" />
          <InputField name="description" label="Description" />
          <div className="flex">
            <InputField
              className="mx-2"
              name="streetname"
              label="Street Name"
            />
            <InputField className="mx-2" name="town" label="Town" />
          </div>

          <div className="flex">
            <InputField className="mx-2" name="postcode" label="Postcode" />
            <InputField className="mx-2" name="telephone" label="Telephone" />
          </div>
        </FormikStep>
        {/* Second Step */}
        <FormikStep
          label="Avaliability" /// The text label of Step
          withIcons="fa fa-user" // to add icon into the circle must add icon as className Name like Fontawesome
          withNumbers /// If true, it hides the icon and shows the step number
          iconColor="white" /// The color can be root variables or css => #fff
          circleColor="#F59E0B" /// The color can be root variables or css => #fff
        >
          <InputField type="checkbox" name="M" label="Monday" />
          <InputField type="checkbox" name="TU" label="Tuesday" />
          <InputField type="checkbox" name="W" label="Wednesday" />
          <InputField type="checkbox" name="TH" label="Thursday" />
          <InputField type="checkbox" name="F" label="Friday" />
          <InputField type="checkbox" name="SA" label="Saturday" />
          <InputField type="checkbox" name="SU" label="Sunday" />
          <InputField
            name="startTime"
            type="time"
            label="Collection Start Time"
          />
          <InputField name="endTime" type="time" label="Collection End Time" />
          <InputField name="current_slots" label="Capacity: " />
        </FormikStep>

        {/* Third Step */}
        <FormikStep
          label="Login Info"
          withIcons="fa fa-lock"
          iconColor="white"
          circleColor="#F59E0B"
        >
          <InputField name="email" label="Email" type="email" />
          <InputField name="password" label="Password" type="password" />
          <InputField
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
          />
        </FormikStep>
      </FormikStepper>
      <br />
      <div className="text-red-500">{error}</div>
      <div className="text-green-500">{message}</div>
    </div>
  );
}

export default BuisnessRegistrationForm;
