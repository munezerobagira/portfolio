let signupSchema = {
  username: "string[2]",
  email: "email",
  name: "string[5]",
  password: "string[5]",
  confirmPassword: "reference[password]",
};
async function onSuccess(data, clearForm) {
  try {
    const response = await apiRequest
      .setHeaders({ "Content-Type": "application/json" })
      .post("auth/signup")
      .send({ object: data });
    if (response.status === 201) {
      toast("User created successful", 3000);
      clearForm();
      return setTimeout(() => {
        window.location.href = "/pages/login";
      }, 1000);
    }
    if (response.status === 400) {
      if (response.error) console.log(response.error);
      return toast(JSON.stringify(response.error || response.errors));
    }
    if (response.status === 500) return toast("Unknown error");
  } catch (error) {
    if (error.status && error.status == 400)
      return toast("Unknow error occured");
  }
}

withForm("signupForm", signupSchema, onSuccess);

