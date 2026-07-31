import React, { useEffect, useMemo, useRef, useState } from "react";
import { UploadImage, deleteImage } from "@/lib/serverAction";
import "./upload.scss";
import IconButton from "../IconButton";
import { RxCross2 } from "react-icons/rx";
import Image from "../Image";
import { errorToast } from "@/lib/toaster";

const ImageUploader = ({
  children,
  uploadImages,
  setFieldValue,
  removeItemImages,
  profile = false,
  img,
  uploadClass,
  mover = "",
  token,
}: any) => {
  const [imagePreview, setImagePreview] = useState<
    { img: string; key: string }[]
  >([]);
  const fileInputRef = useRef<any>();

  // useEffect(() => {
  //   // if (uploadImages?.length > 0) {
  //   //   debugger;
  //   //   const filesArray = uploadImages;
  //   //   if (!filesArray?.length) return;

  //   //   const uploadPromises = Promise.all(
  //   //     filesArray?.map(async (filesOfType: any) => {
  //   //       return await uploadImage(filesOfType);
  //   //     })
  //   //   );
  //   //   uploadPromises.then((res) => {
  //   //     setFieldValue(res);
  //   //   });
  //   // }
  //   // checkImageForUpload();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [uploadImages]);



  useEffect(() => {
    if (img?.src && !imagePreview?.length) {
      setImagePreview([{ img: img.src, key: img.key }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img?.src]);

  const uploadImage = async (file: any) => {
    const fileName = file.name.split(".");
    const imageFormat = fileName[fileName.length - 1];
    if (
      imageFormat === "png" ||
      imageFormat === "jpg" ||
      imageFormat === "jpeg" ||
      imageFormat === "PNG" ||
      imageFormat === "JPG" ||
      imageFormat === "JPEG" ||
      imageFormat === "pdf"
    ) {
      const reader: any = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
      }
      const res = await UploadImage(
        {
          key: file?.name.split(".")[0],
          fileType: file?.type,
          token,
        },
        mover
      );

      if (res?.status === 200) {
        setImagePreview((e) => [
          ...e,
          { img: reader?.result, key: res?.data?.key },
        ]);
        const s3 = await fetch(res?.data?.url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": "multipart/form-data" },
        });

        return res?.data?.key;
      } else {
        errorToast("Error to upload image");
      }

      reader.readAsDataURL(file);
    } else {
      errorToast("Only .png, .jpg, .pdf, .jpeg image formats supported.");
    }
  };

  const checkImageForUpload = useMemo(() => {
    if (uploadImages?.length > 0) {
      const filesArray = uploadImages;
      if (!filesArray?.length) return;

      const uploadPromises = Promise.all(
        filesArray?.map(async (filesOfType: any) => {
          return await uploadImage(filesOfType);
        })
      );
      uploadPromises.then((res) => {
        setFieldValue(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadImages])

  const handelRemoveClick = (index: number, key: string) => {
    const newImages = [...imagePreview];
    newImages.splice(index, 1);
    setImagePreview(newImages);
    !profile && removeItemImages(key);
    deleteImage(key, token);
    profile && setFieldValue("imgKey", "");
    profile && setFieldValue("imgSrc", "");
  };

  const previewImage = (e: any) => {
    const filesArray = Array.from(e.target.files);

    uploadImage(filesArray[0]).then((res: any) => {
      setFieldValue("imgKey", res);
    });
  };
  return (
    <>
      {children}
      {imagePreview?.length ? (
        <div className={profile ? "d-flex" : "uploadGroupImg"}>
          <div className="d-flex gap-3 pb-2">
            {imagePreview?.map((item: any, index: any) => {
              const isPdf = item?.key?.split(".")[1] === "pdf";

              return (
                <div
                  className={`uploadWrapper ${profile ? "" : ""
                    } ${uploadClass}`}
                  key={`image-preview-${index}`}
                >
                  <Image
                    src={isPdf ? "/images/defaultPdf.png" : item?.img}
                    className="prevImage"
                    alt="Image Preview"
                  />
                  <IconButton
                    iconPosition="left"
                    icon={<RxCross2 />}
                    onClick={() => handelRemoveClick(index, item?.key)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <div>
        {profile && !imagePreview.length && (
          <div
            className="uploadWrapper"
            onClick={() => fileInputRef.current?.click()}
          >
            <div id="file" className="uploadfile">
              <Image src={"upload.svg"} alt="upload" />
            </div>
            <h4 className="text-center">Upload Image</h4>
            <input
              hidden
              ref={fileInputRef}
              type="file"
              name="file"
              multiple={!profile}
              accept="image/*,.pdf,.heic,.heif"
              onChange={previewImage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(ImageUploader);
