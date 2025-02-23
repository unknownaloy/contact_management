export const response = (res, data, code = 200) => {
  res.status(code).send({ ...data, timestamp: new Date().toJSON() });
};
