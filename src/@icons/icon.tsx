import { clsx } from "clsx";
import "./icon.less";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Icon = ({
  size = "md",
  className,
  children,
  ...iconProps
}: IconProps) => {
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
