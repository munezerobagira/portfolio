const stringQuery = window.location.search;
const searchParams = new URLSearchParams(stringQuery);
const id = searchParams.get("id");
if (id) console.log(id);
let title = document.getElementById("pageTitle");
let submitButton = document.getElementById("submitBtn");

let projectSchema = {
  title: "string[2]",
  tags: "string[4]",
  summary: "string[5]",
  post: "string[5]",
  link: "string[5]",
  featured: "boolean",
};
if (id) {
  title.textContent = "Edit project";
  submitButton.textContent = "Edit project";
}

function onSuccess(data) {
  console.log(data);
}

withForm("projectForm", projectSchema, onSuccess);
