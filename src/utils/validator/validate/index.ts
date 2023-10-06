import separator from "./ruleSeparator";
import validateFunctions from "./validateFunctions";
export default function validate(schema: object, object: object) {
  // return new Promise((resolve, reject) => {
  const objectSchema = {};
  let errors: object | undefined = {};
  let validated: object = {};
  //split the rules and validate schema
  for (let key in schema) {
    for (let rule of schema[key].split(",")) {
      let result = separator(rule);
      if (!validateFunctions.checkType(result.type))
        throw new Error(`${result.type} type is not supported`);
    }
    objectSchema[key] = {
      rules: schema[key].split(","),
    };
  }
  //valitate the rules
  for (let key in object) {
    if (objectSchema[key]) {
      errors[key] = [];
      for (let rule of objectSchema[key].rules) {
        let ruleObject = separator(rule);
        let validateResult;
        if (ruleObject.type !== "reference") {
          validateResult = validateFunctions[ruleObject.type](
            object[key],
            ruleObject.min,
            ruleObject.max
          );
        } else {
          validateResult = validateFunctions[ruleObject.type](
            object[key],
            object[ruleObject.reference]
          );
        }
        if (validateResult.errors) {
          errors[key].push(...validateResult.errors);
          break;
        } else validated[key] = validateResult.value;
      }
      if (!errors[key].length) delete errors[key];
    }
  }
  if (Object.keys(errors).length) {
    return { errors };
  }
  return { value: validated };
  // });
}

