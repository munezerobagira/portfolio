import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../../util/apiRequest";
import localStorage from "../../util/localStorage";
import toast from "../../util/toast";
import { withHTMLForm } from "../../util/validator";

function index() {
  const location = useLocation();
  let loginSchema = {
    email: "string, required",
    password: "string, required",
  };
  async function onValidatorSuccess(data, clearForm) {
    const submitBtn = document.getElementById("submit");
    submitBtn.setAttribute("disabled", "true");

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
        localStorage.updateUser({ ...user, token });
        toast("Logged  successful", 3000);
        clearForm();
        return setTimeout(() => {
          window.location.href = "/pages/admin";
        }, 1000);
      }
    }

    if (response.status === 400 || response.status == 401) {
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
  useEffect(() => {
    if (localStorage.db.user.token) console.log("We have the token");
    withHTMLForm("loginForm", loginSchema, onValidatorSuccess);
  });

  return (
    <main>
      <section id="login" className="flex margin-nav">
        <div className="wrapper">
          <div className="heading text-center py-1">
            <h2>Login</h2>
          </div>
          <div className="flex login-wrapper">
            <div className="form-container">
              <form id="loginForm">
                <div className="form-group">
                  <input
                    className="control"
                    type="text"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="control"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <button className="button text-center width-full" id="submit">
                  Signin
                </button>
              </form>
            </div>

            <div className="info text-center">
              <div>
                <img
                  className="contact-img"
                  src="../../assets/images/aboutme.svg"
                  alt=""
                />
              </div>
              <p>Login to access some of your treasures</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default index;

