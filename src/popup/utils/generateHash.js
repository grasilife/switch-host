import generateHash from "random-hash";
export const Hash = {
  create(length) {
    return generateHash({ length: length });
  }
};
