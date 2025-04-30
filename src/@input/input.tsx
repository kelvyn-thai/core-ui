import React from "react";
import clxs from "clsx";
import "./input.less";

export type InputProps = {
  className?: string;
  inputSize?: "small" | "medium" | "large";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  className,
  inputSize = "medium",
  ...inputProps
}: InputProps) => {
  return (
    <input
      type="text"
      className={clxs("base-input", `base-input--${inputSize}`, className)}
      {...{
        ...inputProps,
        placeholder: inputProps.placeholder ?? "Type something...",
      }}
    />
  );
};

export default Input;
