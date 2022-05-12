export const postImage = async (id, image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
  formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  formData.append("public_id", id);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return res.json();
};
