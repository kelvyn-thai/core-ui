import React, { useState } from "react";
import "./input.less";

export type IInput = {
  placeholder?: string;
};

const Input = ({ placeholder }: IInput) => {
  const [keySearch, setKeySearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder ?? "Type something...."}
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
        className="base-input"
      />
    </div>
  );
};

export default Input;
