export const response = (res, data, code = 200) => {
  res
    .status(code)
    .send({ ...data, statusCode: code, timestamp: new Date().toJSON() });
};
