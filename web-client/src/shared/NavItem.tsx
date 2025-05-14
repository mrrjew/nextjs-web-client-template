"use client";

import React, { FC, ReactNode } from "react";
import twFocusClass from "@/utils/twFocusClass";

export interface NavItemProps {
  className?: string;
  radius?: string;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  children?: ReactNode;
}

const NavItem: FC<NavItemProps> = ({
  className = "py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
}) => {
  return (
    <li className="nc-NavItem relative" data-nc-id="NavItem">
      {renderX && renderX}
      <button
        className={`block !leading-none font-medium whitespace-nowrap ${className} ${
          isActive
            ? "text-violet border-b-2 border-violet pb-8"
            : "text-neutral-500 hover:text-violet dark:hover:text-violet pb-8"
        } ${twFocusClass()}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {children}
      </button>
    </li>
  );
};

export default NavItem;
