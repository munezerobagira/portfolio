export default function appendFor(
  target: HTMLElement,
  error,
  errorKey,
  classList = [],
  timeout = 3000
) {
  if (!target) return false;
  target.classList.remove("success");
  target.classList.add("error");
  let errorElement = document.getElementById(`error-${errorKey}`);
  if (errorElement) errorElement.textContent;
  else errorElement = document.createElement("div");
  errorElement.textContent = errorKey + " " + error;
  errorElement.id = `error-${errorKey}`;
  errorElement.classList.add("error-box");
  target.parentNode.append(errorElement);
  setTimeout(() => {
    errorElement.textContent = "";
    target.classList.remove("error");
  }, timeout);
  return true;
}
