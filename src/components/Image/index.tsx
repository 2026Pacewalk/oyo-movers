"use client";

import { CSSProperties, FC, MouseEventHandler } from "react";
import "./image.scss";
import ImageBox from "next/image";

interface ImageProps {
  src: string;
  alt?: string;
  sizes?: string;
  style?: CSSProperties | undefined;
  className?: string;
  id?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
const Image: FC<ImageProps> = ({ src, alt = "image-alt", sizes, style, className,id, onClick }) => {
  
  return (
    <div id={id} className={`nextImage ${className ? className : ""}`} onClick={onClick}  style={style} >
      <ImageBox src={src} alt={alt} fill={true} sizes={sizes ||"20"}/>
    </div>
  );
};

export default Image;
