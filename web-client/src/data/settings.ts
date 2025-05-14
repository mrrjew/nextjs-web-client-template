import {
  MdOutlineSimCard,
  MdOutlineSecurity,
  MdPayment,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { IconType } from "react-icons";
import { PiTextAlignLeftFill } from "react-icons/pi";
import { LuEye } from "react-icons/lu";

interface CardData {
  icon: IconType;
  title: string;
  href?: string;
  body: string;
}

export const SETTINGS_CARD_DATA: CardData[] = [
  {
    icon: MdOutlineSimCard,
    title: "Personal Information",
    href: "/acc-setting/personal_info",
    body: "Provide personal details and how we can reach you",
  },
  {
    icon: MdOutlineSecurity,
    title: "Login & Security",
    href: "/acc-setting/login_and_security",
    body: "Update your password and secure your account",
  },
  {
    icon: MdPayment,
    title: "Payment",
    href: "/acc-setting/payment",
    body: "Review payments, coupons, and gift cards",
  },
  {
    icon: GiSettingsKnobs,
    title: "Global Preference",
    href: "/acc-setting/global_preference",
    body: "Set your default language, currency and timezone",
  },
  {
    icon: MdOutlinePrivacyTip,
    title: "Privacy & Sharing",
    href: "/acc-setting/privacy_and_sharing",
    body: "Manage your personal data, connected services, and data sharing settings",
  },
];

export const PERSONAL_SETTINGS_CARD_DATA: Partial<CardData[]> = [
  {
    icon: MdOutlinePrivacyTip,
    title: "Why isn't my info shown?",
    body: "We are hiding some account details to protect your identity",
  },
  {
    icon: PiTextAlignLeftFill,
    title: "Which details can be edited?",
    body: "Contact info and personal details can be edited. If this info was used to verify your identity, you will need to get verified again the next time you book-or to continue hosting.",
  },
  {
    icon: LuEye,
    title: "What info is shared with others",
    body: "PaceDream only releases contact info from Hosts and guests after reservation is confirmed",
  },
];
