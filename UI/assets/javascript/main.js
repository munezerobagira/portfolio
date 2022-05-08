window.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector("#toggler");
  const nav = document.querySelector("#navigation");
  const adminContent = document.querySelector("#admin-content");
  const sidebar = document.querySelector("#sidebar");
  if (toggler)
    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("height-0");
      nav.parentNode.classList.toggle("active");
      console.log(nav);
    });

  const sidebarToggler = document.querySelector("#sidebar-toggler");
  if (sidebarToggler)
    sidebarToggler.addEventListener("click", () => {
      sidebarToggler.parentElement.classList.toggle("active");
      adminContent.classList.toggle("active");
      sidebar.classList.toggle("active");
    });
});

const toast = function (description, timeOut = 3000) {
  let element = document.createElement("div");
  element.classList.add("toast");
  element.innerHTML = description;
  document.body.append(element);
  element.classList.add("animated-bottom");
  setTimeout(() => {
    document.body.removeChild(element);
  }, timeOut);
};
const storageDb = window.localStorage.getItem("sostene-protofolio");
class Storage {
  db = JSON.parse(window.localStorage.getItem("sostene-protofolio"));
  constructor() {
    if (!this.db) {
      let db = {
        user: {
          keywords: "",
          info: "",
          summary: "",
          about: "",
          profilePic: "",
          name: "",
          email: "",
          token: "",
          role: "",
          _id: "",
        },
        posts: [],
        projects: [],
        messages: [],
      };
      this.db = db;
      this.saveDb();
    }
  }
  async saveDb() {
    let stringfiedDb = JSON.stringify(this.db);
    window.localStorage.setItem("sostene-protofolio", stringfiedDb);
  }

  // async addPost({ title, categories, summary, image, content }) {
  //   this.db.posts.push({
  //     id: this.uniqueId(),
  //     title,
  //     categories,
  //     summary,
  //     image,
  //     content,
  //     published: false,
  //     featured: false,
  //     created: new Date().toLocaleString(),
  //     updatedAt: new Date().toLocaleString(),
  //   });
  //   this.saveDb();
  // }
  // async getPosts() {
  //   return this.db.posts;
  // }
  // async getPost(id) {
  //   return this.db.posts.find((post) => post.id === id);
  // }
  // async updatePost(
  //   id,
  //   { title, categories, summary, image, content, published, featured }
  // ) {
  //   const updatedPosts = this.db.posts.map((post) => {
  //     if (post.id === id) {
  //       if (summary) post.summary = summary;
  //       if (content) post.content = content;
  //       if (published) post.published = published;
  //       if (title) post.title = post.title;
  //       if (categories) post.categories = categories;
  //       if (image) post.image = image;
  //       if (featured) post.featured = featured;
  //       post.updatedAt = new Date().toLocaleString();
  //       return post;
  //     }

  //     return post;
  //   });
  //   this.db.posts = updatedPosts;
  //   this.saveDb();
  // }
  // async deletePost(id) {
  //   const updatedPosts = this.db.posts.filter((post) => post.id !== id);
  //   this.db.posts = updatedPosts;
  //   this.saveDb();
  // }

  // async addProject({ title, categories, summary, image }) {
  //   this.db.projects.push({
  //     id: this.uniqueId(),
  //     title,
  //     categories,
  //     summary,
  //     image,
  //     published: false,
  //     featured: false,
  //     created: new Date().toLocaleString(),
  //     updatedAt: new Date().toLocaleString(),
  //   });
  //   this.saveDb();
  // }
  // async getProjects() {
  //   return this.db.projects;
  // }
  // async getProject(id) {
  //   return this.db.projects.find((project) => project.id === id);
  // }
  // async updateProject(
  //   id,
  //   { title, categories, summary, image, published, featured }
  // ) {
  //   const updatedProjects = this.db.projects.map((project) => {
  //     if (project.id === id) {
  //       if (summary) project.summary = summary;
  //       if (published) project.published = published;
  //       if (title) project.title = project.title;
  //       if (categories) project.categories = categories;
  //       if (image) project.image = image;
  //       if (featured) project.featured = featured;
  //       project.updatedAt = new Date().toLocaleString();
  //       return project;
  //     }
  //     return project;
  //   });
  //   this.db.projects = updatedProjects;
  //   this.saveDb();
  // }
  // async deleteProject(id) {
  //   const updatedProjects = this.db.projects.filter(
  //     (project) => project.id !== id
  //   );
  //   this.db.projects = updatedProjects;
  //   this.saveDb();
  // }
  async updateUser({
    name,
    keywords,
    info,
    summary,
    email,
    about,
    profilePic,
    token,
    role,
    _id,
  }) {
    if (keywords) this.db.user.keywords = keywords;
    if (info) this.db.user.info = info;
    if (summary) this.db.user.summary = summary;
    if (email) this.db.user.email = email;
    if (name) this.db.user.name = name;
    if (about) this.db.user.about = about;
    if (profilePic) this.db.user.profilePic = profilePic;
    if (token) this.db.user.token = token;
    if (role) this.db.user.role = role;
    if (_id) this.db.user._id = _id;

    this.saveDb();
  }
  async resetUser() {
    this.db.user = {
      keywords: "",
      info: "",
      summary: "",
      about: "",
      profilePic: "",
      name: "",
      email: "",
      token: "",
    };
    this.saveDb();
  }
  // async addMessage({ name, subject, email, message }) {
  //   this.db.messages.push({
  //     id: this.uniqueId(),
  //     name,
  //     subject,
  //     email,
  //     message,
  //     read: false,
  //     reply: "",
  //     created: new Date().toLocaleString(),
  //   });
  //   this.saveDb();
  // }
  // async getMessages() {
  //   return this.db.messages;
  // }
  // async getMessage(id) {
  //   return this.db.messages.find((message) => message.id === id);
  // }
  // async deleteMessage(id) {
  //   const updatedMessages = this.db.messages.filter(
  //     (message) => message.id !== id
  //   );
  //   this.db.messages = updatedMessages;
  //   this.saveDb();
  // }
  async getUser() {
    return this.db.user;
  }
  // uniqueId() {
  //   return Date.now() + "-" + Math.round(Math.random() * 1e9);
  // }
}
const localDB = new Storage();

class FetchAPI {
  host = "https://localhost:5000";
  options = {};
  path = "";
  user = localDB.user;
  headers = {};
  constructor(host, basePath, options) {
    this.host = `${host}${basePath ? "/" + basePath : ""}`;
    this.options = options;
    if (localDB.db.user.token)
      this.setHeaders({ Authorization: `Bearer ${localDB.db.user.token}` });
  }
  setPath(path = "") {
    if (path.startsWith("/")) this.path = path.slice(1);
    else this.path = path;
  }
  setHeaders(headers = {}) {
    for (let key in headers) {
      this.headers[key] = headers[key];
    }
    return this;
  }
  setMethod(METHOD) {
    this.options = { ...this.options, method: METHOD };
    return this;
  }
  setOptions(options = {}) {
    this.options = options;
    return this;
  }
  bodify({ object, formData }) {
    if (object) return JSON.stringify(object);
    if (formData) return formData;
  }
  get(path = "", options = {}) {
    this.options = { ...this.options, ...options };
    this.setPath(path);
    this.setMethod("GET");
    return this;
  }

  post(path = "", options = {}) {
    console.log(this.options);
    this.options = {
      ...this.options,
      cache: "no-cache",
      ...options,
    };
    this.setPath(path);
    this.setMethod("POST");
    return this;
  }
  patch(path = "", options = {}) {
    this.options = { ...this.options, cache: "no-cache", ...options };
    this.setPath(path);
    this.setMethod("PATCH");
    return this;
  }

  delete(path = "", options = {}) {
    this.options = { ...this.options, cache: "no-cache", ...options };
    this.setPath(path);
    this.setMethod("DELETE");
    return this;
  }
  async send({ object, formData }) {
    let data = this.bodify({ object, formData });
    const response = await fetch(`${this.host}/${this.path}`, {
      ...this.options,
      body: data,
      headers: this.headers,
    });
    const body = await response.json();
    return { status: response.status, body };
  }
}
const loginBtn = document.getElementById("loginBtn");
if (loginBtn && localDB.db.user.token)
  loginBtn.textContent = localDB.db.user.name[0];

const apiRequest = new FetchAPI(
  "https://mybrand-sostene-testing.herokuapp.com",
  "api",
  {}
);

