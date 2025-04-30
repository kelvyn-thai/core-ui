import React, { useState } from "react";
import "./combobox.less";

export type ICombobox = {
  placeholder?: string;
  label?: string;
  inputLabel?: string;
};

const Combobox = ({ placeholder, label, inputLabel }: ICombobox) => {
  const [keySearch, setKeySearch] = useState("");
  return (
    <div>
      <label>{label || "Autocomplete"}</label>
      <input
        type="text"
        placeholder="Type something...."
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
        className="base-input"
      />
    </div>
  );
};

export default Combobox;
