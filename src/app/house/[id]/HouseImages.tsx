import Image from "next/image";
import React from "react";
import styles from "@/styles/HouseDetail.module.css";
const HouseImages = ({ imageData }: any) => {
  return (
    <div className={`${styles.imageLayoutHouse} `}>
      <div
        className={`${styles.imageItem} h-full relative col-start-1 col-end-3 row-start-1 row-end-3`}
      >
        <Image
          src={imageData[0]?.url}
          alt="House.png"
          className="object-cover w-full h-full rounded-tl-xl rounded-bl-xl"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={`${styles.layoutModal}`}></div>
      </div>
      <div
        className={`${styles.imageItem} h-full relative col-start-3 col-end-4 row-start-1 row-end-2`}
      >
        <Image
          src={imageData[1]?.url}
          alt="House.png"
          className="object-cover w-full h-full "
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={`${styles.layoutModal}`}></div>
      </div>
      <div
        className={
          "${styles.imageItem} h-full relative col-start-4 col-end-5 row-start-1 row-end-2"
        }
      >
        <Image
          src={imageData[2]?.url}
          alt="House.png"
          className="object-cover w-full h-full rounded-tr-xl"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={`${styles.layoutModal}`}></div>
      </div>
      <div
        className={`${styles.imageItem} h-full relative -col-start-3 -col-end-2 -row-start-2 -row-end-1`}
      >
        <Image
          src={imageData[3]?.url}
          alt="House.png"
          className="object-cover w-full h-full "
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={`${styles.layoutModal}`}></div>
      </div>
      <div
        className={`${styles.imageItem} h-full relative -col-start-2 -col-end-1 -row-start-2 -row-end-1`}
      >
        <Image
          src={imageData[4]?.url}
          alt="House.png"
          className="object-cover w-full h-full rounded-br-xl"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={`${styles.layoutModal}`}></div>
      </div>
    </div>
  );
};

export default HouseImages;
