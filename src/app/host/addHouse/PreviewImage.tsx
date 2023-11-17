import { IconImage } from "@/components/icons";
import PreviewImage from "@/components/imagePreview/useDisplayImage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  setImages: React.Dispatch<React.SetStateAction<any>>;
}
const ImageComponent = ({ setImages }: IProps) => {
  const [imagesData, setImagesData] = useState<any>("");
  const imageInput = useRef(null);
  useEffect(() => {
    return () => {
      imagesData && URL.revokeObjectURL(imagesData);
    };
  }, [imagesData]);
  return (
    <div className="w-full p-3 flex justify-center flex-col items-center h-[400px] border-[1px] border-gray-300 rounded-lg bg-white">
      <input
        ref={imageInput}
        type="file"
        name="images"
        multiple
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={(e) => {
          const images = PreviewImage(e);
          setImagesData(images);
          setImages(e.target.files);
        }}
      />
      <div
        onClick={() => imageInput?.current.click()}
        className="w-[200px] cursor-pointer h-[200px] flex  justify-center items-center flex-col text-center bg-white border-gray-300 border-[1px] rounded-xl"
      >
        <IconImage className="h-[70px] w-full"></IconImage>
        <span className="text-sm font-bold text-gray-500">Thêm vào 5 ảnh</span>
      </div>
      <div className="max-w-[650px] w-full h-[100px] flex gap-x-3 mt-4 p-2 border-[1px] border-gray-300 rounded-lg">
        {imagesData &&
          imagesData.map((image: any, index: any) => {
            return (
              <div key={index} className="max-w-[120px] w-full h-full relative">
                <Image
                  fill
                  src={image}
                  alt="houseImage.png"
                  className="object-cover absolute"
                ></Image>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageComponent;
