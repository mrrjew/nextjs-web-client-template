import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

export const ApiDrivenIcon = ({
  iconName,
  className = "mr-2 ml-0.5",
}: {
  iconName: string;
  className?: string;
}) => {
  let ApiDrivenIcon;
  if (iconName.startsWith("Ai")) {
    // @ts-ignore
    ApiDrivenIcon = AiIcons[iconName];
  } else if (iconName.startsWith("Bs")) {
    // @ts-ignore
    ApiDrivenIcon = BsIcons[iconName];
  } else if (iconName.startsWith("Fi")) {
    // @ts-ignore
    ApiDrivenIcon = FiIcons[iconName];
  } else if (iconName.startsWith("Ri")) {
    // @ts-ignore
    ApiDrivenIcon = RiIcons[iconName];
  }
  if (!ApiDrivenIcon) return <p>Icon not found!</p>;
  return <ApiDrivenIcon size={22} className={className} />;
};
