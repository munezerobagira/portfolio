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
