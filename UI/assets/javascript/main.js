const toggler = document.querySelector("#toggler");
const nav = document.querySelector("#navigation");
const workSvg = document.querySelectorAll("object.work-svg");
// const element = new SVGElement();
// element.getElementsByTagNameNS();
workSvg.forEach((object) => {
  console.log(object);
  object.onload = () => {
    const realSvg = object.getSVGDocument();
    const style = realSvg.getElementsByTagName("style")[0];
    // console.log((style.textContent = ));
    console.log(realSvg);
  };
});
toggler.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("height-0");
  nav.parentNode.classList.toggle("active");
  console.log(nav);
});
