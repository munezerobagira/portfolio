let contactSchema = {
  name: "string[2]",
  subject: "string[4]",
  email: "email",
  message: "string[5]",
};
async function onSuccess(data, clearForm) {
  try {
    console.log("clicked");
    const response = await apiRequest
      .setHeaders({ "Content-Type": "application/json" })
      .post("messages")
      .send({ object: data });
    console.log(response);
    if (response.status === 201) {
      clearForm();
      return toast("Message was sent successful", 3000);
    }

    if (response.status === 400) {
      console.log(response.body);
      if (response.body.errors) return toast("Please enter the valid data");
    }
    if (response.status === 500) return toast("Unknown error");
  } catch (error) {
    if (error.status && error.status == 400)
      return toast("Unknow error occured");
  }
}

withForm("contactme", contactSchema, onSuccess);

