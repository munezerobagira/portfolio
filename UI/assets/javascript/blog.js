const posts = document.getElementById("posts");
const featuredPostContainer = document.getElementById("featured-post");
const getPosts = async () => {
  const response = await apiRequest.get("articles").send({});
  if (response.status == 200) {
    articles = response.body.articles;
    if (!articles.length) {
      posts.innerHTML = "";
      return (featuredPostContainer.innerHTML = `<h1 class="color-primary">Sorry we currently have no post</h1>`);
    }
    featuredPost = articles[0];
    featuredPostContainer.innerHTML += `<div class="image-container">
    <a href="post?id=${featuredPost._id}">
      <img
        src="#"
        alt="${featuredPostContainer[0]}"
        class="width-full"
      />
    </a>
  </div>

  <div class="text-container">
    <h2>${featuredPost.title}</h2>
    <p>
      ${featuredPost.summary}
    </p>
  </div>`;
  } else {
    posts.innerHTML = "";
    return (featuredPostContainer.innerHTML = `<h1 class="color-primary">Uknown error occured/h1>`);
  }
};
const getPost = async () => {
  const stringQuery = window.location.search;
  const searchParams = new URLSearchParams(stringQuery);
  const id = searchParams.get("id");
  const response = await apiRequest.get(`articles/${id}`).send({});
  console.log(response);
};
if (!window.location.href.includes("/blog/post")) getPosts();
else getPosts();

