import { useRef as s, useEffect as c } from "react";
function m(t, n = !0) {
  const r = s(null);
  return c(() => {
    if (!n) return;
    const e = (o) => {
      const u = r.current;
      !u || u.contains(o.target) || t(o);
    };
    return document.addEventListener("mousedown", e), document.addEventListener("touchstart", e), () => {
      document.removeEventListener("mousedown", e), document.removeEventListener("touchstart", e);
    };
  }, [t, n]), r;
}
export {
  m as useClickOutside
};
