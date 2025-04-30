import React, { JSX } from "react";
import clsx from "clsx";
import "./label.less";

export type ILabel = {
  children?: JSX.Element;
  size?: "small" | "medium" | "large";
  content?: string;
};

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({
  children,
  className,
  content,
  size = "medium",
  ...labelProps
}: ILabel & LabelProps) => {
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
