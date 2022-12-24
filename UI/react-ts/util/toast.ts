export default function (description, timeOut = 3000) {
  let element = document.createElement("div");
  element.classList.add("toast");
  element.innerHTML = description;
  document.body.append(element);
  element.classList.add("animated-bottom");
  setTimeout(() => {
    document.body.removeChild(element);
  }, timeOut);
}

