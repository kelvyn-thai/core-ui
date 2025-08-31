import { clsx } from 'clsx';
import './icon.css';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large';
}

export const Icon = ({ size = 'medium', className, children, ...iconProps }: IconProps) => {
  return (
    <span className={clsx('base-icon', `base-icon--${size}`, className)} {...{ ...iconProps }}>
      {children}
    </span>
  );
};
export default Icon;
