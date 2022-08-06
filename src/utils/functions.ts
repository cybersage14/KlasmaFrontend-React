export const showFirstLetters = (str: string, lengthToShow: number) => {
  if (str.length <= lengthToShow) {
    return str;
  } else {
    return str.slice(0, lengthToShow) + "...";
  }
};
