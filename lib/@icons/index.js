import { jsx as o, jsxs as n } from "react/jsx-runtime";
import { clsx as c } from "clsx";
import { S as m } from "../search-icon-DBVIkQfT.js";
const a = ({ size: r = "medium", className: t, children: e, ...s }) => /* @__PURE__ */ o("span", { className: c("base-icon", `base-icon--${r}`, t), ...s, children: e }), d = (r) => /* @__PURE__ */ n(
  "svg",
  {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...r,
    children: [
      /* @__PURE__ */ o("path", { d: "M3 6h18" }),
      /* @__PURE__ */ o("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
      /* @__PURE__ */ o("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
    ]
  }
), p = (r) => /* @__PURE__ */ n(
  "svg",
  {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...r,
    children: [
      /* @__PURE__ */ o("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }),
      /* @__PURE__ */ o("circle", { cx: "12", cy: "10", r: "3" })
    ]
  }
);
export {
  a as Icon,
  p as MapPinIcon,
  m as SearchIcon,
  d as TrashIcon
};
