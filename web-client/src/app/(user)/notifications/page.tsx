"use client";
import Link from "next/link";
import NotificationComponent from "./NotificationComponent";

const NotificationsPage = () => {
  return (
    <section className="bg-[#fafafa]">
      <div>
        <div className="h-[7rem] flex bg-[#FFFFFF] w-full px-12 py-10">
          <Link href="/" className="lg:ml-[5rem]">
            <button className="btn rounded-full border border-[#DAE0E6] bg-[#FFFFFF] text-sm px-5 py-3 btn-sm mobile-view ">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-4 md:px-7">
          <div className="">
            <div className="pt-5 pb-16 lg:px-5">
              <NotificationComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsPage;
