import "./index.css";
function index() {
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
              <img
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

export default index;

