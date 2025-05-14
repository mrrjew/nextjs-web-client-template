import React from "react";
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const AboutUsScenario = () => {
  return (
    <div className=" bg-white">
      <h3 className="text-center text-4xl font-bold m-auto p-4">
        Scenarios We Cater To:
      </h3>
      <br />
      <div className="sm:grid grid-cols-1 lg:grid gap-5 grid-cols-2 px-[50px] p-7 ">
        <div className="border-2 rounded-md left-[100px]">
          <br />
          <CalendarDaysIcon className="h-[50px] w-[60px] p-1 bg-violet text-white rounded-md ml-4" />
          <br />
          <h3 className="pl-[20px] text-xl font-semibold">Pre-Booked Split </h3>
          <br />
          <p className="pl-[20px] pr-2 text-base">
            Book and split the cost of accommodations seamlessly with other{" "}
            <br />
            verified users.
          </p>
          <br />
        </div>
        <div className="border-2 rounded-md">
          <br />
          <ClipboardDocumentListIcon className="h-[50px] w-[60px] p-1 bg-violet text-white rounded-md ml-5" />
          <br />
          <h3 className="pl-[20px] text-xl font-semibold">
            Wishlist Collaboration
          </h3>
          <br />
          <p className="pl-[20px] pr-2 text-base">
            Share your travel aspirations on your wishlist and find like-minded{" "}
            <br />
            travelers to make bookings together.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default AboutUsScenario;
