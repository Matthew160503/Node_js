function checkParams(schema) {
  return (req, res, next) => {
    const ValidationResult = schema.validate(req.params);
    if (ValidationResult.error) {
      return res.status(400).send(ValidationResult.error.details);
    }
    next();
  };
}

function checkBody(schema) {
  return (req, res, next) => {
    const ValidationResult = schema.validate(req.body);
    if (ValidationResult.error) {
      return res.status(400).send(ValidationResult.error.details);
    }
    next();
  };
}

module.exports = { checkParams, checkBody };
