import React, { useState } from "react";
import clxs from "clsx";
import "./input.less";

export type IInput = {
  placeholder?: string;
  inputClassName?: string;
  size?: "small" | "medium" | "large";
};

const Input = ({ placeholder, inputClassName, size }: IInput) => {
  const [keySearch, setKeySearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder ?? "Type something...."}
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
        className={clxs(
          "base-input",
          inputClassName,
          `storybook-base-input--${size}`,
        )}
      />
    </div>
  );
};

export default Input;
