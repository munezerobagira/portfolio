const getPosts = async () => {
  const posts = document.getElementById("posts");
  const featuredPostContainer = document.getElementById("featured-post");
  const response = await apiRequest
    .get("articles?published=false&count=10")
    .send({});
  if (response.status == 200) {
    articles = response.body.articles;
    if (!articles.length) {
      posts.innerHTML = "";
      return (featuredPostContainer.innerHTML = `<h1 class="color-primary">Sorry we currently have no post</h1>`);
    }
    featuredPost = articles[0];
    featuredPostContainer.innerHTML = `<div class="image-container">
    <a href="post/index.html?id=${featuredPost._id}">
      <img
        src="${featuredPost.image.path}"
        alt="${featuredPost.title}"
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
    posts.innerHTML = articles.reduce(
      (currentPosts, post) =>
        (currentPosts += `
    <div class="card">
              <div class="card-image">
                <a href="post/index.html?id=${post._id}">
                  <img src="${post.image.path}" alt="Typing speed" />
                </a>
              </div>
              <div class="text-container">
                <h4>${post.title}</h4>
                <p>
                   ${
                     post.summary.length > 100
                       ? post.summary.slice(0, 50) + "  ..."
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
const getPost = async () => {
  const commentSchema = {
    comment: "string[5], required",
  };
  const postContainer = document.getElementById("post-main");
  const commentContainer = document.getElementById("comment-container");
  const stringQuery = window.location.search;
  const searchParams = new URLSearchParams(stringQuery);
  const id = searchParams.get("id");

  const addComment = async (data) => {
    const response = await apiRequest
      .setHeaders({ "Content-Type": "application/json" })
      .post(`articles/${id}/comment`)
      .send({ object: data });
    if (response.status == 201) {
      toast("You have successfull created the comment");
      window.location.reload();
    } else if (response.status == 401) {
      toast("You need to login");
    }
  };

  withForm("write-comment", commentSchema, addComment);
  const replyComment = async (id) => {
    const response = await apiRequest
      .post(`articles/comments/${id}/reply`)
      .send({});
    if (response.status == 200) {
      toast("You have successfull replied  the comment");
      window.location.reload();
    }
  };

  const response = await apiRequest.get(`articles/${id}`).send({});
  if (response.status == 200) {
    const { article } = response.body;
    postContainer.innerHTML = `<div class="main-content">
    <img
      src="${article.image.path}"
      alt="${article.title}"
      class="width-full"
    />
    <div class="text-container">
      <h2>${article.title}</h2>
      ${article.content}
    </div>
  </div>
  <aside class="post-details">
              <h5>
                Written by
                <a href="../../about/" class="silent">
                  <span class="color-primary">${article.author.name}</span>
                </a>
              </h5>
              <p><small>${new Date(
                article.createdAt
              ).toLocaleString()}</small></p>
        </aside>
  `;
    commentContainer.innerHTML += article.comments.reduce(
      (iterator, comment) => {
        return (iterator += `
        <div class="flex comment" level="1">
              <div class="flex comment-wrapper">
                <div class="flex comment-body" level="1">
                  <div class="flex comment-body-header">
                    <div class="user flex">
                      <i class="avatar">${comment.author.name[0]}</i>
                      <h5 class="name px-2">${comment.author.name}</h5>
                      <small class="px-2">${new Date(
                        comment.createdAt
                      ).toLocaleString()}</small>
                    </div>
                    <button class="silent button" onClick="replyComment('${
                      comment._id
                    }')">reply</button>
                  </div>
                  <p>
                  ${comment.comment}
                  </p>
                </div>
              </div>
            </div>
        `);
      },
      ""
    );
  }
  if (response.status == 400 || response.status == 404) {
    postContainer.innerHTML = `<h1>Post not found</h1>`;
  }
};
if (!window.location.href.includes("/blog/post")) getPosts();
else getPost();

