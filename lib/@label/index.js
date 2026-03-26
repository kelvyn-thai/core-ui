import { jsx as s } from "react/jsx-runtime";
import b from "clsx";
const c = ({ children: e, className: l, content: a, size: r = "medium", ...m }) => /* @__PURE__ */ s(
  "label",
  {
    ...m,
    className: b("base-label", `base-label--${r}`, l),
    children: a ?? e
  }
);
export {
  c as Label
};
