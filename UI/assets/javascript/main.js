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
