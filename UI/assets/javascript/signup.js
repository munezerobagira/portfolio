let signupSchema = {
  username: "string[2]",
  email: "string[4]",
  name: "string[5]",
  password: "string[5]",
  confirmPassword: "reference[password]",
};
function onSuccess(data) {
  toast("signed up");
  console.log(data);
}

withForm("signupForm", signupSchema, onSuccess);
