import React from "react";
import img from "../../assets/images/userDemoImages/SecFair.jpg";
import Image from "next/image";

const AboutUsSecFair = () => {
  return (
    <div className="px-8 bg-white relative">
      <div className="h-[551.11px] flex justify-center items-center flex-col m-auto mx-4 px-4 relative">
        <Image
          src={img}
          width={1000}
          height={1000}
          alt="stats"
          className="rounded-2xl text-black"
        />
        <div className="absolute bg-transparent text-white top-26 right-56 p-4">
          <p className="text-3xl">Security & Fairness</p>
          <p className="mt-8 pt-1">
            We are dedicated to providing a secure platform <br />
            where transactions are protected, and fairness is <br />
            paramount. Credits and refunds are meticulously <br />
            managed to ensure that all parties are satisfied with <br />
            their shared arrangements.
          </p>
        </div>
      </div>
    </div>
    // <div className="px-8 bg-white">
    // <div className="h-[551.11px] flex justify-center items-center flex-col m-auto mx-4 px-4 ">
    //     <Image
    //     src={img}
    //     width={1000}
    //     height={1000}
    //     alt="stats"
    //     className="rounded-2xl text-black"
    //     />
    // </div>
    // </div>
  );
};

export default AboutUsSecFair;
