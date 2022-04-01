let contactSchema = {
  name: "string[2]",
  subject: "string[4]",
  email: "string[5]",
  message: "string[5]",
};
function onSuccess(data) {
  console.log(data);
  toast("Message was sent successful", 10000);
  // window.location.href = "/pages/login";
}

withForm("contactme", contactSchema, onSuccess);
