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
          keywords: "Learner, critical thinker",
          info: "Every codes is written for reason",
          summary:
            "BE student, Freecodecamp certified, 3 years of learning in Software Development, understanding of HTML, CSS3, JSON, React, Vue, Database, and SQL queries and Capable of Performance Testing, Security testing, Documentation, and Deployment on live site.",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam tempore ea",
          profilePic: "",
          token: "",
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
  async addPost({ title, categories, summary, image, content }) {
    this.db.posts.push({
      id: this.uniqueId(),
      title,
      categories,
      summary,
      image,
      content,
      published: false,
      featured: false,
      created: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    });
    this.saveDb();
  }
  async getPosts() {
    return this.db.posts;
  }
  async getPost(id) {
    return this.db.posts.find((post) => post.id === id);
  }
  async updatePost(
    id,
    { title, categories, summary, image, content, published, featured }
  ) {
    const updatedPosts = this.db.posts.map((post) => {
      if (post.id === id) {
        if (summary) post.summary = summary;
        if (content) post.content = content;
        if (published) post.published = published;
        if (title) post.title = post.title;
        if (categories) post.categories = categories;
        if (image) post.image = image;
        if (featured) post.featured = featured;
        post.updatedAt = new Date().toLocaleString();
        return post;
      }

      return post;
    });
    this.db.posts = updatedPosts;
    this.saveDb();
  }
  async deletePost(id) {
    const updatedPosts = this.db.posts.filter((post) => post.id !== id);
    this.db.posts = updatedPosts;
    this.saveDb();
  }

  async addProject({ title, categories, summary, image }) {
    this.db.projects.push({
      id: this.uniqueId(),
      title,
      categories,
      summary,
      image,
      published: false,
      featured: false,
      created: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    });
    this.saveDb();
  }
  async getProjects() {
    return this.db.projects;
  }
  async getProject(id) {
    return this.db.projects.find((project) => project.id === id);
  }
  async updateProject(
    id,
    { title, categories, summary, image, published, featured }
  ) {
    const updatedProjects = this.db.projects.map((project) => {
      if (project.id === id) {
        if (summary) project.summary = summary;
        if (published) project.published = published;
        if (title) project.title = project.title;
        if (categories) project.categories = categories;
        if (image) project.image = image;
        if (featured) project.featured = featured;
        project.updatedAt = new Date().toLocaleString();
        return project;
      }
      return project;
    });
    this.db.projects = updatedProjects;
    this.saveDb();
  }
  async deleteProject(id) {
    const updatedProjects = this.db.projects.filter(
      (project) => project.id !== id
    );
    this.db.projects = updatedProjects;
    this.saveDb();
  }
  async updateUser({ keywords, info, summary, about, profilePic }) {
    if (keywords) this.db.user.keywords = keywords;
    if (info) this.db.user.info = info;
    if (summary) this.db.user.summary = summary;
    if (about) this.db.user.about = about;
    if (profilePic) this.db.user.profilePic = profilePic;
    if (token) this.db.user.token = token;
    this.saveDb();
  }
  async addMessage({ name, subject, email, message }) {
    this.db.messages.push({
      id: this.uniqueId(),
      name,
      subject,
      email,
      message,
      read: false,
      reply: "",
      created: new Date().toLocaleString(),
    });
    this.saveDb();
  }
  async getMessages() {
    return this.db.messages;
  }
  async getMessage(id) {
    return this.db.messages.find((message) => message.id === id);
  }
  async deleteMessage(id) {
    const updatedMessages = this.db.messages.filter(
      (message) => message.id !== id
    );
    this.db.messages = updatedMessages;
    this.saveDb();
  }
  async getUser() {
    return this.db.user;
  }
  uniqueId() {
    return Date.now() + "-" + Math.round(Math.random() * 1e9);
  }
}
const db = new Storage();

class FetchAPI {
  host = "https://localhost:5000";
  options = {};
  path = "";
  user = db.user;
  headers = {};
  constructor(host, basePath, options) {
    this.host = `${host}${basePath ? "/" + basePath : ""}`;
    this.options = options;
  }
  getPath(path = "") {
    if (path.startsWith("/")) this.path = path.slice(1);
    else this.path = path;
    return this.path;
  }
  async get(path = "", options = {}) {
    let validPath = this.getPath(path);
    console.log(validPath);
    this.options = {
      ...this.options,
      headers: this.headers,
      cache: "force-cache",
    };
    const response = await fetch(`${host}/${validPath}`, {
      method: "GET",
      ...this.options,
      ...options,
    });
    const body = await response.json();
    return { status: response.status, body };
  }
  setHeaders(headers = {}) {
    for (let key in headers) {
      this.headers[key] = headers[key];
    }
    return this;
  }

  async post(path = "", { object, formData }, options = {}) {
    let validPath = this.getPath(path);
    let body = this.bodify({ object, formData });
    console.log(body);
    console.log(validPath);
    this.options = { cache: "no-cache" };
    const response = await fetch(`${this.host}/${validPath}`, {
      headers: this.headers,
      method: "POST",
      body,
      ...this.options,
      ...options,
    });
    const data = await response.json();
    return { status: response.status, body: data };
  }
  async patch(path = "", { object, formData }, options = {}) {
    let body = this.bodify({ object, formData });
    let validPath = this.getPath(path);
    this.options = { ...this.options, cache: "no-cache" };
    const response = await fetch(`${this.host}/${validPath}`, {
      method: "PATCH",
      body,
      ...this.options,
      ...options,
    });
    const data = await response.json();
    return { status: response.status, body: data };
  }
  bodify({ object, formData }) {
    if (object) return JSON.stringify(object);
    if (formData) return formData;
  }

  async get(path = "", options = {}) {
    this.options = { cache: "force-cache" };
    const validPath = this.getPath(path);
    const response = await fetch(`${this.hos}/${validPath}`, {
      method: "POST",
      ...this.options,
      ...options,
    });
    const body = await response.json();
    return { status: response.status, body };
  }
}
const apiRequest = new FetchAPI("http://localhost:5000/api", "", {});

