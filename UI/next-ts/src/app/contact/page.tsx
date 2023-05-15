import { useEffect } from "react";
import apiRequest from "../../util/apiRequest";
import toast from "../../util/toast";
import { withHTMLForm } from "../../util/validator";
import Image from "next/image";
function Contact() {
  const contactSchema = {
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
        return toast("Message was sent successful", 10000);
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
  useEffect(() => {
    withHTMLForm("contactme", contactSchema, onSuccess);
  }, []);
  return (
    <main>
      <section id="contact-me" className="flex margin-nav">
        <div className="wrapper flex py-2">
          <div className="form-container">
            <form id="contactme">
              <div className="form-group">
                <input
                  className="control"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <input
                  className="control"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                />
              </div>
              <div className="form-group">
                <input
                  className="control"
                  type="email"
                  name="email"
                  placeholder="example@example.domain"
                />
              </div>
              <div className="form-group">
                <textarea
                  className="control"
                  name="message"
                  placeholder="Enter your message "
                  rows={5}
                ></textarea>
              </div>
              <input type="submit" className="control button text-center" />
            </form>
          </div>

          <div className="contact-info py-1 text-center">
            <div>
              <Image
                className="contact-img"
                src="../../assets/images/aboutme.svg"
                alt=""
              />
            </div>
            <h2>Contact me</h2>
            <p>
              You are sending this message to
              <span className="color-primary">Munezero Bagira Sostene</span>
            </p>
            <div>
              Located in Kigali, Rwanda GMT+2. <br />
              Current time is <span className="current-time">14:00 AM</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;

