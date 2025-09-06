import x from "react";
import { create as C } from "zustand";
const w = (r) => Symbol.iterator in r, T = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), R = (r, t) => {
  const o = r instanceof Map ? r : new Map(r.entries()), e = t instanceof Map ? t : new Map(t.entries());
  if (o.size !== e.size)
    return !1;
  for (const [n, i] of o)
    if (!e.has(n) || !Object.is(i, e.get(n)))
      return !1;
  return !0;
}, D = (r, t) => {
  const o = r[Symbol.iterator](), e = t[Symbol.iterator]();
  let n = o.next(), i = e.next();
  for (; !n.done && !i.done; ) {
    if (!Object.is(n.value, i.value))
      return !1;
    n = o.next(), i = e.next();
  }
  return !!n.done && !!i.done;
};
function P(r, t) {
  return Object.is(r, t) ? !0 : typeof r != "object" || r === null || typeof t != "object" || t === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(t) ? !1 : w(r) && w(t) ? T(r) && T(t) ? R(r, t) : D(r, t) : R(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(t) }
  );
}
function W(r) {
  const t = x.useRef(void 0);
  return (o) => {
    const e = r(o);
    return P(t.current, e) ? t.current : t.current = e;
  };
}
const N = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1, VITE_BUNDLE_ANALYZER: "false", VITE_USER_NODE_ENV: "development" }, _ = /* @__PURE__ */ new Map(), b = (r) => {
  const t = _.get(r);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([o, e]) => [o, e.getState()])
  ) : {};
}, k = (r, t, o) => {
  if (r === void 0)
    return {
      type: "untracked",
      connection: t.connect(o)
    };
  const e = _.get(o.name);
  if (e)
    return { type: "tracked", store: r, ...e };
  const n = {
    connection: t.connect(o),
    stores: {}
  };
  return _.set(o.name, n), { type: "tracked", store: r, ...n };
}, J = (r, t) => {
  if (t === void 0) return;
  const o = _.get(r);
  o && (delete o.stores[t], Object.keys(o.stores).length === 0 && _.delete(r));
}, L = (r) => {
  var t, o;
  if (!r) return;
  const e = r.split(`
`), n = e.findIndex(
    (v) => v.includes("api.setState")
  );
  if (n < 0) return;
  const i = ((t = e[n + 1]) == null ? void 0 : t.trim()) || "";
  return (o = /.+ (.+) .+/.exec(i)) == null ? void 0 : o[1];
}, M = (r, t = {}) => (o, e, n) => {
  const { enabled: i, anonymousActionType: v, store: l, ...d } = t;
  let p;
  try {
    p = (i ?? (N ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!p)
    return r(o, e, n);
  const { connection: a, ...h } = k(l, p, d);
  let S = !0;
  n.setState = ((s, f, c) => {
    const u = o(s, f);
    if (!S) return u;
    const y = c === void 0 ? {
      type: v || L(new Error().stack) || "anonymous"
    } : typeof c == "string" ? { type: c } : c;
    return l === void 0 ? (a?.send(y, e()), u) : (a?.send(
      {
        ...y,
        type: `${l}/${y.type}`
      },
      {
        ...b(d.name),
        [l]: n.getState()
      }
    ), u);
  }), n.devtools = {
    cleanup: () => {
      a && typeof a.unsubscribe == "function" && a.unsubscribe(), J(d.name, l);
    }
  };
  const m = (...s) => {
    const f = S;
    S = !1, o(...s), S = f;
  }, g = r(n.setState, e, n);
  if (h.type === "untracked" ? a?.init(g) : (h.stores[h.store] = n, a?.init(
    Object.fromEntries(
      Object.entries(h.stores).map(([s, f]) => [
        s,
        s === h.store ? g : f.getState()
      ])
    )
  )), n.dispatchFromDevtools && typeof n.dispatch == "function") {
    let s = !1;
    const f = n.dispatch;
    n.dispatch = (...c) => {
      (N ? "production" : void 0) !== "production" && c[0].type === "__setState" && !s && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), s = !0), f(...c);
    };
  }
  return a.subscribe((s) => {
    var f;
    switch (s.type) {
      case "ACTION":
        if (typeof s.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return I(
          s.payload,
          (c) => {
            if (c.type === "__setState") {
              if (l === void 0) {
                m(c.state);
                return;
              }
              Object.keys(c.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const u = c.state[l];
              if (u == null)
                return;
              JSON.stringify(n.getState()) !== JSON.stringify(u) && m(u);
              return;
            }
            n.dispatchFromDevtools && typeof n.dispatch == "function" && n.dispatch(c);
          }
        );
      case "DISPATCH":
        switch (s.payload.type) {
          case "RESET":
            return m(g), l === void 0 ? a?.init(n.getState()) : a?.init(b(d.name));
          case "COMMIT":
            if (l === void 0) {
              a?.init(n.getState());
              return;
            }
            return a?.init(b(d.name));
          case "ROLLBACK":
            return I(s.state, (c) => {
              if (l === void 0) {
                m(c), a?.init(n.getState());
                return;
              }
              m(c[l]), a?.init(b(d.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return I(s.state, (c) => {
              if (l === void 0) {
                m(c);
                return;
              }
              JSON.stringify(n.getState()) !== JSON.stringify(c[l]) && m(c[l]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: c } = s.payload, u = (f = c.computedStates.slice(-1)[0]) == null ? void 0 : f.state;
            if (!u) return;
            m(l === void 0 ? u : u[l]), a?.send(
              null,
              // FIXME no-any
              c
            );
            return;
          }
          case "PAUSE_RECORDING":
            return S = !S;
        }
        return;
    }
  }), g;
}, U = M, I = (r, t) => {
  let o;
  try {
    o = JSON.parse(r);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  o !== void 0 && t(o);
};
function H(r, t) {
  let o;
  try {
    o = r();
  } catch {
    return;
  }
  return {
    getItem: (n) => {
      var i;
      const v = (d) => d === null ? null : JSON.parse(d, t?.reviver), l = (i = o.getItem(n)) != null ? i : null;
      return l instanceof Promise ? l.then(v) : v(l);
    },
    setItem: (n, i) => o.setItem(n, JSON.stringify(i, t?.replacer)),
    removeItem: (n) => o.removeItem(n)
  };
}
const E = (r) => (t) => {
  try {
    const o = r(t);
    return o instanceof Promise ? o : {
      then(e) {
        return E(e)(o);
      },
      catch(e) {
        return this;
      }
    };
  } catch (o) {
    return {
      then(e) {
        return this;
      },
      catch(e) {
        return E(e)(o);
      }
    };
  }
}, F = (r, t) => (o, e, n) => {
  let i = {
    storage: H(() => localStorage),
    partialize: (s) => s,
    version: 0,
    merge: (s, f) => ({
      ...f,
      ...s
    }),
    ...t
  }, v = !1;
  const l = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  let p = i.storage;
  if (!p)
    return r(
      (...s) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`
        ), o(...s);
      },
      e,
      n
    );
  const a = () => {
    const s = i.partialize({ ...e() });
    return p.setItem(i.name, {
      state: s,
      version: i.version
    });
  }, h = n.setState;
  n.setState = (s, f) => (h(s, f), a());
  const S = r(
    (...s) => (o(...s), a()),
    e,
    n
  );
  n.getInitialState = () => S;
  let m;
  const g = () => {
    var s, f;
    if (!p) return;
    v = !1, l.forEach((u) => {
      var y;
      return u((y = e()) != null ? y : S);
    });
    const c = ((f = i.onRehydrateStorage) == null ? void 0 : f.call(i, (s = e()) != null ? s : S)) || void 0;
    return E(p.getItem.bind(p))(i.name).then((u) => {
      if (u)
        if (typeof u.version == "number" && u.version !== i.version) {
          if (i.migrate) {
            const y = i.migrate(
              u.state,
              u.version
            );
            return y instanceof Promise ? y.then((O) => [!0, O]) : [!0, y];
          }
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return [!1, u.state];
      return [!1, void 0];
    }).then((u) => {
      var y;
      const [O, j] = u;
      if (m = i.merge(
        j,
        (y = e()) != null ? y : S
      ), o(m, !0), O)
        return a();
    }).then(() => {
      c?.(m, void 0), m = e(), v = !0, d.forEach((u) => u(m));
    }).catch((u) => {
      c?.(void 0, u);
    });
  };
  return n.persist = {
    setOptions: (s) => {
      i = {
        ...i,
        ...s
      }, s.storage && (p = s.storage);
    },
    clearStorage: () => {
      p?.removeItem(i.name);
    },
    getOptions: () => i,
    rehydrate: () => g(),
    hasHydrated: () => v,
    onHydrate: (s) => (l.add(s), () => {
      l.delete(s);
    }),
    onFinishHydration: (s) => (d.add(s), () => {
      d.delete(s);
    })
  }, i.skipHydration || g(), m || S;
}, z = F, A = (r, {
  devtoolsOptions: t,
  persistOptions: o
} = {}) => {
  let e = r;
  return o?.name && (e = z(r, { ...o })), t?.enabled && (e = U(e, {
    ...t
  })), [C()(e)];
}, X = () => {
  const [r] = A((t, o) => ({
    isPending: !1,
    error: null,
    data: void 0,
    setPending(e) {
      t({ isPending: e });
    },
    setData(e) {
      t({ data: e });
    },
    setError(e) {
      t({ error: e });
    },
    async executeQueryFn({ queryFn: e, queryFnFail: n, queryFnSuccess: i }) {
      let v;
      const { setPending: l, setError: d, setData: p } = o();
      try {
        l(!0), d(null), v = await e(), p(v), typeof i == "function" && i(v);
      } catch (a) {
        a instanceof Error ? d(a.message) : d(JSON.stringify(a)), typeof n == "function" && n(a);
      } finally {
        l(!1);
      }
      return v;
    }
  }));
  return r;
};
export {
  H as createJSONStorage,
  X as createQueryStore,
  A as createStore,
  W as useShallow
};
