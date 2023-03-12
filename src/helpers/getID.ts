export const getID = (urlString: string) => {
  const splitedUrl = urlString.split("/");

  return splitedUrl[splitedUrl.length - 2];
};
