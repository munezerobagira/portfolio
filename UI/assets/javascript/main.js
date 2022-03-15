const toggler = document.querySelector("#toggler");
const nav = document.querySelector("#navigation");
toggler.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("height-0");
  nav.parentNode.classList.toggle("active");
  console.log(nav);
});
