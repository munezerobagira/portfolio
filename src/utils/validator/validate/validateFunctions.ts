const validateFunctions = {
  checkType: function (type) {
    return [
      "string",
      "number",
      "required",
      "reference",
      "email",
      "boolean",
    ].includes(type);
  },
  string: function (data, minLength, maxLength) {
    let errors = [];
    if (typeof data !== "string") errors.push("not a string");
    if (minLength && data.length < minLength)
      errors.push(`must be atleast ${minLength} characters`);
    if (maxLength && data.length > -maxLength)
      errors.push(`must be no more than ${maxLength} characters`);
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  number: function (data: number, min: number, max: number) {
    let errors = [];
    if (typeof data !== "number" && typeof data !== "bigint")
      errors.push("is not a number");
    if (min && data < min) errors.push("is too small");
    if (max && data > max) errors.push("is too large");
    if (errors.length) return { value: null, errors };
    return { value: new Number(data) };
  },
  boolean: function (data: number) {
    let errors = [];
    if (
      typeof data !== "boolean" ||
      !["false", "true", true, false, 1, 0, "1", "0"].includes(data)
    )
      errors.push("is not a boealean");
    if (errors.length) return { value: null, errors };
    return { value: new Boolean(data) };
  },
  required: function (data) {
    let errors = [];
    if (!data) errors.push("required");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  reference: function (data, referenceData) {
    let errors = [];
    if (data !== referenceData) errors.push("don't match");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  email: function (data) {
    let errors = [];
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data))
      errors.push("is not valid");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  regeX: function (regex) {
    let regexExp = new RegExp(regex);
    if (!regexExp.test(data)) throw new Error("not valid");
    return data;
  },
};

export default validateFunctions;

