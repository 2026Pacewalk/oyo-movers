"use client";

import { FC, useState } from "react";
import Input from "../Input";
import { useJobBooking } from "./JobBookingHook";
import { FaArrowRight } from "react-icons/fa6";
import { Card } from "react-bootstrap";
import IconButton from "../IconButton";
import { FaPlus } from "react-icons/fa6";
import Image from "../Image";
import StepHandler from "./StepHandler";
import Button from "../Button";

const HowManyHelper: FC<any> = () => {
  const [showHelperInput, setShowHelperInput] = useState<boolean>(false);

  const { services, nextStep, moverServices, setHowManyHelper, labour } = useJobBooking();
  const moverServiceArray = Array.isArray(services) ? services : Object.values(services || {});
const service = moverServiceArray.find((i: any) => i.name === moverServices);


  const handleSelect = (id: string) => {
    nextStep();
    setHowManyHelper(id);
  };

  const handelNext = () => {
    labour.howManyHelper && nextStep();
  };

  return (
    <StepHandler step={3} showOnly="Labour Only">
      <div>
        <h1>{"How Many Helpers"} </h1>
        <div className="mt-4 roomContainer typeOfSpace">
          {service?.labour?.helper?.map((input: any) => {
            return (
              <Card
                key={input?.title}
                className={`moverServiceSection ${
                  labour?.howManyHelper === input?.value && "moverServiceSectionActive"
                } `}
                onClick={() => handleSelect(input?.value)}
              >
                <Card.Body>
                  <Image
                    src={input.value === "2" ? "/mover-double.jpg" : "/mover-single.png"}
                    alt="help Movers"
                    className="moversHelper"
                  />
                  <div className="w-100">
                    <Card.Title> {input?.title} </Card.Title>
                    <Card.Text className="subtitle">{input?.subtitle}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        {showHelperInput && (
          <div className="mt-4 typeOfSpace">
            <Input
              className="typeOfSpace__inner"
              label={"Enter Helper Count"}
              type="number"
              placeholder={"Enter Helper Count"}
              onChange={(e: any) => setHowManyHelper(e.target.value)}
            />
          </div>
        )}
        <div className="howManyHelperFooter d-flex justify-content-between align-items-center mt-4 ">
          <IconButton
            className="addStopButton "
            title="Add Helper "
            iconPosition="left"
            icon={<FaPlus />}
            onClick={() => setShowHelperInput(!showHelperInput)}
          />
          {labour?.howManyHelper && (
            <IconButton
              className="buttonClass continueStepButton"
              title="Continue"
              iconPosition="right"
              icon={<FaArrowRight />}
              onClick={handelNext}
            />
          )}
        </div>
      </div>
    </StepHandler>
  );
};

export default HowManyHelper;
