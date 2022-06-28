const submitButton = document.getElementById("submitBtn");
const userSchema = {
  keywords: "string[2]",
  info: "string[4]",
  summary: "string[5]",
  about: "string[5]",
  username: "string[5], required",
  name: "string[5], required",
};

const updateUser = async (data, clearForm) => {
  document.getElementById("submitBtn").setAttribute("disabled", true);
  const userData = await getFormDataFromObject(data);

  delete apiRequest["Content-type"];
  const response = await apiRequest
    .patch(`/user/profile`)
    .send({ formData: userData });

  if (response.status == 200) {
    toast("Your account info has been updated");
    submitButton.removeAttribute("disabled");
    clearForm();
    window.location.href = "/pages/admin";
  } else {
    submitButton.removeAttribute("disabled");
    if (response.status == 400) {
      const { error, errors } = response.body;
      toast(JSON.stringify(error || errors));
    }
  }
};
const getFormDataFromObject = (object) =>
  new Promise((resolve) => {
    const formData = new FormData();
    for (let key in object) {
      formData.append(key, object[key]);
    }
    const image = document.getElementById("profilePic").files[0];
    if (image) formData.append("profilePic", image);
    resolve(formData);
  });

const handleUpdatePost = async () => {
  const form = document.getElementById("userForm");

  // fetch the articles
  const response = await apiRequest.get(`user/profile`).send({});
  if (response.status == 200) {
    const { user } = response.body;

    //add the data to the form
    for (let key in user) {
      if (form[key] && form[key].type != "file") form[key].value = user[key];
      if (form[key] && form[key].type == "file") {
        form[
          key
        ].parentNode.innerHTML += `<div class="card"><img src="${user.profilePic.path}"></div>`;
      }
    }

    withForm("userForm", userSchema, updateUser);
  } else {
    form.textContent = "Sorry the post is not found";
  }
};

handleUpdatePost();

