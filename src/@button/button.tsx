import React from "react";
import clsx from "clsx";
import "./button.less";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "base-btn",
        `base-btn--${variant}`,
        `base-btn--${size}`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
