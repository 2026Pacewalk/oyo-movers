"use client";
import Input from "@/components/Input";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { updateAuthUser } from "@/lib/serverAction/authAction";
import { useUserData } from "@/components/User/UserDataHook";
import ImageUploader from "@/components/UploadImage";
import { errorToast, successToast } from "@/lib/toaster";
import { useRouter } from "next/navigation";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  phone: string | undefined;
  imgSrc?: string;
  imgKey?: string;
}

const CreateUpdateProfileForm = () => {
  const { user } = useUserData();
  const router = useRouter();

  useEffect(() => {
    const nameParts = user?.name?.split(' ') || ['', ''];
    setValues({
      firstname: nameParts[0] || "",
      lastname: nameParts.slice(1).join(' ') || "",
      email: user?.email || "",
      phone: user?.phone || undefined,
      imgSrc: user?.imgSrc || "",
      imgKey: user?.imgKey || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .matches(/^\S+@\S+\.\S+$/)
      .required("Email is required"),
    phone: Yup.number().required("Phone number is required"),
  });

  const onSubmit = (values: FormValues) => {

    updateAuthUser(values)
      .then((res) => {
        if (res.status === 201) {
          successToast(res.message);
          router.push("/profile");
        } else {
          errorToast(res.message);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const initialValues: FormValues = {
    firstname: user?.name?.split(' ')[0] || "",
    lastname: user?.name?.split(' ').slice(1).join(' ') || "",
    email: user?.email || "",
    phone: user?.phone || undefined,
    imgSrc: user?.imgSrc || "",
    imgKey: user?.imgKey || "",
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  });


  const areObjectsEqual = (obj1: any, obj2: any) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-between mb-3">
      <div className="my-3">
        <ImageUploader setFieldValue={setFieldValue} profile={true} img={{ src: values?.imgSrc, key: values.imgKey }} />
      </div>
      <Input
        label="First Name"
        id="firstname"
        name="firstname"
        placeholder="Enter First Name"
        className="mt-3"
        value={values?.firstname}
        onChange={(e: string) => handleChange(e)}
        error={touched?.firstname ? errors?.firstname : undefined}
        onBlur={handleBlur}
        isFloating={true}
      />
      <Input
        label="Last Name"
        id="lastname"
        name="lastname"
        className="mt-3"
        placeholder="Enter Last Name"
        value={values?.lastname}
        onChange={(e: string) => handleChange(e)}
        error={touched?.lastname ? errors?.lastname : undefined}
        onBlur={handleBlur}
        isFloating={true}
      />

      <Input
        label="Email"
        id="email"
        name="email"
        placeholder="Enter Email"
        className="mt-3"
        value={values?.email}
        isFloating={true}
        disabled={true}
      />
      <Input
        label="Phone Number"
        className="mt-3"
        id="phone"
        name="phone"
        type="number"
        placeholder="Enter Phone Number"
        value={values?.phone}
        isFloating={true}
        disabled={true}
      />

      <div className="d-flex justify-content-end mt-3 ">
        <Button
          type="submit"
          className="signupButton border-0"
          disabled={areObjectsEqual(values, initialValues)}
          isLoading={isSubmitting}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default CreateUpdateProfileForm;
