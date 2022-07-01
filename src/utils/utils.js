/**
 * Get the imported source of a profile photo
 * @param {string} name
 * @returns profile photo
 */
export const getIDPhotoSource = (name) => {
  const idPhoto = require(`assets/photos/Photographers ID Photos/${name.replace(
    /[\W_]/g,
    ""
  )}.jpg`);
  return idPhoto;
};

/**
 * Get the imported source of a photo or video
 * @param {string} source
 * @returns photo or video source
 */
export const getPhotoOrVideoSource = (source) => {
  const photo = require(`assets/photos/${source}`);
  return photo || "/";
};

/**
 * Sort an array of media by a criteria
 * @param {[object]} data
 * @param {string} sortBy
 * @returns array of media
 */
export const sortMedia = (data, sortBy) => {
  return data.sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    else if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    else return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  });
};

// Accepted regex of an email address
export const validEmailRegex = RegExp(/.+@.+\..+/);

/**
 * Check the validation of a form
 * @param {object} error
 * @returns true if valid, false if not
 */
export const validateForm = (error) => {
  let valid = true;
  Object.values(error).forEach(
    (val) => (val === null || val.length > 0) && (valid = false)
  );
  return valid;
};

// Option for sorting option
export const sortOptions = [
  {
    value: "likes",
    title: "Popularité",
  },
  {
    value: "date",
    title: "Date",
  },
  {
    value: "title",
    title: "Titre",
  },
];
