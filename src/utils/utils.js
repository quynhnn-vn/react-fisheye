export const getIDPhotoSource = (name) => {
  const idPhoto = require(`assets/photos/Photographers ID Photos/${name.replace(
    /[\W_]/g,
    ""
  )}.jpg`);
  return idPhoto;
};

export const getPhotoOrVideoSource = (source) => {
  const photo = require(`assets/photos/${source}`);
  return photo;
};
