"use client";
import Input from "@/components/Input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "@/components/Button";
import { moverLogin } from "@/lib/serverAction/authAction";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toaster";
import Link from "next/link";
import { tokenKey, refreshTokenKey } from "@/config";

interface intialValueTypes {
  email: string;
  password: string;
}

const initialValues: intialValueTypes = {
  email: "",
  password: "",
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
});

const MoverLoginForm = ({ query }: { query: string }) => {

  const router = useRouter();
  
  // Client-side cookie setting function with better persistence
  const setClientCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    // Use Secure flag for HTTPS, but allow SameSite=Lax for cross-site compatibility
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`;
    console.log(`Client-side cookie set: ${name} = ${value}`);
  };
  
  const onSubmit = (values: { email: string; password: string }) => {
    setSubmitting(true);
    moverLogin(values)
      .then((res: any) => {
        setSubmitting(false);
        console.log("mover login res", res);
        if (res.status === 200) {
          successToast(res.message);
          
          // Server-side cookies are set by moverLogin function
          // Also set client-side as backup for better persistence
          if (res.data?.token) {
            setClientCookie(tokenKey, res.data.token);
          }
          if (res.data?.refreshToken) {
            setClientCookie(refreshTokenKey, res.data.refreshToken);
          }
          
          // Small delay to ensure cookies are set before navigation
          setTimeout(() => {
            // Get user data from response
            const userName = res.data?.user?.name || "User";
            const token = res.data?.token || "temp_token";
            
            // If query contains step parameter, preserve it in the redirect
            const redirectUrl = query || `/become-mover?step=3&token=${token}&name=${encodeURIComponent(userName)}`;
            router.push(redirectUrl);
          }, 100);
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
      {/* <div className="forgot-btn">
        <span>
          <Link href="/forgot-password">Forgot Password?</Link>
        </span>
      </div> */}
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

export default MoverLoginForm;
