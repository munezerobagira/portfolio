import { useEffect, useState } from "react";
import LoadingBall from "../../components/LoadingBall";
import apiRequest from "../../util/apiRequest";
import "./index.css";
import "../../util/terminal";
function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [ownerInfo, setOwnerInfo] = useState({
    profilePic: {
      path: "",
      width: "",
      height: "",
    },
    keywords: "",
    info: "",
    summary: "",
    about: "",
  });
  useEffect(() => {
    (async () => {
      const response = await apiRequest.get("/owner").send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { user } = response.body;
        setOwnerInfo(user);
      }
    })();
  }, []);
  if (isLoading) return <LoadingBall />;
  return (
    <main>
      <section id="hero" className="flex">
        <div className="wrapper flex">
          <div className="flex-1 margin-nav">
            <h1 className="text-5" id="keywords">
              {ownerInfo.keywords}
            </h1>
            <p id="owner-info">{ownerInfo.info}</p>
            <div>
              <button className="button-primary">Hire me</button>
            </div>
          </div>
          <div className="flex-1 flex-row margin-nav">
            <div className="width-full">
              <div id="terminal"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="headline">
        <div className="wrapper headline flex">
          <div className="headline-picture-container">
            <img className="px-2 width-full " id="owner-image" />
          </div>

          <div className="flex-1 headline-text-container" id="owner-">
            <h2>About me</h2>
            <p id="owner-summary">{ownerInfo.summary}</p>
            <div>
              <button className="button-primary">
                <a href="/pages/about/">Read more</a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default index;

