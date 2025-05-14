import Image from "next/image";
import img from "@/images/aboutUsStats.jpg";

const AboutUsHero = () => {
  return (
    <div className="bg-slate-50 text-center m-0">
      <div className="bg-slate-100 text-center h-[331px] w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold">About Us</h1>
        <br />
        <p>
          <span className="opacity-30">Home</span> &gt;&gt; About Us
        </p>
      </div>
    </div>
  );
};

export default AboutUsHero;
