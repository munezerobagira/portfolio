const sidebarToggler = document.getElementById("sidebar-toggler");
sidebarToggler.addEventListener("click", () => {
  sidebarToggler.parentElement.classList.toggle("active");
});
