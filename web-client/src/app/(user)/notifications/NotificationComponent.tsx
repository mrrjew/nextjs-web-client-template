"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@/shared/Avatar";
import { NotificationService } from "@/services/NotificationService";
import { timeAgo } from "@/utils/notification";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/24/solid";

const services = new NotificationService();

const NotificationComponent = () => {
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
  };

  const getIcon = (type: string) => {
    type = type.toLowerCase();
    if (type.includes("payment"))
      return <CreditCardIcon className="w-8 h-8 text-[#3c49f3]" />;
    if (type.includes("booking"))
      return <CalendarIcon className="w-8 h-8 text-[#3c49f3]" />;
    return <BellIcon className="w-8 h-8 text-[#3c49f3]" />;
  };

  useEffect(() => {
    const getNotifications = async () => {
      const {
        data: { data },
      } = await services.list();
      setNotifications(data?.notifications);
    };
    getNotifications();
  }, []);
  return (
    <div className="flex">
      {/* left side */}
      <div className="lg:w-1/2 w-full mobile-res p-1 h-[600px] overflow-y-auto tailwind-scrollbar-hide lg:px-10">
        <h1 className="mb-4 text-3xl font-semibold">Notifications</h1>
        <nav className="flex flex-wrap gap-2 py-2 lg:flex-row mobile-view">
          <button
            className={`btn px-4 md:px-7 rounded-full ${activeTab === "all" ? "bg-[#3d49f3] text-white shadow-md" : "bg-white text-gray-700 shadow-sm"}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`btn py-2 px-4 md:px-7 rounded-full ${activeTab === "today" ? "bg-[#3d49f3] text-white shadow-md" : "bg-white text-gray-700 shadow-sm"}`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <button
            className={`btn py-2 px-4 md:px-7 rounded-full ${activeTab === "lastWeek" ? "bg-[#3d49f3] text-white shadow-md" : "bg-white text-gray-700 shadow-sm"}`}
            onClick={() => setActiveTab("lastWeek")}
          >
            Last week
          </button>
          <button
            className={`btn py-2 px-4 md:px-7 rounded-full ${activeTab === "thisMonth" ? "bg-[#3d49f3] text-white shadow-md" : "bg-white text-gray-700 shadow-sm"}`}
            onClick={() => setActiveTab("thisMonth")}
          >
            This month
          </button>
        </nav>

        {/* *********************** Showing all notifications ***************************** */}
        <h3 className="text-xl font-medium text-[#868484] my-4">Today</h3>
        {!notifications?.length && (
          <div className="text-slate-200">No Notifications Found</div>
        )}
        {notifications &&
          notifications?.map((item: any, index: any) => {
            return (
              <div className="w-full p-2 pb-1 pr-4" key={item?._id}>
                <a
                  key={index}
                  onClick={() => handleNotificationClick(item)}
                  className={`flex p-1 cursor-pointer transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative ${
                    selectedNotification?._id === item._id
                      ? "bg-gray-200 dark:bg-yellow-600"
                      : ""
                  }`}
                >
                  <div className="flex items-center w-full">
                    {" "}
                    {/* Updated container with flex and full width */}
                    <div className="flex items-center">
                      {/* <Image src={NotificationBell} height={22} width={22} alt='Notification' className='-mt-9'/> */}
                      <span className="-mt-9">{getIcon(item.type)}</span>
                      <div className="ml-3 space-y-1 sm:ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                          {item.message.length > 50
                            ? `${item.message.slice(0, 50)}...`
                            : item.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-400">
                          {timeAgo(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Image
                      src={"https://picsum.photos/200/300"}
                      height={50}
                      width={60}
                      alt="Random Image"
                      className="ml-auto w-[100px] max-h-[4.5rem] rounded-md"
                    />{" "}
                    {/* Positioned at the horizontal end */}
                  </div>
                </a>
              </div>
            );
          })}
      </div>
      {/* right side */}
      {/* ************************** Showing selected notification ************************** */}
      <div className="max-lg:hidden flex flex-1 shadow-md rounded-md bg-white min-h-[600px] mx-4">
        {selectedNotification ? (
          <div className="w-full pl-4 border-gray-200">
            <div className="flex items-center py-4 space-x-4">
              <Avatar
                imgUrl={selectedNotification.avatar}
                sizeClass="w-12 h-12"
              />
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                  {selectedNotification.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  {timeAgo(selectedNotification.createdAt)}
                </p>
              </div>
            </div>
            {/* Addition details for the selected message */}
            <div className="py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                {selectedNotification.message}
              </p>
            </div>
            {selectedNotification.href && (
              <a
                target="_black"
                href={selectedNotification.href}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Click here
              </a>
            )}
          </div>
        ) : (
          <h1 className="flex items-center justify-center font-bold text-gray-400 ml-52">
            Selected Notification here
          </h1>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
