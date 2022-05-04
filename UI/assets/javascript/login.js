let loginSchema = {
  email: "string, required",
  password: "string, required",
};
if (localDB.db.user.token) window.location.href = "/pages/admin";
async function onSuccess(data, clearForm) {
  const response = await apiRequest
    .setHeaders({ "Content-Type": "application/json" })
    .post("auth/login")
    .send({ object: data });
  if (response.status === 200) {
    toast("login successful", 3000);
    console.log(response.body.token);
    localDB.updateUser({ token: response.body.token });
    clearForm();
    toast("Logged  successful", 3000);
    return setTimeout(() => {
      window.location.href = "/pages/admin";
    }, 1000);
  }
  if (response.status === 400 || response.status == -401) {
    if (response.error) console.log(response.error);
    return toast("Please enter the valid credential");
  }
  setTimeout(() => {
    window.location.href = "/pages/admin";
  }, 1000);
}

withForm("loginForm", loginSchema, onSuccess);

