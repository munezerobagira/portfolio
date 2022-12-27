import { useEffect, useRef, useState } from "react";
import User from "../Types/User";
import LoadingBall from "../components/LoadingBall";
import apiRequest from "../util/apiRequest";
import Terminal from "../util/Terminal/Terminal";
import { clearScreen, helloworld } from "../util/Terminal/extensions";

function Index() {
  return (
    <>
      <div>
        <h1
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          This site is underconstruction
        </h1>
      </div>
    </>
  );
  // const [isLoading, setIsLoading] = useState(true);
  // const [ownerInfo, setOwnerInfo] = useState<User>({});
  // const [terminalContainer, setTerminalContainer] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     const response = await apiRequest.get("/owner").send({});
  //     setIsLoading(false);
  //     if (response.status == 200) {
  //       const { user } = response.body;
  //       setOwnerInfo(user);
  //     }
  //   })();
  // }, []);
  // useEffect(() => {
  //   console.log(terminalContainer);
  //   if (ownerInfo && terminalContainer) {
  //     const terminal = new Terminal(terminalContainer);
  //     terminal.addExtension(helloworld, "helloworld", "Display helloworld");
  //     terminal.addExtension(clearScreen, "clear", "Clear screen");
  //   }
  // }, [ownerInfo, terminalContainer]);
  // if (isLoading) return <LoadingBall />;
  // return (
  //   <main>
  //     <section id="hero" className="flex">
  //       <div className="wrapper flex">
  //         <div className="flex-1 margin-nav">
  //           <h1 className="text-5" id="keywords">
  //             {ownerInfo.keywords}
  //           </h1>
  //           <p id="owner-info">{ownerInfo.info}</p>
  //           <div>
  //             <button className="button-primary">Hire me</button>
  //           </div>
  //         </div>
  //         <div className="flex-1 flex-row margin-nav">
  //           <div className="width-full">
  //             <div
  //               id="terminal"
  //               ref={(el) => {
  //                 setTerminalContainer(el);
  //               }}
  //             ></div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     <section id="headline">
  //       <div className="wrapper headline flex">
  //         <div className="headline-picture-container">
  //           <img
  //             className="px-2 width-full "
  //             id="owner-image"
  //             src={ownerInfo.profilePic.path}
  //           />
  //         </div>

  //         <div className="flex-1 headline-text-container" id="owner-">
  //           <h2>About me</h2>
  //           <p id="owner-summary">{ownerInfo.summary}</p>
  //           <div>
  //             <button className="button-primary">
  //               <a href="/about/">Read more</a>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </main>
  // );
}

export default Index;

