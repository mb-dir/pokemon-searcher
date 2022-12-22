export const getID = urlString => {
  const splitedUrl = urlString.split("/");

  return splitedUrl[splitedUrl.length - 2];
};
