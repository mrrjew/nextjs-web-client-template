import React from "react";
import Image from "next/image";
import img from "@/images/aboutUsStats.jpg";
import mission from "../../assets/images/userDemoImages/mission.jpg";
const AboutUsMission = () => {
  return (
    <div className="bg-white pl-3">
      {/* <div className="lg:grid grid-cols-2 px-8 sm:flex justify-center items-center">
        <div className="h-[551.11px] flex justify-center items-center flex-col">
        <h3 className="text-2xl font-semibold">Our Mission</h3>
        <br />
        <p className="opacity-30">
        At Pace Dream, we strive to simplify and enhance <br />
        the way you live, work, and connect. Our platform is <br />
        designed to bring flexibility and convenience into <br />
        everyday tasks and interactions, transforming how <br />
        users engage with spaces and each other in a <br />
        dynamic world.
        </p>
        </div>
        </div> */}
      <div className="relative h-[551.11px] flex justify-center items-center flex-co">
        <Image
          src={mission}
          width={1000}
          height={1000}
          alt="stats"
          className="rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AboutUsMission;
