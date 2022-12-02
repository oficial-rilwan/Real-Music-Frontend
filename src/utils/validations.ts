import * as yup from "yup";

const signinSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(16),
});
const signupSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, "Name cannot include special charaters")
    .required("Username is required"),
  email: yup.string().email().required('Email is required"'),
  password: yup.string().required('"Password is required"').min(6).max(16),
  confirmPassword: yup
    .string()
    .required("Passwords does not match")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export { signinSchema, signupSchema };
