let signupSchema = {
  username: "string[2]",
  email: "email",
  name: "string[5]",
  password: "string[5]",
  confirmPassword: "reference[password]",
};
async function onSuccess(data) {
  try {
    const response = await apiRequest
      .setHeaders({ "Content-Type": "application/json" })
      .post("auth/signup", { object: data });
    if (response.status === 201) return toast("User created successful", 3000);
    if (response.status === 400) return toast("Please enter the valid data");
    if (response.status === 500) return toast("Unknown error");
  } catch (error) {
    if (error.status && error.status == 400)
      return toast("Unknow error occured");
  }
}

withForm("signupForm", signupSchema, onSuccess);

