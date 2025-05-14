import React, { HTMLAttributes, ReactNode } from "react";

export interface Heading4Props extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading4: React.FC<Heading4Props> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  ...args
}) => {
  return (
    <div className={`nc-Section-Heading4 relative ${className}`}>
      <div
        className={
          isCenter
            ? "text-center w-full md:max-w-2xl mx-auto mb-4"
            : "max-w-2xl"
        }
      >
        <h2
          className={`text-[#192946] text-3xl md:text-4xl font-semibold mb-6`}
          {...args}
        >
          {children || `Section Heading4`}
        </h2>
        {desc && (
          <span className="block mt-2 md:mt-3 text-center font-normal lg:text-base text-neutral-500">
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading4;
