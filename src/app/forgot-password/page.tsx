"use client";
import { useFormik } from "formik";
import "../login/login.scss";
import * as Yup from "yup";
import Input from "@/components/Input";
import { Button } from "@/components";
import Link from "next/link";
import { sendForgotPasswordEmail, resetPasswordWithToken } from "@/lib/serverAction";
import AuthContainer from "@/components/AuthContainer";
import { errorToast, successToast } from "@/lib/toaster";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EmailFormValues {
  email: string;
}

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
});

const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    // ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl);
  }, [searchParams]);

  // Email form for requesting reset link
  const emailForm = useFormik<EmailFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      const res = await sendForgotPasswordEmail({ 
        email: values.email, 
        role: 'customer' 
      });
      
      if (res.status === "success") {
        successToast(res.message || "Reset password link sent successfully");
        emailForm.setSubmitting(false);
      } else {
        emailForm.setSubmitting(false);
        errorToast(res.message || "Failed to send reset link");
      }
    },
  });

  // Password reset form when token is present
  const resetForm = useFormik<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      if (!token) {
        errorToast("Invalid or missing token");
        resetForm.setSubmitting(false);
        return;
      }

      const res = await resetPasswordWithToken({
        password: values.password,
        role: 'customer',
        token: token,
      });

      if (res.status === "success") {
        successToast(res.message || "Password reset successfully");
        router.push("/login");
      } else {
        resetForm.setSubmitting(false);
        errorToast(res.message || "Failed to reset password");
      }
    },
  });

  // Show reset password form if token exists
  if (token) {
    return (
      <AuthContainer>
        <div className="loginContainer">
          <div className="loginWraper">
            <h2>Reset your password</h2>
            <p>
              Enter your new password below
            </p>
            <Input
              label={"New Password"}
              id={"password"}
              name={"password"}
              placeholder={"Enter new password"}
              value={resetForm.values.password}
              onChange={resetForm.handleChange}
              className="inputLogin mb-3"
              onBlur={resetForm.handleBlur}
              error={resetForm.errors.password}
              touched={resetForm.touched.password}
              type={"password"}
            />
            <Input
              label={"Confirm Password"}
              id={"confirmPassword"}
              name={"confirmPassword"}
              placeholder={"Confirm new password"}
              value={resetForm.values.confirmPassword}
              onChange={resetForm.handleChange}
              className="inputLogin"
              onBlur={resetForm.handleBlur}
              error={resetForm.errors.confirmPassword}
              touched={resetForm.touched.confirmPassword}
              type={"password"}
            />
            <div className="forgot-btn mt-3">
              <span>
                <Link href="/login">Back to Log in</Link>
              </span>
            </div>

            <Button
              onClick={() => resetForm.handleSubmit()}
              disabled={!resetForm.values.password || !resetForm.values.confirmPassword}
              className="loginButton"
              isLoading={resetForm.isSubmitting}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </AuthContainer>
    );
  }

  // Show email form for requesting reset link
  return (
    <AuthContainer>
      <div className="loginContainer">
        <div className="loginWraper">
          <h2>Forgot your password</h2>
          <p>
            Enter your email and we&apos;ll send you a reset link
          </p>
          <Input
            label={"Email"}
            id={"email"}
            name={"email"}
            placeholder={"Email"}
            value={emailForm.values.email}
            onChange={emailForm.handleChange}
            className="inputLogin"
            onBlur={emailForm.handleBlur}
            error={emailForm.errors.email}
            touched={emailForm.touched.email}
            type={"email"}
          />
          <div className="forgot-btn mt-3">
            <span>
              <Link href="/login">Back to Log in</Link>
            </span>
          </div>

          <Button
            onClick={() => emailForm.handleSubmit()}
            disabled={!emailForm.values.email}
            className="loginButton"
            isLoading={emailForm.isSubmitting}
          >
            Send Reset Link
          </Button>
        </div>
      </div>
    </AuthContainer>
  );
};

export default ForgotPasswordPage;
