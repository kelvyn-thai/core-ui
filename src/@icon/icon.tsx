import { clsx } from "clsx";
import "./icon.less";

export type IconProps = {
  size?: "xs" | "sm" | "lg" | "xl" | "2xl";
} & React.HTMLAttributes<HTMLSpanElement>;

const Icon = ({ size, className, children, ...iconProps }: IconProps) => {
  return (
    <span
      className={clsx("base-icon", `base-icon--${size}`, className)}
      {...{ ...iconProps }}
    >
      {children}
    </span>
  );
};

export default Icon;
