"use client";
import "./signup.scss";
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Button from "@/components/Button";
import { login, signup } from "@/lib/serverAction";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import { errorToast, successToast } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import { phoneNumberRegex } from "@/helper";
import { Image } from "@/components";
import StepHandler from "@/components/JobBooking/StepHandler";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import { createBookingNonLogin } from "@/lib/serverAction/bookingAction";
import ReCaptcha from "@/components/ReCaptcha";
import { shouldBypassRecaptchaValidation } from "@/utils/recaptchaSiteKey";

interface intialValueTypes {
  firstname: string;
  lastname: string;
  companyName: string;
  mobileNumber: string;
  email: string;
  password: string;
  recaptcha: string;
}

const initialValues: intialValueTypes = {
  firstname: "",
  lastname: "",
  companyName: "",
  mobileNumber: "",
  email: "",
  password: "",
  recaptcha: "",
};

const signupInputsConfig = [
  {
    name: "firstname",
    placeholder: "Enter Your First Name",
    type: "text",
    label: "First Name",
  },
  {
    name: "lastname",
    placeholder: "Enter Your Last Name",
    type: "text",
    label: "Last Name",
  },
  {
    name: "companyName",
    placeholder: "Company Name",
    type: "text",
    label: "Company Name (Optional)",
  },
  {
    name: "mobileNumber",
    placeholder: "Enter Your Mobile no.",
    type: "number",
    label: "Mobile Number",
  },
  {
    name: "email",
    placeholder: "Enter Your Email",
    type: "text",
    label: "Email",
  },
  {
    name: "password",
    placeholder: "Create a Password",
    type: "password",
    label: "Password",
  },
];

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  companyName: Yup.string(),
  mobileNumber: Yup.string()
    .required("Phone Number is required")
    .max(10, "Mobile number cannot be more than 10 digits")
    .matches(phoneNumberRegex, "Phone number is invalid"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  recaptcha: Yup.string().test(
    "recaptcha",
    "Please complete the captcha",
    (value) => shouldBypassRecaptchaValidation() || Boolean(value)
  ),
});
const SignupForm = ({ isBookingFlow }: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { activeStep, setStep, price, setUserSignUpData, jobBooking } =
    useJobBooking();
  const router = useRouter();
  const { setDraftData } = useCreateDraft();
  const { distance, user, ...rest } = jobBooking;
  const distanceData = distance?.split(" ")[0];

  useEffect(() => {
    const checkUserLogin = async () => {
      const token = await getCookie(tokenKey);
      if (token && activeStep === 8) {
        setStep(9);
      }
    };
    checkUserLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: any) => {
    setLoading(true);
    const user = {
      name: `${e.firstname} ${e.lastname}`,
      email: e.email,
      password: e.password,
      phone: e.mobileNumber,
      userType: "customer",
      ...(e.companyName?.trim() && { companyName: e.companyName.trim() }),
      ...(e.recaptcha && { recaptcha: e.recaptcha }),
    };
    if (isBookingFlow) {
      signup(user).then((res: any) => {
        setLoading(false);
        if (res?.status === 201) {
          successToast("Your account created Successfully");
          setUserSignUpData(user);
          setStep(9);
        } else {
          errorToast(res.message);
        }
      });
    } else {
      signup(user).then((res: any) => {
        setLoading(false);
        if (res?.status === 201) {
          successToast("Your account created Successfully");
          router.push("/");
        } else {
          errorToast(res.message);
        }
      });
    }
  };
  const createBooking = async (userData: any) => {
    const payload = {
      distance: distanceData,
      ...rest,
      price,
      user: userData,
    };
    createBookingNonLogin(payload).then((res: any) => {
      if (res.status === 201) {
        setDraftData(res?.data?.data);
        try {
          login({ email: userData.email, password: userData.password }).then(
            (res: any) => {
              if (res.status === 200) {
                setUserSignUpData(null);
                setStep(9);
              } else {
                errorToast(res.message)
              }
              setLoading(false);

            }
          );
        } catch (error) {
          errorToast('Getting issue in login')
          console.log("getting error in login", error);
          setLoading(false);
        }
      } else {
        errorToast(res?.message || 'Internal server error ')
        setLoading(false);
      }
    });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  }: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showCreateAccount = !isBookingFlow ? true : activeStep === 8;
  const form = () =>
    showCreateAccount && (
      <div className="signupWraper">
        <span className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 gap-md-0">
          <h1>Create Account</h1>{" "}
          <h6>
            {" "}
            Have Account? <Link href="/login"> Sign-in</Link>
          </h6>
        </span>
        <Row className="mt-4">
          {signupInputsConfig?.map((item: any, index: number) => {
            return (
              <Col key={item?.name} md={index < 2 ? "6" : "12"}>
                <Input
                  isFloating={true}
                  label={item?.label}
                  name={item?.name}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  value={values[item?.name]}
                  maxLength={item?.maxLength}
                  onBlur={handleBlur}
                  onChange={(e: any) => {
                    if (e.target.name === "mobileNumber") {
                      const value = e.target.value.toString();
                      // Limit to 10 digits
                      const limitedValue = value.slice(0, 10);
                      setFieldValue("mobileNumber", limitedValue);
                    } else {
                      handleChange(e);
                    }
                  }}
                  error={touched[item?.name] && errors[item?.name]}
                  className="signupInput"
                />
              </Col>
            );
          })}
        </Row>
        <div className="ourpromiss">
          <Image src="./icon/heart.svg" alt={"promise"} />
          <div>
            <p>Our promise </p>
            <span>Your details are kept secure and confidential.</span>
          </div>
        </div>
        <div className="signup-recaptcha">
          <ReCaptcha
            onVerify={(token) => setFieldValue("recaptcha", token || "")}
            onExpire={() => setFieldValue("recaptcha", "")}
            onError={() => setFieldValue("recaptcha", "")}
            touched={touched.recaptcha}
            error={errors.recaptcha as string}
          />
        </div>
        <div className="signupFooter">
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || isLoading}
            isLoading={isLoading}
            className="signupButton"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  return isBookingFlow ? <StepHandler step={8}>{form()}</StepHandler> : form();
};

export default SignupForm;
