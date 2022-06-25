const createForm = (schema) => {
  return async (userData) => {
    return await schema.validate(userData, { abortEarly: true });
  };
};

module.exports.createForm = createForm;
