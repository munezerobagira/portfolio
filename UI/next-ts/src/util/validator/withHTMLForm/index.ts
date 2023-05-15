import { validate } from "..";
import appendFor from "./appendError";

export default function withHTMLForm(targetID: string, schema, onSuccess) {
  let form = document.querySelector(`#${targetID}`);
  if (!form) return console.log(`form with id ${targetID}  not found`);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let object = {};
    for (let key in schema) {
      if (form[key]) {
        object[key] = form[key].value;
        form[key].classList.add("success");
      }
    }
    let result = validate(schema, object);
    if (result.errors && Object.keys(result.errors).length) {
      for (let errorKey in result.errors) {
        appendFor(form[errorKey], result.errors[errorKey], errorKey);
      }
    } else {
      const clearForm = () => {
        for (let key in schema) {
          if (form[key]) {
            form[key].classList.remove("error");
            form[key].classList.remove("success");
            form[key].value = "";
            // object[element].element = form[key].value;
          }
        }
      };
      return onSuccess(result.value, clearForm);
    }
  });
}

