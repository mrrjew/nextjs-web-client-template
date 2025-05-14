import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonShowMoreProps extends ButtonProps {}

const ButtonShowMore: React.FC<ButtonShowMoreProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonShowMore disabled:bg-opacity-70 border border-neutral-400 hover:bg-violet bg-white hover:text-white text-violet ${className}`}
      {...args}
    />
  );
};

export default ButtonShowMore;
