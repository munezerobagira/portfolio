const getProjects = async () => {
  const projectsContainer = document.getElementById("projects");
  const response = await apiRequest
    .get("projects?published=false&count=10")
    .send({});
  if (response.status == 200) {
    projects = response.body.projects;
    if (!projects.length) {
      return (projectsContainer.innerHTML = `<h1 class="color-primary">Sorry we currently have no published projects</h1>`);
    }
    projectsContainer.innerHTML = projects.reduce(
      (currentProjects, project) =>
        (currentProjects += `
          <div class="card">
                <div class="card-image">
                  <a href="${project.link}">
                    <img src="${project.image.path}" alt="Typing speed" />
                  </a>
                </div>
                <div class="text-container">
                  <h4>${project.title}</h4>
                  <p>
                     ${
                       project.summary.length > 100
                         ? project.summary.slice(0, 50) + "  ..."
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
                  <div class="button-group flex">
                    <button class="button-primary">
                      <a href="${project.link || "#"}">Visit site</a>
                    </button>
                    <button class="button-primary-inverse">
                      <a href="${project.githubLink || "#"}"
                        >source code</a
                      >
                    </button>
                </div>
                </div>
              </div>
      `),
      ""
    );
  } else {
    return (projectsContainer.innerHTML = `<h1 class="color-primary">Uknown error occured/h1>`);
  }
};
getProjects();

