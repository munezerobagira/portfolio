let loginSchema = {
  email: "string, required",
  password: "string, required",
};
if (localDB.db.user.token) window.location.href = "/pages/admin";
async function onValidatorSuccess(data, clearForm) {
  const submitBtn = document.getElementById("submit");
  submitBtn.setAttribute("disabled", true);

  let response = await apiRequest
    .setHeaders({ "Content-Type": "application/json" })
    .post("auth/login")
    .send({ object: data });

  if (response.status === 200) {
    toast("login successful", 3000);
    const { token } = response.body;
    apiRequest.setHeaders({ Authorization: `Bearer ${token}` });
    response = await apiRequest.get("user/profile").send({});

    if (response.status == 200) {
      const user = response.body.user;
      localDB.updateUser({ ...user, token });
      toast("Logged  successful", 3000);
      clearForm();
      return setTimeout(() => {
        window.location.href = "/pages/admin";
      }, 1000);
    }
  }

  if (response.status === 400 || response.status == 401) {
    if (response.error) console.log(response.error || response.errors);
    submitBtn.removeAttribute("disabled");
    return toast("Please enter the valid credential");
  }
  if (response.status === 403 || response.status == 401) {
    const verifyAccount = confirm(
      "You account is not activated, do you want to recieve verification email"
    );
    if (verifyAccount) {
      let id = response.body.id;
      response = await apiRequest
        .get(`user/profile/verification?id=${id}`)
        .send({});
      if (response.status == 200) {
        toast("You have received the email please check it");
        return (window.location.href = "/");
      }
    } else submitBtn.removeAttribute("disabled");
  }
}

withForm("loginForm", loginSchema, onValidatorSuccess);

