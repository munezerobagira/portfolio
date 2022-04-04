let contactSchema = {
  name: "string[2]",
  subject: "string[4]",
  email: "email",
  message: "string[5]",
};
toast("Message was sent successful", 100000);
function onSuccess(data) {
  console.log(data);
  // window.location.href = "/pages/login";
}

withForm("contactme", contactSchema, onSuccess);
