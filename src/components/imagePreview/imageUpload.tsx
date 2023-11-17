import React from "react";

const imageUpload = async (images: Array<any>) => {
  let imgArr: { url: string }[] = [];
  const requests = images.map(async (item) => {
    if (item.url) return item;
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", "p2gg02j0");
    formData.append("cloud_name", "drh6mymgj");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drh6mymgj/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return { url: data.secure_url };
  });

  const promiseAllResult = await Promise.all(requests);
  imgArr = promiseAllResult.map((i) => i);
  return imgArr;
};

export default imageUpload;
