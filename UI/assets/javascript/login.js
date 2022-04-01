let loginSchema = {
  username: "string[3]",
  password: "string, required",
};
function onSuccess(data) {
  console.log(data);
  toast("Logged  successful", 10000);
  setTimeout(() => {
    window.location.href = "/pages/admin";
  }, 1000);
}

withForm("loginForm", loginSchema, onSuccess);
