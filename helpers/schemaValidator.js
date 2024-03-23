module.exports.schemaValidator = async (dataToValidate, resourceSchema) => {
  return new Promise(async (resolve, reject) => {
    try {
      // throws an error if not valid
      await resourceSchema.validate(dataToValidate);
      resolve({ status: true });
    } catch (e) {
      resolve({ status: false, error: e.errors.join(", ") });
    }
  });
};
