import { isEmpty } from "c/p0Funcs";

const JUMP_STATE_KEY = "__jumpingState";

export const inSession = (id) => {
  // if (isEmpty(id)) {
  //   throw new Error("Session Segment ID cannot be empty");
  // }
  const prefix = isEmpty(id) ? `seg.shared.` : `seg.${id}.`;
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
    saveJumpingState: (value) => {
      sessionStorage.setItem(
        `${prefix}` + JUMP_STATE_KEY,
        JSON.stringify(value)
      );
    },
    getAndDeleteJumpingState: () => {
      const item = sessionStorage.getItem(`${prefix}` + JUMP_STATE_KEY);
      sessionStorage.removeItem(JUMP_STATE_KEY);
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
