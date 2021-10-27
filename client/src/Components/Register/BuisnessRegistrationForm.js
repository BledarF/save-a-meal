import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikStepper, FormikStep, InputField } from "formik-stepper";

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Your business name is required"),
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

function BuisnessRegistrationForm() {
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    // FETCH POST REQUEST
    setError("Error: not connected to the server");

    setSubmitting(false); //// Important
  };

  const [error, setError] = useState("");

  return (
    <div>
      <FormikStepper
        /// Accept all Formik props
        onSubmit={onSubmit} /// onSubmit Function
        initialValues={{
          businessName: "",
          email: "",
          password: "",
          privacy: false,
          description: "",
          town: "",
          postcode: "",
          streetname: "",
          telephone: "",
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
          startTime: "",
          endTime: "",
          passwordConfirmation: "",
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
          withIcons="fa fa-user" // to add icon into the circle must add icon as class Name like Fontawesome
          withNumbers /// If true, it hides the icon and shows the step number
          iconColor="white" /// The color can be root variables or css => #fff
          circleColor="#F59E0B" /// The color can be root variables or css => #fff
        >
          <InputField name="businessName" label="Business Name" />
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
          withIcons="fa fa-user" // to add icon into the circle must add icon as class Name like Fontawesome
          withNumbers /// If true, it hides the icon and shows the step number
          iconColor="white" /// The color can be root variables or css => #fff
          circleColor="#F59E0B" /// The color can be root variables or css => #fff
        >
          <InputField type="checkbox" name="monday" label="Monday" />
          <InputField type="checkbox" name="tuesday" label="Tuesday" />
          <InputField type="checkbox" name="wednesday" label="Wednesday" />
          <InputField type="checkbox" name="thursday" label="Thursday" />
          <InputField type="checkbox" name="friday" label="Friday" />
          <InputField type="checkbox" name="saturday" label="Saturday" />
          <InputField type="checkbox" name="sunday" label="Sunday" />
          <InputField
            name="startTime"
            type="time"
            label="Collection Start Time"
          />
          <InputField name="endTime" type="time" label="Collection End Time" />
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
      <div className="text-red-500">{error}</div>
    </div>
  );
}

export default BuisnessRegistrationForm;
