import React from "react";
import LoginForm from "./Form";
import "./login.scss";
import Link from "next/link";
import AuthContainer from "@/components/AuthContainer";

const Login = ({ searchParams }: any) => {

  return (
    <AuthContainer>
      <div className="loginContainer">
        <div className="loginWraper">
          <h1>Sign in Your Account</h1>
          <p>Enter your details below to continue.</p>
          <LoginForm query={searchParams?.redirectTo} />
          <div className="loginFooter">
            <p>
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
