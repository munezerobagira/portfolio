const title = document.getElementById("pageTitle");
const submitButton = document.getElementById("submitBtn");

const postSchema = {
  title: "string[2]",
  categories: "string[4]",
  summary: "string[5]",
  post: "string[5]",
  content: "string[5], required",
  featured: "boolean",
  published: "boolean",
};

//check if there is an id
const stringQuery = window.location.search;
const searchParams = new URLSearchParams(stringQuery);
const id = searchParams.get("id");

const getFormDataFromObject = (object) =>
  new Promise((resolve) => {
    const formData = new FormData();
    for (let key in object) {
      formData.append(key, object[key]);
    }
    const image = document.getElementById("image").files[0];
    if (image) formData.append("image", image);
    resolve(formData);
  });

const deletePost = async (id, element) => {
  // handle delete click event
  element.setAttribute("disabled", true);
  const sure = confirm(
    `Are you sure you want to delete a post with id  ${id} `
  );
  if (!sure) {
    element.removeAttribute("disabled");
    return false;
  }
  const response = await apiRequest.delete(`/articles/${id}`).send({});
  if (response.status == 200) {
    toast("Your post has been deleted sucessfull");
    return window.location.reload();
  }
  removeAttribute("disabled");
};

const getPosts = async () => {
  const posts = document.getElementById("posts");
  const response = await apiRequest
    .get("articles?published=false&count=10")
    .send({});
  if (response.status == 200) {
    articles = response.body.articles;
    if (!articles.length) {
      posts.innerHTML = "<h1>No articles were found</h1>";
    }
    posts.innerHTML = articles.reduce(
      (currentPosts, post) =>
        (currentPosts += `
        <div class="card">
              <div class="card-image">
                <a href="/pages/admin/posts/form/index.html?id=${post._id}">
                  <img src="${post.image.path}" alt="Typing speed" />
                </a>
              </div>
              <div class="text-container">
                <h4>${post.title}</h4>
                <p>
                  ${
                    post.summary.length > 100
                      ? post.summary.slice(0, 50)
                      : post.summary
                  }
                </p>
                <div class="tags">
                  ${post.categories.reduce(
                    (iterator, category) =>
                      (iterator += "<span>" + category.title + "</span>"),
                    ""
                  )}
                </div>
                <div>
                  <button class="button-primary-inverse">
                    <a href="/pages/admin/posts/form/index.html?id=${
                      post._id
                    }">Edit</a>
                  </button>
                  <button class="button-danger" onclick="deletePost('${
                    post._id
                  }', this);">Delete</button>
                </div>
              </div>
            </div>

    `),
      ""
    );
  } else {
    posts.innerHTML = "";
    return (featuredPostContainer.innerHTML = `<h1 class="color-primary">Uknown error occured/h1>`);
  }
};

const createPost = async (data, clearForm) => {
  submitButton.setAttribute("disabled", true);
  const userData = await getFormDataFromObject(data);
  for (var key of userData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }
  //Make sure that no content-type is sent browser handles it
  delete apiRequest["Content-Type"];
  const response = await apiRequest
    .setHeaders({
      accept: "application/json",
    })
    .post("/articles")
    .send({ formData: userData });

  if (response.status == 201) {
    toast("You have successfuly created a post");
    submitButton.removeAttribute("disabled");
    clearForm();
  } else {
    submitButton.setAttribute("disabled", true);
    if (response.status == 400 || response.status == 400) {
      const { error, errors } = response.body;
      toast(JSON.stringify(error || errors));
    }
  }
};

const updatePost = async (data, clearForm) => {
  document.getElementById("submitBtn").setAttribute("disabled", true);
  const userData = await getFormDataFromObject(data);

  delete apiRequest["Content-type"];
  const response = await apiRequest
    .patch(`/articles/${id}`)
    .send({ formData: userData });

  if (response.status == 200) {
    toast("Your post has been updated");
    submitButton.removeAttribute("disabled");
    clearForm();
    window.location.href = "/pages/admin/posts";
  } else {
    submitButton.removeAttribute("disabled");
    if (response.status == 400) {
      const { error, errors } = response.body;
      toast(JSON.stringify(error || errors));
    }
  }
};
const handleUpdatePost = async () => {
  const form = document.getElementById("postForm");
  title.textContent = "Edit post";
  submitButton.textContent = "Edit post";

  // fetch the articles
  const response = await apiRequest.get(`articles/${id}`).send({});
  if (response.status == 200) {
    const { article } = response.body;

    // join the categories object
    if (article.categories)
      article.categories = article.categories
        .map((category) => category.title)
        .join();

    //add the data to the form
    for (let key in article) {
      if (form[key] && form[key].type != "file") form[key].value = article[key];
      if (form[key] && form[key].type == "file") {
        form[
          key
        ].parentNode.innerHTML += `<div class="card"><img src="${article.image.path}"></div>`;
      }
    }

    withForm("postForm", postSchema, updatePost);
  } else {
    form.textContent = "Sorry the post is not found";
  }
};
if (window.location.href.includes("/posts/form/")) {
  if (id) {
    handleUpdatePost();
  } else {
    withForm("postForm", postSchema, createPost);
  }
} else {
  getPosts();
}

