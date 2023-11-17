"use client";

const PreviewImage = (event: any) => {
  const selectedFiles = event.target.files;
  const selectFilesArray = Array.from(selectedFiles);
  const imagesArray = selectFilesArray.map((file: any) => {
    return URL.createObjectURL(file);
  });
  return imagesArray;
};

export default PreviewImage;
