import { jsx as e, jsxs as i, Fragment as y } from "react/jsx-runtime";
import l, { clsx as C } from "clsx";
import { useMemo as m } from "react";
import { useClickOutside as L } from "./@hook/index.js";
import { chunk as z, clamp as A, delay as G, range as K, sub as O, sum as P, unique as U } from "./@utils/index.js";
import { createJSONStorage as Y, createQueryStore as Z, createStore as ee, useShallow as oe } from "./@zustand/index.js";
const E = ({ className: o, inputSize: s = "medium", ...t }) => /* @__PURE__ */ e(
  "input",
  {
    type: "text",
    className: l("base-input", `base-input--${s}`, o),
    ...t,
    placeholder: t.placeholder ?? "Type something..."
  }
), F = ({ size: o = "medium", className: s, children: t, ...r }) => /* @__PURE__ */ e("span", { className: C("base-icon", `base-icon--${o}`, s), ...r, children: t }), $ = (o) => /* @__PURE__ */ i(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...o,
    children: [
      /* @__PURE__ */ e("path", { d: "m21 21-4.34-4.34" }),
      /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "8" })
    ]
  }
), V = (o) => /* @__PURE__ */ i(
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
    ...o,
    children: [
      /* @__PURE__ */ e("path", { d: "M3 6h18" }),
      /* @__PURE__ */ e("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
      /* @__PURE__ */ e("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
    ]
  }
), q = (o) => /* @__PURE__ */ i(
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
    ...o,
    children: [
      /* @__PURE__ */ e("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }),
      /* @__PURE__ */ e("circle", { cx: "12", cy: "10", r: "3" })
    ]
  }
), H = ({ children: o, className: s, content: t, size: r = "medium", ...a }) => /* @__PURE__ */ e(
  "label",
  {
    ...a,
    className: l("base-label", `base-label--${r}`, s),
    children: t ?? o
  }
), n = ({
  placeholder: o = "Type to search",
  label: s,
  keySearch: t,
  onChangeKeySearch: r,
  items: a,
  onSelectItem: w,
  selectedItem: v,
  isLoading: f,
  isMenuOpen: d,
  setIsMenuOpen: b,
  className: M,
  renderItem: p
}) => {
  const _ = L(() => {
    b(!1);
  }, d), u = m(() => typeof t == "string" ? t.trim() : "", [t]), h = m(() => a.length === 0, [a]), x = m(() => u.length === 0, [u]), N = () => f ? /* @__PURE__ */ e(n.DropDownMenu, { children: /* @__PURE__ */ e(n.Message, { msg: "Loading..." }) }) : h && x ? /* @__PURE__ */ e(n.DropDownMenu, { children: /* @__PURE__ */ e(n.Message, { msg: "Data is empty!" }) }) : h && !x ? /* @__PURE__ */ e(n.DropDownMenu, { children: /* @__PURE__ */ e(n.Message, { msg: `No result matching '${u}'` }) }) : /* @__PURE__ */ e(n.DropDownMenu, { children: /* @__PURE__ */ e(y, { children: a.map((c) => {
    if (typeof p == "function")
      return p(c);
    const { value: D, text: k } = c, g = v?.value === D;
    return /* @__PURE__ */ e(
      "li",
      {
        role: "option",
        className: l("base-combobox__item", g && "base-combobox__item--selected"),
        onClick: () => w(c),
        "aria-selected": g,
        children: k
      },
      c.value
    );
  }) }) });
  return /* @__PURE__ */ i("div", { ref: _, className: l("base-combobox", M), children: [
    s && /* @__PURE__ */ e("div", { className: "base-combobox__label", "data-testid": "label", children: s }),
    /* @__PURE__ */ i("div", { className: "base-combobox__input-wrapper", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          placeholder: o,
          value: t,
          onChange: (c) => r(c.target.value),
          className: "base-combobox__input",
          onFocus: () => b(!0),
          "data-testid": "input"
        }
      ),
      /* @__PURE__ */ e("div", { className: "base-combobox__icon", children: /* @__PURE__ */ e($, {}) })
    ] }),
    d && N()
  ] });
}, j = ({ msg: o }) => /* @__PURE__ */ e("li", { className: "base-combobox__message", children: o }), S = ({ children: o }) => /* @__PURE__ */ e("ul", { className: "base-combobox__dropdown", role: "listbox", "data-testid": "dropdown-menu", children: o });
n.DropDownMenu = S;
n.Message = j;
n.displayName = "Combobox";
const J = ({ children: o, className: s, variant: t = "primary", size: r = "medium", ...a }) => /* @__PURE__ */ e("button", { className: l("base-button", `base-button--${t}`, `base-button--${r}`, s), ...a, children: o });
export {
  J as Button,
  n as Combobox,
  S as ComboboxDropdownMenu,
  j as ComboboxMessage,
  F as Icon,
  E as Input,
  H as Label,
  q as MapPinIcon,
  $ as SearchIcon,
  V as TrashIcon,
  z as chunk,
  A as clamp,
  Y as createJSONStorage,
  Z as createQueryStore,
  ee as createStore,
  G as delay,
  K as range,
  O as sub,
  P as sum,
  U as unique,
  L as useClickOutside,
  oe as useShallow
};
