"use client";
import { useEffect, useState } from "react";
import LoadingBall from "@/components/LoadingBall";
import User from "@/types/User";
import { data } from "@/data";
import Image from "next/image";

function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState<User>({});
  useEffect(() => {
    (async () => {
      setOwnerInfo(data.user);
    })();
  }, []);
  if (isLoading) return <LoadingBall />;
  return (
    <>
      <section
        id="headline"
        className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold my-3">About me</h1>
          <p id="owner-summary">{ownerInfo.summary}</p>
        </div>
        <div className="px-5">
          <Image
            src={ownerInfo.profilePic?.url}
            id="owner-image"
            width={ownerInfo.profilePic?.width}
            height={ownerInfo.profilePic?.height}
            alt="mbag's picture"
            className="w-full object-cover rounded-lg"
          />
        </div>
      </section>
      <section>
        <div className="wrapper text-center py-2">
          <div className="heading">
            <h2 className="text-2xl font-bold my-12">
              Language, tools and skills
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-3 py-3" id="about-info">
            {data.skills.map((skill) => {
              return (
                <div
                  className="card bg-black bg-opacity-30 p-2"
                  key={skill.name}
                >
                  <figure>
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      height={32}
                      width={32}
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-tile">{skill.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

