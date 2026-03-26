import { jsx as e, jsxs as g, Fragment as E } from "react/jsx-runtime";
import { useRef as y, useEffect as L, useMemo as m } from "react";
import h from "clsx";
import { S as j } from "../search-icon-DBVIkQfT.js";
function F(t, c = !0) {
  const n = y(null);
  return L(() => {
    if (!c) return;
    const s = (r) => {
      const i = n.current;
      !i || i.contains(r.target) || t(r);
    };
    return document.addEventListener("mousedown", s), document.addEventListener("touchstart", s), () => {
      document.removeEventListener("mousedown", s), document.removeEventListener("touchstart", s);
    };
  }, [t, c]), n;
}
const o = ({
  placeholder: t = "Type to search",
  label: c,
  keySearch: n,
  onChangeKeySearch: s,
  items: r,
  onSelectItem: i,
  selectedItem: _,
  isLoading: v,
  isMenuOpen: l,
  setIsMenuOpen: d,
  className: D,
  renderItem: b
}) => {
  const w = F(() => {
    d(!1);
  }, l), u = m(() => typeof n == "string" ? n.trim() : "", [n]), p = m(() => r.length === 0, [r]), f = m(() => u.length === 0, [u]), M = () => v ? /* @__PURE__ */ e(o.DropDownMenu, { children: /* @__PURE__ */ e(o.Message, { msg: "Loading..." }) }) : p && f ? /* @__PURE__ */ e(o.DropDownMenu, { children: /* @__PURE__ */ e(o.Message, { msg: "Data is empty!" }) }) : p && !f ? /* @__PURE__ */ e(o.DropDownMenu, { children: /* @__PURE__ */ e(o.Message, { msg: `No result matching '${u}'` }) }) : /* @__PURE__ */ e(o.DropDownMenu, { children: /* @__PURE__ */ e(E, { children: r.map((a) => {
    if (typeof b == "function")
      return b(a);
    const { value: N, text: C } = a, x = _?.value === N;
    return /* @__PURE__ */ e(
      "li",
      {
        role: "option",
        className: h("base-combobox__item", x && "base-combobox__item--selected"),
        onClick: () => i(a),
        "aria-selected": x,
        children: C
      },
      a.value
    );
  }) }) });
  return /* @__PURE__ */ g("div", { ref: w, className: h("base-combobox", D), children: [
    c && /* @__PURE__ */ e("div", { className: "base-combobox__label", "data-testid": "label", children: c }),
    /* @__PURE__ */ g("div", { className: "base-combobox__input-wrapper", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          placeholder: t,
          value: n,
          onChange: (a) => s(a.target.value),
          className: "base-combobox__input",
          onFocus: () => d(!0),
          "data-testid": "input"
        }
      ),
      /* @__PURE__ */ e("div", { className: "base-combobox__icon", children: /* @__PURE__ */ e(j, {}) })
    ] }),
    l && M()
  ] });
}, R = ({ msg: t }) => /* @__PURE__ */ e("li", { className: "base-combobox__message", children: t }), S = ({ children: t }) => /* @__PURE__ */ e("ul", { className: "base-combobox__dropdown", role: "listbox", "data-testid": "dropdown-menu", children: t });
o.DropDownMenu = S;
o.Message = R;
o.displayName = "Combobox";
export {
  o as Combobox,
  S as ComboboxDropdownMenu,
  R as ComboboxMessage
};
