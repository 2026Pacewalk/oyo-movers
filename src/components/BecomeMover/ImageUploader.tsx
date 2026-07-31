import React, { FC, useRef, useState } from "react";
import Image from "../Image";
import ImageUploader from "../UploadImage";
import { errorToast } from "@/lib/toaster";

interface IImagesUpload {
  handelUpload: (key: string) => void;
  handelRemove: (key: string) => void;
  title: string;
  subtitle?: string;
  token?: string;
}

const ImagesUpload: FC<IImagesUpload> = ({ handelUpload, handelRemove, title, subtitle,token }) => {
  
  const fileInputRef = useRef<any>();
  const [images, setImages] = useState<any>();
  const [uploadFiles, setUploadFiles] = useState<number>(0);

  const handleFileUpload = (files: any) => {

    const filesData = Array.from(files);
    
    if (filesData?.length) {
      const totalUploadFileSize: any = filesData?.reduce((acc: any, curr: any) => acc.size + curr.size);
      const totalSize = (totalUploadFileSize?.size || totalUploadFileSize) + uploadFiles;

      if (totalSize > 20971520) {
        errorToast("Max 20 MB File");
        return;
      }
      setUploadFiles((prev: any) => prev + (totalUploadFileSize?.size || totalUploadFileSize));
      setImages(filesData);
    }
  };

  return (
    <ImageUploader
      uploadImages={images}
      setFieldValue={handelUpload}
      removeItemImages={handelRemove}
      uploadClass="uploadInnerContent"
      mover="mover"
      token={token}
    >
      <div className="uploadSection">
        <Image
          src="upload.svg"
          id="file"
          className="uploadfile"
          onClick={() => fileInputRef.current?.click()}
          alt="upload"
        />
        <h4 className="text-center my-2">{title}</h4>
        <input
          hidden
          ref={fileInputRef}
          type="file"
          multiple={true}
         accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,application/pdf"
          onChange={(e) => {
            handleFileUpload(e?.target?.files);
          }}
        />
        <span className="justify-content-center d-flex">{subtitle}</span>
      </div>
    </ImageUploader>
  );
};

export default ImagesUpload;