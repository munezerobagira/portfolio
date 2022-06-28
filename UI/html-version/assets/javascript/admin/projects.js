let title = document.getElementById("pageTitle");
let submitButton = document.getElementById("submitBtn");

const stringQuery = window.location.search;
const searchParams = new URLSearchParams(stringQuery);
const id = searchParams.get("id");

const projectSchema = {
  title: "string[2]",
  categories: "string[2]",
  summary: "string[5]",
  project: "string[5]",
  link: "string[5]",
  githubLink: "string[5]",
  featured: "boolean",
  published: "boolean",
};
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

const deleteProject = async (id, element) => {
  // handle delete click event
  element.setAttribute("disabled", true);
  const sure = confirm(
    `Are you sure you want to delete a project with id  ${id} `
  );

  if (!sure) {
    element.removeAttribute("disabled");
    return;
  }
  const response = await apiRequest.delete(`/projects/${id}`).send({});
  if (response.status == 200) {
    toast("Your project has been deleted sucessfull");
    return window.location.reload();
  }
  removeAttribute("disabled");
};
const createProject = async (data, clearForm) => {
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.setAttribute("disabled", true);
  const userData = await getFormDataFromObject(data);

  //Make sure that no content-type is sent browser handles it
  delete apiRequest["Content-Type"];

  const response = await apiRequest
    .post("/projects")
    .send({ formData: userData });

  if (response.status == 201) {
    toast("You have successfuly created a project");
    submitBtn.removeAttribute("disabled");
    clearForm();
  } else {
    submitBtn.setAttribute("disabled", true);
    if (response.status == 400 || response.status == 400) {
      const { error, errors } = response.body;
      toast(JSON.stringify(error || errors));
    }
  }
};

const getprojects = async () => {
  const projectsContainer = document.getElementById("projects");
  const response = await apiRequest
    .get("projects?published=false&count=10")
    .send({});

  if (response.status == 200) {
    projects = response.body.projects;
    if (!projects.length) {
      projectsContainer.innerHTML = "<h1>Sorry there are no projects</h1>";
    }
    projectsContainer.innerHTML = projects.reduce(
      (currentprojects, project) =>
        (currentprojects += `
        <div class="card">
              <div class="card-image">
                <a href="/pages/admin/projects/form/index.html?id=${
                  project._id
                }">
                  <img src="${project.image.path}" alt="Typing speed" />
                </a>
              </div>
              <div class="text-container">
                <h4>${project.title}</h4>
                <p>
                  ${
                    project.summary.length > 100
                      ? project.summary.slice(0, 50)
                      : project.summary
                  }
                </p>
                <div class="tags">
                  ${project.categories.reduce(
                    (iterator, category) =>
                      (iterator += "<span>" + category.title + "</span>"),
                    ""
                  )}
                </div>
                <div>
                  <button class="button-primary-inverse">
                    <a href="/pages/admin/projects/form/index.html?id=${
                      project._id
                    }">Edit</a>
                  </button>
                  <button class="button-danger" onclick="deleteProject('${
                    project._id
                  }', this);">Delete</button>
                </div>
              </div>
            </div>

    `),
      ""
    );
  } else {
    projects.innerHTML = "<h1>No projects were found</h1>";
  }
};

const updateProject = async (data, clearForm) => {
  const userData = await getFormDataFromObject(data);

  submitButton.setAttribute("disabled", true);

  delete apiRequest["Content-type"];
  const response = await apiRequest
    .patch(`/projects/${id}`)
    .send({ formData: userData });

  if (response.status == 200) {
    toast("Your project has been updated");
    submitButton.removeAttribute("disabled");
    clearForm();
    window.location.href = "/pages/admin/projects";
  } else {
    submitButton.removeAttribute("disabled");
    if (response.status == 400) {
      const { error, errors } = response.body;
      toast(JSON.stringify(error || errors));
    }
  }
};
const handleUpdateProject = async () => {
  const form = document.getElementById("projectForm");
  const submitBtn = document.getElementById("submitBtn");
  // submitBtn.innerHTML = +`<div class="form-group">
  // <input type="checkbox" name="featured" value="this.checked" />
  // Checking box will make the project featured
  // </div>
  // <div class="form-group">
  // <input type="checkbox" name="featured" value="this.checked" />
  // Checking box will make the project published
  // </div>`;
  title.textContent = "Edit project";
  submitBtn.textContent = "Edit project";

  // fetch the projects
  const response = await apiRequest.get(`projects/${id}`).send({});
  if (response.status == 200) {
    const { project } = response.body;

    // join the categories object
    if (project.categories)
      project.categories = project.categories
        .map((category) => category.title)
        .join();

    //add the data to the form
    for (let key in project) {
      if (form[key] && form[key].type != "file") form[key].value = project[key];
      if (form[key] && form[key].type == "file") {
        form[
          key
        ].parentNode.innerHTML += `<div class="card"><img src="${project.image.path}"></div>`;
      }
    }

    withForm("projectForm", projectSchema, updateProject);
  } else {
    form.textContent = "Sorry the project is not found";
  }
};

if (window.location.href.includes("/projects/form/")) {
  if (id) {
    handleUpdateProject();
  } else {
    withForm("projectForm", projectSchema, createProject);
  }
} else {
  getprojects();
}

