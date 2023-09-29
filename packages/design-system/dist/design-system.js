function Tr(f) {
  var s, I, O = "";
  if (typeof f == "string" || typeof f == "number")
    O += f;
  else if (typeof f == "object")
    if (Array.isArray(f))
      for (s = 0; s < f.length; s++)
        f[s] && (I = Tr(f[s])) && (O && (O += " "), O += I);
    else
      for (s in f)
        f[s] && (O && (O += " "), O += s);
  return O;
}
function ce() {
  for (var f, s, I = 0, O = ""; I < arguments.length; )
    (f = arguments[I++]) && (s = Tr(f)) && (O && (O += " "), O += s);
  return O;
}
const Mt = (f) => /* @__PURE__ */ React.createElement(
  "button",
  {
    ...f,
    className: ce(
      "c-main-menu--button",
      f.variant === "primary" && "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
      f.variant === "secondary" && "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    )
  },
  f.children
);
function xt(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var kr = { exports: {} }, v = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sr;
function Lt() {
  if (Sr)
    return v;
  Sr = 1;
  var f = Symbol.for("react.element"), s = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), fe = Symbol.for("react.profiler"), H = Symbol.for("react.provider"), ee = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), q = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), W = Symbol.iterator;
  function ne(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var F = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Y = Object.assign, le = {};
  function x(t, u, p) {
    this.props = t, this.context = u, this.refs = le, this.updater = p || F;
  }
  x.prototype.isReactComponent = {}, x.prototype.setState = function(t, u) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, u, "setState");
  }, x.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function de() {
  }
  de.prototype = x.prototype;
  function K(t, u, p) {
    this.props = t, this.context = u, this.refs = le, this.updater = p || F;
  }
  var G = K.prototype = new de();
  G.constructor = K, Y(G, x.prototype), G.isPureReactComponent = !0;
  var L = Array.isArray, k = Object.prototype.hasOwnProperty, $ = { current: null }, N = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(t, u, p) {
    var m, y = {}, _ = null, S = null;
    if (u != null)
      for (m in u.ref !== void 0 && (S = u.ref), u.key !== void 0 && (_ = "" + u.key), u)
        k.call(u, m) && !N.hasOwnProperty(m) && (y[m] = u[m]);
    var b = arguments.length - 2;
    if (b === 1)
      y.children = p;
    else if (1 < b) {
      for (var E = Array(b), A = 0; A < b; A++)
        E[A] = arguments[A + 2];
      y.children = E;
    }
    if (t && t.defaultProps)
      for (m in b = t.defaultProps, b)
        y[m] === void 0 && (y[m] = b[m]);
    return { $$typeof: f, type: t, key: _, ref: S, props: y, _owner: $.current };
  }
  function pe(t, u) {
    return { $$typeof: f, type: t.type, key: u, ref: t.ref, props: t.props, _owner: t._owner };
  }
  function ae(t) {
    return typeof t == "object" && t !== null && t.$$typeof === f;
  }
  function ke(t) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(p) {
      return u[p];
    });
  }
  var ve = /\/+/g;
  function oe(t, u) {
    return typeof t == "object" && t !== null && t.key != null ? ke("" + t.key) : u.toString(36);
  }
  function Q(t, u, p, m, y) {
    var _ = typeof t;
    (_ === "undefined" || _ === "boolean") && (t = null);
    var S = !1;
    if (t === null)
      S = !0;
    else
      switch (_) {
        case "string":
        case "number":
          S = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case f:
            case s:
              S = !0;
          }
      }
    if (S)
      return S = t, y = y(S), t = m === "" ? "." + oe(S, 0) : m, L(y) ? (p = "", t != null && (p = t.replace(ve, "$&/") + "/"), Q(y, u, p, "", function(A) {
        return A;
      })) : y != null && (ae(y) && (y = pe(y, p + (!y.key || S && S.key === y.key ? "" : ("" + y.key).replace(ve, "$&/") + "/") + t)), u.push(y)), 1;
    if (S = 0, m = m === "" ? "." : m + ":", L(t))
      for (var b = 0; b < t.length; b++) {
        _ = t[b];
        var E = m + oe(_, b);
        S += Q(_, u, p, E, y);
      }
    else if (E = ne(t), typeof E == "function")
      for (t = E.call(t), b = 0; !(_ = t.next()).done; )
        _ = _.value, E = m + oe(_, b++), S += Q(_, u, p, E, y);
    else if (_ === "object")
      throw u = String(t), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
    return S;
  }
  function D(t, u, p) {
    if (t == null)
      return t;
    var m = [], y = 0;
    return Q(t, m, "", "", function(_) {
      return u.call(p, _, y++);
    }), m;
  }
  function M(t) {
    if (t._status === -1) {
      var u = t._result;
      u = u(), u.then(function(p) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = p);
      }, function(p) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = p);
      }), t._status === -1 && (t._status = 0, t._result = u);
    }
    if (t._status === 1)
      return t._result.default;
    throw t._result;
  }
  var l = { current: null }, B = { transition: null }, ye = { ReactCurrentDispatcher: l, ReactCurrentBatchConfig: B, ReactCurrentOwner: $ };
  return v.Children = { map: D, forEach: function(t, u, p) {
    D(t, function() {
      u.apply(this, arguments);
    }, p);
  }, count: function(t) {
    var u = 0;
    return D(t, function() {
      u++;
    }), u;
  }, toArray: function(t) {
    return D(t, function(u) {
      return u;
    }) || [];
  }, only: function(t) {
    if (!ae(t))
      throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  } }, v.Component = x, v.Fragment = I, v.Profiler = fe, v.PureComponent = K, v.StrictMode = O, v.Suspense = te, v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye, v.cloneElement = function(t, u, p) {
    if (t == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
    var m = Y({}, t.props), y = t.key, _ = t.ref, S = t._owner;
    if (u != null) {
      if (u.ref !== void 0 && (_ = u.ref, S = $.current), u.key !== void 0 && (y = "" + u.key), t.type && t.type.defaultProps)
        var b = t.type.defaultProps;
      for (E in u)
        k.call(u, E) && !N.hasOwnProperty(E) && (m[E] = u[E] === void 0 && b !== void 0 ? b[E] : u[E]);
    }
    var E = arguments.length - 2;
    if (E === 1)
      m.children = p;
    else if (1 < E) {
      b = Array(E);
      for (var A = 0; A < E; A++)
        b[A] = arguments[A + 2];
      m.children = b;
    }
    return { $$typeof: f, type: t.type, key: y, ref: _, props: m, _owner: S };
  }, v.createContext = function(t) {
    return t = { $$typeof: ee, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: H, _context: t }, t.Consumer = t;
  }, v.createElement = z, v.createFactory = function(t) {
    var u = z.bind(null, t);
    return u.type = t, u;
  }, v.createRef = function() {
    return { current: null };
  }, v.forwardRef = function(t) {
    return { $$typeof: re, render: t };
  }, v.isValidElement = ae, v.lazy = function(t) {
    return { $$typeof: U, _payload: { _status: -1, _result: t }, _init: M };
  }, v.memo = function(t, u) {
    return { $$typeof: q, type: t, compare: u === void 0 ? null : u };
  }, v.startTransition = function(t) {
    var u = B.transition;
    B.transition = {};
    try {
      t();
    } finally {
      B.transition = u;
    }
  }, v.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, v.useCallback = function(t, u) {
    return l.current.useCallback(t, u);
  }, v.useContext = function(t) {
    return l.current.useContext(t);
  }, v.useDebugValue = function() {
  }, v.useDeferredValue = function(t) {
    return l.current.useDeferredValue(t);
  }, v.useEffect = function(t, u) {
    return l.current.useEffect(t, u);
  }, v.useId = function() {
    return l.current.useId();
  }, v.useImperativeHandle = function(t, u, p) {
    return l.current.useImperativeHandle(t, u, p);
  }, v.useInsertionEffect = function(t, u) {
    return l.current.useInsertionEffect(t, u);
  }, v.useLayoutEffect = function(t, u) {
    return l.current.useLayoutEffect(t, u);
  }, v.useMemo = function(t, u) {
    return l.current.useMemo(t, u);
  }, v.useReducer = function(t, u, p) {
    return l.current.useReducer(t, u, p);
  }, v.useRef = function(t) {
    return l.current.useRef(t);
  }, v.useState = function(t) {
    return l.current.useState(t);
  }, v.useSyncExternalStore = function(t, u, p) {
    return l.current.useSyncExternalStore(t, u, p);
  }, v.useTransition = function() {
    return l.current.useTransition();
  }, v.version = "18.2.0", v;
}
var Te = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Or;
function Nt() {
  return Or || (Or = 1, function(f, s) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var I = "18.2.0", O = Symbol.for("react.element"), fe = Symbol.for("react.portal"), H = Symbol.for("react.fragment"), ee = Symbol.for("react.strict_mode"), re = Symbol.for("react.profiler"), te = Symbol.for("react.provider"), q = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), x = Symbol.iterator, de = "@@iterator";
      function K(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = x && e[x] || e[de];
        return typeof r == "function" ? r : null;
      }
      var G = {
        current: null
      }, L = {
        transition: null
      }, k = {
        current: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, $ = {
        current: null
      }, N = {}, z = null;
      function pe(e) {
        z = e;
      }
      N.setExtraStackFrame = function(e) {
        z = e;
      }, N.getCurrentStack = null, N.getStackAddendum = function() {
        var e = "";
        z && (e += z);
        var r = N.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var ae = !1, ke = !1, ve = !1, oe = !1, Q = !1, D = {
        ReactCurrentDispatcher: G,
        ReactCurrentBatchConfig: L,
        ReactCurrentOwner: $
      };
      D.ReactDebugCurrentFrame = N, D.ReactCurrentActQueue = k;
      function M(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          B("warn", e, n);
        }
      }
      function l(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          B("error", e, n);
        }
      }
      function B(e, r, n) {
        {
          var a = D.ReactDebugCurrentFrame, o = a.getStackAddendum();
          o !== "" && (r += "%s", n = n.concat([o]));
          var c = n.map(function(i) {
            return String(i);
          });
          c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
        }
      }
      var ye = {};
      function t(e, r) {
        {
          var n = e.constructor, a = n && (n.displayName || n.name) || "ReactClass", o = a + "." + r;
          if (ye[o])
            return;
          l("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, a), ye[o] = !0;
        }
      }
      var u = {
        isMounted: function(e) {
          return !1;
        },
        enqueueForceUpdate: function(e, r, n) {
          t(e, "forceUpdate");
        },
        enqueueReplaceState: function(e, r, n, a) {
          t(e, "replaceState");
        },
        enqueueSetState: function(e, r, n, a) {
          t(e, "setState");
        }
      }, p = Object.assign, m = {};
      Object.freeze(m);
      function y(e, r, n) {
        this.props = e, this.context = r, this.refs = m, this.updater = n || u;
      }
      y.prototype.isReactComponent = {}, y.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, y.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var _ = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, S = function(e, r) {
          Object.defineProperty(y.prototype, e, {
            get: function() {
              M("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var b in _)
          _.hasOwnProperty(b) && S(b, _[b]);
      }
      function E() {
      }
      E.prototype = y.prototype;
      function A(e, r, n) {
        this.props = e, this.context = r, this.refs = m, this.updater = n || u;
      }
      var Pe = A.prototype = new E();
      Pe.constructor = A, p(Pe, y.prototype), Pe.isPureReactComponent = !0;
      function Pr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Ar = Array.isArray;
      function he(e) {
        return Ar(e);
      }
      function jr(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return n;
        }
      }
      function $r(e) {
        try {
          return Ye(e), !1;
        } catch {
          return !0;
        }
      }
      function Ye(e) {
        return "" + e;
      }
      function me(e) {
        if ($r(e))
          return l("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jr(e)), Ye(e);
      }
      function Ir(e, r, n) {
        var a = e.displayName;
        if (a)
          return a;
        var o = r.displayName || r.name || "";
        return o !== "" ? n + "(" + o + ")" : n;
      }
      function ze(e) {
        return e.displayName || "Context";
      }
      function V(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && l("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case H:
            return "Fragment";
          case fe:
            return "Portal";
          case re:
            return "Profiler";
          case ee:
            return "StrictMode";
          case W:
            return "Suspense";
          case ne:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case q:
              var r = e;
              return ze(r) + ".Consumer";
            case te:
              var n = e;
              return ze(n._context) + ".Provider";
            case U:
              return Ir(e, e.render, "ForwardRef");
            case F:
              var a = e.displayName || null;
              return a !== null ? a : V(e.type) || "Memo";
            case Y: {
              var o = e, c = o._payload, i = o._init;
              try {
                return V(i(c));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ue = Object.prototype.hasOwnProperty, Be = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, He, qe, Ae;
      Ae = {};
      function Ke(e) {
        if (ue.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Ge(e) {
        if (ue.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Dr(e, r) {
        var n = function() {
          He || (He = !0, l("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
      function Fr(e, r) {
        var n = function() {
          qe || (qe = !0, l("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
      function xr(e) {
        if (typeof e.ref == "string" && $.current && e.__self && $.current.stateNode !== e.__self) {
          var r = V($.current.type);
          Ae[r] || (l('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Ae[r] = !0);
        }
      }
      var je = function(e, r, n, a, o, c, i) {
        var d = {
          $$typeof: O,
          type: e,
          key: r,
          ref: n,
          props: i,
          _owner: c
        };
        return d._store = {}, Object.defineProperty(d._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(d, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: a
        }), Object.defineProperty(d, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.freeze && (Object.freeze(d.props), Object.freeze(d)), d;
      };
      function Lr(e, r, n) {
        var a, o = {}, c = null, i = null, d = null, h = null;
        if (r != null) {
          Ke(r) && (i = r.ref, xr(r)), Ge(r) && (me(r.key), c = "" + r.key), d = r.__self === void 0 ? null : r.__self, h = r.__source === void 0 ? null : r.__source;
          for (a in r)
            ue.call(r, a) && !Be.hasOwnProperty(a) && (o[a] = r[a]);
        }
        var g = arguments.length - 2;
        if (g === 1)
          o.children = n;
        else if (g > 1) {
          for (var R = Array(g), C = 0; C < g; C++)
            R[C] = arguments[C + 2];
          Object.freeze && Object.freeze(R), o.children = R;
        }
        if (e && e.defaultProps) {
          var w = e.defaultProps;
          for (a in w)
            o[a] === void 0 && (o[a] = w[a]);
        }
        if (c || i) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && Dr(o, T), i && Fr(o, T);
        }
        return je(e, c, i, d, h, $.current, o);
      }
      function Nr(e, r) {
        var n = je(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return n;
      }
      function Mr(e, r, n) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var a, o = p({}, e.props), c = e.key, i = e.ref, d = e._self, h = e._source, g = e._owner;
        if (r != null) {
          Ke(r) && (i = r.ref, g = $.current), Ge(r) && (me(r.key), c = "" + r.key);
          var R;
          e.type && e.type.defaultProps && (R = e.type.defaultProps);
          for (a in r)
            ue.call(r, a) && !Be.hasOwnProperty(a) && (r[a] === void 0 && R !== void 0 ? o[a] = R[a] : o[a] = r[a]);
        }
        var C = arguments.length - 2;
        if (C === 1)
          o.children = n;
        else if (C > 1) {
          for (var w = Array(C), T = 0; T < C; T++)
            w[T] = arguments[T + 2];
          o.children = w;
        }
        return je(e.type, c, i, d, h, g, o);
      }
      function J(e) {
        return typeof e == "object" && e !== null && e.$$typeof === O;
      }
      var Qe = ".", Vr = ":";
      function Ur(e) {
        var r = /[=:]/g, n = {
          "=": "=0",
          ":": "=2"
        }, a = e.replace(r, function(o) {
          return n[o];
        });
        return "$" + a;
      }
      var Je = !1, Wr = /\/+/g;
      function Xe(e) {
        return e.replace(Wr, "$&/");
      }
      function $e(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (me(e.key), Ur("" + e.key)) : r.toString(36);
      }
      function ge(e, r, n, a, o) {
        var c = typeof e;
        (c === "undefined" || c === "boolean") && (e = null);
        var i = !1;
        if (e === null)
          i = !0;
        else
          switch (c) {
            case "string":
            case "number":
              i = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case O:
                case fe:
                  i = !0;
              }
          }
        if (i) {
          var d = e, h = o(d), g = a === "" ? Qe + $e(d, 0) : a;
          if (he(h)) {
            var R = "";
            g != null && (R = Xe(g) + "/"), ge(h, r, R, "", function(Ft) {
              return Ft;
            });
          } else
            h != null && (J(h) && (h.key && (!d || d.key !== h.key) && me(h.key), h = Nr(
              h,
              n + (h.key && (!d || d.key !== h.key) ? Xe("" + h.key) + "/" : "") + g
            )), r.push(h));
          return 1;
        }
        var C, w, T = 0, P = a === "" ? Qe : a + Vr;
        if (he(e))
          for (var Oe = 0; Oe < e.length; Oe++)
            C = e[Oe], w = P + $e(C, Oe), T += ge(C, r, n, w, o);
        else {
          var Ue = K(e);
          if (typeof Ue == "function") {
            var Rr = e;
            Ue === Rr.entries && (Je || M("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Je = !0);
            for (var It = Ue.call(Rr), Cr, Dt = 0; !(Cr = It.next()).done; )
              C = Cr.value, w = P + $e(C, Dt++), T += ge(C, r, n, w, o);
          } else if (c === "object") {
            var wr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (wr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : wr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return T;
      }
      function _e(e, r, n) {
        if (e == null)
          return e;
        var a = [], o = 0;
        return ge(e, a, "", "", function(c) {
          return r.call(n, c, o++);
        }), a;
      }
      function Yr(e) {
        var r = 0;
        return _e(e, function() {
          r++;
        }), r;
      }
      function zr(e, r, n) {
        _e(e, function() {
          r.apply(this, arguments);
        }, n);
      }
      function Br(e) {
        return _e(e, function(r) {
          return r;
        }) || [];
      }
      function Hr(e) {
        if (!J(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function qr(e) {
        var r = {
          $$typeof: q,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: te,
          _context: r
        };
        var n = !1, a = !1, o = !1;
        {
          var c = {
            $$typeof: q,
            _context: r
          };
          Object.defineProperties(c, {
            Provider: {
              get: function() {
                return a || (a = !0, l("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(i) {
                r.Provider = i;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(i) {
                r._currentValue = i;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(i) {
                r._currentValue2 = i;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(i) {
                r._threadCount = i;
              }
            },
            Consumer: {
              get: function() {
                return n || (n = !0, l("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(i) {
                o || (M("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", i), o = !0);
              }
            }
          }), r.Consumer = c;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var ie = -1, Ie = 0, Ze = 1, Kr = 2;
      function Gr(e) {
        if (e._status === ie) {
          var r = e._result, n = r();
          if (n.then(function(c) {
            if (e._status === Ie || e._status === ie) {
              var i = e;
              i._status = Ze, i._result = c;
            }
          }, function(c) {
            if (e._status === Ie || e._status === ie) {
              var i = e;
              i._status = Kr, i._result = c;
            }
          }), e._status === ie) {
            var a = e;
            a._status = Ie, a._result = n;
          }
        }
        if (e._status === Ze) {
          var o = e._result;
          return o === void 0 && l(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, o), "default" in o || l(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, o), o.default;
        } else
          throw e._result;
      }
      function Qr(e) {
        var r = {
          _status: ie,
          _result: e
        }, n = {
          $$typeof: Y,
          _payload: r,
          _init: Gr
        };
        {
          var a, o;
          Object.defineProperties(n, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return a;
              },
              set: function(c) {
                l("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), a = c, Object.defineProperty(n, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(c) {
                l("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = c, Object.defineProperty(n, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return n;
      }
      function Jr(e) {
        e != null && e.$$typeof === F ? l("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? l("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && l("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && l("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: U,
          render: e
        };
        {
          var n;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return n;
            },
            set: function(a) {
              n = a, !e.name && !e.displayName && (e.displayName = a);
            }
          });
        }
        return r;
      }
      var er;
      er = Symbol.for("react.module.reference");
      function rr(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === H || e === re || Q || e === ee || e === W || e === ne || oe || e === le || ae || ke || ve || typeof e == "object" && e !== null && (e.$$typeof === Y || e.$$typeof === F || e.$$typeof === te || e.$$typeof === q || e.$$typeof === U || e.$$typeof === er || e.getModuleId !== void 0));
      }
      function Xr(e, r) {
        rr(e) || l("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var n = {
          $$typeof: F,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var a;
          Object.defineProperty(n, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(o) {
              a = o, !e.name && !e.displayName && (e.displayName = o);
            }
          });
        }
        return n;
      }
      function j() {
        var e = G.current;
        return e === null && l(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function Zr(e) {
        var r = j();
        if (e._context !== void 0) {
          var n = e._context;
          n.Consumer === e ? l("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : n.Provider === e && l("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function et(e) {
        var r = j();
        return r.useState(e);
      }
      function rt(e, r, n) {
        var a = j();
        return a.useReducer(e, r, n);
      }
      function tt(e) {
        var r = j();
        return r.useRef(e);
      }
      function nt(e, r) {
        var n = j();
        return n.useEffect(e, r);
      }
      function at(e, r) {
        var n = j();
        return n.useInsertionEffect(e, r);
      }
      function ot(e, r) {
        var n = j();
        return n.useLayoutEffect(e, r);
      }
      function ut(e, r) {
        var n = j();
        return n.useCallback(e, r);
      }
      function it(e, r) {
        var n = j();
        return n.useMemo(e, r);
      }
      function st(e, r, n) {
        var a = j();
        return a.useImperativeHandle(e, r, n);
      }
      function ct(e, r) {
        {
          var n = j();
          return n.useDebugValue(e, r);
        }
      }
      function ft() {
        var e = j();
        return e.useTransition();
      }
      function lt(e) {
        var r = j();
        return r.useDeferredValue(e);
      }
      function dt() {
        var e = j();
        return e.useId();
      }
      function pt(e, r, n) {
        var a = j();
        return a.useSyncExternalStore(e, r, n);
      }
      var se = 0, tr, nr, ar, or, ur, ir, sr;
      function cr() {
      }
      cr.__reactDisabledLog = !0;
      function vt() {
        {
          if (se === 0) {
            tr = console.log, nr = console.info, ar = console.warn, or = console.error, ur = console.group, ir = console.groupCollapsed, sr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: cr,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          se++;
        }
      }
      function yt() {
        {
          if (se--, se === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: p({}, e, {
                value: tr
              }),
              info: p({}, e, {
                value: nr
              }),
              warn: p({}, e, {
                value: ar
              }),
              error: p({}, e, {
                value: or
              }),
              group: p({}, e, {
                value: ur
              }),
              groupCollapsed: p({}, e, {
                value: ir
              }),
              groupEnd: p({}, e, {
                value: sr
              })
            });
          }
          se < 0 && l("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var De = D.ReactCurrentDispatcher, Fe;
      function be(e, r, n) {
        {
          if (Fe === void 0)
            try {
              throw Error();
            } catch (o) {
              var a = o.stack.trim().match(/\n( *(at )?)/);
              Fe = a && a[1] || "";
            }
          return `
` + Fe + e;
        }
      }
      var xe = !1, Ee;
      {
        var ht = typeof WeakMap == "function" ? WeakMap : Map;
        Ee = new ht();
      }
      function fr(e, r) {
        if (!e || xe)
          return "";
        {
          var n = Ee.get(e);
          if (n !== void 0)
            return n;
        }
        var a;
        xe = !0;
        var o = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var c;
        c = De.current, De.current = null, vt();
        try {
          if (r) {
            var i = function() {
              throw Error();
            };
            if (Object.defineProperty(i.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(i, []);
              } catch (P) {
                a = P;
              }
              Reflect.construct(e, [], i);
            } else {
              try {
                i.call();
              } catch (P) {
                a = P;
              }
              e.call(i.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (P) {
              a = P;
            }
            e();
          }
        } catch (P) {
          if (P && a && typeof P.stack == "string") {
            for (var d = P.stack.split(`
`), h = a.stack.split(`
`), g = d.length - 1, R = h.length - 1; g >= 1 && R >= 0 && d[g] !== h[R]; )
              R--;
            for (; g >= 1 && R >= 0; g--, R--)
              if (d[g] !== h[R]) {
                if (g !== 1 || R !== 1)
                  do
                    if (g--, R--, R < 0 || d[g] !== h[R]) {
                      var C = `
` + d[g].replace(" at new ", " at ");
                      return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && Ee.set(e, C), C;
                    }
                  while (g >= 1 && R >= 0);
                break;
              }
          }
        } finally {
          xe = !1, De.current = c, yt(), Error.prepareStackTrace = o;
        }
        var w = e ? e.displayName || e.name : "", T = w ? be(w) : "";
        return typeof e == "function" && Ee.set(e, T), T;
      }
      function mt(e, r, n) {
        return fr(e, !1);
      }
      function gt(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function Re(e, r, n) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return fr(e, gt(e));
        if (typeof e == "string")
          return be(e);
        switch (e) {
          case W:
            return be("Suspense");
          case ne:
            return be("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case U:
              return mt(e.render);
            case F:
              return Re(e.type, r, n);
            case Y: {
              var a = e, o = a._payload, c = a._init;
              try {
                return Re(c(o), r, n);
              } catch {
              }
            }
          }
        return "";
      }
      var lr = {}, dr = D.ReactDebugCurrentFrame;
      function Ce(e) {
        if (e) {
          var r = e._owner, n = Re(e.type, e._source, r ? r.type : null);
          dr.setExtraStackFrame(n);
        } else
          dr.setExtraStackFrame(null);
      }
      function _t(e, r, n, a, o) {
        {
          var c = Function.call.bind(ue);
          for (var i in e)
            if (c(e, i)) {
              var d = void 0;
              try {
                if (typeof e[i] != "function") {
                  var h = Error((a || "React class") + ": " + n + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw h.name = "Invariant Violation", h;
                }
                d = e[i](r, i, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (g) {
                d = g;
              }
              d && !(d instanceof Error) && (Ce(o), l("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, i, typeof d), Ce(null)), d instanceof Error && !(d.message in lr) && (lr[d.message] = !0, Ce(o), l("Failed %s type: %s", n, d.message), Ce(null));
            }
        }
      }
      function X(e) {
        if (e) {
          var r = e._owner, n = Re(e.type, e._source, r ? r.type : null);
          pe(n);
        } else
          pe(null);
      }
      var Le;
      Le = !1;
      function pr() {
        if ($.current) {
          var e = V($.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function bt(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
      function Et(e) {
        return e != null ? bt(e.__source) : "";
      }
      var vr = {};
      function Rt(e) {
        var r = pr();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
      function yr(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var n = Rt(r);
          if (!vr[n]) {
            vr[n] = !0;
            var a = "";
            e && e._owner && e._owner !== $.current && (a = " It was passed a child from " + V(e._owner.type) + "."), X(e), l('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), X(null);
          }
        }
      }
      function hr(e, r) {
        if (typeof e == "object") {
          if (he(e))
            for (var n = 0; n < e.length; n++) {
              var a = e[n];
              J(a) && yr(a, r);
            }
          else if (J(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var o = K(e);
            if (typeof o == "function" && o !== e.entries)
              for (var c = o.call(e), i; !(i = c.next()).done; )
                J(i.value) && yr(i.value, r);
          }
        }
      }
      function mr(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var n;
          if (typeof r == "function")
            n = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === U || r.$$typeof === F))
            n = r.propTypes;
          else
            return;
          if (n) {
            var a = V(r);
            _t(n, e.props, "prop", a, e);
          } else if (r.PropTypes !== void 0 && !Le) {
            Le = !0;
            var o = V(r);
            l("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && l("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ct(e) {
        {
          for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
            var a = r[n];
            if (a !== "children" && a !== "key") {
              X(e), l("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), X(null);
              break;
            }
          }
          e.ref !== null && (X(e), l("Invalid attribute `ref` supplied to `React.Fragment`."), X(null));
        }
      }
      function gr(e, r, n) {
        var a = rr(e);
        if (!a) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var c = Et(r);
          c ? o += c : o += pr();
          var i;
          e === null ? i = "null" : he(e) ? i = "array" : e !== void 0 && e.$$typeof === O ? (i = "<" + (V(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : i = typeof e, l("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", i, o);
        }
        var d = Lr.apply(this, arguments);
        if (d == null)
          return d;
        if (a)
          for (var h = 2; h < arguments.length; h++)
            hr(arguments[h], e);
        return e === H ? Ct(d) : mr(d), d;
      }
      var _r = !1;
      function wt(e) {
        var r = gr.bind(null, e);
        return r.type = e, _r || (_r = !0, M("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return M("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function St(e, r, n) {
        for (var a = Mr.apply(this, arguments), o = 2; o < arguments.length; o++)
          hr(arguments[o], a.type);
        return mr(a), a;
      }
      function Ot(e, r) {
        var n = L.transition;
        L.transition = {};
        var a = L.transition;
        L.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (L.transition = n, n === null && a._updatedFibers) {
            var o = a._updatedFibers.size;
            o > 10 && M("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), a._updatedFibers.clear();
          }
        }
      }
      var br = !1, we = null;
      function Tt(e) {
        if (we === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), n = f && f[r];
            we = n.call(f, "timers").setImmediate;
          } catch {
            we = function(o) {
              br === !1 && (br = !0, typeof MessageChannel > "u" && l("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var c = new MessageChannel();
              c.port1.onmessage = o, c.port2.postMessage(void 0);
            };
          }
        return we(e);
      }
      var Z = 0, Er = !1;
      function kt(e) {
        {
          var r = Z;
          Z++, k.current === null && (k.current = []);
          var n = k.isBatchingLegacy, a;
          try {
            if (k.isBatchingLegacy = !0, a = e(), !n && k.didScheduleLegacyUpdate) {
              var o = k.current;
              o !== null && (k.didScheduleLegacyUpdate = !1, Ve(o));
            }
          } catch (w) {
            throw Se(r), w;
          } finally {
            k.isBatchingLegacy = n;
          }
          if (a !== null && typeof a == "object" && typeof a.then == "function") {
            var c = a, i = !1, d = {
              then: function(w, T) {
                i = !0, c.then(function(P) {
                  Se(r), Z === 0 ? Ne(P, w, T) : w(P);
                }, function(P) {
                  Se(r), T(P);
                });
              }
            };
            return !Er && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              i || (Er = !0, l("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), d;
          } else {
            var h = a;
            if (Se(r), Z === 0) {
              var g = k.current;
              g !== null && (Ve(g), k.current = null);
              var R = {
                then: function(w, T) {
                  k.current === null ? (k.current = [], Ne(h, w, T)) : w(h);
                }
              };
              return R;
            } else {
              var C = {
                then: function(w, T) {
                  w(h);
                }
              };
              return C;
            }
          }
        }
      }
      function Se(e) {
        e !== Z - 1 && l("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Z = e;
      }
      function Ne(e, r, n) {
        {
          var a = k.current;
          if (a !== null)
            try {
              Ve(a), Tt(function() {
                a.length === 0 ? (k.current = null, r(e)) : Ne(e, r, n);
              });
            } catch (o) {
              n(o);
            }
          else
            r(e);
        }
      }
      var Me = !1;
      function Ve(e) {
        if (!Me) {
          Me = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var n = e[r];
              do
                n = n(!0);
              while (n !== null);
            }
            e.length = 0;
          } catch (a) {
            throw e = e.slice(r + 1), a;
          } finally {
            Me = !1;
          }
        }
      }
      var Pt = gr, At = St, jt = wt, $t = {
        map: _e,
        forEach: zr,
        count: Yr,
        toArray: Br,
        only: Hr
      };
      s.Children = $t, s.Component = y, s.Fragment = H, s.Profiler = re, s.PureComponent = A, s.StrictMode = ee, s.Suspense = W, s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D, s.cloneElement = At, s.createContext = qr, s.createElement = Pt, s.createFactory = jt, s.createRef = Pr, s.forwardRef = Jr, s.isValidElement = J, s.lazy = Qr, s.memo = Xr, s.startTransition = Ot, s.unstable_act = kt, s.useCallback = ut, s.useContext = Zr, s.useDebugValue = ct, s.useDeferredValue = lt, s.useEffect = nt, s.useId = dt, s.useImperativeHandle = st, s.useInsertionEffect = at, s.useLayoutEffect = ot, s.useMemo = it, s.useReducer = rt, s.useRef = tt, s.useState = et, s.useSyncExternalStore = pt, s.useTransition = ft, s.version = I, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Te, Te.exports)), Te.exports;
}
(function(f) {
  process.env.NODE_ENV === "production" ? f.exports = Lt() : f.exports = Nt();
})(kr);
const We = /* @__PURE__ */ xt(kr.exports);
const Vt = ({ children: f, ...s }) => /* @__PURE__ */ We.createElement("h1", { className: ce("c-header"), ...s }, f), Ut = ({ children: f, ...s }) => /* @__PURE__ */ We.createElement("h2", { className: ce(), ...s }, f), Wt = ({ children: f, ...s }) => /* @__PURE__ */ We.createElement("h3", { ...s }, f);
const Yt = (f) => /* @__PURE__ */ React.createElement("div", { ...f, className: ce("c-main-menu--container") }, f.children);
const zt = ({ size: f, src: s, label: I }) => /* @__PURE__ */ React.createElement("span", { className: ce(`c-avatar c-avatar--size-${f}`) }, /* @__PURE__ */ React.createElement("img", { className: "c-avatar__img", src: s, alt: I }));
export {
  zt as Avatar,
  Mt as Button,
  Yt as Container,
  Vt as Header,
  Wt as SubText,
  Ut as Text
};
