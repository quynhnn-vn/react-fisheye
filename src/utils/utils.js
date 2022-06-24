export const getIDPhotoSource = (name) => {
  const idPhoto = require(`assets/photos/Photographers ID Photos/${name.replace(
    /[\W_]/g,
    ""
  )}.jpg`);
  return idPhoto;
};

export const getPhotoOrVideoSource = (source) => {
  const photo = require(`assets/photos/${source}`);
  return photo || "/";
};

export const sortMedia = (data, filterBy) => {
  return data.sort((a, b) => {
    if (filterBy === "likes") return b.likes - a.likes;
    else if (filterBy === "date") return new Date(b.date) - new Date(a.date);
    else return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  });
};

export const validEmailRegex = RegExp(/.+@.+\..+/);

export const validateForm = (error) => {
  let valid = true;
  Object.values(error).forEach(
    (val) => (val === null || val.length > 0) && (valid = false)
  );
  return valid;
};
