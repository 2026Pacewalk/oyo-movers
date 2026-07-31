"use client";
import React from "react";
import MoverInput from "./MoverInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { moverLogin } from "@/lib/serverAction/authAction";
import { useRouter } from "next/navigation";
import { errorToast } from "@/lib/toaster";
import Link from "next/link";
import { tokenKey, refreshTokenKey } from "@/config";
import "../../app/login/login.scss";

interface intialValueTypes {
  email: string;
  password: string;
}

const initialValues: intialValueTypes = {
  email: "",
  password: "",
};

const signupMoverInputsConfig = [
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

const MoverLogin = () => {
  const router = useRouter();
  
  // Client-side cookie setting function with better persistence
  const setClientCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    // Use Secure flag for HTTPS, but allow SameSite=Lax for cross-site compatibility
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
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
          // success toast removed per request
          
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
            
            // Navigate to step 3 of become-mover flow
            router.push(`/become-mover?step=3&token=${token}&name=${encodeURIComponent(userName)}`);
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
    <div className="loginContainer">
      <div className="loginWraper">
        <h1>Sign in to your Mover Account</h1>
        <p>Enter your details below to continue.</p>
        
        <div className="mainMoverInputContainer">
          {signupMoverInputsConfig?.map((item: any) => {
            return (
              <MoverInput
                key={item?.id}
                name={item?.name}
                type={item?.type}
                placeholder={item?.placeholder}
                value={values[item?.name]}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched[item?.name] && errors[item?.name]}
                className="loginMoverInput"
              />
            );
          })}
          
          <div className="forgot-btn">
            <span>
              <Link href="/forgot-password">Forgot Password?</Link>
            </span>
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
        
        <div className="loginFooter">
          <p>
            Don&apos;t have a mover account? <Link href="/become-mover">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoverLogin;
