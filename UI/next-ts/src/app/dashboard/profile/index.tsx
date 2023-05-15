import { useEffect } from "react";
import apiRequest from "../../../../util/apiRequest";
import { withHTMLForm } from "../../../../util/validator";
import toast from "../../../../util/toast";
import { useRouter } from "next/router";

function DashboardProfile() {
  const router = useRouter();
  const userSchema = {
    keywords: "string[2]",
    info: "string[4]",
    summary: "string[5]",
    about: "string[5]",
    username: "string[5], required",
    name: "string[5], required",
  };

  const updateUser = async (data, clearForm) => {
    document.getElementById("submitBtn").setAttribute("disabled", "true");
    const userData: FormData = await getFormDataFromObject(data);

    delete apiRequest["Content-type"];
    const response = await apiRequest.patch(`/user/profile`).send({
      formData: userData,
    });

    if (response.status == 200) {
      toast("Your account info has been updated");
      document.getElementById("submitBtn").removeAttribute("disabled");
      clearForm();
      router.push("/pages/admin");
    } else {
      if (response.status == 400) {
        const { error, errors } = response.body;
        toast(JSON.stringify(error || errors));
      }
    }
  };
  const getFormDataFromObject = (object): Promise<FormData> =>
    new Promise((resolve) => {
      const formData = new FormData();
      for (let key in object) {
        formData.append(key, object[key]);
      }
      const imageElement = document.getElementById(
        "profilePic"
      ) as HTMLInputElement;
      const image = imageElement.files?.[0];
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
    } else {
      form.textContent = "Sorry the post is not found";
    }
  };
  useEffect(() => {
    withHTMLForm("userForm", userSchema, updateUser);
    handleUpdatePost();
  }, []);

  return (
    <div>
      <h1 id="form-title">Edit personal information</h1>
      <div className="form-container">
        <form id="userForm">
          <div className="form-group">
            <label>Name</label>
            <input
              className="control"
              type="text"
              name="name"
              placeholder="Please Enter name here"
            />
          </div>
          <div className="form-group">
            <label>Choose profile image</label>
            <input
              className="control"
              type="file"
              name="profilePic"
              id="profilePic"
              placeholder="Choose an image"
            />
          </div>

          <div className="form-group">
            <input
              className="control"
              type="text"
              name="keywords"
              placeholder="Keywords: problem solver ..."
            />
          </div>

          <div className="form-group">
            <input
              className="control"
              type="text"
              name="info"
              placeholder="Small info"
            />
          </div>
          <div className="form-group">
            <input
              className="control"
              type="text"
              name="summary"
              placeholder="Write a little summary"
            />
          </div>
          <div className="form-group">
            <textarea
              name="about"
              className="control"
              cols={30}
              rows={10}
              placeholder="Write full about here"
            ></textarea>
          </div>
          <button className="button text-center width-full" id="submitBtn">
            Edit personal info
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardProfile;

