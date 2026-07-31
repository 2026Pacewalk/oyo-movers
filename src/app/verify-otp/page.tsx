"use client";
import "../login/login.scss";
import { Button } from "@/components";
import AuthContainer from "@/components/AuthContainer";
import Input from "@/components/Input";
import { forgotPassword } from "@/lib/serverAction";
import { errorToast, successToast } from "@/lib/toaster";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as Yup from "yup";

interface FormValues {
  otp: string;
  password: string;
  [key: string]: string; // To allow dynamic keys
}
const initialValues: FormValues = {
  otp: "",
  password: "",
};
const verifyInputsConfig = [
  {
    id: "otp",
    name: "otp",
    placeholder: "Enter Otp",
    type: "text",
  },
  {
    id: "password",
    name: "password",
    placeholder: "Enter New Password",
    type: "password",
  },
];
const validationSchema = Yup.object().shape({
  otp: Yup.string().required("Otp is required"),
  password: Yup.string()
  .required("Enter your password")
  .min(6, "Password must be at least 6 characters"),
});
const VerifyOtp = ({ searchParams }: any) => {

  const router = useRouter();
  const onSubmit = async (value: any) => {
    const response = await forgotPassword({
      ...value,
      phone: searchParams?.phone || "",
      email: searchParams?.email || "",
    });
    if (response.status === 200) {
      successToast(response.message);
      router.push("/login");
    } else {
      setSubmitting(false);
      errorToast(response.message);
    }
  };
  useEffect(() => {
    if(Object.keys(searchParams).length === 0){
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <AuthContainer>
      <div className="loginContainer">
        <div className="loginWraper">
          <h4>
            {`A One-Time Password has been sent to ${
              searchParams?.phone || searchParams.email
            }`}{" "}
          </h4>

          <div className="mainInputContainer mt-3">
            {verifyInputsConfig?.map((item: any) => {
              return (
                <Input
                  key={item?.id}
                  name={item?.name}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  value={values[item?.name]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors[item?.name]}
                  touched={touched[item?.name]}
                  className="loginInput"
                />
              );
            })}
          </div>

          <div className="forgot-btn mt-3">
            <span>
              <Link href="/login">Back to Log in</Link>
            </span>
          </div>

          <Button
            onClick={() => handleSubmit()}
            className="loginButton"
            isLoading={isSubmitting}
          >
            Change Password
          </Button>
        </div>
      </div>
    </AuthContainer>
  );
};

export default VerifyOtp;
