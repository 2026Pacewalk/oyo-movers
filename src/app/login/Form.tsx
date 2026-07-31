"use client";
import Input from "@/components/Input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "@/components/Button";
import { login } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toaster";
import Link from "next/link";
import ReCaptcha from "@/components/ReCaptcha";
import { shouldBypassRecaptchaValidation } from "@/utils/recaptchaSiteKey";

interface intialValueTypes {
  email: string;
  password: string;
  recaptcha: string;
}

const initialValues: intialValueTypes = {
  email: "",
  password: "",
  recaptcha: "",
};

const signupInputsConfig = [
  {
    id: "email",
    name: "email",
    placeholder: "Enter Your Email",
    type: "text",
  },
  {
    id: "password",
    name: "password",
    placeholder: "Enter Password",
    type: "password",
  },
];
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Enter your email").email("Email is invalid"),
  password: Yup.string()
    .required("Enter your password")
    .min(8, "Password must be at least 8 characters"),
  recaptcha: Yup.string().test(
    "recaptcha",
    "Please complete the captcha",
    (value) => shouldBypassRecaptchaValidation() || Boolean(value)
  ),
});

const LoginForm = ({ query }: { query: string }) => {

  const router = useRouter();
  const onSubmit = (values: intialValueTypes) => {
    setSubmitting(true);
    login({
      email: values.email,
      password: values.password,
      recaptcha: values.recaptcha,
    })
      .then((res: any) => {
        setSubmitting(false);
        console.log("res", res);
        if (res.status === 200) {
          successToast(res.message);
          // If query contains step parameter, preserve it in the redirect
          const redirectUrl = query || "/booking";
          router.push(redirectUrl);
        } else {
          errorToast(res.message);
        }
      })
      .catch((err) => {
        setSubmitting(false);
        errorToast("Invalid email or password");
      });
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    setFieldValue,
  }: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="mainInputContainer">
      {signupInputsConfig?.map((item: any) => {
        return (
          <Input
            key={item?.id}
            name={item?.name}
            type={item?.type}
            placeholder={item?.placeholder}
            value={values[item?.name]}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched[item?.name] && errors[item?.name]}
            className="loginInput"
          />
        );
      })}
      <div className="forgot-btn">
        <span>
          <Link href="/forgot-password">Forgot Password?</Link>
        </span>
      </div>
      <div className="login-recaptcha">
        <ReCaptcha
          onVerify={(token) => setFieldValue("recaptcha", token || "")}
          onExpire={() => setFieldValue("recaptcha", "")}
          onError={() => setFieldValue("recaptcha", "")}
          touched={touched.recaptcha}
          error={errors.recaptcha as string}
        />
      </div>
      <Button
        disabled={Object.keys(errors).length > 0 || isSubmitting}
        isLoading={isSubmitting}
        onClick={handleSubmit}
        className="loginButton"
      >
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
