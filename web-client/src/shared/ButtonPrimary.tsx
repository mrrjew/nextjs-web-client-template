import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 border border-neutral-400 bg-violet hover:bg-white text-white hover:text-violet ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
