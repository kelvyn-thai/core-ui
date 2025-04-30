import React, { JSX } from "react";
import clsx from "clsx";
import "./label.less";

export type LabelProps = {
  children?: JSX.Element;
  size?: "small" | "medium" | "large";
  content?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({
  children,
  className,
  content,
  size = "medium",
  ...labelProps
}: LabelProps) => {
  return (
    <label
      {...{
        ...labelProps,
        className: clsx("base-label", `base-label--${size}`, className),
      }}
    >
      {content ?? children}
    </label>
  );
};

export default Label;
