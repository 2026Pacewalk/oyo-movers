import React, { useMemo } from "react";
import MoverInput from "./MoverInput";
import Button from "../Button";
import AddressMoverInput from "../GooglePlaceAutoCompelete";

const MoreAbout = ({
  value,
  setFieldValue,
  handleBlur,
  handleChange,
  errors,
  handleSubmit,
  setFieldTouched,
  touched,
  index,
}: any) => {
  const handelAreaSelect = (value: any) => {
    setFieldValue("about.experience", value);
  };
  const handelHowManyPerson = (value: any) => {
    setFieldValue("about.howManyPerson", value);
  };
  const handelMonthSelect = (value: any) => {
    setFieldValue("about.month", value);
  };
  const error = errors?.about;

  const addressError = useMemo(() => {
    if (!touched?.about?.address) return "";
    if (error?.address) {
      if (error?.address?.latitude) {
        return error?.address?.latitude;
      }
      if (Object.values(error?.address || {}).length && !value?.address?.addressLine1 ) {
        return "Address is required";
      } else {
        return Object.values(error?.address || {}).join(", ") + " is missing in address";
      }
    } else {
      return "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors?.about?.address, touched?.about?.address]);

  const isButtomDisabled = () => {
    return Boolean(
      value.experience === "" ||
        value.howManyPerson === "" ||
        value.canWorkThisWeekend === ""
    );
  };
  const onBlur = (e: any) => {    // setIsOnFocus(false);
    setFieldTouched(`about.address`, true);
  };
  return (
    <div className="tabContainer p-4 rounded">
      <h2>More About Yourself</h2>
      <div className="tabRadioWraper mb-4">
        <p>Are you experience / fresher? </p>

        <div className="justify-content-between">
          <div>
            <MoverInput
              label="Experienced"
              name="about.experience"
              placeholder="Experience "
              type="radio"
              value={"true"}
              checked={value.experience === true}
              onChange={() => handelAreaSelect(true)}
              className="radioCheck"
            />
            <MoverInput
              label="Fresher"
              name="about.experience"
              placeholder="Fresher"
              type="radio"
              value={"false"}
              checked={value.experience === false}
              onChange={() => handelAreaSelect(false)}
            />
          </div>
          {value.experience === true && (
            <div className="tabFullWraper yearMoverInput">
              <p>How many Years / Months?</p>
              <div className="d-flex gap-3">
                <MoverInput
                  label="0-6 months"
                  name="about.month"
                  type="radio"
                  value="0-6 months"
                  checked={value.month === "0-6 months"}
                  onChange={() => handelMonthSelect("0-6 months")}
                />
                <MoverInput
                  label="6-12 months"
                  name="about.month"
                  type="radio"
                  value="6-12 months"
                  checked={value.month === "6-12 months"}
                  onChange={() => handelMonthSelect("6-12 months")}
                />
                <MoverInput
                  label="1-2 years"
                  name="about.month"
                  type="radio"
                  value="1-2 years"
                  checked={value.month === "1-2 years"}
                  onChange={() => handelMonthSelect("1-2 years")}
                />
                <MoverInput
                  label="2+ years"
                  name="about.month"
                  type="radio"
                  value="2+ years"
                  checked={value.month === "2+ years"}
                  onChange={() => handelMonthSelect("2+ years")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tabRadioWraper  mb-4">
        <p>
          {/* Oyo Platform provides opportunities to complete one
        person jobs and two person jobs for those who have a
        teammate. */}
          Please select below: -
        </p>
        <div>
          <MoverInput
            label="1 person"
            name="about.howManyPerson"
            type="radio"
            value="1 person"
            checked={value.howManyPerson === "1 person"}
            onChange={() => handelHowManyPerson("1 person")}
          />
          <MoverInput
            label="2-3 people"
            name="about.howManyPerson"
            type="radio"
            value="2-3 people"
            checked={value.howManyPerson === "2-3 people"}
            onChange={() => handelHowManyPerson("2-3 people")}
          />
          <MoverInput
            label="4+ people"
            name="about.howManyPerson"
            type="radio"
            value="4+ people"
            checked={value.howManyPerson === "4+ people"}
            onChange={() => handelHowManyPerson("4+ people")}
          />
        </div>
      </div>
      <div className="tabRadioWraper mb-4">
        <p>Can you work this Weekend? </p>
        <div>
          <MoverInput
            label="Yes"
            name="about.canWorkThisWeekend"
            placeholder="Experience "
            type="radio"
            value={""}
            checked={value.canWorkThisWeekend === true}
            onChange={() => setFieldValue("about.canWorkThisWeekend", true)}
          />
          <MoverInput
            label="No"
            name="about.canWorkThisWeekend"
            placeholder="Fresher"
            type="radio"
            value={""}
            checked={value.canWorkThisWeekend === false}
            onChange={() => setFieldValue("about.canWorkThisWeekend", false)}
          />
        </div>
      </div>
      <div className="tabFullWraper mb-4">
        <p>Address </p>
        <AddressMoverInput
          label={"Address"}
          onSelectAddress={(e: any) => setFieldValue("about.address", e)}
          error={addressError}
          becomeMoverFlow={true}
          handleBlur={onBlur}
        />
      </div>
      <div className="tabRadioWraper secondTabRadio mb-3">
        <MoverInput
          label="Emergency Contact "
          name="about.haveEmergencyContact"
          placeholder="Emergency Contact  "
          type="checkbox"
          value={""}
          checked={value.haveEmergencyContact}
          onChange={() =>
            setFieldValue(
              "about.haveEmergencyContact",
              !value.haveEmergencyContact
            )
          }
        />
      </div>
      {value?.haveEmergencyContact && (
        <div className="d-flex gap-4 emergencyContact ">
          <MoverInput
            label="Full Name"
            name="about.emergencyContact.name"
            placeholder="Full Name"
            type="text"
            value={value.emergencyContact.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-4"
          />

          <MoverInput
            label="Phone Number"
            name="about.emergencyContact.phone"
            placeholder="Phone Number"
            type="number"
            value={value.emergencyContact.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-4"
          />
          <MoverInput
            label="Relationship"
            name="about.emergencyContact.relationship"
            placeholder="Relationship"
            type="text"
            value={value.emergencyContact.relationship}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-4"
          />
        </div>
      )}
      <div className="tabFooter d-flex justify-content-end ">
        <Button
          type="submit"
          className="footerButton"
          onClick={handleSubmit}
          disabled={isButtomDisabled()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MoreAbout;
