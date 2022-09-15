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

export const showFirstLetters = (str: string, lengthToShow: number): string => {
  if (str.length <= lengthToShow) {
    return str;
  } else {
    return str.slice(0, lengthToShow) + "...";
  }
};

export const fetchFirstLettersFromName = (name: string): string => {
  name = name.toUpperCase();
  const splitName = name.split(" ");

  if (splitName.length > 1) {
    return `${splitName[0][0]}${splitName[1][0]}`;
  } else {
    return `${splitName[0][0]}${splitName[0][1]}`;
  }
};

export const getAccountPageNameFromPath = (path: string): string => {
  let pathNames = path.split("/");
  if (pathNames.length > 0) {
    return pathNames[pathNames.length - 1];
  } else {
    return "";
  }
};

export const generateUniqueFileName = (fileName: string): string => {
  let fileExtension = fileName.split(".")[1];
  return `${uuidv4()}.${fileExtension}`;
};

// export const getVisibleDateTime = (datetime: string) => {
//   const dateTimeArr = datetime.split("T");
//   const date = dateTimeArr[0];
//   const time = dateTimeArr[1].split(".")[0].slice(0, 5);
//   return `${date} ${time}`;
// };

export const getVisibleDateTime = (datetime: Date): string => {
  let date = datetime.toDateString();
  let time = datetime.toTimeString();
  let _time = `${time.split(":")[0]}:${time.split(":")[1]}`;
  let _date = `${date.split(" ")[1]} ${date.split(" ")[2]}, ${
    date.split(" ")[3]
  }`;
  return `${_time} ${_date}`;
};

export const convertTimeForClientTimezone = (date: string | Date): Date => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: clientTimezone
    })
  );
};

export const getIndexesOfBlobs = (urls: Array<string>): Array<number> => {
  let indexes = [];
  for (let i = 0; i < urls.length; i += 1) {
    if (urls[i].slice(0, 4) === "blob") {
      indexes.push(i);
    }
  }
  return indexes;
};
