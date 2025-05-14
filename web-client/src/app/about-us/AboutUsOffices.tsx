import { Button } from "@nextui-org/react";

const AboutUsOffices = () => {
  return (
    <div className="bg-[#632DF8] -mt-20 py-20 lg:px-36 px-4 grid lg:grid-cols-2 grid-cols-1 text-white">
      <div className="mb-8 lg:mb-0 text-center lg:text-left lg:border-none border-b-2 pb-10 ">
        <p className="text-white text-2xl font-semibold pl-1">Newsletter</p>
        <p className="font-medium text-4xl mt-4 mb-4">Join our community</p>
        <p className="text-white text-base pt-3">
          Become a part of a growing community that values flexibility,
          convenience, and connectivity. Whether you are looking to manage
          living costs, find a temporary workspace, or grab that last-minute
          vacation deal, [Your Company Name] is your go-to platform.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 mb-6 lg:mb-0 ">
        <div className="text-center pt-5 lg:text-left mb-2">
          <Button
            className="w-[180px] h-[70px] border-2 rounded-xl"
            color="primary"
            variant="ghost"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsOffices;
