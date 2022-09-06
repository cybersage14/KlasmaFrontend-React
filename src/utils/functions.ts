import { v4 as uuidv4 } from "uuid";
import api from "./api";
import { STRING } from "./constants";

export const setItemOfLocalStorage = (name: string, data: string) => {
  if (typeof data === STRING) {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const getItemOfLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeItemOfLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const showFirstLetters = (str: string, lengthToShow: number) => {
  if (str.length <= lengthToShow) {
    return str;
  } else {
    return str.slice(0, lengthToShow) + "...";
  }
};

export const fetchFirstLettersFromName = (name: string) => {
  console.log(">>>> name => ", name);
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
};

export const getAccountPageNameFromPath = (path: string) => {
  let pathNames = path.split("/");
  if (pathNames.length > 0) {
    return pathNames[pathNames.length - 1];
  } else {
    return "";
  }
};

export const generateUniqueFileName = (fileName: string) => {
  let fileExtension = fileName.split(".")[1];
  return `${uuidv4()}.${fileExtension}`;
};
