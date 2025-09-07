import { jsx as m } from "react/jsx-runtime";
import o from "clsx";
const a = ({ className: t, inputSize: p = "medium", ...e }) => /* @__PURE__ */ m(
  "input",
  {
    type: "text",
    className: o("base-input", `base-input--${p}`, t),
    ...e,
    placeholder: e.placeholder ?? "Type something..."
  }
);
export {
  a as Input
};
