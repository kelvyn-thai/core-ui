import { jsx as b } from "react/jsx-runtime";
import e from "clsx";
const a = ({ children: t, className: o, variant: r = "primary", size: m = "medium", ...s }) => /* @__PURE__ */ b("button", { className: e("base-button", `base-button--${r}`, `base-button--${m}`, o), ...s, children: t });
export {
  a as Button
};
