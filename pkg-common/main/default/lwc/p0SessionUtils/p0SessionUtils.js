import { isEmpty } from "c/p0Funcs";

export const inSession = (id) => {
  if (isEmpty(id)) {
    throw new Error("Session Segment ID cannot be empty");
  }
  const prefix = `seg.${id}.`;
  return {
    saveSimpleState: (key, value) => {
      sessionStorage.setItem(`${prefix}${key}`, value);
    },
    saveObjectState: (key, value) => {
      sessionStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
    },
    getSimpleState: (key) => {
      return sessionStorage.getItem(`${prefix}${key}`);
    },
    getObjectState: (key) => {
      const item = sessionStorage.getItem(`${prefix}${key}`);
      return item ? JSON.parse(item) : null;
    },
    removeState: (key) => {
      sessionStorage.removeItem(`${prefix}${key}`);
    },
    getAndDeleteSimpleState: (key) => {
      const ret = sessionStorage.getItem(`${prefix}${key}`);
      sessionStorage.removeItem(`${prefix}${key}`);
      return ret;
    },
    getAndDeleteObjectState: (key) => {
      const item = sessionStorage.getItem(`${prefix}${key}`);
      sessionStorage.removeItem(`${prefix}${key}`);
      return item ? JSON.parse(item) : null;
    },
    clearSession: () => {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };
};
