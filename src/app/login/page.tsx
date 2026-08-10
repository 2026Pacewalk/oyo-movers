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
          <Link href="/" className="auth-card-logo">
            <img src="/images/footer-logo.png" alt="OYO Movers" />
          </Link>
          <h1>Welcome back</h1>
          <p>Sign in to your OYO Movers account to book and manage your moves.</p>
          <LoginForm query={searchParams?.redirectTo} />
          <div className="loginFooter">
            <p>
              Don&apos;t have an account? <Link href="/signup">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
