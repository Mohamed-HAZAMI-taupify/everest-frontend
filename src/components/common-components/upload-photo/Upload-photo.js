import React, { useRef } from "react";
const UploadPhoto = (props) => {
  const imageUploader = useRef(null);
  const { uploadedImage, onChangeImage, firstImageSrc } = props;
  return (
    <div className="block-image">
      <input
        className="input-image"
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        ref={imageUploader}
      />
      <div
        className="image-container-bordered"
        onClick={() => imageUploader.current.click()}
      >
        <img
          className="image-fetch"
          src={firstImageSrc}
          ref={uploadedImage}
        />
      </div>
    </div>
  );
};

export default UploadPhoto;