function validate(schema, object) {
  // return new Promise((resolve, reject) => {
  this.objectSchema = {};
  let errors = {};
  let validated = {};
  for (let key in schema) {
    this.objectSchema[key] = {
      rules: schema[key].split(","),
    };
  }
  for (let key in object) {
    if (this.objectSchema[key]) {
      errors[key] = [];
      for (let rule of this.objectSchema[key].rules) {
        let result = separator(rule);
        if (validateFunctions.checkType(result.type)) {
          let valid;
          if (result.type !== "reference") {
            valid = validateFunctions[result.type](
              object[key],
              result.min,
              result.max
            );
          } else {
            valid = validateFunctions[result.type](
              object[key],
              object[result.reference]
            );
          }
          if (valid.errors) {
            errors[key].push(...valid.errors);
            break;
          } else validated[key] = valid.value;
        } else {
          throw new Error("invalid schema");
        }
      }
      if (!errors[key].length) delete errors[key];
    }
  }
  if (Object.keys(errors).length) {
    return { value: null, errors };
  }
  return { value: validated };
  // });
}

function withForm(target, schema, onSuccess) {
  let form = document.querySelector(`#${target}`);
  console.log(form);

  if (!form) return console.log(`form with id ${target}  not found`);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let object = {};
    for (let key in schema) {
      if (form[key]) {
        object[key] = form[key].value;
        // object[element].element = form[key].value;
      }
    }
    let result = validate(schema, object);
    if (result.errors && Object.keys(result.errors).length) {
      for (let errorKey in result.errors) {
        appendFor(form[errorKey], result.errors[errorKey], errorKey);
      }
    } else {
      for (let key in schema) {
        if (form[key]) {
          form[key].classList.remove("error");
          form[key].value = "";
          // object[element].element = form[key].value;
        }
      }
      return onSuccess(result.value);
    }
  });
}
function appendFor(target, error, errorKey, classList = [], timeout = 6000) {
  if (!target) return "";
  target.classList.add("error");
  let errorElement = document.getElementById(`error-${errorKey}`);
  if (errorElement) errorElement.textContent;
  else errorElement = document.createElement("div");
  errorElement.textContent = errorKey + " " + error;
  errorElement.id = `error-${errorKey}`;
  errorElement.classList.add("error-box");
  target.parentNode.append(errorElement);
  setTimeout(() => {
    errorElement.textContent = "";
    target.classList.remove("error");
  }, timeout);
}

function separator(rule) {
  let result = {};
  if (!rule || !rule.includes("[")) {
    result.type = rule.toLowerCase().replace(/[^a-z]/g, "");
    return result;
  }
  rule = rule.replace(/\s/g, "");
  let type = rule
    .slice(0, rule.indexOf("["))
    .replace(/[^a-z]/g, "")
    .trim();
  result.type = type;
  rule = rule.slice(rule.indexOf("[")).trim();
  const regex = /\[(\d*\:*\d*)\]/;
  if (rule && regex.test(rule)) {
    if (rule.includes(":")) {
      let [min, max] = rule
        .replace(/[\[\]\:]/g, " ")
        .trim()
        .split(" ");
      if (max < min) {
        let temp = max;
        max = min;
        min = temp;
      }
      if (!isNaN(max)) {
        result.min = parseInt(min);
        result.max = parseInt(max);
      } else {
        result.max = parseInt(min);
      }

      return result;
    }
    let min = rule.replace(/[\[\]\:]/g, " ").trim();
    result.min = parseInt(min);
    return result;
  } else if (rule && /\[(\w*)\]/.test(rule)) {
    let reference = rule.replace(/[\[\]]/g, " ").trim();
    result.reference = reference;
  }
  return result;
}
const validateFunctions = {
  checkType: function (type) {
    return ["string", "number", "required", "reference"].includes(type);
  },
  string: function (data, minLength, maxLength) {
    let errors = [];
    if (typeof data !== "string") errors.push("not a string");
    if (minLength && data.length < minLength) errors.push("too short");
    if (maxLength && data.length > -maxLength) errors.push("too long");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  number: function (data, minLength, maxLength) {
    let errors = [];
    if (typeof data !== "number" && typeof data !== "bigint")
      errors.push("is not a number");
    if (minLength && data < minLength) errors.push("is too small");
    if (maxLength && data > maxLength) errors.push("is too large");
    if (errors.length) return { value: null, errors };
    return { value: new Numberdata() };
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
  // regeX: function (regex) {
  //   let regexExp = new RegExp(regex);
  //   if (!regexExp.test(data)) throw new Error("not valid");
  //   return data;
  // },
};

// const schema = {
//   fname: "string",
//   lname: "string[2]",
//   size: "number[2]",
// };

// console.log(validate(schema, { fname: "1", lname: "ok", size: 2 }));
