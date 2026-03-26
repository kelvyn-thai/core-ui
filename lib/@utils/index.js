const E = (_, r = "__TREE_SHAKE_DELAY__") => new Promise((t) => setTimeout(t, _)), a = (_, r, t = "__TREE_SHAKE_SUM__") => _ + r, u = (_, r, t = "__TREE_SHAKE_SUB__") => _ - r;
function s(_, r, t, n = "__TREE_SHAKE_CLAMP__") {
  return Number.isNaN(_) ? _ : (r > t && ([r, t] = [t, r]), Math.min(t, Math.max(r, _)));
}
function c(_, r = 0, t = "__TREE_SHAKE_RANGE__") {
  const n = Math.max(0, Math.floor(_)), o = new Array(n);
  for (let e = 0; e < n; e++) o[e] = r + e;
  return o;
}
function f(_, r, t = "__TREE_SHAKE_CHUNK__") {
  const n = Math.max(1, Math.floor(r)), o = [];
  for (let e = 0; e < _.length; e += n)
    o.push(_.slice(e, e + n));
  return o;
}
function A(_, r = "__TREE_SHAKE_UNIQUE__") {
  return Array.from(new Set(_));
}
export {
  f as chunk,
  s as clamp,
  E as delay,
  c as range,
  u as sub,
  a as sum,
  A as unique
};
