import { IconImage } from "@/components/icons";
import PreviewImage from "@/components/imagePreview/useDisplayImage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  setImages: React.Dispatch<React.SetStateAction<any>>;
  imageBase?: any;
  imagesUpload?: any;
}
const ImageComponent = ({ imageBase, imagesUpload, setImages }: IProps) => {
  const [imagesData, setImagesData] = useState<any[]>(imageBase);
  const [uploadData, setUploadData] = useState<any>(imagesUpload);
  const imageInput = useRef(null);
  useEffect(() => {
    return () => {
      imagesData && imagesData.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [imagesData]);
  const addImage = (images: any, e: any) => {
    if (images.length <= 5) {
      images.forEach((image: any) => {
        setImagesData((prevImagesData: any) => [...prevImagesData, image]);
      });
      const filesArray = [];
      if (e.length > 1) {
        for (let i = 0; i < e.length; i++) {
          filesArray.push(e[i]);
        }
        filesArray.forEach((image: any) => {
          setImages((prevImagesData: any) => [...prevImagesData, image]);
        });
      } else {
        setImages(e);
      }
    }
    // setImages((prevImagesData: any) => [...prevImagesData, image]);
  };
  const removeImage = (index: any, itemFile: any) => {
    const newArr = [...imagesData];
    const newUploadArr = [...uploadData];
    const resultUpload = newUploadArr.filter((item) => item != itemFile);
    newArr.splice(index, 1);
    setImagesData(newArr);

    setImages(resultUpload);
  };
  useEffect(() => {}, [imagesData]);
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
          addImage(images, e.target.files);
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
                  src={image.url || image}
                  alt="houseImage.png"
                  className="object-cover absolute"
                ></Image>
                <span
                  onClick={() => removeImage(index, image)}
                  className="absolute font-bold px-2 py-1 text-xs translate-x-3 cursor-pointer -translate-y-2 rounded-full top-0 right-0 bg-white"
                >
                  X
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageComponent;
