let title = document.getElementById("pageTitle");
let submitButton = document.getElementById("submitBtn");

let postSchema = {
  title: "string[2]",
  tags: "string[4]",
  summary: "string[5]",
  post: "string[5]",
  featured: "boolean",
};

const stringQuery = window.location.search;
const searchParams = new URLSearchParams(stringQuery);
const id = searchParams.get("id");

if (id) {
  title.textContent = "Edit post";
  submitButton.textContent = "Edit post";
}

function onSuccess(data) {
  console.log(data);
}

withForm("postForm", postSchema, onSuccess);
