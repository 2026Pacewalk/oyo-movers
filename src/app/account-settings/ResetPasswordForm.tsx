"use client";
import Input from "@/components/Input";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { resetPassword } from "@/lib/serverAction";
import { errorToast, successToast } from "@/lib/toaster";

interface FormValues {
  oldPassword: string;
  password: string;
  rePassword: string | null;
}

const ResetPasswordForm = () => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match") // Ensure rePassword matches password
      .required("Please confirm your password"),
  });

  const onSubmit = (values: FormValues) => {
    resetPassword({
      newPassword: values.password,
      oldPassword: values.oldPassword,
      role: 'customer',
    })
      .then((res:any) => {
        if(res.status === 200){
          resetForm();
          successToast(res.message);
        }else{
          errorToast(res.message);
        }
      })
      .catch((e: any) => {
        console.log("e", e);
        errorToast("Invalid old password");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Old Password"
        id="oldPassword"
        name="oldPassword"
        placeholder="Enter Old Password"
        value={values?.oldPassword}
        onChange={(e: string) => handleChange(e)}
        error={touched?.oldPassword ? errors?.oldPassword : undefined}
        onBlur={handleBlur}
        className="mt-4"
        isFloating={true}
      />
      <Input
        label="New Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter New Password"
        value={values?.password}
        onChange={(e: string) => handleChange(e)}
        error={touched?.password ? errors?.password : undefined}
        onBlur={handleBlur}
        className="mt-4"
        isFloating={true}
      />

      <Input
        label="Confirm Password"
        id="rePassword"
        name="rePassword"
        type="password"
        placeholder="Re-enter Password"
        value={values?.rePassword}
        onChange={(e: string) => handleChange(e)}
        error={touched?.rePassword ? errors?.rePassword : undefined}
        onBlur={handleBlur}
        className="mt-4"
        isFloating={true}
      />
      <div className="d-flex justify-content-end mt-4">
        <Button type="submit" className="signupButton" isLoading={isSubmitting}>
          Update
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
