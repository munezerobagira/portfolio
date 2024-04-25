"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import User from "@/types/User";
import LoadingBall from "@/components/LoadingBall";

import Image from "next/image";
import { data as siteData } from "@/data";
import HelloWorldExtesion from "@/utils/Terminal/extensions/helloworld";
import ManExtension from "@/utils/Terminal/extensions/man";
import HelpExtension from "@/utils/Terminal/extensions/help";
import ClearExtension from "@/utils/Terminal/extensions/clear";
import injectTerminal from "@/utils/Terminal/injectTerminal";

import "devicon/devicon.min.css";
import AnimatedRow from "@/components/AnimatedRow";
import SkillCard from "@/components/SkillCard";
const AnimatedStack = ({ items }: { items: string[] }) => {
  const itemsLength = items.length;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const data = useMemo(() => items[activeItemIndex], [activeItemIndex, items]);
  const {} = data;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((previous) => {
        if (previous == itemsLength - 1) return 0;
        return previous + 1;
      });
    }, 100);
    return clearInterval(interval);
  }, [items, itemsLength]);

  return (
    <div className="stack">
      <h1
        className="text-4xl sm:text-6xl md:text-8xl  leading-[3rem] md:leading-[7rem] font-bold"
        id="keywords"
      >
        {data}
      </h1>
    </div>
  );
};
function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const terminalContainer = useRef(null);
  const [ownerInfo, setOwnerInfo] = useState<User>({});
  const [relativityOne, setRelativityOne] = useState(0.001);
  const [firstRowSkills, setFirstRowSkills] = useState([]);
  const [secondRowSkills, setSecondRowSkills] = useState([]);

  useEffect(() => {
    (async () => {
      setOwnerInfo(siteData.user);
      setFirstRowSkills(siteData.skills.filter((_, index) => index % 2 === 0));
      setSecondRowSkills(siteData.skills.filter((_, index) => index % 2 !== 0));
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const { terminal } = injectTerminal({
      container: terminalContainer.current,
    });
    terminal;
  }, [terminalContainer]);
  if (isLoading) return <LoadingBall />;
  return (
    <>
      <section className="py-48 container">
        <div className="text-center">
          {ownerInfo.keywords && (
            <AnimatedStack items={ownerInfo.keywords.split(",") ?? []} />
          )}

          <p className="my-4">{ownerInfo.info}</p>
          <a href="mailto:bagirasostene+portfolio@gmail.com">
            <button className="btn btn-primary">Contact me</button>
          </a>
        </div>
      </section>
      <section>
        <div>
          <div className="text-center py-2">
            <div className="heading">
              <h2 className="text-2xl font-bold my-12">My stack</h2>
            </div>
            <div
              className="flex flex-col gap-4 overflow-hidden scroll-m-5 relative"
              id="about-info"
            >
              {
                <AnimatedRow
                  elements={firstRowSkills}
                  renderElement={(skill) => <SkillCard skill={skill} />}
                />
              }
              {
                <AnimatedRow
                  elements={secondRowSkills}
                  animationDirection="left"
                  renderElement={(skill) => <SkillCard skill={skill} />}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;

