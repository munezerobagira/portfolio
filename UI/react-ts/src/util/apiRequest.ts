import localDB from "./localStorageAPI";
import User from "../Types/User";
type FetchBodyData = {
  object?: object;
  formData?: FormData;
};
{
}
class FetchAPI {
  host = "https://localhost:5000";
  options = {};
  path = "";
  user: User = localDB.db.user;
  headers: HeadersInit = {};
  constructor(host: string, basePath: string, options: object) {
    this.host = `${host}${basePath ? "/" + basePath : ""}`;
    this.options = options;
    if (this.user.token)
      this.setHeaders({ Authorization: `Bearer ${localDB.db.user.token}` });
  }
  setPath(path = "") {
    if (path.startsWith("/")) this.path = path.slice(1);
    else this.path = path;
  }
  setHeaders(headers: HeadersInit = {}) {
    for (let key in headers) {
      this.headers[key] = headers[key];
    }
    return this;
  }
  setMethod(METHOD: string) {
    this.options = { ...this.options, method: METHOD };
    return this;
  }
  setOptions(options = {}) {
    this.options = options;
    return this;
  }
  bodify({ object, formData }: FetchBodyData) {
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
  async send({ object, formData }: FetchBodyData) {
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
export default new FetchAPI("http://localhost:5000", "api", {});

