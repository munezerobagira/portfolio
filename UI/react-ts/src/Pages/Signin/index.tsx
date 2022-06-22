import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBall from "../../components/LoadingBall";
import useAuth from "../../hooks/useAuth";
import apiRequest from "../../util/apiRequest";
import localStorageAPI from "../../util/localStorageAPI";
import toast from "../../util/toast";
import { withHTMLForm } from "../../util/validator";
import "./login.css";

function index() {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

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
        await localStorageAPI.updateUser({ ...user, token });
        toast("Logged  successful", 3000);
        clearForm();
        navigate("/dashboard", {});
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
    const loginSchema = {
      email: "string, required",
      password: "string, required",
    };
    if (user && user._id) navigate("/dashboard");
    withHTMLForm("loginForm", loginSchema, onValidatorSuccess);
  }, [user]);

  if (loading) return <LoadingBall />;
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

