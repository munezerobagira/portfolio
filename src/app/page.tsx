"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import User from "@/types/User";
import LoadingBall from "@/components/LoadingBall";
import Terminal from "@/utils/Terminal/Terminal";
import { clearScreen, helloworld } from "@/utils/Terminal/extensions";
import { data } from "@/data";
const AnimatedStack = ({ items }: { items: string[] }) => {
  const itemsLength = items.length;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeItemCharacterIndex, setActiveItemCharacterIndex] = useState(0);
  const [output, setOutput] = useState({
    data: "",
    size: 0,
  });
  useEffect(() => {
    const characters = items[activeItemIndex]?.split("") ?? [];
    alert(characters);

    if (characters.length) characters[activeItemCharacterIndex] = "";
    setOutput({
      data: characters.join(""),
      size: characters.length,
    });
  }, [items, activeItemCharacterIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((previous) => {
        if (previous == itemsLength - 1) return 0;
        return previous + 1;
      });
    }, 3000);
    return clearInterval(interval);
  }, [items]);
  useEffect(() => {
    setActiveItemCharacterIndex(0);
    const interval = setInterval(() => {
      setActiveItemCharacterIndex((previous) => {
        if (previous == output.size - 1) return 0;
        return previous + 1;
      });
    }, 100);
    return clearInterval(interval);
  }, [items, activeItemIndex]);
  return (
    <div className="stack">
      <h1 className="text-8xl my-4 font-bold" id="keywords">
        {output.data}
      </h1>
    </div>
  );
};
function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState<User>({});
  const terminalContainer = useRef(null);
  useEffect(() => {
    (async () => {
      setCreatorInfo(data.user);
      setIsLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (
      terminalContainer.current &&
      terminalContainer.current?.childNodes.length < 1
    ) {
      const terminal = new Terminal(terminalContainer.current);
      terminal.addExtension(helloworld, "hi", "Display helloworld");
      terminal.addExtension(clearScreen, "clear", "Clear screen");
    }
  }, [terminalContainer]);
  if (isLoading) return <LoadingBall />;
  return (
    <main className="max-w-[60rem] mx-auto p-8">
      <section className="hero min-h-screen ">
        <div className="text-center">
          <AnimatedStack items={creatorInfo.keywords?.split(",") ?? []} />

          <p className="my-4">{creatorInfo.info}</p>
          <div>
            <button className="btn btn-primary">Hire me</button>
          </div>
        </div>
      </section>
      <section className="hero mb-[4rem] p-4 rounded-md ">
        <div className="text-center">
          <h1 className="text-3xl my-4 ">About</h1>
          <p className="my-4">{creatorInfo.info}</p>
          <div>
            <button className="btn btn-primary">Hire me</button>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex items-stretch p-6 ">
        <div id="terminal" className="w-full" ref={terminalContainer}></div>
      </section>
      <section id="headline">
        <div className="wrapper headline flex">
          <div className="headline-picture-container">
            <img
              className="px-2 width-full "
              id="owner-image"
              src={creatorInfo.profilePic?.url}
            />
          </div>
          <div className="flex-1 headline-text-container" id="owner-">
            <h2>About me</h2>
            <p id="owner-summary">{creatorInfo.summary}</p>
            <div>
              <button className="button-primary">
                <a href="/about/">Read more</a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Index;

