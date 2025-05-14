/** @format */

import { FiKey, FiTrello, FiUser } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import {
  AiOutlineFileText,
  AiOutlineGift,
  AiOutlinePieChart,
} from "react-icons/ai";
import { LiaHeadphonesAltSolid } from "react-icons/lia";
import { BsBookmark } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { RiHotelLine } from "react-icons/ri";

export interface ProfileMenuItemsTypes {
  id: number;
  title: string;
  icon: any;
  url: string;
  child?: ProfileMenuItemsTypes[] | undefined;
}

export const ProfileMenuItems: ProfileMenuItemsTypes[] = [
  {
    id: 1,
    title: "Account",
    icon: <FiUser width={30} height={30} />,
    url: "/account",
    child: [
      {
        id: 1,
        title: "Booking",
        icon: <BsBookmark width={30} height={30} />,
        url: "/booking",
      },
      {
        id: 2,
        title: "Inbox",
        icon: <BiMessageRounded width={30} height={30} />,
        url: "/inbox",
      },
      {
        id: 3,
        title: "Space",
        icon: <RiHotelLine width={30} height={30} />,
        url: "/space",
      },
      {
        id: 4,
        title: "Business",
        icon: <AiOutlinePieChart width={30} height={30} />,
        url: "/business",
      },
    ],
  },
  {
    id: 2,
    title: "Transaction history",
    icon: <MdWorkOutline width={30} height={30} />,
    url: "/transaction-history",
  },
  {
    id: 3,
    title: "Tax information",
    icon: <AiOutlineFileText width={30} height={30} />,
    url: "/tex-information",
  },
  {
    id: 4,
    title: "Gift Card",
    icon: <AiOutlineGift width={30} height={30} />,
    url: "/gift-card",
  },
  {
    id: 5,
    title: "How Total Work",
    icon: <FiKey width={30} height={30} />,
    url: "/how-total-work",
  },
  {
    id: 6,
    title: "Contact Support",
    icon: <LiaHeadphonesAltSolid width={30} height={30} />,
    url: "/contact-support",
  },
  {
    id: 7,
    title: "Legal",
    icon: <FiTrello width={30} height={30} />,
    url: "/legal",
  },
];
