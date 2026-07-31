"use client";
import React from "react";
import * as Yup from "yup";
import Input from "@/components/Input";
import { Button } from "@/components";
import { useFormik } from "formik";
import { deleteMoverAccount } from "@/lib/serverAction/moverAction";
import { errorToast, successToast } from "@/lib/toaster";
import "./moverAccount.scss";

interface intialValueTypes {
  [key: string]: string | boolean;

  email: string;
  password: string;
  isAccountDelete: boolean;
}

const initialValues: intialValueTypes = {
  email: "",
  password: "",
  isAccountDelete: false,
};
interface inputConfigTypes {
  id: string;
  name: string;
  placeholder: string;
  type: string;
}
const inputsConfig: inputConfigTypes[] = [
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

const MoverAccount = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Enter your email").email("Email is invalid"),
    password: Yup.string().required("Enter your password").min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = (values: { email: string; password: string }) => {
    deleteMoverAccount(values)
      .then((res) => {
        if (res?.status === 200) {
          successToast(res?.message);
          resetForm();
        } else {
          errorToast(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  return (
    <div className="createContainer">
      <div className="createRoot">
        <h1>Delete Mover Account</h1>
        <div className="mt-4">
          {inputsConfig?.map((item: inputConfigTypes) => {
            return (
              <Input
                key={item?.id}
                name={item?.name}
                type={item?.type}
                placeholder={item?.placeholder}
                value={`${values[item?.name]}`}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors[item?.name] ? `${touched[item?.name] && errors[item?.name]}` : ""}
                className="mt-3"
              />
            );
          })}
        </div>
        <div className="d-flex mt-4 gap-3 align-item-center">
          <Input type="checkbox" id="isAccountDelete" onChange={handleChange} />
          <h6>By continuing, you agree to Delete your account , and your all data will be deleted</h6>
        </div>

        <Button
          disabled={!values.isAccountDelete || isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmit}
          className="loginButton"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MoverAccount;
