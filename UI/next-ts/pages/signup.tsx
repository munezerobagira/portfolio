import { useEffect } from "react";
import apiRequest from "../util/apiRequest";
import toast from "../util/toast";
import { withHTMLForm } from "../util/validator";
function Signup() {
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
        return toast(
          JSON.stringify(response.body.error || response.body.errors)
        );
      }
      if (response.status === 500) return toast("Unknown error");
    } catch (error) {
      if (error.status && error.status == 400)
        return toast("Unknow error occured");
    }
  }

  useEffect(() => {
    withHTMLForm("signupForm", signupSchema, onSuccess);
  });
  return (
    <main>
      <section id="signup" className="flex margin-nav">
        <div className="wrapper">
          <div className="heading text-center py-1">
            <h2>signup</h2>
          </div>
          <div className="flex signup-wrapper">
            <div className="form-container">
              <form id="signupForm">
                <div className="form-group">
                  <input
                    className="control"
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                </div>
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
                    type="text"
                    name="name"
                    placeholder="Your name"
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
                <div className="form-group">
                  <input
                    className="control"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />
                </div>
                <button type="submit" className="button text-center width-full">
                  signup
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
              <p>signup to access some of your treasures</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;

