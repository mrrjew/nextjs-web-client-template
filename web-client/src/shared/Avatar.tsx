"use client";
import { avatarColors } from "@/contains/contants";
import React, { FC, use, useEffect, useState } from "react";
import avatar1 from "@/images/avatars/profile-circle.png";
import Image, { StaticImageData } from "next/image";
import { useProfile } from "@/context";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string | StaticImageData;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl = avatar1,
  userName,
  hasChecked,
  hasCheckedClass = "w-4 h-4 -top-0.5 -right-0.5",
}) => {
  const { user }: any = useProfile();

  // const url = user?.profilePic || '';
  // const name = user?.first_name|| 'John Doe';

  const [url, setUrl] = useState<string | StaticImageData | undefined>("");
  const [name, setName] = useState<string>("John Doe");

  useEffect(() => {
    if (user) {
      setUrl(user?.profilePic);
      setName(user?.first_name);
    }
  }, [user]);

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name?.charCodeAt(0) % avatarColors.length,
    );
    return avatarColors[backgroundIndex];
  };
  if (user) {
    return (
      <div
        className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
        style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
      >
        {url && (
          <Image
            width={20}
            height={20}
            className={`absolute inset-0 w-full h-full object-cover ${radius}`}
            src={url}
            alt={name}
          />
        )}
        <span className="wil-avatar__name">{name?.[0]}</span>

        {hasChecked && (
          <span
            className={` bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  ${hasCheckedClass}`}
          >
            <i className="las la-check"></i>
          </span>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold  ${radius} ${sizeClass} ${containerClassName}`}
      >
        <Image
          width={20}
          height={20}
          className={`absolute h-[70%] w-[70%] object-cover ${radius}`}
          src={avatar1}
          alt={name}
        />
      </div>
    );
  }
};

export default Avatar;
