"use client";

import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget uploadPreset="rae-blog" onUpload={onUpload}>
      {({ open }) => {
        return (
          <button onClick={() => open()}>Upload an image</button>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
