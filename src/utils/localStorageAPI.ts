import User from "@/types/User";
import LocalDB from "@/types/LocalDB";
class Storage {
  db: LocalDB = JSON.parse(
    window?.localStorage?.getItem("sostene-protofolio") || null
  );
  constructor() {
    if (!this.db) {
      let db = {
        user: {
          keywords: "",
          info: "",
          summary: "",
          about: "",
          profilePic: {
            width: "",
            height: "",
            path: "",
          },
          name: "",
          email: "",
          token: "",
          role: "",
          _id: "",
        },
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
  }: User) {
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
      profilePic: {
        width: "",
        height: "",
        path: "",
      },
      name: "",
      email: "",
      token: "",
      _id: "",
      role: "",
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
const localStorageAPI = typeof window !== "undefined" && new Storage();
export default localStorageAPI;

