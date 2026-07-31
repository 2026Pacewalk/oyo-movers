"use client";

import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Input from "../Input";
import { useJobBooking } from "./JobBookingHook";
import { useFormik } from "formik";
import IconButton from "../IconButton";
import { FaArrowRight, FaWrench } from "react-icons/fa6";
import * as Yup from "yup";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import Image from "../Image";
import ImageUploader from "../UploadImage";
import StepHandler from "./StepHandler";
import { errorToast } from "@/lib/toaster";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import { useUserData } from "@/components/User/UserDataHook";

const MoreDetails = () => {
  const fileInputRef = useRef<any>();
  const [images, setImages] = useState<any>();
  const { user } = useUserData();
  const {
    nextStep,
    jobBooking,
    setListOfItems,
    setDismantlingAndAssembly,
    setPackingAndUnpacking,
    labour,
    setItemImages,
    removeItemImages,
  } = useJobBooking();
  const { updateDrafQuotationData } = useCreateDraft();

  const getToken = async () => {
    return getCookie(tokenKey);
  };
  const submitForm = async () => {
    const { listOfItems, dismantlingAndAssembly, packingAndUnpacking } = values;
    setListOfItems(listOfItems);
    setDismantlingAndAssembly(dismantlingAndAssembly);
    setPackingAndUnpacking(packingAndUnpacking);
    updateDrafQuotationData(
      {
        listOfItems,
        dismantlingAndAssembly,
        packingAndUnpacking,
        itemImages: jobBooking?.itemImages,
      },
      "moreDetails"
    );
    if (labour.howWeHelp) {
      const token = await getToken();
      if (token) {
        nextStep();
        nextStep();
        nextStep();
      } else {
        nextStep();
        nextStep();
      }
      return;
    }
    nextStep();
  };
  const handleFileUpload = (files: any) => {
    setImages(Array.from(files));
  };

  const { errors, values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      listOfItems: jobBooking?.listOfItems || "",
      dismantlingAndAssembly: jobBooking.dismantlingAndAssembly || false,
      packingAndUnpacking: jobBooking.packingAndUnpacking || false,
    },
    validationSchema: Yup.object().shape({
      listOfItems: Yup.string(),
    }),
    onSubmit: submitForm,
  });

  // Update form values when jobBooking data changes (e.g., from API restoration)
  useEffect(() => {
    setFieldValue("listOfItems", jobBooking?.listOfItems || "");
    setFieldValue("dismantlingAndAssembly", jobBooking?.dismantlingAndAssembly || false);
    setFieldValue("packingAndUnpacking", jobBooking?.packingAndUnpacking || false);
  }, [jobBooking?.listOfItems, jobBooking?.dismantlingAndAssembly, jobBooking?.packingAndUnpacking, setFieldValue]);

  const handelUploadClick = async () => {
    const token = await getToken();
    if (!token) {
      errorToast("Please login to upload images");
      return;
    }
    fileInputRef.current?.click();
  };
  return (
    <StepHandler step={6}>
      <div className="detailsContainer">
        <h1 className="mb-4">Few More Details</h1>
        <div className="detailsContainerWraper">
          {/* <h5>Add List of items </h5> */}
          <div>
            <Input
              className="mb-3 moreDetailsInput"
              value={values.listOfItems}
              name="listOfItems"
              label="👉Add notes, instructions, or item list to help movers prepare"
              isFloating
              type="text"
              as="textarea"
              placeholder="Notes, Imp instructions or List of items "
              onChange={handleChange}
              error={errors.listOfItems}
            />
          </div>

          {!labour.howWeHelp && (
            <label className="assemblyOptionBlock" htmlFor="dismantlingAndAssembly">
              <span className="assemblyOptionBlock__control">
                <Form.Check
                  checked={values.dismantlingAndAssembly}
                  name="dismantlingAndAssembly"
                  type="checkbox"
                  id="dismantlingAndAssembly"
                  onChange={handleChange}
                  className="assemblyOptionCheckbox"
                />
                <FaWrench className="assemblyOptionIcon" aria-hidden />
                <span className="assemblyOptionTitle">Need furniture assembly or disassembly?</span>
              </span>
              <span className="assemblyOptionDesc">
                No additional fees, just adds to moving time. Change your mind anytime.
              </span>
            </label>
          )}
          {/* <>
            <Form.Check
              checked={values.packingAndUnpacking}
              name="packingAndUnpacking"
              type={"checkbox"}
              label={"Packing Required"}
              id={`default-${2}`}
              onChange={handleChange}
            />
          </> */}
          {/* <ImageUploader
            uploadClass="uploadInnerContent "
            uploadImages={images}
            setFieldValue={(files: any) => {
              if (jobBooking?.itemImages?.length) {
                let imgKey: any = [];
                files.forEach((file: any) => {
                  const isExist = jobBooking?.itemImages?.filter(
                    (item: any) => item === file
                  );
                  if (!isExist) {
                    imgKey.push(file?.key);
                  }
                });
                setItemImages(imgKey);
              } else {
                setItemImages(files);
              }
            }}
            removeItemImages={removeItemImages}
          >
            <div className="uploadSection uploadSecWrapper">
              <Image
                src={"upload.svg"}
                alt="upload"
                id="file"
                className="uploadfile"
                onClick={() =>  handelUploadClick()}
              />
              <h4>+ Add photos</h4>
              <input
                hidden
                ref={fileInputRef}
                type="file"
                multiple={true}
                accept="image/*,.pdf,.heic,.heif"
                onChange={(e) => handleFileUpload(e?.target?.files)}
              />
              <p>
                Providing Photos of your items helps your mover prepare for your
                move
              </p>
            </div>
          </ImageUploader>
           */}
          <div className="footerLocation justify-content-end">
            <IconButton
              className="buttonClass continueStepButton"
              title="Continue"
              icon={<FaArrowRight />}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </StepHandler>
  );
};

export default React.memo(MoreDetails);
