(function(e, t) {
  var n, r, i = typeof t,
    o = e.location,
    a = e.document,
    s = a.documentElement,
    l = e.jQuery,
    u = e.$,
    c = {},
    p = [],
    f = "1.10.2",
    d = p.concat,
    h = p.push,
    g = p.slice,
    m = p.indexOf,
    y = c.toString,
    v = c.hasOwnProperty,
    b = f.trim,
    x = function(e, t) {
      return new x.fn.init(e, t, r)
    },
    w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = /\S+/g,
    C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    E = /^[\],:{}\s]*$/,
    S = /(?:^|:|,)(?:\s*\[)+/g,
    A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    D = /^-ms-/,
    L = /-([\da-z])/gi,
    H = function(e, t) {
      return t.toUpperCase()
    },
    q = function(e) {
      (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready())
    },
    _ = function() { a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q)) };
  x.fn = x.prototype = {
    jquery: f,
    constructor: x,
    init: function(e, n, r) {
      var i, o;
      if (!e) {
        return this
      }
      if ("string" == typeof e) {
        if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) {
          return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
        }
        if (i[1]) {
          if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), k.test(i[1]) && x.isPlainObject(n)) {
            for (i in n) { x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]) }
          }
          return this
        }
        if (o = a.getElementById(i[2]), o && o.parentNode) {
          if (o.id !== i[2]) {
            return r.find(e)
          }
          this.length = 1, this[0] = o
        }
        return this.context = a, this.selector = e, this
      }
      return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
    },
    selector: "",
    length: 0,
    toArray: function() {
      return g.call(this)
    },
    get: function(e) {
      return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    },
    pushStack: function(e) {
      var t = x.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    },
    each: function(e, t) {
      return x.each(this, e, t)
    },
    ready: function(e) {
      return x.ready.promise().done(e), this
    },
    slice: function() {
      return this.pushStack(g.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    },
    map: function(e) {
      return this.pushStack(x.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: h,
    sort: [].sort,
    splice: [].splice
  }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
    var e, n, r, i, o, a, s = arguments[0] || {},
      l = 1,
      u = arguments.length,
      c = !1;
    for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++) {
      if (null != (o = arguments[l])) {
        for (i in o) { e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r)) }
      }
    }
    return s
  }, x.extend({
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    noConflict: function(t) {
      return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) { e ? x.readyWait++ : x.ready(!0) },
    ready: function(e) {
      if (e === !0 ? !--x.readyWait : !x.isReady) {
        if (!a.body) {
          return setTimeout(x.ready)
        }
        x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [x]), x.fn.trigger && x(a).trigger("ready").off("ready"))
      }
    },
    isFunction: function(e) {
      return "function" === x.type(e)
    },
    isArray: Array.isArray || function(e) {
      return "array" === x.type(e)
    },
    isWindow: function(e) {
      return null != e && e == e.window
    },
    isNumeric: function(e) {
      return !isNaN(parseFloat(e)) && isFinite(e)
    },
    type: function(e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e
    },
    isPlainObject: function(e) {
      var n;
      if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) {
        return !1
      }
      try {
        if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) {
          return !1
        }
      } catch (r) {
        return !1
      }
      if (x.support.ownLast) {
        for (n in e) {
          return v.call(e, n)
        }
      }
      for (n in e) {}
      return n === t || v.call(e, n)
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) {
        return !1
      }
      return !0
    },
    error: function(e) {
      throw Error(e)
    },
    parseHTML: function(e, t, n) {
      if (!e || "string" != typeof e) {
        return null
      }
      "boolean" == typeof t && (n = t, t = !1), t = t || a;
      var r = k.exec(e),
        i = !n && [];
      return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
    },
    parseJSON: function(n) {
      return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t)
    },
    parseXML: function(n) {
      var r, i;
      if (!n || "string" != typeof n) {
        return null
      }
      try { e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n)) } catch (o) { r = t }
      return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r
    },
    noop: function() {},
    globalEval: function(t) { t && x.trim(t) && (e.execScript || function(t) { e.eval.call(e, t) })(t) },
    camelCase: function(e) {
      return e.replace(D, "ms-").replace(L, H)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, n) {
      var r, i = 0,
        o = e.length,
        a = M(e);
      if (n) {
        if (a) {
          for (; o > i; i++) {
            if (r = t.apply(e[i], n), r === !1) {
              break
            }
          }
        } else {
          for (i in e) {
            if (r = t.apply(e[i], n), r === !1) {
              break
            }
          }
        }
      } else {
        if (a) {
          for (; o > i; i++) {
            if (r = t.call(e[i], i, e[i]), r === !1) {
              break
            }
          }
        } else {
          for (i in e) {
            if (r = t.call(e[i], i, e[i]), r === !1) {
              break
            }
          }
        }
      }
      return e
    },
    trim: b && !b.call("\ufeff\u00a0") ? function(e) {
      return null == e ? "" : b.call(e)
    } : function(e) {
      return null == e ? "" : (e + "").replace(C, "")
    },
    makeArray: function(e, t) {
      var n = t || [];
      return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
    },
    inArray: function(e, t, n) {
      var r;
      if (t) {
        if (m) {
          return m.call(t, e, n)
        }
        for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) {
          if (n in t && t[n] === e) {
            return n
          }
        }
      }
      return -1
    },
    merge: function(e, n) {
      var r = n.length,
        i = e.length,
        o = 0;
      if ("number" == typeof r) {
        for (; r > o; o++) { e[i++] = n[o] }
      } else {
        while (n[o] !== t) { e[i++] = n[o++] }
      }
      return e.length = i, e
    },
    grep: function(e, t, n) {
      var r, i = [],
        o = 0,
        a = e.length;
      for (n = !!n; a > o; o++) { r = !!t(e[o], o), n !== r && i.push(e[o]) }
      return i
    },
    map: function(e, t, n) {
      var r, i = 0,
        o = e.length,
        a = M(e),
        s = [];
      if (a) {
        for (; o > i; i++) { r = t(e[i], i, n), null != r && (s[s.length] = r) }
      } else {
        for (i in e) { r = t(e[i], i, n), null != r && (s[s.length] = r) }
      }
      return d.apply([], s)
    },
    guid: 1,
    proxy: function(e, n) {
      var r, i, o;
      return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), i = function() {
        return e.apply(n || this, r.concat(g.call(arguments)))
      }, i.guid = e.guid = e.guid || x.guid++, i) : t
    },
    access: function(e, n, r, i, o, a, s) {
      var l = 0,
        u = e.length,
        c = null == r;
      if ("object" === x.type(r)) {
        o = !0;
        for (l in r) { x.access(e, n, l, r[l], !0, a, s) }
      } else {
        if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
            return c.call(x(e), n)
          })), n)) {
          for (; u > l; l++) { n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r))) }
        }
      }
      return o ? e : c ? n.call(e) : u ? n(e[0], r) : a
    },
    now: function() {
      return (new Date).getTime()
    },
    swap: function(e, t, n, r) {
      var i, o, a = {};
      for (o in t) { a[o] = e.style[o], e.style[o] = t[o] }
      i = n.apply(e, r || []);
      for (o in t) { e.style[o] = a[o] }
      return i
    }
  }), x.ready.promise = function(t) {
    if (!n) {
      if (n = x.Deferred(), "complete" === a.readyState) { setTimeout(x.ready) } else {
        if (a.addEventListener) { a.addEventListener("DOMContentLoaded", q, !1), e.addEventListener("load", q, !1) } else {
          a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q);
          var r = !1;
          try { r = null == e.frameElement && a.documentElement } catch (i) {}
          r && r.doScroll && function o() {
            if (!x.isReady) {
              try { r.doScroll("left") } catch (e) {
                return setTimeout(o, 50)
              }
              _(), x.ready()
            }
          }()
        }
      }
    }
    return n.promise(t)
  }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) { c["[object " + t + "]"] = t.toLowerCase() });

  function M(e) {
    var t = e.length,
      n = x.type(e);
    return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
  }
  r = x(a),
    function(e, t) {
      var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date,
        w = e.document,
        T = 0,
        C = 0,
        N = st(),
        k = st(),
        E = st(),
        S = !1,
        A = function(e, t) {
          return e === t ? (S = !0, 0) : 0
        },
        j = typeof t,
        D = 1 << 31,
        L = {}.hasOwnProperty,
        H = [],
        q = H.pop,
        _ = H.push,
        M = H.push,
        O = H.slice,
        F = H.indexOf || function(e) {
          var t = 0,
            n = this.length;
          for (; n > t; t++) {
            if (this[t] === e) {
              return t
            }
          }
          return -1
        },
        B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        P = "[\\x20\\t\\r\\n\\f]",
        R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        W = R.replace("w", "w#"),
        $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]",
        I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)",
        z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"),
        X = RegExp("^" + P + "*," + P + "*"),
        U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),
        V = RegExp(P + "*[+~]"),
        Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"),
        J = RegExp(I),
        G = RegExp("^" + W + "$"),
        Q = { ID: RegExp("^#(" + R + ")"), CLASS: RegExp("^\\.(" + R + ")"), TAG: RegExp("^(" + R.replace("w", "w*") + ")"), ATTR: RegExp("^" + $), PSEUDO: RegExp("^" + I), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"), bool: RegExp("^(?:" + B + ")$", "i"), needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i") },
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        et = /^(?:input|select|textarea|button)$/i,
        tt = /^h\d$/i,
        nt = /'|\\/g,
        rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"),
        it = function(e, t, n) {
          var r = "0x" + t - 65536;
          return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
        };
      try { M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType } catch (ot) {
        M = {
          apply: H.length ? function(e, t) { _.apply(e, O.call(t)) } : function(e, t) {
            var n = e.length,
              r = 0;
            while (e[n++] = t[r++]) {}
            e.length = n - 1
          }
        }
      }

      function at(e, t, n, i) {
        var o, a, s, l, u, c, d, m, y, x;
        if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) {
          return n
        }
        if (1 !== (l = t.nodeType) && 9 !== l) {
          return []
        }
        if (h && !i) {
          if (o = Z.exec(e)) {
            if (s = o[1]) {
              if (9 === l) {
                if (a = t.getElementById(s), !a || !a.parentNode) {
                  return n
                }
                if (a.id === s) {
                  return n.push(a), n
                }
              } else {
                if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) {
                  return n.push(a), n
                }
              }
            } else {
              if (o[2]) {
                return M.apply(n, t.getElementsByTagName(e)), n
              }
              if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) {
                return M.apply(n, t.getElementsByClassName(s)), n
              }
            }
          }
          if (r.qsa && (!g || !g.test(e))) {
            if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
              c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", u = c.length;
              while (u--) { c[u] = m + yt(c[u]) }
              y = V.test(e) && t.parentNode || t, x = c.join(",")
            }
            if (x) {
              try {
                return M.apply(n, y.querySelectorAll(x)), n
              } catch (T) {} finally { d || t.removeAttribute("id") }
            }
          }
        }
        return kt(e.replace(z, "$1"), t, n, i)
      }

      function st() {
        var e = [];

        function t(n, r) {
          return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r
        }
        return t
      }

      function lt(e) {
        return e[b] = !0, e
      }

      function ut(e) {
        var t = f.createElement("div");
        try {
          return !!e(t)
        } catch (n) {
          return !1
        } finally { t.parentNode && t.parentNode.removeChild(t), t = null }
      }

      function ct(e, t) {
        var n = e.split("|"),
          r = e.length;
        while (r--) { o.attrHandle[n[r]] = t }
      }

      function pt(e, t) {
        var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
        if (r) {
          return r
        }
        if (n) {
          while (n = n.nextSibling) {
            if (n === t) {
              return -1
            }
          }
        }
        return e ? 1 : -1
      }

      function ft(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e
        }
      }

      function dt(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e
        }
      }

      function ht(e) {
        return lt(function(t) {
          return t = +t, lt(function(n, r) {
            var i, o = e([], n.length, t),
              a = o.length;
            while (a--) { n[i = o[a]] && (n[i] = !(r[i] = n[i])) }
          })
        })
      }
      s = at.isXML = function(e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return t ? "HTML" !== t.nodeName : !1
      }, r = at.support = {}, p = at.setDocument = function(e) {
        var n = e ? e.ownerDocument || e : w,
          i = n.defaultView;
        return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() { p() }), r.attributes = ut(function(e) {
          return e.className = "i", !e.getAttribute("className")
        }), r.getElementsByTagName = ut(function(e) {
          return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
        }), r.getElementsByClassName = ut(function(e) {
          return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
        }), r.getById = ut(function(e) {
          return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length
        }), r.getById ? (o.find.ID = function(e, t) {
          if (typeof t.getElementById !== j && h) {
            var n = t.getElementById(e);
            return n && n.parentNode ? [n] : []
          }
        }, o.filter.ID = function(e) {
          var t = e.replace(rt, it);
          return function(e) {
            return e.getAttribute("id") === t
          }
        }) : (delete o.find.ID, o.filter.ID = function(e) {
          var t = e.replace(rt, it);
          return function(e) {
            var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
            return n && n.value === t
          }
        }), o.find.TAG = r.getElementsByTagName ? function(e, n) {
          return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t
        } : function(e, t) {
          var n, r = [],
            i = 0,
            o = t.getElementsByTagName(e);
          if ("*" === e) {
            while (n = o[i++]) { 1 === n.nodeType && r.push(n) }
            return r
          }
          return o
        }, o.find.CLASS = r.getElementsByClassName && function(e, n) {
          return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t
        }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function(e) { e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked") }), ut(function(e) {
          var t = n.createElement("input");
          t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
        })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function(e) { r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I) }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function(e, t) {
          var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
          return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
        } : function(e, t) {
          if (t) {
            while (t = t.parentNode) {
              if (t === e) {
                return !0
              }
            }
          }
          return !1
        }, A = d.compareDocumentPosition ? function(e, t) {
          if (e === t) {
            return S = !0, 0
          }
          var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
          return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
        } : function(e, t) {
          var r, i = 0,
            o = e.parentNode,
            a = t.parentNode,
            s = [e],
            l = [t];
          if (e === t) {
            return S = !0, 0
          }
          if (!o || !a) {
            return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0
          }
          if (o === a) {
            return pt(e, t)
          }
          r = e;
          while (r = r.parentNode) { s.unshift(r) }
          r = t;
          while (r = r.parentNode) { l.unshift(r) }
          while (s[i] === l[i]) { i++ }
          return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0
        }, n) : f
      }, at.matches = function(e, t) {
        return at(e, null, null, t)
      }, at.matchesSelector = function(e, t) {
        if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) {
          try {
            var n = y.call(e, t);
            if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) {
              return n
            }
          } catch (i) {}
        }
        return at(t, f, null, [e]).length > 0
      }, at.contains = function(e, t) {
        return (e.ownerDocument || e) !== f && p(e), v(e, t)
      }, at.attr = function(e, n) {
        (e.ownerDocument || e) !== f && p(e);
        var i = o.attrHandle[n.toLowerCase()],
          a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t;
        return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a
      }, at.error = function(e) {
        throw Error("Syntax error, unrecognized expression: " + e)
      }, at.uniqueSort = function(e) {
        var t, n = [],
          i = 0,
          o = 0;
        if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) {
          while (t = e[o++]) { t === e[o] && (i = n.push(o)) }
          while (i--) { e.splice(n[i], 1) }
        }
        return e
      }, a = at.getText = function(e) {
        var t, n = "",
          r = 0,
          i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent) {
              return e.textContent
            }
            for (e = e.firstChild; e; e = e.nextSibling) { n += a(e) }
          } else {
            if (3 === i || 4 === i) {
              return e.nodeValue
            }
          }
        } else {
          for (; t = e[r]; r++) { n += a(t) }
        }
        return n
      }, o = at.selectors = {
        cacheLength: 50,
        createPseudo: lt,
        match: Q,
        attrHandle: {},
        find: {},
        relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
        preFilter: {
          ATTR: function(e) {
            return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
          },
          CHILD: function(e) {
            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e
          },
          PSEUDO: function(e) {
            var n, r = !e[5] && e[2];
            return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
          }
        },
        filter: {
          TAG: function(e) {
            var t = e.replace(rt, it).toLowerCase();
            return "*" === e ? function() {
              return !0
            } : function(e) {
              return e.nodeName && e.nodeName.toLowerCase() === t
            }
          },
          CLASS: function(e) {
            var t = N[e + " "];
            return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function(e) {
              return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
            })
          },
          ATTR: function(e, t, n) {
            return function(r) {
              var i = at.attr(r, e);
              return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
          },
          CHILD: function(e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;
            return 1 === r && 0 === i ? function(e) {
              return !!e.parentNode
            } : function(t, n, l) {
              var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                y = s && t.nodeName.toLowerCase(),
                v = !l && !s;
              if (m) {
                if (o) {
                  while (g) {
                    p = t;
                    while (p = p[g]) {
                      if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) {
                        return !1
                      }
                    }
                    h = g = "only" === e && !h && "nextSibling"
                  }
                  return !0
                }
                if (h = [a ? m.firstChild : m.lastChild], a && v) {
                  c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d];
                  while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
                    if (1 === p.nodeType && ++f && p === t) {
                      c[e] = [T, d, f];
                      break
                    }
                  }
                } else {
                  if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) { f = u[1] } else {
                    while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
                      if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T, f]), p === t)) {
                        break
                      }
                    }
                  }
                }
                return f -= i, f === r || 0 === f % r && f / r >= 0
              }
            }
          },
          PSEUDO: function(e, t) {
            var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e);
            return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function(e, n) {
              var i, o = r(e, t),
                a = o.length;
              while (a--) { i = F.call(e, o[a]), e[i] = !(n[i] = o[a]) }
            }) : function(e) {
              return r(e, 0, n)
            }) : r
          }
        },
        pseudos: {
          not: lt(function(e) {
            var t = [],
              n = [],
              r = l(e.replace(z, "$1"));
            return r[b] ? lt(function(e, t, n, i) {
              var o, a = r(e, null, i, []),
                s = e.length;
              while (s--) {
                (o = a[s]) && (e[s] = !(t[s] = o))
              }
            }) : function(e, i, o) {
              return t[0] = e, r(t, null, o, n), !n.pop()
            }
          }),
          has: lt(function(e) {
            return function(t) {
              return at(e, t).length > 0
            }
          }),
          contains: lt(function(e) {
            return function(t) {
              return (t.textContent || t.innerText || a(t)).indexOf(e) > -1
            }
          }),
          lang: lt(function(e) {
            return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(),
              function(t) {
                var n;
                do {
                  if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                    return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-")
                  }
                } while ((t = t.parentNode) && 1 === t.nodeType);
                return !1
              }
          }),
          target: function(t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
          },
          root: function(e) {
            return e === d
          },
          focus: function(e) {
            return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
          },
          enabled: function(e) {
            return e.disabled === !1
          },
          disabled: function(e) {
            return e.disabled === !0
          },
          checked: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && !!e.checked || "option" === t && !!e.selected
          },
          selected: function(e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
          },
          empty: function(e) {
            for (e = e.firstChild; e; e = e.nextSibling) {
              if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) {
                return !1
              }
            }
            return !0
          },
          parent: function(e) {
            return !o.pseudos.empty(e)
          },
          header: function(e) {
            return tt.test(e.nodeName)
          },
          input: function(e) {
            return et.test(e.nodeName)
          },
          button: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && "button" === e.type || "button" === t
          },
          text: function(e) {
            var t;
            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
          },
          first: ht(function() {
            return [0]
          }),
          last: ht(function(e, t) {
            return [t - 1]
          }),
          eq: ht(function(e, t, n) {
            return [0 > n ? n + t : n]
          }),
          even: ht(function(e, t) {
            var n = 0;
            for (; t > n; n += 2) { e.push(n) }
            return e
          }),
          odd: ht(function(e, t) {
            var n = 1;
            for (; t > n; n += 2) { e.push(n) }
            return e
          }),
          lt: ht(function(e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; --r >= 0;) { e.push(r) }
            return e
          }),
          gt: ht(function(e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; t > ++r;) { e.push(r) }
            return e
          })
        }
      }, o.pseudos.nth = o.pseudos.eq;
      for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) { o.pseudos[n] = ft(n) }
      for (n in { submit: !0, reset: !0 }) { o.pseudos[n] = dt(n) }

      function gt() {}
      gt.prototype = o.filters = o.pseudos, o.setFilters = new gt;

      function mt(e, t) {
        var n, r, i, a, s, l, u, c = k[e + " "];
        if (c) {
          return t ? 0 : c.slice(0)
        }
        s = e, l = [], u = o.preFilter;
        while (s) {
          (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({ value: n, type: r[0].replace(z, " ") }), s = s.slice(n.length));
          for (a in o.filter) {!(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({ value: n, type: a, matches: r }), s = s.slice(n.length)) }
          if (!n) {
            break
          }
        }
        return t ? s.length : s ? at.error(e) : k(e, l).slice(0)
      }

      function yt(e) {
        var t = 0,
          n = e.length,
          r = "";
        for (; n > t; t++) { r += e[t].value }
        return r
      }

      function vt(e, t, n) {
        var r = t.dir,
          o = n && "parentNode" === r,
          a = C++;
        return t.first ? function(t, n, i) {
          while (t = t[r]) {
            if (1 === t.nodeType || o) {
              return e(t, n, i)
            }
          }
        } : function(t, n, s) {
          var l, u, c, p = T + " " + a;
          if (s) {
            while (t = t[r]) {
              if ((1 === t.nodeType || o) && e(t, n, s)) {
                return !0
              }
            }
          } else {
            while (t = t[r]) {
              if (1 === t.nodeType || o) {
                if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) {
                  if ((l = u[1]) === !0 || l === i) {
                    return l === !0
                  }
                } else {
                  if (u = c[r] = [p], u[1] = e(t, n, s) || i, u[1] === !0) {
                    return !0
                  }
                }
              }
            }
          }
        }
      }

      function bt(e) {
        return e.length > 1 ? function(t, n, r) {
          var i = e.length;
          while (i--) {
            if (!e[i](t, n, r)) {
              return !1
            }
          }
          return !0
        } : e[0]
      }

      function xt(e, t, n, r, i) {
        var o, a = [],
          s = 0,
          l = e.length,
          u = null != t;
        for (; l > s; s++) {
          (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s))
        }
        return a
      }

      function wt(e, t, n, r, i, o) {
        return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function(o, a, s, l) {
          var u, c, p, f = [],
            d = [],
            h = a.length,
            g = o || Nt(t || "*", s.nodeType ? [s] : s, []),
            m = !e || !o && t ? g : xt(g, f, e, s, l),
            y = n ? i || (o ? e : h || r) ? [] : a : m;
          if (n && n(m, y, s, l), r) {
            u = xt(y, d), r(u, [], s, l), c = u.length;
            while (c--) {
              (p = u[c]) && (y[d[c]] = !(m[d[c]] = p))
            }
          }
          if (o) {
            if (i || e) {
              if (i) {
                u = [], c = y.length;
                while (c--) {
                  (p = y[c]) && u.push(m[c] = p)
                }
                i(null, y = [], u, l)
              }
              c = y.length;
              while (c--) {
                (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p))
              }
            }
          } else { y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y) }
        })
      }

      function Tt(e) {
        var t, n, r, i = e.length,
          a = o.relative[e[0].type],
          s = a || o.relative[" "],
          l = a ? 1 : 0,
          c = vt(function(e) {
            return e === t
          }, s, !0),
          p = vt(function(e) {
            return F.call(t, e) > -1
          }, s, !0),
          f = [function(e, n, r) {
            return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
          }];
        for (; i > l; l++) {
          if (n = o.relative[e[l].type]) { f = [vt(bt(f), n)] } else {
            if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) {
              for (r = ++l; i > r; r++) {
                if (o.relative[e[r].type]) {
                  break
                }
              }
              return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({ value: " " === e[l - 2].type ? "*" : "" })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e))
            }
            f.push(n)
          }
        }
        return bt(f)
      }

      function Ct(e, t) {
        var n = 0,
          r = t.length > 0,
          a = e.length > 0,
          s = function(s, l, c, p, d) {
            var h, g, m, y = [],
              v = 0,
              b = "0",
              x = s && [],
              w = null != d,
              C = u,
              N = s || a && o.find.TAG("*", d && l.parentNode || l),
              k = T += null == C ? 1 : Math.random() || 0.1;
            for (w && (u = l !== f && l, i = n); null != (h = N[b]); b++) {
              if (a && h) {
                g = 0;
                while (m = e[g++]) {
                  if (m(h, l, c)) {
                    p.push(h);
                    break
                  }
                }
                w && (T = k, i = ++n)
              }
              r && ((h = !m && h) && v--, s && x.push(h))
            }
            if (v += b, r && b !== v) {
              g = 0;
              while (m = t[g++]) { m(x, y, l, c) }
              if (s) {
                if (v > 0) {
                  while (b--) { x[b] || y[b] || (y[b] = q.call(p)) }
                }
                y = xt(y)
              }
              M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p)
            }
            return w && (T = k, u = C), x
          };
        return r ? lt(s) : s
      }
      l = at.compile = function(e, t) {
        var n, r = [],
          i = [],
          o = E[e + " "];
        if (!o) {
          t || (t = mt(e)), n = t.length;
          while (n--) { o = Tt(t[n]), o[b] ? r.push(o) : i.push(o) }
          o = E(e, Ct(i, r))
        }
        return o
      };

      function Nt(e, t, n) {
        var r = 0,
          i = t.length;
        for (; i > r; r++) { at(e, t[r], n) }
        return n
      }

      function kt(e, t, n, i) {
        var a, s, u, c, p, f = mt(e);
        if (!i && 1 === f.length) {
          if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) {
            if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) {
              return n
            }
            e = e.slice(s.shift().value.length)
          }
          a = Q.needsContext.test(e) ? 0 : s.length;
          while (a--) {
            if (u = s[a], o.relative[c = u.type]) {
              break
            }
            if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) {
              if (s.splice(a, 1), e = i.length && yt(s), !e) {
                return M.apply(n, i), n
              }
              break
            }
          }
        }
        return l(e, f)(i, t, !h, n, V.test(e)), n
      }
      r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function(e) {
        return 1 & e.compareDocumentPosition(f.createElement("div"))
      }), ut(function(e) {
        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
      }) || ct("type|href|height|width", function(e, n, r) {
        return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2)
      }), r.attributes && ut(function(e) {
        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
      }) || ct("value", function(e, n, r) {
        return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue
      }), ut(function(e) {
        return null == e.getAttribute("disabled")
      }) || ct(B, function(e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null
      }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains
    }(e);
  var O = {};

  function F(e) {
    var t = O[e] = {};
    return x.each(e.match(T) || [], function(e, n) { t[n] = !0 }), t
  }
  x.Callbacks = function(e) {
    e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e);
    var n, r, i, o, a, s, l = [],
      u = !e.once && [],
      c = function(t) {
        for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) {
          if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
            r = !1;
            break
          }
        }
        n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable())
      },
      p = {
        add: function() {
          if (l) {
            var t = l.length;
            (function i(t) {
              x.each(t, function(t, n) {
                var r = x.type(n);
                "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
              })
            })(arguments), n ? o = l.length : r && (s = t, c(r))
          }
          return this
        },
        remove: function() {
          return l && x.each(arguments, function(e, t) {
            var r;
            while ((r = x.inArray(t, l, r)) > -1) { l.splice(r, 1), n && (o >= r && o--, a >= r && a--) }
          }), this
        },
        has: function(e) {
          return e ? x.inArray(e, l) > -1 : !(!l || !l.length)
        },
        empty: function() {
          return l = [], o = 0, this
        },
        disable: function() {
          return l = u = r = t, this
        },
        disabled: function() {
          return !l
        },
        lock: function() {
          return u = t, r || p.disable(), this
        },
        locked: function() {
          return !u
        },
        fireWith: function(e, t) {
          return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this
        },
        fire: function() {
          return p.fireWith(this, arguments), this
        },
        fired: function() {
          return !!i
        }
      };
    return p
  }, x.extend({
    Deferred: function(e) {
      var t = [
          ["resolve", "done", x.Callbacks("once memory"), "resolved"],
          ["reject", "fail", x.Callbacks("once memory"), "rejected"],
          ["notify", "progress", x.Callbacks("memory")]
        ],
        n = "pending",
        r = {
          state: function() {
            return n
          },
          always: function() {
            return i.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return x.Deferred(function(n) {
              x.each(t, function(t, o) {
                var a = o[0],
                  s = x.isFunction(e[t]) && e[t];
                i[o[1]](function() {
                  var e = s && s.apply(this, arguments);
                  e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return null != e ? x.extend(e, r) : r
          }
        },
        i = {};
      return r.pipe = r.then, x.each(t, function(e, o) {
        var a = o[2],
          s = o[3];
        r[o[1]] = a.add, s && a.add(function() { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
          return i[o[0] + "With"](this === i ? r : this, arguments), this
        }, i[o[0] + "With"] = a.fireWith
      }), r.promise(i), e && e.call(i, i), i
    },
    when: function(e) {
      var t = 0,
        n = g.call(arguments),
        r = n.length,
        i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
        o = 1 === i ? e : x.Deferred(),
        a = function(e, t, n) {
          return function(r) { t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n) }
        },
        s, l, u;
      if (r > 1) {
        for (s = Array(r), l = Array(r), u = Array(r); r > t; t++) { n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i }
      }
      return i || o.resolveWith(u, n), o.promise()
    }
  }), x.support = function(t) {
    var n, r, o, s, l, u, c, p, f, d = a.createElement("div");
    if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) {
      return t
    }
    s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled;
    try { delete d.test } catch (h) { t.deleteExpando = !1 }
    o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() { t.noCloneEvent = !1 }), d.cloneNode(!0).click());
    for (f in { submit: !0, change: !0, focusin: !0 }) { d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1 }
    d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
    for (f in x(t)) {
      break
    }
    return t.ownLast = "0" !== f, x(function() {
      var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
        l = a.getElementsByTagName("body")[0];
      l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l, null != l.style.zoom ? { zoom: 1 } : {}, function() { t.boxSizing = 4 === d.offsetWidth }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || { width: "4px" }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null)
    }), n = s = l = u = r = o = null, t
  }({});
  var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    P = /([A-Z])/g;

  function R(e, n, r, i) {
    if (x.acceptData(e)) {
      var o, a, s = x.expando,
        l = e.nodeType,
        u = l ? x.cache : e,
        c = l ? e[s] : e[s] && s;
      if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) {
        return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : { toJSON: x.noop }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o
      }
    }
  }

  function W(e, t, n) {
    if (x.acceptData(e)) {
      var r, i, o = e.nodeType,
        a = o ? x.cache : e,
        s = o ? e[x.expando] : x.expando;
      if (a[s]) {
        if (t && (r = n ? a[s] : a[s].data)) {
          x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
          while (i--) { delete r[t[i]] }
          if (n ? !I(r) : !x.isEmptyObject(r)) {
            return
          }
        }(n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
      }
    }
  }
  x.extend({
    cache: {},
    noData: { applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
    hasData: function(e) {
      return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e)
    },
    data: function(e, t, n) {
      return R(e, t, n)
    },
    removeData: function(e, t) {
      return W(e, t)
    },
    _data: function(e, t, n) {
      return R(e, t, n, !0)
    },
    _removeData: function(e, t) {
      return W(e, t, !0)
    },
    acceptData: function(e) {
      if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) {
        return !1
      }
      var t = e.nodeName && x.noData[e.nodeName.toLowerCase()];
      return !t || t !== !0 && e.getAttribute("classid") === t
    }
  }), x.fn.extend({
    data: function(e, n) {
      var r, i, o = null,
        a = 0,
        s = this[0];
      if (e === t) {
        if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) {
          for (r = s.attributes; r.length > a; a++) { i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s, i, o[i])) }
          x._data(s, "parsedAttrs", !0)
        }
        return o
      }
      return "object" == typeof e ? this.each(function() { x.data(this, e) }) : arguments.length > 1 ? this.each(function() { x.data(this, e, n) }) : s ? $(s, e, x.data(s, e)) : null
    },
    removeData: function(e) {
      return this.each(function() { x.removeData(this, e) })
    }
  });

  function $(e, n, r) {
    if (r === t && 1 === e.nodeType) {
      var i = "data-" + n.replace(P, "-$1").toLowerCase();
      if (r = e.getAttribute(i), "string" == typeof r) {
        try { r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r } catch (o) {}
        x.data(e, n, r)
      } else { r = t }
    }
    return r
  }

  function I(e) {
    var t;
    for (t in e) {
      if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) {
        return !1
      }
    }
    return !0
  }
  x.extend({
    queue: function(e, n, r) {
      var i;
      return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), i || []) : t
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = x.queue(e, t),
        r = n.length,
        i = n.shift(),
        o = x._queueHooks(e, t),
        a = function() { x.dequeue(e, t) };
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    },
    _queueHooks: function(e, t) {
      var n = t + "queueHooks";
      return x._data(e, n) || x._data(e, n, { empty: x.Callbacks("once memory").add(function() { x._removeData(e, t + "queue"), x._removeData(e, n) }) })
    }
  }), x.fn.extend({
    queue: function(e, n) {
      var r = 2;
      return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function() {
        var t = x.queue(this, e, n);
        x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() { x.dequeue(this, e) })
    },
    delay: function(e, t) {
      return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
        var r = setTimeout(t, e);
        n.stop = function() { clearTimeout(r) }
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, n) {
      var r, i = 1,
        o = x.Deferred(),
        a = this,
        s = this.length,
        l = function() {--i || o.resolveWith(a, [a]) };
      "string" != typeof e && (n = e, e = t), e = e || "fx";
      while (s--) { r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l)) }
      return l(), o.promise(n)
    }
  });
  var z, X, U = /[\t\r\n\f]/g,
    V = /\r/g,
    Y = /^(?:input|select|textarea|button|object)$/i,
    J = /^(?:a|area)$/i,
    G = /^(?:checked|selected)$/i,
    Q = x.support.getSetAttribute,
    K = x.support.input;
  x.fn.extend({
    attr: function(e, t) {
      return x.access(this, x.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() { x.removeAttr(this, e) })
    },
    prop: function(e, t) {
      return x.access(this, x.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return e = x.propFix[e] || e, this.each(function() {
        try { this[e] = t, delete this[e] } catch (n) {}
      })
    },
    addClass: function(e) {
      var t, n, r, i, o, a = 0,
        s = this.length,
        l = "string" == typeof e && e;
      if (x.isFunction(e)) {
        return this.each(function(t) { x(this).addClass(e.call(this, t, this.className)) })
      }
      if (l) {
        for (t = (e || "").match(T) || []; s > a; a++) {
          if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) {
            o = 0;
            while (i = t[o++]) { 0 > r.indexOf(" " + i + " ") && (r += i + " ") }
            n.className = x.trim(r)
          }
        }
      }
      return this
    },
    removeClass: function(e) {
      var t, n, r, i, o, a = 0,
        s = this.length,
        l = 0 === arguments.length || "string" == typeof e && e;
      if (x.isFunction(e)) {
        return this.each(function(t) { x(this).removeClass(e.call(this, t, this.className)) })
      }
      if (l) {
        for (t = (e || "").match(T) || []; s > a; a++) {
          if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) {
            o = 0;
            while (i = t[o++]) {
              while (r.indexOf(" " + i + " ") >= 0) { r = r.replace(" " + i + " ", " ") }
            }
            n.className = e ? x.trim(r) : ""
          }
        }
      }
      return this
    },
    toggleClass: function(e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) { x(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function() {
        if ("string" === n) {
          var t, r = 0,
            o = x(this),
            a = e.match(T) || [];
          while (t = a[r++]) { o.hasClass(t) ? o.removeClass(t) : o.addClass(t) }
        } else {
          (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "")
        }
      })
    },
    hasClass: function(e) {
      var t = " " + e + " ",
        n = 0,
        r = this.length;
      for (; r > n; n++) {
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) {
          return !0
        }
      }
      return !1
    },
    val: function(e) {
      var n, r, i, o = this[0];
      if (arguments.length) {
        return i = x.isFunction(e), this.each(function(n) {
          var o;
          1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function(e) {
            return null == e ? "" : e + ""
          })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
        })
      }
      if (o) {
        return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V, "") : null == n ? "" : n)
      }
    }
  }), x.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = x.find.attr(e, "value");
          return null != t ? t : e.text
        }
      },
      select: {
        get: function(e) {
          var t, n, r = e.options,
            i = e.selectedIndex,
            o = "select-one" === e.type || 0 > i,
            a = o ? null : [],
            s = o ? i + 1 : r.length,
            l = 0 > i ? s : o ? i : 0;
          for (; s > l; l++) {
            if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
              if (t = x(n).val(), o) {
                return t
              }
              a.push(t)
            }
          }
          return a
        },
        set: function(e, t) {
          var n, r, i = e.options,
            o = x.makeArray(t),
            a = i.length;
          while (a--) { r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0) }
          return n || (e.selectedIndex = -1), o
        }
      }
    },
    attr: function(e, n, r) {
      var o, a, s = e.nodeType;
      if (e && 3 !== s && 8 !== s && 2 !== s) {
        return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : (x.removeAttr(e, n), t))
      }
    },
    removeAttr: function(e, t) {
      var n, r, i = 0,
        o = t && t.match(T);
      if (o && 1 === e.nodeType) {
        while (n = o[i++]) { r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), e.removeAttribute(Q ? n : r) }
      }
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    },
    propFix: { "for": "htmlFor", "class": "className" },
    prop: function(e, n, r) {
      var i, o, a, s = e.nodeType;
      if (e && 3 !== s && 8 !== s && 2 !== s) {
        return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
      }
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          var t = x.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }
  }), X = {
    set: function(e, t, n) {
      return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, n
    }
  }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, n) {
    var r = x.expr.attrHandle[n] || x.find.attr;
    x.expr.attrHandle[n] = K && Q || !G.test(n) ? function(e, n, i) {
      var o = x.expr.attrHandle[n],
        a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
      return x.expr.attrHandle[n] = o, a
    } : function(e, n, r) {
      return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null
    }
  }), K && Q || (x.attrHooks.value = {
    set: function(e, n, r) {
      return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r)
    }
  }), Q || (z = {
    set: function(e, n, r) {
      var i = e.getAttributeNode(r);
      return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
    }
  }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function(e, n, r) {
    var i;
    return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
  }, x.valHooks.button = {
    get: function(e, n) {
      var r = e.getAttributeNode(n);
      return r && r.specified ? r.value : t
    },
    set: z.set
  }, x.attrHooks.contenteditable = { set: function(e, t, n) { z.set(e, "" === t ? !1 : t, n) } }, x.each(["width", "height"], function(e, n) {
    x.attrHooks[n] = {
      set: function(e, r) {
        return "" === r ? (e.setAttribute(n, "auto"), r) : t
      }
    }
  })), x.support.hrefNormalized || x.each(["href", "src"], function(e, t) {
    x.propHooks[t] = {
      get: function(e) {
        return e.getAttribute(t, 4)
      }
    }
  }), x.support.style || (x.attrHooks.style = {
    get: function(e) {
      return e.style.cssText || t
    },
    set: function(e, t) {
      return e.style.cssText = t + ""
    }
  }), x.support.optSelected || (x.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }
  }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { x.propFix[this.toLowerCase()] = this }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio", "checkbox"], function() {
    x.valHooks[this] = {
      set: function(e, n) {
        return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t
      }
    }, x.support.checkOn || (x.valHooks[this].get = function(e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var Z = /^(?:input|select|textarea)$/i,
    et = /^key/,
    tt = /^(?:mouse|contextmenu)|click/,
    nt = /^(?:focusinfocus|focusoutblur)$/,
    rt = /^([^.]*)(?:\.(.+)|)$/;

  function it() {
    return !0
  }

  function ot() {
    return !1
  }

  function at() {
    try {
      return a.activeElement
    } catch (e) {}
  }
  x.event = {
    global: {},
    add: function(e, n, r, o, a) {
      var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e);
      if (v) {
        r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function(e) {
          return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments)
        }, f.elem = e), n = (n || "").match(T) || [""], u = n.length;
        while (u--) { s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({ type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && x.expr.match.needsContext.test(a), namespace: m.join(".") }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), x.event.global[g] = !0) }
        e = null
      }
    },
    remove: function(e, t, n, r, i) {
      var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e);
      if (m && (c = m.events)) {
        t = (t || "").match(T) || [""], u = t.length;
        while (u--) {
          if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
            p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length;
            while (o--) { a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a)) }
            l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), delete c[d])
          } else {
            for (d in c) { x.event.remove(e, d + t[u], n, r, !0) }
          }
        }
        x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events"))
      }
    },
    trigger: function(n, r, i, o) {
      var s, l, u, c, p, f, d, h = [i || a],
        g = v.call(n, "type") ? n.type : n,
        m = v.call(n, "namespace") ? n.namespace.split(".") : [];
      if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r, [n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
        if (!o && !p.noBubble && !x.isWindow(i)) {
          for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode); u; u = u.parentNode) { h.push(u), f = u }
          f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e)
        }
        d = 0;
        while ((u = h[d++]) && !n.isPropagationStopped()) { n.type = d > 1 ? c : p.bindType || g, s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault() }
        if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) {
          f = i[l], f && (i[l] = null), x.event.triggered = g;
          try { i[g]() } catch (y) {}
          x.event.triggered = t, f && (i[l] = f)
        }
        return n.result
      }
    },
    dispatch: function(e) {
      e = x.event.fix(e);
      var n, r, i, o, a, s = [],
        l = g.call(arguments),
        u = (x._data(this, "events") || {})[e.type] || [],
        c = x.event.special[e.type] || {};
      if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
        s = x.event.handlers.call(this, e, u), n = 0;
        while ((o = s[n++]) && !e.isPropagationStopped()) {
          e.currentTarget = o.elem, a = 0;
          while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) {
            (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
          }
        }
        return c.postDispatch && c.postDispatch.call(this, e), e.result
      }
    },
    handlers: function(e, n) {
      var r, i, o, a, s = [],
        l = n.delegateCount,
        u = e.target;
      if (l && u.nodeType && (!e.button || "click" !== e.type)) {
        for (; u != this; u = u.parentNode || this) {
          if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
            for (o = [], a = 0; l > a; a++) { i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [u]).length), o[r] && o.push(i) }
            o.length && s.push({ elem: u, handlers: o })
          }
        }
      }
      return n.length > l && s.push({ elem: this, handlers: n.slice(l) }), s
    },
    fix: function(e) {
      if (e[x.expando]) {
        return e
      }
      var t, n, r, i = e.type,
        o = e,
        s = this.fixHooks[i];
      s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;
      while (t--) { n = r[t], e[n] = o[n] }
      return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, n) {
        var r, i, o, s = n.button,
          l = n.fromElement;
        return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
      }
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function() {
          if (this !== at() && this.focus) {
            try {
              return this.focus(), !1
            } catch (e) {}
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === at() && this.blur ? (this.blur(), !1) : t
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
        },
        _default: function(e) {
          return x.nodeName(e.target, "a")
        }
      },
      beforeunload: { postDispatch: function(e) { e.result !== t && (e.originalEvent.returnValue = e.result) } }
    },
    simulate: function(e, t, n, r) {
      var i = x.extend(new x.Event, n, { type: e, isSimulated: !0, originalEvent: {} });
      r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }
  }, x.removeEvent = a.removeEventListener ? function(e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) } : function(e, t, n) {
    var r = "on" + t;
    e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n))
  }, x.Event = function(e, n) {
    return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e, n)
  }, x.Event.prototype = {
    isDefaultPrevented: ot,
    isPropagationStopped: ot,
    isImmediatePropagationStopped: ot,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function() { this.isImmediatePropagationStopped = it, this.stopPropagation() }
  }, x.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function(e, t) {
    x.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n, r = this,
          i = e.relatedTarget,
          o = e.handleObj;
        return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), x.support.submitBubbles || (x.event.special.submit = {
    setup: function() {
      return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function(e) {
        var n = e.target,
          r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t;
        r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function(e) { e._submit_bubble = !0 }), x._data(r, "submitBubbles", !0))
      }), t)
    },
    postDispatch: function(e) { e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0)) },
    teardown: function() {
      return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t)
    }
  }), x.support.changeBubbles || (x.event.special.change = {
    setup: function() {
      return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function(e) { "checked" === e.originalEvent.propertyName && (this._just_changed = !0) }), x.event.add(this, "click._change", function(e) { this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0) })), !1) : (x.event.add(this, "beforeactivate._change", function(e) {
        var t = e.target;
        Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function(e) {!this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0) }), x._data(t, "changeBubbles", !0))
      }), t)
    },
    handle: function(e) {
      var n = e.target;
      return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
    },
    teardown: function() {
      return x.event.remove(this, "._change"), !Z.test(this.nodeName)
    }
  }), x.support.focusinBubbles || x.each({ focus: "focusin", blur: "focusout" }, function(e, t) {
    var n = 0,
      r = function(e) { x.event.simulate(t, e.target, x.event.fix(e), !0) };
    x.event.special[t] = { setup: function() { 0 === n++ && a.addEventListener(e, r, !0) }, teardown: function() { 0 === --n && a.removeEventListener(e, r, !0) } }
  }), x.fn.extend({
    on: function(e, n, r, i, o) {
      var a, s;
      if ("object" == typeof e) {
        "string" != typeof n && (r = r || n, n = t);
        for (a in e) { this.on(a, n, r, e[a], o) }
        return this
      }
      if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) { i = ot } else {
        if (!i) {
          return this
        }
      }
      return 1 === o && (s = i, i = function(e) {
        return x().off(e), s.apply(this, arguments)
      }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function() { x.event.add(this, e, i, r, n) })
    },
    one: function(e, t, n, r) {
      return this.on(e, t, n, r, 1)
    },
    off: function(e, n, r) {
      var i, o;
      if (e && e.preventDefault && e.handleObj) {
        return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
      }
      if ("object" == typeof e) {
        for (o in e) { this.off(o, n, e[o]) }
        return this
      }
      return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function() { x.event.remove(this, e, r, n) })
    },
    trigger: function(e, t) {
      return this.each(function() { x.event.trigger(e, t, this) })
    },
    triggerHandler: function(e, n) {
      var r = this[0];
      return r ? x.event.trigger(e, n, r, !0) : t
    }
  });
  var st = /^.[^:#\[\.,]*$/,
    lt = /^(?:parents|prev(?:Until|All))/,
    ut = x.expr.match.needsContext,
    ct = { children: !0, contents: !0, next: !0, prev: !0 };
  x.fn.extend({
    find: function(e) {
      var t, n = [],
        r = this,
        i = r.length;
      if ("string" != typeof e) {
        return this.pushStack(x(e).filter(function() {
          for (t = 0; i > t; t++) {
            if (x.contains(r[t], this)) {
              return !0
            }
          }
        }))
      }
      for (t = 0; i > t; t++) { x.find(e, r[t], n) }
      return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    },
    has: function(e) {
      var t, n = x(e, this),
        r = n.length;
      return this.filter(function() {
        for (t = 0; r > t; t++) {
          if (x.contains(this, n[t])) {
            return !0
          }
        }
      })
    },
    not: function(e) {
      return this.pushStack(ft(this, e || [], !0))
    },
    filter: function(e) {
      return this.pushStack(ft(this, e || [], !1))
    },
    is: function(e) {
      return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length
    },
    closest: function(e, t) {
      var n, r = 0,
        i = this.length,
        o = [],
        a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
      for (; i > r; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
            n = o.push(n);
            break
          }
        }
      }
      return this.pushStack(o.length > 1 ? x.unique(o) : o)
    },
    index: function(e) {
      return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
      var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
        r = x.merge(this.get(), n);
      return this.pushStack(x.unique(r))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  });

  function pt(e, t) {
    do { e = e[t] } while (e && 1 !== e.nodeType);
    return e
  }
  x.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
      return x.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return x.dir(e, "parentNode", n)
    },
    next: function(e) {
      return pt(e, "nextSibling")
    },
    prev: function(e) {
      return pt(e, "previousSibling")
    },
    nextAll: function(e) {
      return x.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return x.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return x.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return x.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return x.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return x.sibling(e.firstChild)
    },
    contents: function(e) {
      return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes)
    }
  }, function(e, t) {
    x.fn[e] = function(n, r) {
      var i = x.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i)
    }
  }), x.extend({
    filter: function(e, t, n) {
      var r = t[0];
      return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
        return 1 === e.nodeType
      }))
    },
    dir: function(e, n, r) {
      var i = [],
        o = e[n];
      while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) { 1 === o.nodeType && i.push(o), o = o[n] }
      return i
    },
    sibling: function(e, t) {
      var n = [];
      for (; e; e = e.nextSibling) { 1 === e.nodeType && e !== t && n.push(e) }
      return n
    }
  });

  function ft(e, t, n) {
    if (x.isFunction(t)) {
      return x.grep(e, function(e, r) {
        return !!t.call(e, r, e) !== n
      })
    }
    if (t.nodeType) {
      return x.grep(e, function(e) {
        return e === t !== n
      })
    }
    if ("string" == typeof t) {
      if (st.test(t)) {
        return x.filter(t, e, n)
      }
      t = x.filter(t, e)
    }
    return x.grep(e, function(e) {
      return x.inArray(e, t) >= 0 !== n
    })
  }

  function dt(e) {
    var t = ht.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) {
      while (t.length) { n.createElement(t.pop()) }
    }
    return n
  }
  var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    gt = / jQuery\d+="(?:null|\d+)"/g,
    mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"),
    yt = /^\s+/,
    vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    bt = /<([\w:]+)/,
    xt = /<tbody/i,
    wt = /<|&#?\w+;/,
    Tt = /<(?:script|style|link)/i,
    Ct = /^(?:checkbox|radio)$/i,
    Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    kt = /^$|\/(?:java|ecma)script/i,
    Et = /^true\/(.*)/,
    St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    At = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] },
    jt = dt(a),
    Dt = jt.appendChild(a.createElement("div"));
  At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({
    text: function(e) {
      return x.access(this, function(e) {
        return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Lt(this, e);
          t.appendChild(e)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Lt(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this) })
    },
    after: function() {
      return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) })
    },
    remove: function(e, t) {
      var n, r = e ? x.filter(e, this) : this,
        i = 0;
      for (; null != (n = r[i]); i++) { t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), n.parentNode.removeChild(n)) }
      return this
    },
    empty: function() {
      var e, t = 0;
      for (; null != (e = this[t]); t++) {
        1 === e.nodeType && x.cleanData(Ft(e, !1));
        while (e.firstChild) { e.removeChild(e.firstChild) }
        e.options && x.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    },
    clone: function(e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
        return x.clone(this, e, t)
      })
    },
    html: function(e) {
      return x.access(this, function(e) {
        var n = this[0] || {},
          r = 0,
          i = this.length;
        if (e === t) {
          return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t
        }
        if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) {
          e = e.replace(vt, "<$1></$2>");
          try {
            for (; i > r; r++) { n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), n.innerHTML = e) }
            n = 0
          } catch (o) {}
        }
        n && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = x.map(this, function(e) {
          return [e.nextSibling, e.parentNode]
        }),
        t = 0;
      return this.domManip(arguments, function(n) {
        var r = e[t++],
          i = e[t++];
        i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r))
      }, !0), t ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, t, n) {
      e = d.apply([], e);
      var r, i, o, a, s, l, u = 0,
        c = this.length,
        p = this,
        f = c - 1,
        h = e[0],
        g = x.isFunction(h);
      if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) {
        return this.each(function(r) {
          var i = p.eq(r);
          g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n)
        })
      }
      if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) {
        for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) { i = l, u !== f && (i = x.clone(i, !0, !0), o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u) }
        if (o) {
          for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) { i = a[u], kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, ""))) }
        }
        l = r = null
      }
      return this
    }
  });

  function Lt(e, t) {
    return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function Ht(e) {
    return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e
  }

  function qt(e) {
    var t = Et.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function _t(e, t) {
    var n, r = 0;
    for (; null != (n = e[r]); r++) { x._data(n, "globalEval", !t || x._data(t[r], "globalEval")) }
  }

  function Mt(e, t) {
    if (1 === t.nodeType && x.hasData(e)) {
      var n, r, i, o = x._data(e),
        a = x._data(t, o),
        s = o.events;
      if (s) {
        delete a.handle, a.events = {};
        for (n in s) {
          for (r = 0, i = s[n].length; i > r; r++) { x.event.add(t, n, s[n][r]) }
        }
      }
      a.data && (a.data = x.extend({}, a.data))
    }
  }

  function Ot(e, t) {
    var n, r, i;
    if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) {
        i = x._data(t);
        for (r in i.events) { x.removeEvent(t, r, i.handle) }
        t.removeAttribute(x.expando)
      }
      "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
  }
  x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e, t) {
    x.fn[e] = function(e) {
      var n, r = 0,
        i = [],
        o = x(e),
        a = o.length - 1;
      for (; a >= r; r++) { n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get()) }
      return this.pushStack(i)
    }
  });

  function Ft(e, n) {
    var r, o, a = 0,
      s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
    if (!s) {
      for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) {!n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n)) }
    }
    return n === t || n && x.nodeName(e, n) ? x.merge([e], s) : s
  }

  function Bt(e) { Ct.test(e.type) && (e.defaultChecked = e.checked) }
  x.extend({
    clone: function(e, t, n) {
      var r, i, o, a, s, l = x.contains(e.ownerDocument, e);
      if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) {
        for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]); ++a) { r[a] && Ot(i, r[a]) }
      }
      if (t) {
        if (n) {
          for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]); a++) { Mt(i, r[a]) }
        } else { Mt(e, o) }
      }
      return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, o
    },
    buildFragment: function(e, t, n, r) {
      var i, o, a, s, l, u, c, p = e.length,
        f = dt(t),
        d = [],
        h = 0;
      for (; p > h; h++) {
        if (o = e[h], o || 0 === o) {
          if ("object" === x.type(o)) { x.merge(d, o.nodeType ? [o] : o) } else {
            if (wt.test(o)) {
              s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0];
              while (i--) { s = s.lastChild }
              if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) {
                o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length;
                while (i--) { x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u) }
              }
              x.merge(d, s.childNodes), s.textContent = "";
              while (s.firstChild) { s.removeChild(s.firstChild) }
              s = f.lastChild
            } else { d.push(t.createTextNode(o)) }
          }
        }
      }
      s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0;
      while (o = d[h++]) {
        if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), s = Ft(f.appendChild(o), "script"), a && _t(s), n)) {
          i = 0;
          while (o = s[i++]) { kt.test(o.type || "") && n.push(o) }
        }
      }
      return s = null, f
    },
    cleanData: function(e, t) {
      var n, r, o, a, s = 0,
        l = x.expando,
        u = x.cache,
        c = x.support.deleteExpando,
        f = x.event.special;
      for (; null != (n = e[s]); s++) {
        if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
          if (a.events) {
            for (r in a.events) { f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle) }
          }
          u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o))
        }
      }
    },
    _evalUrl: function(e) {
      return x.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 })
    }
  }), x.fn.extend({
    wrapAll: function(e) {
      if (x.isFunction(e)) {
        return this.each(function(t) { x(this).wrapAll(e.call(this, t)) })
      }
      if (this[0]) {
        var t = x(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
          var e = this;
          while (e.firstChild && 1 === e.firstChild.nodeType) { e = e.firstChild }
          return e
        }).append(this)
      }
      return this
    },
    wrapInner: function(e) {
      return x.isFunction(e) ? this.each(function(t) { x(this).wrapInner(e.call(this, t)) }) : this.each(function() {
        var t = x(this),
          n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = x.isFunction(e);
      return this.each(function(n) { x(this).wrapAll(t ? e.call(this, n) : e) })
    },
    unwrap: function() {
      return this.parent().each(function() { x.nodeName(this, "body") || x(this).replaceWith(this.childNodes) }).end()
    }
  });
  var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i,
    It = /opacity\s*=\s*([^)]*)/,
    zt = /^(top|right|bottom|left)$/,
    Xt = /^(none|table(?!-c[ea]).+)/,
    Ut = /^margin/,
    Vt = RegExp("^(" + w + ")(.*)$", "i"),
    Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"),
    Jt = RegExp("^([+-])=(" + w + ")", "i"),
    Gt = { BODY: "block" },
    Qt = { position: "absolute", visibility: "hidden", display: "block" },
    Kt = { letterSpacing: 0, fontWeight: 400 },
    Zt = ["Top", "Right", "Bottom", "Left"],
    en = ["Webkit", "O", "Moz", "ms"];

  function tn(e, t) {
    if (t in e) {
      return t
    }
    var n = t.charAt(0).toUpperCase() + t.slice(1),
      r = t,
      i = en.length;
    while (i--) {
      if (t = en[i] + n, t in e) {
        return t
      }
    }
    return r
  }

  function nn(e, t) {
    return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
  }

  function rn(e, t) {
    var n, r, i, o = [],
      a = 0,
      s = e.length;
    for (; s > a; a++) { r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display")))) }
    for (a = 0; s > a; a++) { r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none")) }
    return e
  }
  x.fn.extend({
    css: function(e, n) {
      return x.access(this, function(e, n, r) {
        var i, o, a = {},
          s = 0;
        if (x.isArray(n)) {
          for (o = Rt(e), i = n.length; i > s; s++) { a[n[s]] = x.css(e, n[s], !1, o) }
          return a
        }
        return r !== t ? x.style(e, n, r) : x.css(e, n)
      }, e, n, arguments.length > 1)
    },
    show: function() {
      return rn(this, !0)
    },
    hide: function() {
      return rn(this)
    },
    toggle: function(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() { nn(this) ? x(this).show() : x(this).hide() })
    }
  }), x.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = Wt(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
    cssProps: { "float": x.support.cssFloat ? "cssFloat" : "styleFloat" },
    style: function(e, n, r, i) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o, a, s, l = x.camelCase(n),
          u = e.style;
        if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], r === t) {
          return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n]
        }
        if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) {
          try { u[n] = r } catch (c) {}
        }
      }
    },
    css: function(e, n, r, i) {
      var o, a, s, l = x.camelCase(n);
      return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a
    }
  }), e.getComputedStyle ? (Rt = function(t) {
    return e.getComputedStyle(t, null)
  }, Wt = function(e, n, r) {
    var i, o, a, s = r || Rt(e),
      l = s ? s.getPropertyValue(n) || s[n] : t,
      u = e.style;
    return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l
  }) : a.documentElement.currentStyle && (Rt = function(e) {
    return e.currentStyle
  }, Wt = function(e, n, r) {
    var i, o, a, s = r || Rt(e),
      l = s ? s[n] : t,
      u = e.style;
    return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l
  });

  function on(e, t, n) {
    var r = Vt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function an(e, t, n, r, i) {
    var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
      a = 0;
    for (; 4 > o; o += 2) { "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i))) }
    return a
  }

  function sn(e, t, n) {
    var r = !0,
      i = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = Rt(e),
      a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
    if (0 >= i || null == i) {
      if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) {
        return i
      }
      r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px"
  }

  function ln(e) {
    var t = a,
      n = Gt[e];
    return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n
  }

  function un(e, t) {
    var n = x(t.createElement(e)).appendTo(t.body),
      r = x.css(n[0], "display");
    return n.remove(), r
  }
  x.each(["height", "width"], function(e, n) {
    x.cssHooks[n] = {
      get: function(e, r, i) {
        return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function() {
          return sn(e, n, i)
        }) : sn(e, n, i) : t
      },
      set: function(e, t, r) {
        var i = r && Rt(e);
        return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
      }
    }
  }), x.support.opacity || (x.cssHooks.opacity = {
    get: function(e, t) {
      return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    },
    set: function(e, t) {
      var n = e.style,
        r = e.currentStyle,
        i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
        o = r && r.filter || n.filter || "";
      n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i)
    }
  }), x(function() {
    x.support.reliableMarginRight || (x.cssHooks.marginRight = {
      get: function(e, n) {
        return n ? x.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"]) : t
      }
    }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, n) {
      x.cssHooks[n] = {
        get: function(e, r) {
          return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t
        }
      }
    })
  }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
    return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display"))
  }, x.expr.filters.visible = function(e) {
    return !x.expr.filters.hidden(e)
  }), x.each({ margin: "", padding: "", border: "Width" }, function(e, t) {
    x.cssHooks[e + t] = {
      expand: function(n) {
        var r = 0,
          i = {},
          o = "string" == typeof n ? n.split(" ") : [n];
        for (; 4 > r; r++) { i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0] }
        return i
      }
    }, Ut.test(e) || (x.cssHooks[e + t].set = on)
  });
  var cn = /%20/g,
    pn = /\[\]$/,
    fn = /\r?\n/g,
    dn = /^(?:submit|button|image|reset|file)$/i,
    hn = /^(?:input|select|textarea|keygen)/i;
  x.fn.extend({
    serialize: function() {
      return x.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = x.prop(this, "elements");
        return e ? x.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e))
      }).map(function(e, t) {
        var n = x(this).val();
        return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
          return { name: t.name, value: e.replace(fn, "\r\n") }
        }) : { name: t.name, value: n.replace(fn, "\r\n") }
      }).get()
    }
  }), x.param = function(e, n) {
    var r, i = [],
      o = function(e, t) { t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) };
    if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) { x.each(e, function() { o(this.name, this.value) }) } else {
      for (r in e) { gn(r, e[r], n, o) }
    }
    return i.join("&").replace(cn, "+")
  };

  function gn(e, t, n, r) {
    var i;
    if (x.isArray(t)) { x.each(t, function(t, i) { n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) }) } else {
      if (n || "object" !== x.type(t)) { r(e, t) } else {
        for (i in t) { gn(e + "[" + i + "]", t[i], n, r) }
      }
    }
  }
  x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
    x.fn[t] = function(e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), x.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, r) {
      return this.on(t, e, n, r)
    },
    undelegate: function(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var mn, yn, vn = x.now(),
    bn = /\?/,
    xn = /#.*$/,
    wn = /([?&])_=[^&]*/,
    Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Nn = /^(?:GET|HEAD)$/,
    kn = /^\/\//,
    En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    Sn = x.fn.load,
    An = {},
    jn = {},
    Dn = "*/".concat("*");
  try { yn = o.href } catch (Ln) { yn = a.createElement("a"), yn.href = "", yn = yn.href }
  mn = En.exec(yn.toLowerCase()) || [];

  function Hn(e) {
    return function(t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r, i = 0,
        o = t.toLowerCase().match(T) || [];
      if (x.isFunction(n)) {
        while (r = o[i++]) { "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) }
      }
    }
  }

  function qn(e, n, r, i) {
    var o = {},
      a = e === jn;

    function s(l) {
      var u;
      return o[l] = !0, x.each(e[l] || [], function(e, l) {
        var c = l(n, r, i);
        return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1)
      }), u
    }
    return s(n.dataTypes[0]) || !o["*"] && s("*")
  }

  function _n(e, n) {
    var r, i, o = x.ajaxSettings.flatOptions || {};
    for (i in n) { n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]) }
    return r && x.extend(!0, e, r), e
  }
  x.fn.load = function(e, n, r) {
    if ("string" != typeof e && Sn) {
      return Sn.apply(this, arguments)
    }
    var i, o, a, s = this,
      l = e.indexOf(" ");
    return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({ url: e, type: a, dataType: "html", data: n }).done(function(e) { o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e) }).complete(r && function(e, t) { s.each(r, o || [e.responseText, t, e]) }), this
  }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    x.fn[t] = function(e) {
      return this.on(t, e)
    }
  }), x.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: { url: yn, type: "GET", isLocal: Cn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } },
    ajaxSetup: function(e, t) {
      return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e)
    },
    ajaxPrefilter: Hn(An),
    ajaxTransport: Hn(jn),
    ajax: function(e, n) {
      "object" == typeof e && (n = e, e = t), n = n || {};
      var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n),
        f = p.context || p,
        d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event,
        h = x.Deferred(),
        g = x.Callbacks("once memory"),
        m = p.statusCode || {},
        y = {},
        v = {},
        b = 0,
        w = "canceled",
        C = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (2 === b) {
              if (!c) {
                c = {};
                while (t = Tn.exec(a)) { c[t[1].toLowerCase()] = t[2] }
              }
              t = c[e.toLowerCase()]
            }
            return null == t ? null : t
          },
          getAllResponseHeaders: function() {
            return 2 === b ? a : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return b || (e = v[n] = v[n] || e, y[e] = t), this
          },
          overrideMimeType: function(e) {
            return b || (p.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e) {
              if (2 > b) {
                for (t in e) { m[t] = [m[t], e[t]] }
              } else { C.always(e[C.status]) }
            }
            return this
          },
          abort: function(e) {
            var t = e || w;
            return u && u.abort(t), k(0, t), this
          }
        };
      if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), qn(An, p, n, C), 2 === b) {
        return C
      }
      l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
      for (i in p.headers) { C.setRequestHeader(i, p.headers[i]) }
      if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) {
        return C.abort()
      }
      w = "abort";
      for (i in { success: 1, error: 1, complete: 1 }) { C[i](p[i]) }
      if (u = qn(jn, p, n, C)) {
        C.readyState = 1, l && d.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (s = setTimeout(function() { C.abort("timeout") }, p.timeout));
        try { b = 1, u.send(y, k) } catch (N) {
          if (!(2 > b)) {
            throw N
          }
          k(-1, N)
        }
      } else { k(-1, "No Transport") }

      function k(e, n, r, i) {
        var c, y, v, w, T, N = n;
        2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]), g.fireWith(f, [C, N]), l && (d.trigger("ajaxComplete", [C, p]), --x.active || x.event.trigger("ajaxStop")))
      }
      return C
    },
    getJSON: function(e, t, n) {
      return x.get(e, t, n, "json")
    },
    getScript: function(e, n) {
      return x.get(e, t, n, "script")
    }
  }), x.each(["get", "post"], function(e, n) {
    x[n] = function(e, r, i, o) {
      return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({ url: e, type: n, dataType: o, data: r, success: i })
    }
  });

  function Mn(e, n, r) {
    var i, o, a, s, l = e.contents,
      u = e.dataTypes;
    while ("*" === u[0]) { u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type")) }
    if (o) {
      for (s in l) {
        if (l[s] && l[s].test(o)) {
          u.unshift(s);
          break
        }
      }
    }
    if (u[0] in r) { a = u[0] } else {
      for (s in r) {
        if (!u[0] || e.converters[s + " " + u[0]]) {
          a = s;
          break
        }
        i || (i = s)
      }
      a = a || i
    }
    return a ? (a !== u[0] && u.unshift(a), r[a]) : t
  }

  function On(e, t, n, r) {
    var i, o, a, s, l, u = {},
      c = e.dataTypes.slice();
    if (c[1]) {
      for (a in e.converters) { u[a.toLowerCase()] = e.converters[a] }
    }
    o = c.shift();
    while (o) {
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) {
        if ("*" === o) { o = l } else {
          if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a) {
              for (i in u) {
                if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                  a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                  break
                }
              }
            }
            if (a !== !0) {
              if (a && e["throws"]) { t = a(t) } else {
                try { t = a(t) } catch (p) {
                  return { state: "parsererror", error: a ? p : "No conversion from " + l + " to " + o }
                }
              }
            }
          }
        }
      }
    }
    return { state: "success", data: t }
  }
  x.ajaxSetup({
    accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      "text script": function(e) {
        return x.globalEval(e), e
      }
    }
  }), x.ajaxPrefilter("script", function(e) { e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1) }), x.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
      var n, r = a.head || x("head")[0] || a.documentElement;
      return {
        send: function(t, i) {
          n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
            (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
          }, r.insertBefore(n, r.firstChild)
        },
        abort: function() { n && n.onload(t, !0) }
      }
    }
  });
  var Fn = [],
    Bn = /(=)\?(?=&|$)|\?\?/;
  x.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = Fn.pop() || x.expando + "_" + vn++;
      return this[e] = !0, e
    }
  }), x.ajaxPrefilter("json jsonp", function(n, r, i) {
    var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
    return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
      return s || x.error(o + " was not called"), s[0]
    }, n.dataTypes[0] = "json", a = e[o], e[o] = function() { s = arguments }, i.always(function() { e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t }), "script") : t
  });
  var Pn, Rn, Wn = 0,
    $n = e.ActiveXObject && function() {
      var e;
      for (e in Pn) { Pn[e](t, !0) }
    };

  function In() {
    try {
      return new e.XMLHttpRequest
    } catch (t) {}
  }

  function zn() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {}
  }
  x.ajaxSettings.xhr = e.ActiveXObject ? function() {
    return !this.isLocal && In() || zn()
  } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function(n) {
    if (!n.crossDomain || x.support.cors) {
      var r;
      return {
        send: function(i, o) {
          var a, s, l = n.xhr();
          if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) {
            for (s in n.xhrFields) { l[s] = n.xhrFields[s] }
          }
          n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (s in i) { l.setRequestHeader(s, i[s]) }
          } catch (u) {}
          l.send(n.hasContent && n.data || null), r = function(e, i) {
            var s, u, c, p;
            try {
              if (r && (i || 4 === l.readyState)) {
                if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) { 4 !== l.readyState && l.abort() } else {
                  p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText);
                  try { c = l.statusText } catch (f) { c = "" }
                  s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404
                }
              }
            } catch (d) { i || o(-1, d) }
            p && o(s, c, p, u)
          }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r()
        },
        abort: function() { r && r(t, !0) }
      }
    }
  });
  var Xn, Un, Vn = /^(?:toggle|show|hide)$/,
    Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"),
    Jn = /queueHooks$/,
    Gn = [nr],
    Qn = {
      "*": [function(e, t) {
        var n = this.createTween(e, t),
          r = n.cur(),
          i = Yn.exec(t),
          o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
          a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)),
          s = 1,
          l = 20;
        if (a && a[3] !== o) {
          o = o || a[3], i = i || [], a = +r || 1;
          do { s = s || ".5", a /= s, x.style(n.elem, e, a + o) } while (s !== (s = n.cur() / r) && 1 !== s && --l)
        }
        return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
      }]
    };

  function Kn() {
    return setTimeout(function() { Xn = t }), Xn = x.now()
  }

  function Zn(e, t, n) {
    var r, i = (Qn[t] || []).concat(Qn["*"]),
      o = 0,
      a = i.length;
    for (; a > o; o++) {
      if (r = i[o].call(n, t, e)) {
        return r
      }
    }
  }

  function er(e, t, n) {
    var r, i, o = 0,
      a = Gn.length,
      s = x.Deferred().always(function() { delete l.elem }),
      l = function() {
        if (i) {
          return !1
        }
        var t = Xn || Kn(),
          n = Math.max(0, u.startTime + u.duration - t),
          r = n / u.duration || 0,
          o = 1 - r,
          a = 0,
          l = u.tweens.length;
        for (; l > a; a++) { u.tweens[a].run(o) }
        return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
      },
      u = s.promise({
        elem: e,
        props: x.extend({}, t),
        opts: x.extend(!0, { specialEasing: {} }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: Xn || Kn(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
          return u.tweens.push(r), r
        },
        stop: function(t) {
          var n = 0,
            r = t ? u.tweens.length : 0;
          if (i) {
            return this
          }
          for (i = !0; r > n; n++) { u.tweens[n].run(1) }
          return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
        }
      }),
      c = u.props;
    for (tr(c, u.opts.specialEasing); a > o; o++) {
      if (r = Gn[o].call(u, e, c, u.opts)) {
        return r
      }
    }
    return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
  }

  function tr(e, t) {
    var n, r, i, o, a;
    for (n in e) {
      if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) {
        o = a.expand(o), delete e[r];
        for (n in o) { n in e || (e[n] = o[n], t[n] = i) }
      } else { t[r] = i }
    }
  }
  x.Animation = x.extend(er, {
    tweener: function(e, t) {
      x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      var n, r = 0,
        i = e.length;
      for (; i > r; r++) { n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t) }
    },
    prefilter: function(e, t) { t ? Gn.unshift(e) : Gn.push(e) }
  });

  function nr(e, t, n) {
    var r, i, o, a, s, l, u = this,
      c = {},
      p = e.style,
      f = e.nodeType && nn(e),
      d = x._data(e, "fxshow");
    n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() { s.unqueued || l() }), s.unqueued++, u.always(function() { u.always(function() { s.unqueued--, x.queue(e, "fx").length || s.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function() { p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2] }));
    for (r in t) {
      if (i = t[r], Vn.exec(i)) {
        if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
          continue
        }
        c[r] = d && d[r] || x.style(e, r)
      }
    }
    if (!x.isEmptyObject(c)) {
      d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), f ? x(e).show() : u.done(function() { x(e).hide() }), u.done(function() {
        var t;
        x._removeData(e, "fxshow");
        for (t in c) { x.style(e, t, c[t]) }
      });
      for (r in c) { a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0)) }
    }
  }

  function rr(e, t, n, r, i) {
    return new rr.prototype.init(e, t, n, r, i)
  }
  x.Tween = rr, rr.prototype = {
    constructor: rr,
    init: function(e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px") },
    cur: function() {
      var e = rr.propHooks[this.prop];
      return e && e.get ? e.get(this) : rr.propHooks._default.get(this)
    },
    run: function(e) {
      var t, n = rr.propHooks[this.prop];
      return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this
    }
  }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
    _default: {
      get: function(e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      },
      set: function(e) { x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now }
    }
  }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = { set: function(e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, x.each(["toggle", "show", "hide"], function(e, t) {
    var n = x.fn[t];
    x.fn[t] = function(e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i)
    }
  }), x.fn.extend({
    fadeTo: function(e, t, n, r) {
      return this.filter(nn).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r)
    },
    animate: function(e, t, n, r) {
      var i = x.isEmptyObject(e),
        o = x.speed(t, n, r),
        a = function() {
          var t = er(this, x.extend({}, e), o);
          (i || x._data(this, "finish")) && t.stop(!0)
        };
      return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    },
    stop: function(e, n, r) {
      var i = function(e) {
        var t = e.stop;
        delete e.stop, t(r)
      };
      return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
        var t = !0,
          n = null != e && e + "queueHooks",
          o = x.timers,
          a = x._data(this);
        if (n) { a[n] && a[n].stop && i(a[n]) } else {
          for (n in a) { a[n] && a[n].stop && Jn.test(n) && i(a[n]) }
        }
        for (n = o.length; n--;) { o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)) }(t || !r) && x.dequeue(this, e)
      })
    },
    finish: function(e) {
      return e !== !1 && (e = e || "fx"), this.each(function() {
        var t, n = x._data(this),
          r = n[e + "queue"],
          i = n[e + "queueHooks"],
          o = x.timers,
          a = r ? r.length : 0;
        for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) { o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)) }
        for (t = 0; a > t; t++) { r[t] && r[t].finish && r[t].finish.call(this) }
        delete n.finish
      })
    }
  });

  function ir(e, t) {
    var n, r = { height: e },
      i = 0;
    for (t = t ? 1 : 0; 4 > i; i += 2 - t) { n = Zt[i], r["margin" + n] = r["padding" + n] = e }
    return t && (r.opacity = r.width = e), r
  }
  x.each({ slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e, t) {
    x.fn[e] = function(e, n, r) {
      return this.animate(t, e, n, r)
    }
  }), x.speed = function(e, t, n) {
    var r = e && "object" == typeof e ? x.extend({}, e) : { complete: n || !n && t || x.isFunction(e) && e, duration: e, easing: n && t || t && !x.isFunction(t) && t };
    return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() { x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue) }, r
  }, x.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return 0.5 - Math.cos(e * Math.PI) / 2
    }
  }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function() {
    var e, n = x.timers,
      r = 0;
    for (Xn = x.now(); n.length > r; r++) { e = n[r], e() || n[r] !== e || n.splice(r--, 1) }
    n.length || x.fx.stop(), Xn = t
  }, x.fx.timer = function(e) { e() && x.timers.push(e) && x.fx.start() }, x.fx.interval = 13, x.fx.start = function() { Un || (Un = setInterval(x.fx.tick, x.fx.interval)) }, x.fx.stop = function() { clearInterval(Un), Un = null }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
    return x.grep(x.timers, function(t) {
      return e === t.elem
    }).length
  }), x.fn.offset = function(e) {
    if (arguments.length) {
      return e === t ? this : this.each(function(t) { x.offset.setOffset(this, e, t) })
    }
    var n, r, o = { top: 0, left: 0 },
      a = this[0],
      s = a && a.ownerDocument;
    if (s) {
      return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), { top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : o
    }
  }, x.offset = {
    setOffset: function(e, t, n) {
      var r = x.css(e, "position");
      "static" === r && (e.style.position = "relative");
      var i = x(e),
        o = i.offset(),
        a = x.css(e, "top"),
        s = x.css(e, "left"),
        l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [a, s]) > -1,
        u = {},
        c = {},
        p, f;
      l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u)
    }
  }, x.fn.extend({
    position: function() {
      if (this[0]) {
        var e, t, n = { top: 0, left: 0 },
          r = this[0];
        return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), n.left += x.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - x.css(r, "marginTop", !0), left: t.left - n.left - x.css(r, "marginLeft", !0) }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var e = this.offsetParent || s;
        while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) { e = e.offsetParent }
        return e || s
      })
    }
  }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(e, n) {
    var r = /Y/.test(n);
    x.fn[e] = function(i) {
      return x.access(this, function(e, i, o) {
        var a = or(e);
        return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, t)
      }, e, i, arguments.length, null)
    }
  });

  function or(e) {
    return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
  }
  x.each({ Height: "height", Width: "width" }, function(e, n) {
    x.each({ padding: "inner" + e, content: n, "": "outer" + e }, function(r, i) {
      x.fn[i] = function(i, o) {
        var a = arguments.length && (r || "boolean" != typeof i),
          s = r || (i === !0 || o === !0 ? "margin" : "border");
        return x.access(this, function(n, r, i) {
          var o;
          return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s)
        }, n, a ? i : t, a, null)
      }
    })
  }), x.fn.size = function() {
    return this.length
  }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, "function" == typeof define && define.amd && define("jquery", [], function() {
    return x
  }))
})(window);
if (typeof jQuery === "undefined") {
  throw new Error("Bootstrap's JavaScript requires jQuery")
} + function(b) {
  function a() {
    var e = document.createElement("bootstrap");
    var d = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
    for (var c in d) {
      if (e.style[c] !== undefined) {
        return { end: d[c] }
      }
    }
    return false
  }
  b.fn.emulateTransitionEnd = function(e) {
    var d = false;
    var c = this;
    b(this).one("bsTransitionEnd", function() { d = true });
    var f = function() {
      if (!d) { b(c).trigger(b.support.transition.end) }
    };
    setTimeout(f, e);
    return this
  };
  b(function() {
    b.support.transition = a();
    if (!b.support.transition) {
      return
    }
    b.event.special.bsTransitionEnd = {
      bindType: b.support.transition.end,
      delegateType: b.support.transition.end,
      handle: function(c) {
        if (b(c.target).is(this)) {
          return c.handleObj.handler.apply(this, arguments)
        }
      }
    }
  })
}(jQuery); + function(e) {
  var d = '[data-dismiss="alert"]';
  var b = function(f) { e(f).on("click", d, this.close) };
  b.VERSION = "3.2.0";
  b.prototype.close = function(j) {
    var i = e(this);
    var g = i.attr("data-target");
    if (!g) {
      g = i.attr("href");
      g = g && g.replace(/.*(?=#[^\s]*$)/, "")
    }
    var h = e(g);
    if (j) { j.preventDefault() }
    if (!h.length) { h = i.hasClass("alert") ? i : i.parent() }
    h.trigger(j = e.Event("close.bs.alert"));
    if (j.isDefaultPrevented()) {
      return
    }
    h.removeClass("in");

    function f() { h.detach().trigger("closed.bs.alert").remove() }
    e.support.transition && h.hasClass("fade") ? h.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
  };

  function c(f) {
    return this.each(function() {
      var h = e(this);
      var g = h.data("bs.alert");
      if (!g) { h.data("bs.alert", (g = new b(this))) }
      if (typeof f == "string") { g[f].call(h) }
    })
  }
  var a = e.fn.alert;
  e.fn.alert = c;
  e.fn.alert.Constructor = b;
  e.fn.alert.noConflict = function() {
    e.fn.alert = a;
    return this
  };
  e(document).on("click.bs.alert.data-api", d, b.prototype.close)
}(jQuery); + function(d) {
  var b = function(f, e) {
    this.$element = d(f);
    this.options = d.extend({}, b.DEFAULTS, e);
    this.isLoading = false
  };
  b.VERSION = "3.2.0";
  b.DEFAULTS = { loadingText: "loading..." };
  b.prototype.setState = function(g) {
    var i = "disabled";
    var e = this.$element;
    var h = e.is("input") ? "val" : "html";
    var f = e.data();
    g = g + "Text";
    if (f.resetText == null) { e.data("resetText", e[h]()) }
    e[h](f[g] == null ? this.options[g] : f[g]);
    setTimeout(d.proxy(function() {
      if (g == "loadingText") {
        this.isLoading = true;
        e.addClass(i).attr(i, i)
      } else {
        if (this.isLoading) {
          this.isLoading = false;
          e.removeClass(i).removeAttr(i)
        }
      }
    }, this), 0)
  };
  b.prototype.toggle = function() {
    var f = true;
    var e = this.$element.closest('[data-toggle="buttons"]');
    if (e.length) {
      var g = this.$element.find("input");
      if (g.prop("type") == "radio") {
        if (g.prop("checked") && this.$element.hasClass("active")) { f = false } else { e.find(".active").removeClass("active") }
      }
      if (f) { g.prop("checked", !this.$element.hasClass("active")).trigger("change") }
    }
    if (f) { this.$element.toggleClass("active") }
  };

  function c(e) {
    return this.each(function() {
      var h = d(this);
      var g = h.data("bs.button");
      var f = typeof e == "object" && e;
      if (!g) { h.data("bs.button", (g = new b(this, f))) }
      if (e == "toggle") { g.toggle() } else {
        if (e) { g.setState(e) }
      }
    })
  }
  var a = d.fn.button;
  d.fn.button = c;
  d.fn.button.Constructor = b;
  d.fn.button.noConflict = function() {
    d.fn.button = a;
    return this
  };
  d(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(g) {
    var f = d(g.target);
    if (!f.hasClass("btn")) { f = f.closest(".btn") }
    c.call(f, "toggle");
    g.preventDefault()
  })
}(jQuery); + function(c) {
  var d = function(f, e) {
    this.$element = c(f).on("keydown.bs.carousel", c.proxy(this.keydown, this));
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = e;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.pause == "hover" && this.$element.on("mouseenter.bs.carousel", c.proxy(this.pause, this)).on("mouseleave.bs.carousel", c.proxy(this.cycle, this))
  };
  d.VERSION = "3.2.0";
  d.DEFAULTS = { interval: 5000, pause: "hover", wrap: true };
  d.prototype.keydown = function(f) {
    switch (f.which) {
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
      default:
        return
    }
    f.preventDefault()
  };
  d.prototype.cycle = function(f) {
    f || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval(c.proxy(this.next, this), this.options.interval));
    return this
  };
  d.prototype.getItemIndex = function(e) {
    this.$items = e.parent().children(".item");
    return this.$items.index(e || this.$active)
  };
  d.prototype.to = function(g) {
    var f = this;
    var e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (g > (this.$items.length - 1) || g < 0) {
      return
    }
    if (this.sliding) {
      return this.$element.one("slid.bs.carousel", function() { f.to(g) })
    }
    if (e == g) {
      return this.pause().cycle()
    }
    return this.slide(g > e ? "next" : "prev", c(this.$items[g]))
  };
  d.prototype.pause = function(f) {
    f || (this.paused = true);
    if (this.$element.find(".next, .prev").length && c.support.transition) {
      this.$element.trigger(c.support.transition.end);
      this.cycle(true)
    }
    this.interval = clearInterval(this.interval);
    return this
  };
  d.prototype.next = function() {
    if (this.sliding) {
      return
    }
    return this.slide("next").pause()
  };
  d.prototype.prev = function() {
    if (this.sliding) {
      return
    }
    return this.slide("prev").pause()
  };
  d.prototype.slide = function(m, h) {
    var p = this.$element.find(".item.active");
    var f = h || p[m]();
    var k = this.interval;
    var n = m == "next" ? "left" : "right";
    var i = m == "next" ? "first" : "last";
    var j = this;
    if (!f.length) {
      if (!this.options.wrap) {
        return
      }
      f = this.$element.find(".item")[i]()
    }
    if (f.hasClass("active")) {
      return (this.sliding = false)
    }
    var l = f[0];
    var e = c.Event("slide.bs.carousel", { relatedTarget: l, direction: n });
    this.$element.trigger(e);
    if (e.isDefaultPrevented()) {
      return
    }
    this.sliding = true;
    k && this.pause();
    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      var g = c(this.$indicators.children()[this.getItemIndex(f)]);
      g && g.addClass("active")
    }
    var o = c.Event("slid.bs.carousel", { relatedTarget: l, direction: n });
    if (c.support.transition && this.$element.hasClass("slide")) {
      f.addClass(m);
      f[0].offsetWidth;
      p.addClass(n);
      f.addClass(n);
      p.one("bsTransitionEnd", function() {
        f.removeClass([m, n].join(" ")).addClass("active");
        p.removeClass(["active", n].join(" "));
        j.sliding = false;
        setTimeout(function() { j.$element.trigger(o) }, 0)
      }).emulateTransitionEnd(p.css("transition-duration").slice(0, -1) * 1000)
    } else {
      p.removeClass("active");
      f.addClass("active");
      this.sliding = false;
      this.$element.trigger(o)
    }
    k && this.cycle();
    return this
  };

  function b(e) {
    return this.each(function() {
      var i = c(this);
      var h = i.data("bs.carousel");
      var f = c.extend({}, d.DEFAULTS, i.data(), typeof e == "object" && e);
      var g = typeof e == "string" ? e : f.slide;
      if (!h) { i.data("bs.carousel", (h = new d(this, f))) }
      if (typeof e == "number") { h.to(e) } else {
        if (g) { h[g]() } else {
          if (f.interval) { h.pause().cycle() }
        }
      }
    })
  }
  var a = c.fn.carousel;
  c.fn.carousel = b;
  c.fn.carousel.Constructor = d;
  c.fn.carousel.noConflict = function() {
    c.fn.carousel = a;
    return this
  };
  c(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(k) {
    var g;
    var j = c(this);
    var f = c(j.attr("data-target") || (g = j.attr("href")) && g.replace(/.*(?=#[^\s]+$)/, ""));
    if (!f.hasClass("carousel")) {
      return
    }
    var h = c.extend({}, f.data(), j.data());
    var i = j.attr("data-slide-to");
    if (i) { h.interval = false }
    b.call(f, h);
    if (i) { f.data("bs.carousel").to(i) }
    k.preventDefault()
  });
  c(window).on("load", function() {
    c('[data-ride="carousel"]').each(function() {
      var e = c(this);
      b.call(e, e.data())
    })
  })
}(jQuery); + function(c) {
  var d = function(f, e) {
    this.$element = c(f);
    this.options = c.extend({}, d.DEFAULTS, e);
    this.transitioning = null;
    if (this.options.parent) { this.$parent = c(this.options.parent) }
    if (this.options.toggle) { this.toggle() }
  };
  d.VERSION = "3.2.0";
  d.DEFAULTS = { toggle: true };
  d.prototype.dimension = function() {
    var e = this.$element.hasClass("width");
    return e ? "width" : "height"
  };
  d.prototype.show = function() {
    if (this.transitioning || this.$element.hasClass("in")) {
      return
    }
    var f = c.Event("show.bs.collapse");
    this.$element.trigger(f);
    if (f.isDefaultPrevented()) {
      return
    }
    var i = this.$parent && this.$parent.find("> .panel > .in");
    if (i && i.length) {
      var g = i.data("bs.collapse");
      if (g && g.transitioning) {
        return
      }
      b.call(i, "hide");
      g || i.data("bs.collapse", null)
    }
    var j = this.dimension();
    this.$element.removeClass("collapse").addClass("collapsing")[j](0);
    this.transitioning = 1;
    var e = function() {
      this.$element.removeClass("collapsing").addClass("collapse in")[j]("");
      this.transitioning = 0;
      this.$element.trigger("shown.bs.collapse")
    };
    if (!c.support.transition) {
      return e.call(this)
    }
    var h = c.camelCase(["scroll", j].join("-"));
    this.$element.one("bsTransitionEnd", c.proxy(e, this)).emulateTransitionEnd(350)[j](this.$element[0][h])
  };
  d.prototype.hide = function() {
    if (this.transitioning || !this.$element.hasClass("in")) {
      return
    }
    var f = c.Event("hide.bs.collapse");
    this.$element.trigger(f);
    if (f.isDefaultPrevented()) {
      return
    }
    var g = this.dimension();
    this.$element[g](this.$element[g]())[0].offsetHeight;
    this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
    this.transitioning = 1;
    var e = function() {
      this.transitioning = 0;
      this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
    };
    if (!c.support.transition) {
      return e.call(this)
    }
    this.$element[g](0).one("bsTransitionEnd", c.proxy(e, this)).emulateTransitionEnd(350)
  };
  d.prototype.toggle = function() { this[this.$element.hasClass("in") ? "hide" : "show"]() };

  function b(e) {
    return this.each(function() {
      var h = c(this);
      var g = h.data("bs.collapse");
      var f = c.extend({}, d.DEFAULTS, h.data(), typeof e == "object" && e);
      if (!g && f.toggle && e == "show") { e = !e }
      if (!g) { h.data("bs.collapse", (g = new d(this, f))) }
      if (typeof e == "string") { g[e]() }
    })
  }
  var a = c.fn.collapse;
  c.fn.collapse = b;
  c.fn.collapse.Constructor = d;
  c.fn.collapse.noConflict = function() {
    c.fn.collapse = a;
    return this
  };
  c(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(k) {
    var f;
    var m = c(this);
    var l = m.attr("data-target") || k.preventDefault() || (f = m.attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "");
    var g = c(l);
    var i = g.data("bs.collapse");
    var j = i ? "toggle" : m.data();
    var n = m.attr("data-parent");
    var h = n && c(n);
    if (!i || !i.transitioning) {
      if (h) { h.find('[data-toggle="collapse"][data-parent="' + n + '"]').not(m).addClass("collapsed") }
      m[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")
    }
    b.call(g, j)
  })
}(jQuery); + function(h) {
  var e = ".dropdown-backdrop";
  var b = '[data-toggle="dropdown"]';
  var a = function(i) { h(i).on("click.bs.dropdown", this.toggle) };
  a.VERSION = "3.2.0";
  a.prototype.toggle = function(m) {
    var l = h(this);
    if (l.is(".disabled, :disabled")) {
      return
    }
    var k = f(l);
    var j = k.hasClass("open");
    d();
    if (!j) {
      if ("ontouchstart" in document.documentElement && !k.closest(".navbar-nav").length) { h('<div class="dropdown-backdrop"/>').insertAfter(h(this)).on("click", d) }
      var i = { relatedTarget: this };
      k.trigger(m = h.Event("show.bs.dropdown", i));
      if (m.isDefaultPrevented()) {
        return
      }
      l.trigger("focus");
      k.toggleClass("open").trigger("shown.bs.dropdown", i)
    }
    return false
  };
  a.prototype.keydown = function(m) {
    if (!/(38|40|27)/.test(m.keyCode)) {
      return
    }
    var l = h(this);
    m.preventDefault();
    m.stopPropagation();
    if (l.is(".disabled, :disabled")) {
      return
    }
    var k = f(l);
    var j = k.hasClass("open");
    if (!j || (j && m.keyCode == 27)) {
      if (m.which == 27) { k.find(b).trigger("focus") }
      return l.trigger("click")
    }
    var n = " li:not(.divider):visible a";
    var o = k.find('[role="menu"]' + n + ', [role="listbox"]' + n);
    if (!o.length) {
      return
    }
    var i = o.index(o.filter(":focus"));
    if (m.keyCode == 38 && i > 0) { i-- }
    if (m.keyCode == 40 && i < o.length - 1) { i++ }
    if (!~i) { i = 0 }
    o.eq(i).trigger("focus")
  };

  function d(i) {
    if (i && i.which === 3) {
      return
    }
    h(e).remove();
    h(b).each(function() {
      var k = f(h(this));
      var j = { relatedTarget: this };
      if (!k.hasClass("open")) {
        return
      }
      k.trigger(i = h.Event("hide.bs.dropdown", j));
      if (i.isDefaultPrevented()) {
        return
      }
      k.removeClass("open").trigger("hidden.bs.dropdown", j)
    })
  }

  function f(k) {
    var i = k.attr("data-target");
    if (!i) {
      i = k.attr("href");
      i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")
    }
    var j = i && h(i);
    return j && j.length ? j : k.parent()
  }

  function g(i) {
    return this.each(function() {
      var k = h(this);
      var j = k.data("bs.dropdown");
      if (!j) { k.data("bs.dropdown", (j = new a(this))) }
      if (typeof i == "string") { j[i].call(k) }
    })
  }
  var c = h.fn.dropdown;
  h.fn.dropdown = g;
  h.fn.dropdown.Constructor = a;
  h.fn.dropdown.noConflict = function() {
    h.fn.dropdown = c;
    return this
  };
  h(document).on("click.bs.dropdown.data-api", d).on("click.bs.dropdown.data-api", ".dropdown form", function(i) { i.stopPropagation() }).on("click.bs.dropdown.data-api", b, a.prototype.toggle).on("keydown.bs.dropdown.data-api", b + ', [role="menu"], [role="listbox"]', a.prototype.keydown)
}(jQuery); + function(d) {
  var b = function(f, e) {
    this.options = e;
    this.$body = d(document.body);
    this.$element = d(f);
    this.$backdrop = this.isShown = null;
    this.scrollbarWidth = 0;
    if (this.options.remote) { this.$element.find(".modal-content").load(this.options.remote, d.proxy(function() { this.$element.trigger("loaded.bs.modal") }, this)) }
  };
  b.VERSION = "3.2.0";
  b.DEFAULTS = { backdrop: true, keyboard: true, show: true };
  b.prototype.toggle = function(e) {
    return this.isShown ? this.hide() : this.show(e)
  };
  b.prototype.show = function(h) {
    var f = this;
    var g = d.Event("show.bs.modal", { relatedTarget: h });
    this.$element.trigger(g);
    if (this.isShown || g.isDefaultPrevented()) {
      return
    }
    this.isShown = true;
    this.checkScrollbar();
    this.$body.addClass("modal-open");
    this.setScrollbar();
    this.escape();
    this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', d.proxy(this.hide, this));
    this.backdrop(function() {
      var j = d.support.transition && f.$element.hasClass("fade");
      if (!f.$element.parent().length) { f.$element.appendTo(f.$body) }
      f.$element.show().scrollTop(0);
      if (j) { f.$element[0].offsetWidth }
      f.$element.addClass("in").attr("aria-hidden", false);
      f.enforceFocus();
      var i = d.Event("shown.bs.modal", { relatedTarget: h });
      j ? f.$element.find(".modal-dialog").one("bsTransitionEnd", function() { f.$element.trigger("focus").trigger(i) }).emulateTransitionEnd(300) : f.$element.trigger("focus").trigger(i)
    })
  };
  b.prototype.hide = function(f) {
    if (f) { f.preventDefault() }
    f = d.Event("hide.bs.modal");
    this.$element.trigger(f);
    if (!this.isShown || f.isDefaultPrevented()) {
      return
    }
    this.isShown = false;
    this.$body.removeClass("modal-open");
    this.resetScrollbar();
    this.escape();
    d(document).off("focusin.bs.modal");
    this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.bs.modal");
    d.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", d.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()
  };
  b.prototype.enforceFocus = function() {
    d(document).off("focusin.bs.modal").on("focusin.bs.modal", d.proxy(function(f) {
      if (this.$element[0] !== f.target && !this.$element.has(f.target).length) { this.$element.trigger("focus") }
    }, this))
  };
  b.prototype.escape = function() {
    if (this.isShown && this.options.keyboard) { this.$element.on("keyup.dismiss.bs.modal", d.proxy(function(f) { f.which == 27 && this.hide() }, this)) } else {
      if (!this.isShown) { this.$element.off("keyup.dismiss.bs.modal") }
    }
  };
  b.prototype.hideModal = function() {
    var e = this;
    this.$element.hide();
    this.backdrop(function() { e.$element.trigger("hidden.bs.modal") })
  };
  b.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null
  };
  b.prototype.backdrop = function(i) {
    var h = this;
    var f = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var e = d.support.transition && f;
      this.$backdrop = d('<div class="modal-backdrop ' + f + '" />').appendTo(this.$body);
      this.$element.on("click.dismiss.bs.modal", d.proxy(function(j) {
        if (j.target !== j.currentTarget) {
          return
        }
        this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
      }, this));
      if (e) { this.$backdrop[0].offsetWidth }
      this.$backdrop.addClass("in");
      if (!i) {
        return
      }
      e ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(150) : i()
    } else {
      if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        var g = function() {
          h.removeBackdrop();
          i && i()
        };
        d.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(150) : g()
      } else {
        if (i) { i() }
      }
    }
  };
  b.prototype.checkScrollbar = function() {
    if (document.body.clientWidth >= window.innerWidth) {
      return
    }
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  };
  b.prototype.setScrollbar = function() {
    var e = parseInt((this.$body.css("padding-right") || 0), 10);
    if (this.scrollbarWidth) { this.$body.css("padding-right", e + this.scrollbarWidth) }
  };
  b.prototype.resetScrollbar = function() { this.$body.css("padding-right", "") };
  b.prototype.measureScrollbar = function() {
    var f = document.createElement("div");
    f.className = "modal-scrollbar-measure";
    this.$body.append(f);
    var e = f.offsetWidth - f.clientWidth;
    this.$body[0].removeChild(f);
    return e
  };

  function c(e, f) {
    return this.each(function() {
      var i = d(this);
      var h = i.data("bs.modal");
      var g = d.extend({}, b.DEFAULTS, i.data(), typeof e == "object" && e);
      if (!h) { i.data("bs.modal", (h = new b(this, g))) }
      if (typeof e == "string") { h[e](f) } else {
        if (g.show) { h.show(f) }
      }
    })
  }
  var a = d.fn.modal;
  d.fn.modal = c;
  d.fn.modal.Constructor = b;
  d.fn.modal.noConflict = function() {
    d.fn.modal = a;
    return this
  };
  d(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(j) {
    var i = d(this);
    var g = i.attr("href");
    var f = d(i.attr("data-target") || (g && g.replace(/.*(?=#[^\s]+$)/, "")));
    var h = f.data("bs.modal") ? "toggle" : d.extend({ remote: !/#/.test(g) && g }, f.data(), i.data());
    if (i.is("a")) { j.preventDefault() }
    f.one("show.bs.modal", function(e) {
      if (e.isDefaultPrevented()) {
        return
      }
      f.one("hidden.bs.modal", function() { i.is(":visible") && i.trigger("focus") })
    });
    c.call(f, h, this)
  })
}(jQuery); + function(d) {
  var c = function(f, e) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
    this.init("tooltip", f, e)
  };
  c.VERSION = "3.2.0";
  c.DEFAULTS = { animation: true, placement: "top", selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: false, container: false, viewport: { selector: "body", padding: 0 } };
  c.prototype.init = function(l, j, g) {
    this.enabled = true;
    this.type = l;
    this.$element = d(j);
    this.options = this.getOptions(g);
    this.$viewport = this.options.viewport && d(this.options.viewport.selector || this.options.viewport);
    var k = this.options.trigger.split(" ");
    for (var h = k.length; h--;) {
      var f = k[h];
      if (f == "click") { this.$element.on("click." + this.type, this.options.selector, d.proxy(this.toggle, this)) } else {
        if (f != "manual") {
          var m = f == "hover" ? "mouseenter" : "focusin";
          var e = f == "hover" ? "mouseleave" : "focusout";
          this.$element.on(m + "." + this.type, this.options.selector, d.proxy(this.enter, this));
          this.$element.on(e + "." + this.type, this.options.selector, d.proxy(this.leave, this))
        }
      }
    }
    this.options.selector ? (this._options = d.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle()
  };
  c.prototype.getDefaults = function() {
    return c.DEFAULTS
  };
  c.prototype.getOptions = function(e) {
    e = d.extend({}, this.getDefaults(), this.$element.data(), e);
    if (e.delay && typeof e.delay == "number") { e.delay = { show: e.delay, hide: e.delay } }
    return e
  };
  c.prototype.getDelegateOptions = function() {
    var e = {};
    var f = this.getDefaults();
    this._options && d.each(this._options, function(g, h) {
      if (f[g] != h) { e[g] = h }
    });
    return e
  };
  c.prototype.enter = function(f) {
    var e = f instanceof this.constructor ? f : d(f.currentTarget).data("bs." + this.type);
    if (!e) {
      e = new this.constructor(f.currentTarget, this.getDelegateOptions());
      d(f.currentTarget).data("bs." + this.type, e)
    }
    clearTimeout(e.timeout);
    e.hoverState = "in";
    if (!e.options.delay || !e.options.delay.show) {
      return e.show()
    }
    e.timeout = setTimeout(function() {
      if (e.hoverState == "in") { e.show() }
    }, e.options.delay.show)
  };
  c.prototype.leave = function(f) {
    var e = f instanceof this.constructor ? f : d(f.currentTarget).data("bs." + this.type);
    if (!e) {
      e = new this.constructor(f.currentTarget, this.getDelegateOptions());
      d(f.currentTarget).data("bs." + this.type, e)
    }
    clearTimeout(e.timeout);
    e.hoverState = "out";
    if (!e.options.delay || !e.options.delay.hide) {
      return e.hide()
    }
    e.timeout = setTimeout(function() {
      if (e.hoverState == "out") { e.hide() }
    }, e.options.delay.hide)
  };
  c.prototype.show = function() {
    var q = d.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(q);
      var r = d.contains(document.documentElement, this.$element[0]);
      if (q.isDefaultPrevented() || !r) {
        return
      }
      var p = this;
      var n = this.tip();
      var h = this.getUID(this.type);
      this.setContent();
      n.attr("id", h);
      this.$element.attr("aria-describedby", h);
      if (this.options.animation) { n.addClass("fade") }
      var l = typeof this.options.placement == "function" ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement;
      var t = /\s?auto?\s?/i;
      var u = t.test(l);
      if (u) { l = l.replace(t, "") || "top" }
      n.detach().css({ top: 0, left: 0, display: "block" }).addClass(l).data("bs." + this.type, this);
      this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
      var s = this.getPosition();
      var f = n[0].offsetWidth;
      var o = n[0].offsetHeight;
      if (u) {
        var j = l;
        var k = this.$element.parent();
        var m = this.getPosition(k);
        l = l == "bottom" && s.top + s.height + o - m.scroll > m.height ? "top" : l == "top" && s.top - m.scroll - o < 0 ? "bottom" : l == "right" && s.right + f > m.width ? "left" : l == "left" && s.left - f < m.left ? "right" : l;
        n.removeClass(j).addClass(l)
      }
      var i = this.getCalculatedOffset(l, s, f, o);
      this.applyPlacement(i, l);
      var g = function() {
        p.$element.trigger("shown.bs." + p.type);
        p.hoverState = null
      };
      d.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", g).emulateTransitionEnd(150) : g()
    }
  };
  c.prototype.applyPlacement = function(k, l) {
    var m = this.tip();
    var g = m[0].offsetWidth;
    var q = m[0].offsetHeight;
    var f = parseInt(m.css("margin-top"), 10);
    var i = parseInt(m.css("margin-left"), 10);
    if (isNaN(f)) { f = 0 }
    if (isNaN(i)) { i = 0 }
    k.top = k.top + f;
    k.left = k.left + i;
    d.offset.setOffset(m[0], d.extend({ using: function(r) { m.css({ top: Math.round(r.top), left: Math.round(r.left) }) } }, k), 0);
    m.addClass("in");
    var e = m[0].offsetWidth;
    var n = m[0].offsetHeight;
    if (l == "top" && n != q) { k.top = k.top + q - n }
    var p = this.getViewportAdjustedDelta(l, k, e, n);
    if (p.left) { k.left += p.left } else { k.top += p.top }
    var h = p.left ? p.left * 2 - g + e : p.top * 2 - q + n;
    var j = p.left ? "left" : "top";
    var o = p.left ? "offsetWidth" : "offsetHeight";
    m.offset(k);
    this.replaceArrow(h, m[0][o], j)
  };
  c.prototype.replaceArrow = function(g, f, e) { this.arrow().css(e, g ? (50 * (1 - g / f) + "%") : "") };
  c.prototype.setContent = function() {
    var f = this.tip();
    var e = this.getTitle();
    f.find(".tooltip-inner")[this.options.html ? "html" : "text"](e);
    f.removeClass("fade in top bottom left right")
  };
  c.prototype.hide = function() {
    var g = this;
    var i = this.tip();
    var h = d.Event("hide.bs." + this.type);
    this.$element.removeAttr("aria-describedby");

    function f() {
      if (g.hoverState != "in") { i.detach() }
      g.$element.trigger("hidden.bs." + g.type)
    }
    this.$element.trigger(h);
    if (h.isDefaultPrevented()) {
      return
    }
    i.removeClass("in");
    d.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f();
    this.hoverState = null;
    return this
  };
  c.prototype.fixTitle = function() {
    var e = this.$element;
    if (e.attr("title") || typeof(e.attr("data-original-title")) != "string") { e.attr("data-original-title", e.attr("title") || "").attr("title", "") }
  };
  c.prototype.hasContent = function() {
    return this.getTitle()
  };
  c.prototype.getPosition = function(f) {
    f = f || this.$element;
    var g = f[0];
    var e = g.tagName == "BODY";
    return d.extend({}, (typeof g.getBoundingClientRect == "function") ? g.getBoundingClientRect() : null, { scroll: e ? document.documentElement.scrollTop || document.body.scrollTop : f.scrollTop(), width: e ? d(window).width() : f.outerWidth(), height: e ? d(window).height() : f.outerHeight() }, e ? { top: 0, left: 0 } : f.offset())
  };
  c.prototype.getCalculatedOffset = function(e, h, f, g) {
    return e == "bottom" ? { top: h.top + h.height, left: h.left + h.width / 2 - f / 2 } : e == "top" ? { top: h.top - g, left: h.left + h.width / 2 - f / 2 } : e == "left" ? { top: h.top + h.height / 2 - g / 2, left: h.left - f } : { top: h.top + h.height / 2 - g / 2, left: h.left + h.width }
  };
  c.prototype.getViewportAdjustedDelta = function(h, k, e, j) {
    var m = { top: 0, left: 0 };
    if (!this.$viewport) {
      return m
    }
    var g = this.options.viewport && this.options.viewport.padding || 0;
    var l = this.getPosition(this.$viewport);
    if (/right|left/.test(h)) {
      var n = k.top - g - l.scroll;
      var i = k.top + g - l.scroll + j;
      if (n < l.top) { m.top = l.top - n } else {
        if (i > l.top + l.height) { m.top = l.top + l.height - i }
      }
    } else {
      var o = k.left - g;
      var f = k.left + g + e;
      if (o < l.left) { m.left = l.left - o } else {
        if (f > l.width) { m.left = l.left + l.width - f }
      }
    }
    return m
  };
  c.prototype.getTitle = function() {
    var g;
    var e = this.$element;
    var f = this.options;
    g = e.attr("data-original-title") || (typeof f.title == "function" ? f.title.call(e[0]) : f.title);
    return g
  };
  c.prototype.getUID = function(e) {
    do { e += ~~(Math.random() * 1000000) } while (document.getElementById(e));
    return e
  };
  c.prototype.tip = function() {
    return (this.$tip = this.$tip || d(this.options.template))
  };
  c.prototype.arrow = function() {
    return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"))
  };
  c.prototype.validate = function() {
    if (!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null
    }
  };
  c.prototype.enable = function() { this.enabled = true };
  c.prototype.disable = function() { this.enabled = false };
  c.prototype.toggleEnabled = function() { this.enabled = !this.enabled };
  c.prototype.toggle = function(g) {
    var f = this;
    if (g) {
      f = d(g.currentTarget).data("bs." + this.type);
      if (!f) {
        f = new this.constructor(g.currentTarget, this.getDelegateOptions());
        d(g.currentTarget).data("bs." + this.type, f)
      }
    }
    f.tip().hasClass("in") ? f.leave(f) : f.enter(f)
  };
  c.prototype.destroy = function() {
    clearTimeout(this.timeout);
    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };

  function b(e) {
    return this.each(function() {
      var h = d(this);
      var g = h.data("bs.tooltip");
      var f = typeof e == "object" && e;
      if (!g && e == "destroy") {
        return
      }
      if (!g) { h.data("bs.tooltip", (g = new c(this, f))) }
      if (typeof e == "string") { g[e]() }
    })
  }
  var a = d.fn.tooltip;
  d.fn.tooltip = b;
  d.fn.tooltip.Constructor = c;
  d.fn.tooltip.noConflict = function() {
    d.fn.tooltip = a;
    return this
  }
}(jQuery); + function(d) {
  var c = function(f, e) { this.init("popover", f, e) };
  if (!d.fn.tooltip) {
    throw new Error("Popover requires tooltip.js")
  }
  c.VERSION = "3.2.0";
  c.DEFAULTS = d.extend({}, d.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' });
  c.prototype = d.extend({}, d.fn.tooltip.Constructor.prototype);
  c.prototype.constructor = c;
  c.prototype.getDefaults = function() {
    return c.DEFAULTS
  };
  c.prototype.setContent = function() {
    var g = this.tip();
    var f = this.getTitle();
    var e = this.getContent();
    g.find(".popover-title")[this.options.html ? "html" : "text"](f);
    g.find(".popover-content").empty()[this.options.html ? (typeof e == "string" ? "html" : "append") : "text"](e);
    g.removeClass("fade top bottom left right in");
    if (!g.find(".popover-title").html()) { g.find(".popover-title").hide() }
  };
  c.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
  };
  c.prototype.getContent = function() {
    var e = this.$element;
    var f = this.options;
    return e.attr("data-content") || (typeof f.content == "function" ? f.content.call(e[0]) : f.content)
  };
  c.prototype.arrow = function() {
    return (this.$arrow = this.$arrow || this.tip().find(".arrow"))
  };
  c.prototype.tip = function() {
    if (!this.$tip) { this.$tip = d(this.options.template) }
    return this.$tip
  };

  function b(e) {
    return this.each(function() {
      var h = d(this);
      var g = h.data("bs.popover");
      var f = typeof e == "object" && e;
      if (!g && e == "destroy") {
        return
      }
      if (!g) { h.data("bs.popover", (g = new c(this, f))) }
      if (typeof e == "string") { g[e]() }
    })
  }
  var a = d.fn.popover;
  d.fn.popover = b;
  d.fn.popover.Constructor = c;
  d.fn.popover.noConflict = function() {
    d.fn.popover = a;
    return this
  }
}(jQuery); + function(d) {
  function c(f, e) {
    var g = d.proxy(this.process, this);
    this.$body = d("body");
    this.$scrollElement = d(f).is("body") ? d(window) : d(f);
    this.options = d.extend({}, c.DEFAULTS, e);
    this.selector = (this.options.target || "") + " .nav li > a";
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", g);
    this.refresh();
    this.process()
  }
  c.VERSION = "3.2.0";
  c.DEFAULTS = { offset: 10 };
  c.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  };
  c.prototype.refresh = function() {
    var e = "offset";
    var g = 0;
    if (!d.isWindow(this.$scrollElement[0])) {
      e = "position";
      g = this.$scrollElement.scrollTop()
    }
    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    var f = this;
    this.$body.find(this.selector).map(function() {
      var i = d(this);
      var h = i.data("target") || i.attr("href");
      var j = /^#./.test(h) && d(h);
      return (j && j.length && j.is(":visible") && [
        [j[e]().top + g, h]
      ]) || null
    }).sort(function(i, h) {
      return i[0] - h[0]
    }).each(function() {
      f.offsets.push(this[0]);
      f.targets.push(this[1])
    })
  };
  c.prototype.process = function() {
    var k = this.$scrollElement.scrollTop() + this.options.offset;
    var g = this.getScrollHeight();
    var j = this.options.offset + g - this.$scrollElement.height();
    var h = this.offsets;
    var e = this.targets;
    var l = this.activeTarget;
    var f;
    if (this.scrollHeight != g) { this.refresh() }
    if (k >= j) {
      return l != (f = e[e.length - 1]) && this.activate(f)
    }
    if (l && k <= h[0]) {
      return l != (f = e[0]) && this.activate(f)
    }
    for (f = h.length; f--;) { l != e[f] && k >= h[f] && (!h[f + 1] || k <= h[f + 1]) && this.activate(e[f]) }
  };
  c.prototype.activate = function(g) {
    this.activeTarget = g;
    d(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    var e = this.selector + '[data-target="' + g + '"],' + this.selector + '[href="' + g + '"]';
    var f = d(e).parents("li").addClass("active");
    if (f.parent(".dropdown-menu").length) { f = f.closest("li.dropdown").addClass("active") }
    f.trigger("activate.bs.scrollspy")
  };

  function b(e) {
    return this.each(function() {
      var h = d(this);
      var g = h.data("bs.scrollspy");
      var f = typeof e == "object" && e;
      if (!g) { h.data("bs.scrollspy", (g = new c(this, f))) }
      if (typeof e == "string") { g[e]() }
    })
  }
  var a = d.fn.scrollspy;
  d.fn.scrollspy = b;
  d.fn.scrollspy.Constructor = c;
  d.fn.scrollspy.noConflict = function() {
    d.fn.scrollspy = a;
    return this
  };
  d(window).on("load.bs.scrollspy.data-api", function() {
    d('[data-spy="scroll"]').each(function() {
      var e = d(this);
      b.call(e, e.data())
    })
  })
}(jQuery); + function(d) {
  var b = function(e) { this.element = d(e) };
  b.VERSION = "3.2.0";
  b.prototype.show = function() {
    var k = this.element;
    var h = k.closest("ul:not(.dropdown-menu)");
    var g = k.data("target");
    if (!g) {
      g = k.attr("href");
      g = g && g.replace(/.*(?=#[^\s]*$)/, "")
    }
    if (k.parent("li").hasClass("active")) {
      return
    }
    var i = h.find(".active:last a")[0];
    var j = d.Event("show.bs.tab", { relatedTarget: i });
    k.trigger(j);
    if (j.isDefaultPrevented()) {
      return
    }
    var f = d(g);
    this.activate(k.closest("li"), h);
    this.activate(f, f.parent(), function() { k.trigger({ type: "shown.bs.tab", relatedTarget: i }) })
  };
  b.prototype.activate = function(g, f, j) {
    var e = f.find("> .active");
    var i = j && d.support.transition && e.hasClass("fade");

    function h() {
      e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
      g.addClass("active");
      if (i) {
        g[0].offsetWidth;
        g.addClass("in")
      } else { g.removeClass("fade") }
      if (g.parent(".dropdown-menu")) { g.closest("li.dropdown").addClass("active") }
      j && j()
    }
    i ? e.one("bsTransitionEnd", h).emulateTransitionEnd(150) : h();
    e.removeClass("in")
  };

  function c(e) {
    return this.each(function() {
      var g = d(this);
      var f = g.data("bs.tab");
      if (!f) { g.data("bs.tab", (f = new b(this))) }
      if (typeof e == "string") { f[e]() }
    })
  }
  var a = d.fn.tab;
  d.fn.tab = c;
  d.fn.tab.Constructor = b;
  d.fn.tab.noConflict = function() {
    d.fn.tab = a;
    return this
  };
  d(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(f) {
    f.preventDefault();
    c.call(d(this), "show")
  })
}(jQuery); + function(d) {
  var c = function(f, e) {
    this.options = d.extend({}, c.DEFAULTS, e);
    this.$target = d(this.options.target).on("scroll.bs.affix.data-api", d.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", d.proxy(this.checkPositionWithEventLoop, this));
    this.$element = d(f);
    this.affixed = this.unpin = this.pinnedOffset = null;
    this.checkPosition()
  };
  c.VERSION = "3.2.0";
  c.RESET = "affix affix-top affix-bottom";
  c.DEFAULTS = { offset: 0, target: window };
  c.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) {
      return this.pinnedOffset
    }
    this.$element.removeClass(c.RESET).addClass("affix");
    var f = this.$target.scrollTop();
    var e = this.$element.offset();
    return (this.pinnedOffset = e.top - f)
  };
  c.prototype.checkPositionWithEventLoop = function() { setTimeout(d.proxy(this.checkPosition, this), 1) };
  c.prototype.checkPosition = function() {
    if (!this.$element.is(":visible")) {
      return
    }
    var n = d(document).height();
    var f = this.$target.scrollTop();
    var k = this.$element.offset();
    var i = this.options.offset;
    var g = i.top;
    var h = i.bottom;
    if (typeof i != "object") { h = g = i }
    if (typeof g == "function") { g = i.top(this.$element) }
    if (typeof h == "function") { h = i.bottom(this.$element) }
    var j = this.unpin != null && (f + this.unpin <= k.top) ? false : h != null && (k.top + this.$element.height() >= n - h) ? "bottom" : g != null && (f <= g) ? "top" : false;
    if (this.affixed === j) {
      return
    }
    if (this.unpin != null) { this.$element.css("top", "") }
    var m = "affix" + (j ? "-" + j : "");
    var l = d.Event(m + ".bs.affix");
    this.$element.trigger(l);
    if (l.isDefaultPrevented()) {
      return
    }
    this.affixed = j;
    this.unpin = j == "bottom" ? this.getPinnedOffset() : null;
    this.$element.removeClass(c.RESET).addClass(m).trigger(d.Event(m.replace("affix", "affixed")));
    if (j == "bottom") { this.$element.offset({ top: n - this.$element.height() - h }) }
  };

  function b(e) {
    return this.each(function() {
      var h = d(this);
      var g = h.data("bs.affix");
      var f = typeof e == "object" && e;
      if (!g) { h.data("bs.affix", (g = new c(this, f))) }
      if (typeof e == "string") { g[e]() }
    })
  }
  var a = d.fn.affix;
  d.fn.affix = b;
  d.fn.affix.Constructor = c;
  d.fn.affix.noConflict = function() {
    d.fn.affix = a;
    return this
  };
  d(window).on("load", function() {
    d('[data-spy="affix"]').each(function() {
      var f = d(this);
      var e = f.data();
      e.offset = e.offset || {};
      if (e.offsetBottom) { e.offset.bottom = e.offsetBottom }
      if (e.offsetTop) { e.offset.top = e.offsetTop }
      b.call(f, e)
    })
  })
}(jQuery);
(function(a) {
  a.easyPieChart = function(d, l) {
    var f, g, i, j, c, k, e, b, h = this;
    this.el = d;
    this.$el = a(d);
    this.$el.data("easyPieChart", this);
    this.init = function() {
      var n, m;
      h.options = a.extend({}, a.easyPieChart.defaultOptions, l);
      n = parseInt(h.$el.data("percent"), 10);
      h.percentage = 0;
      h.canvas = a("<canvas width='" + h.options.size + "' height='" + h.options.size + "'></canvas>").get(0);
      h.$el.append(h.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) { G_vmlCanvasManager.initElement(h.canvas) }
      h.ctx = h.canvas.getContext("2d");
      if (window.devicePixelRatio > 1) {
        m = window.devicePixelRatio;
        a(h.canvas).css({ width: h.options.size, height: h.options.size });
        h.canvas.width *= m;
        h.canvas.height *= m;
        h.ctx.scale(m, m)
      }
      h.ctx.translate(h.options.size / 2, h.options.size / 2);
      h.$el.addClass("easyPieChart");
      h.$el.css({ width: h.options.size, height: h.options.size, lineHeight: "" + h.options.size + "px" });
      h.update(n);
      return h
    };
    this.update = function(m) {
      if (h.options.animate === false) {
        return i(m)
      } else {
        return g(h.percentage, m)
      }
    };
    e = function() {
      var n, o, m;
      h.ctx.fillStyle = h.options.scaleColor;
      h.ctx.lineWidth = 1;
      m = [];
      for (n = o = 0; o <= 24; n = ++o) { m.push(f(n)) }
      return m
    };
    f = function(m) {
      var n;
      n = m % 6 === 0 ? 0 : h.options.size * 0.017;
      h.ctx.save();
      h.ctx.rotate(m * Math.PI / 12);
      h.ctx.fillRect(h.options.size / 2 - n, 0, -h.options.size * 0.05 + n, 1);
      return h.ctx.restore()
    };
    b = function() {
      var m;
      m = h.options.size / 2 - h.options.lineWidth / 2;
      if (h.options.scaleColor !== false) { m -= h.options.size * 0.08 }
      h.ctx.beginPath();
      h.ctx.arc(0, 0, m, 0, Math.PI * 2, true);
      h.ctx.closePath();
      h.ctx.strokeStyle = h.options.trackColor;
      h.ctx.lineWidth = h.options.lineWidth;
      return h.ctx.stroke()
    };
    k = function() {
      if (h.options.scaleColor !== false) { e() }
      if (h.options.trackColor !== false) {
        return b()
      }
    };
    i = function(m) {
      var n;
      k();
      h.ctx.strokeStyle = a.isFunction(h.options.barColor) ? h.options.barColor(m) : h.options.barColor;
      h.ctx.lineCap = h.options.lineCap;
      h.ctx.lineWidth = h.options.lineWidth;
      n = h.options.size / 2 - h.options.lineWidth / 2;
      if (h.options.scaleColor !== false) { n -= h.options.size * 0.08 }
      h.ctx.save();
      h.ctx.rotate(-Math.PI / 2);
      h.ctx.beginPath();
      h.ctx.arc(0, 0, n, 0, Math.PI * 2 * m / 100, false);
      h.ctx.stroke();
      return h.ctx.restore()
    };
    c = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(m) {
        return window.setTimeout(m, 1000 / 60)
      }
    })();
    g = function(p, o) {
      var n, m;
      h.options.onStart.call(h);
      h.percentage = o;
      m = Date.now();
      n = function() {
        var q, r;
        r = Date.now() - m;
        if (r < h.options.animate) { c(n) } else { h.options.onStop.call(h) }
        h.ctx.clearRect(-h.options.size / 2, -h.options.size / 2, h.options.size, h.options.size);
        k.call(h);
        q = [j(r, p, o - p, h.options.animate)];
        h.options.onStep.call(h, q);
        return i.call(h, q)
      };
      return c(n)
    };
    j = function(o, n, r, p) {
      var m, q;
      m = function(s) {
        return Math.pow(s, 2)
      };
      q = function(s) {
        if (s < 1) {
          return m(s)
        } else {
          return 2 - m((s / 2) * -2 + 2)
        }
      };
      o /= p / 2;
      return r / 2 * q(o) + n
    };
    return this.init()
  };
  a.easyPieChart.defaultOptions = { barColor: "#ef1e25", trackColor: "#f2f2f2", scaleColor: "#dfe0e0", lineCap: "round", size: 110, lineWidth: 3, animate: false, onStart: a.noop, onStop: a.noop, onStep: a.noop };
  a.fn.easyPieChart = function(b) {
    return a.each(this, function(d, e) {
      var c;
      c = a(e);
      if (!c.data("easyPieChart")) {
        return c.data("easyPieChart", new a.easyPieChart(e, b))
      }
    })
  };
  return void 0
})(jQuery);
(function(b) { typeof define == "function" && define.amd ? define(["jquery"], b) : b(jQuery) })(function(ar) {
  var aq = {},
    ap, ao, an, am, al, ak, aj, ai, ah, ag, af, ae, ad, ac, aa, Y, W, U, S, Q, O, M, K, J, ab, Z, X, V, T, R, P, N, L = 0;
  ap = function() {
      return { common: { type: "line", lineColor: "#00f", fillColor: "#cdf", defaultPixelsPerValue: 3, width: "auto", height: "auto", composite: !1, tagValuesAttribute: "values", tagOptionsPrefix: "spark", enableTagOptions: !1, enableHighlight: !0, highlightLighten: 1.4, tooltipSkipNull: !0, tooltipPrefix: "", tooltipSuffix: "", disableHiddenCheck: !1, numberFormatter: !1, numberDigitGroupCount: 3, numberDigitGroupSep: ",", numberDecimalMark: ".", disableTooltips: !1, disableInteraction: !1 }, line: { spotColor: "#f80", highlightSpotColor: "#5f5", highlightLineColor: "#f22", spotRadius: 1.5, minSpotColor: "#f80", maxSpotColor: "#f80", lineWidth: 1, normalRangeMin: undefined, normalRangeMax: undefined, normalRangeColor: "#ccc", drawNormalOnTop: !1, chartRangeMin: undefined, chartRangeMax: undefined, chartRangeMinX: undefined, chartRangeMaxX: undefined, tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}') }, bar: { barColor: "#3366cc", negBarColor: "#f44", stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"], zeroColor: undefined, nullColor: undefined, zeroAxis: !0, barWidth: 4, barSpacing: 1, chartRangeMax: undefined, chartRangeMin: undefined, chartRangeClip: !1, colorMap: undefined, tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}') }, tristate: { barWidth: 4, barSpacing: 1, posBarColor: "#6f6", negBarColor: "#f44", zeroBarColor: "#999", colorMap: {}, tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{value:map}}'), tooltipValueLookups: { map: { "-1": "Loss", 0: "Draw", 1: "Win" } } }, discrete: { lineHeight: "auto", thresholdColor: undefined, thresholdValue: 0, chartRangeMax: undefined, chartRangeMin: undefined, chartRangeClip: !1, tooltipFormat: new an("{{prefix}}{{value}}{{suffix}}") }, bullet: { targetColor: "#f33", targetWidth: 3, performanceColor: "#33f", rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"], base: undefined, tooltipFormat: new an("{{fieldkey:fields}} - {{value}}"), tooltipValueLookups: { fields: { r: "Range", p: "Performance", t: "Target" } } }, pie: { offset: 0, sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"], borderWidth: 0, borderColor: "#000", tooltipFormat: new an('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)') }, box: { raw: !1, boxLineColor: "#000", boxFillColor: "#cdf", whiskerColor: "#000", outlierLineColor: "#333", outlierFillColor: "#fff", medianColor: "#f00", showOutliers: !0, outlierIQR: 1.5, spotRadius: 1.5, target: undefined, targetColor: "#4a2", chartRangeMax: undefined, chartRangeMin: undefined, tooltipFormat: new an("{{field:fields}}: {{value}}"), tooltipFormatFieldlistKey: "field", tooltipValueLookups: { fields: { lq: "Lower Quartile", med: "Median", uq: "Upper Quartile", lo: "Left Outlier", ro: "Right Outlier", lw: "Left Whisker", rw: "Right Whisker" } } } }
    }, Z = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', ao = function() {
      var a, d;
      return a = function() { this.init.apply(this, arguments) }, arguments.length > 1 ? (arguments[0] ? (a.prototype = ar.extend(new arguments[0], arguments[arguments.length - 1]), a._super = arguments[0].prototype) : a.prototype = arguments[arguments.length - 1], arguments.length > 2 && (d = Array.prototype.slice.call(arguments, 1, -1), d.unshift(a.prototype), ar.extend.apply(ar, d))) : a.prototype = arguments[0], a.prototype.cls = a, a
    }, ar.SPFormatClass = an = ao({
      fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
      precre: /(\w+)\.(\d+)/,
      init: function(d, c) { this.format = d, this.fclass = c },
      render: function(t, s, r) {
        var q = this,
          p = t,
          o, n, m, l, k;
        return this.format.replace(this.fre, function() {
          var b;
          return n = arguments[1], m = arguments[3], o = q.precre.exec(n), o ? (k = o[2], n = o[1]) : k = !1, l = p[n], l === undefined ? "" : m && s && s[m] ? (b = s[m], b.get ? s[m].get(l) || l : s[m][l] || l) : (ah(l) && (r.get("numberFormatter") ? l = r.get("numberFormatter")(l) : l = ac(l, k, r.get("numberDigitGroupCount"), r.get("numberDigitGroupSep"), r.get("numberDecimalMark"))), l)
        })
      }
    }), ar.spformat = function(d, c) {
      return new an(d, c)
    }, am = function(e, d, f) {
      return e < d ? d : e > f ? f : e
    }, al = function(e, d) {
      var f;
      return d === 2 ? (f = Math.floor(e.length / 2), e.length % 2 ? e[f] : (e[f - 1] + e[f]) / 2) : e.length % 2 ? (f = (e.length * d + d) / 4, f % 1 ? (e[Math.floor(f)] + e[Math.floor(f) - 1]) / 2 : e[f - 1]) : (f = (e.length * d + 2) / 4, f % 1 ? (e[Math.floor(f)] + e[Math.floor(f) - 1]) / 2 : e[f - 1])
    }, ak = function(d) {
      var c;
      switch (d) {
        case "undefined":
          d = undefined;
          break;
        case "null":
          d = null;
          break;
        case "true":
          d = !0;
          break;
        case "false":
          d = !1;
          break;
        default:
          c = parseFloat(d), d == c && (d = c)
      }
      return d
    }, aj = function(e) {
      var d, f = [];
      for (d = e.length; d--;) { f[d] = ak(e[d]) }
      return f
    }, ai = function(g, f) {
      var j, i, h = [];
      for (j = 0, i = g.length; j < i; j++) { g[j] !== f && h.push(g[j]) }
      return h
    }, ah = function(b) {
      return !isNaN(parseFloat(b)) && isFinite(b)
    }, ac = function(a, n, m, l, k) {
      var j, i;
      a = (n === !1 ? parseFloat(a).toString() : a.toFixed(n)).split(""), j = (j = ar.inArray(".", a)) < 0 ? a.length : j, j < a.length && (a[j] = k);
      for (i = j - m; i > 0; i -= m) { a.splice(i, 0, l) }
      return a.join("")
    }, ag = function(f, e, h) {
      var g;
      for (g = e.length; g--;) {
        if (h && e[g] === null) {
          continue
        }
        if (e[g] !== f) {
          return !1
        }
      }
      return !0
    }, af = function(e) {
      var d = 0,
        f;
      for (f = e.length; f--;) { d += typeof e[f] == "number" ? e[f] : 0 }
      return d
    }, ad = function(a) {
      return ar.isArray(a) ? a : [a]
    }, ae = function(d) {
      var c;
      document.createStyleSheet ? document.createStyleSheet().cssText = d : (c = document.createElement("style"), c.type = "text/css", document.getElementsByTagName("head")[0].appendChild(c), c[typeof document.body.style.WebkitAppearance == "string" ? "innerText" : "innerHTML"] = d)
    }, ar.fn.simpledraw = function(a, l, k, j) {
      var i, h;
      if (k && (i = this.data("_jqs_vcanvas"))) {
        return i
      }
      a === undefined && (a = ar(this).innerWidth()), l === undefined && (l = ar(this).innerHeight());
      if (ar.fn.sparkline.hasCanvas) { i = new R(a, l, this, j) } else {
        if (!ar.fn.sparkline.hasVML) {
          return !1
        }
        i = new P(a, l, this)
      }
      return h = ar(this).data("_jqs_mhandler"), h && h.registerCanvas(i), i
    }, ar.fn.cleardraw = function() {
      var b = this.data("_jqs_vcanvas");
      b && b.reset()
    }, ar.RangeMapClass = aa = ao({
      init: function(f) {
        var e, h, g = [];
        for (e in f) { f.hasOwnProperty(e) && typeof e == "string" && e.indexOf(":") > -1 && (h = e.split(":"), h[0] = h[0].length === 0 ? -Infinity : parseFloat(h[0]), h[1] = h[1].length === 0 ? Infinity : parseFloat(h[1]), h[2] = f[e], g.push(h)) }
        this.map = f, this.rangelist = g || !1
      },
      get: function(g) {
        var f = this.rangelist,
          j, i, h;
        if ((h = this.map[g]) !== undefined) {
          return h
        }
        if (f) {
          for (j = f.length; j--;) {
            i = f[j];
            if (i[0] <= g && i[1] >= g) {
              return i[2]
            }
          }
        }
        return undefined
      }
    }), ar.range_map = function(b) {
      return new aa(b)
    }, Y = ao({
      init: function(a, f) {
        var e = ar(a);
        this.$el = e, this.options = f, this.currentPageX = 0, this.currentPageY = 0, this.el = a, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !f.get("disableTooltips"), this.highlightEnabled = !f.get("disableHighlight")
      },
      registerSparkline: function(b) { this.splist.push(b), this.over && this.updateDisplay() },
      registerCanvas: function(a) {
        var d = ar(a.canvas);
        this.canvas = a, this.$canvas = d, d.mouseenter(ar.proxy(this.mouseenter, this)), d.mouseleave(ar.proxy(this.mouseleave, this)), d.click(ar.proxy(this.mouseclick, this))
      },
      reset: function(b) { this.splist = [], this.tooltip && b && (this.tooltip.remove(), this.tooltip = undefined) },
      mouseclick: function(a) {
        var d = ar.Event("sparklineClick");
        d.originalEvent = a, d.sparklines = this.splist, this.$el.trigger(d)
      },
      mouseenter: function(a) { ar(document.body).unbind("mousemove.jqs"), ar(document.body).bind("mousemove.jqs", ar.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, !this.tooltip && this.displayTooltips && (this.tooltip = new W(this.options), this.tooltip.updatePosition(a.pageX, a.pageY)), this.updateDisplay() },
      mouseleave: function() {
        ar(document.body).unbind("mousemove.jqs");
        var a = this.splist,
          j = a.length,
          i = !1,
          h, g;
        this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null);
        for (g = 0; g < j; g++) { h = a[g], h.clearRegionHighlight() && (i = !0) }
        i && this.canvas.render()
      },
      mousemove: function(b) { this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, this.tooltip && this.tooltip.updatePosition(b.pageX, b.pageY), this.updateDisplay() },
      updateDisplay: function() {
        var v = this.splist,
          u = v.length,
          t = !1,
          s = this.$canvas.offset(),
          r = this.currentPageX - s.left,
          q = this.currentPageY - s.top,
          p, o, n, m, a;
        if (!this.over) {
          return
        }
        for (n = 0; n < u; n++) { o = v[n], m = o.setRegionHighlight(this.currentEl, r, q), m && (t = !0) }
        if (t) {
          a = ar.Event("sparklineRegionChange"), a.sparklines = this.splist, this.$el.trigger(a);
          if (this.tooltip) {
            p = "";
            for (n = 0; n < u; n++) { o = v[n], p += o.getCurrentRegionTooltip() }
            this.tooltip.setContent(p)
          }
          this.disableHighlight || this.canvas.render()
        }
        m === null && this.mouseleave()
      }
    }), W = ao({
      sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
      init: function(a) {
        var h = a.get("tooltipClassname", "jqstooltip"),
          g = this.sizeStyle,
          f;
        this.container = a.get("tooltipContainer") || document.body, this.tooltipOffsetX = a.get("tooltipOffsetX", 10), this.tooltipOffsetY = a.get("tooltipOffsetY", 12), ar("#jqssizetip").remove(), ar("#jqstooltip").remove(), this.sizetip = ar("<div/>", { id: "jqssizetip", style: g, "class": h }), this.tooltip = ar("<div/>", { id: "jqstooltip", "class": h }).appendTo(this.container), f = this.tooltip.offset(), this.offsetLeft = f.left, this.offsetTop = f.top, this.hidden = !0, ar(window).unbind("resize.jqs scroll.jqs"), ar(window).bind("resize.jqs scroll.jqs", ar.proxy(this.updateWindowDims, this)), this.updateWindowDims()
      },
      updateWindowDims: function() { this.scrollTop = ar(window).scrollTop(), this.scrollLeft = ar(window).scrollLeft(), this.scrollRight = this.scrollLeft + ar(window).width(), this.updatePosition() },
      getSize: function(b) { this.sizetip.html(b).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove() },
      setContent: function(b) {
        if (!b) {
          this.tooltip.css("visibility", "hidden"), this.hidden = !0;
          return
        }
        this.getSize(b), this.tooltip.html(b).css({ width: this.width, height: this.height, visibility: "visible" }), this.hidden && (this.hidden = !1, this.updatePosition())
      },
      updatePosition: function(d, c) {
        if (d === undefined) {
          if (this.mousex === undefined) {
            return
          }
          d = this.mousex - this.offsetLeft, c = this.mousey - this.offsetTop
        } else { this.mousex = d -= this.offsetLeft, this.mousey = c -= this.offsetTop }
        if (!this.height || !this.width || this.hidden) {
          return
        }
        c -= this.height + this.tooltipOffsetY, d += this.tooltipOffsetX, c < this.scrollTop && (c = this.scrollTop), d < this.scrollLeft ? d = this.scrollLeft : d + this.width > this.scrollRight && (d = this.scrollRight - this.width), this.tooltip.css({ left: d, top: c })
      },
      remove: function() { this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = undefined, ar(window).unbind("resize.jqs scroll.jqs") }
    }), X = function() { ae(Z) }, ar(X), N = [], ar.fn.sparkline = function(a, d) {
      return this.each(function() {
        var i = new ar.fn.sparkline.options(this, d),
          h = ar(this),
          c, b;
        c = function() {
          var q, p, o, n, m, l, e;
          if (a === "html" || a === undefined) {
            e = this.getAttribute(i.get("tagValuesAttribute"));
            if (e === undefined || e === null) { e = h.html() }
            q = e.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")
          } else { q = a }
          p = i.get("width") === "auto" ? q.length * i.get("defaultPixelsPerValue") : i.get("width");
          if (i.get("height") === "auto") {
            if (!i.get("composite") || !ar.data(this, "_jqs_vcanvas")) { n = document.createElement("span"), n.innerHTML = "a", h.html(n), o = ar(n).innerHeight() || ar(n).height(), ar(n).remove(), n = null }
          } else { o = i.get("height") }
          i.get("disableInteraction") ? m = !1 : (m = ar.data(this, "_jqs_mhandler"), m ? i.get("composite") || m.reset() : (m = new Y(this, i), ar.data(this, "_jqs_mhandler", m)));
          if (i.get("composite") && !ar.data(this, "_jqs_vcanvas")) {
            ar.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), ar.data(this, "_jqs_errnotify", !0));
            return
          }
          l = new(ar.fn.sparkline[i.get("type")])(this, q, i, p, o), l.render(), m && m.registerSparkline(l)
        };
        if (ar(this).html() && !i.get("disableHiddenCheck") && ar(this).is(":hidden") || ar.fn.jquery < "1.3.0" && ar(this).parents().is(":hidden") || !ar(this).parents("body").length) {
          if (!i.get("composite") && ar.data(this, "_jqs_pending")) {
            for (b = N.length; b; b--) { N[b - 1][0] == this && N.splice(b - 1, 1) }
          }
          N.push([this, c]), ar.data(this, "_jqs_pending", !0)
        } else { c.call(this) }
      })
    }, ar.fn.sparkline.defaults = ap(), ar.sparkline_display_visible = function() {
      var a, h, g, f = [];
      for (h = 0, g = N.length; h < g; h++) { a = N[h][0], ar(a).is(":visible") && !ar(a).parents().is(":hidden") ? (N[h][1].call(a), ar.data(N[h][0], "_jqs_pending", !1), f.push(h)) : !ar(a).closest("html").length && !ar.data(a, "_jqs_pending") && (ar.data(N[h][0], "_jqs_pending", !1), f.push(h)) }
      for (h = f.length; h; h--) { N.splice(f[h - 1], 1) }
    }, ar.fn.sparkline.options = ao({
      init: function(l, k) {
        var j, i, b, a;
        this.userOptions = k = k || {}, this.tag = l, this.tagValCache = {}, i = ar.fn.sparkline.defaults, b = i.common, this.tagOptionsPrefix = k.enableTagOptions && (k.tagOptionsPrefix || b.tagOptionsPrefix), a = this.getTagSetting("type"), a === aq ? j = i[k.type || b.type] : j = i[a], this.mergedOptions = ar.extend({}, b, j, k)
      },
      getTagSetting: function(b) {
        var l = this.tagOptionsPrefix,
          k, j, i, h;
        if (l === !1 || l === undefined) {
          return aq
        }
        if (this.tagValCache.hasOwnProperty(b)) { k = this.tagValCache.key } else {
          k = this.tag.getAttribute(l + b);
          if (k === undefined || k === null) { k = aq } else {
            if (k.substr(0, 1) === "[") {
              k = k.substr(1, k.length - 2).split(",");
              for (j = k.length; j--;) { k[j] = ak(k[j].replace(/(^\s*)|(\s*$)/g, "")) }
            } else {
              if (k.substr(0, 1) === "{") {
                i = k.substr(1, k.length - 2).split(","), k = {};
                for (j = i.length; j--;) { h = i[j].split(":", 2), k[h[0].replace(/(^\s*)|(\s*$)/g, "")] = ak(h[1].replace(/(^\s*)|(\s*$)/g, "")) }
              } else { k = ak(k) }
            }
          }
          this.tagValCache.key = k
        }
        return k
      },
      get: function(b, h) {
        var g = this.getTagSetting(b),
          f;
        return g !== aq ? g : (f = this.mergedOptions[b]) === undefined ? h : f
      }
    }), ar.fn.sparkline._base = ao({
      disabled: !1,
      init: function(a, j, i, h, g) { this.el = a, this.$el = ar(a), this.values = j, this.options = i, this.width = h, this.height = g, this.currentRegion = undefined },
      initTarget: function() {
        var b = !this.options.get("disableInteraction");
        (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), b)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
      },
      render: function() {
        return this.disabled ? (this.el.innerHTML = "", !1) : !0
      },
      getRegion: function(d, c) {},
      setRegionHighlight: function(h, g, l) {
        var k = this.currentRegion,
          j = !this.options.get("disableHighlight"),
          i;
        return g > this.canvasWidth || l > this.canvasHeight || g < 0 || l < 0 ? null : (i = this.getRegion(h, g, l), k !== i ? (k !== undefined && j && this.removeHighlight(), this.currentRegion = i, i !== undefined && j && this.renderHighlight(), !0) : !1)
      },
      clearRegionHighlight: function() {
        return this.currentRegion !== undefined ? (this.removeHighlight(), this.currentRegion = undefined, !0) : !1
      },
      renderHighlight: function() { this.changeHighlight(!0) },
      removeHighlight: function() { this.changeHighlight(!1) },
      changeHighlight: function(b) {},
      getCurrentRegionTooltip: function() {
        var G = this.options,
          F = "",
          E = [],
          D, C, B, A, z, y, x, w, v, u, t, e, a, H;
        if (this.currentRegion === undefined) {
          return ""
        }
        D = this.getCurrentRegionFields(), t = G.get("tooltipFormatter");
        if (t) {
          return t(this, G, D)
        }
        G.get("tooltipChartTitle") && (F += '<div class="jqs jqstitle">' + G.get("tooltipChartTitle") + "</div>\n"), C = this.options.get("tooltipFormat");
        if (!C) {
          return ""
        }
        ar.isArray(C) || (C = [C]), ar.isArray(D) || (D = [D]), x = this.options.get("tooltipFormatFieldlist"), w = this.options.get("tooltipFormatFieldlistKey");
        if (x && w) {
          v = [];
          for (y = D.length; y--;) { u = D[y][w], (H = ar.inArray(u, x)) != -1 && (v[H] = D[y]) }
          D = v
        }
        B = C.length, a = D.length;
        for (y = 0; y < B; y++) {
          e = C[y], typeof e == "string" && (e = new an(e)), A = e.fclass || "jqsfield";
          for (H = 0; H < a; H++) {
            if (!D[H].isNull || !G.get("tooltipSkipNull")) { ar.extend(D[H], { prefix: G.get("tooltipPrefix"), suffix: G.get("tooltipSuffix") }), z = e.render(D[H], G.get("tooltipValueLookups"), G), E.push('<div class="' + A + '">' + z + "</div>") }
          }
        }
        return E.length ? F + E.join("\n") : ""
      },
      getCurrentRegionFields: function() {},
      calcHighlightColor: function(j, f) {
        var p = f.get("highlightColor"),
          o = f.get("highlightLighten"),
          n, m, l, k;
        if (p) {
          return p
        }
        if (o) {
          n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(j) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(j);
          if (n) {
            l = [], m = j.length === 4 ? 16 : 1;
            for (k = 0; k < 3; k++) { l[k] = am(Math.round(parseInt(n[k + 1], 16) * m * o), 0, 255) }
            return "rgb(" + l.join(",") + ")"
          }
        }
        return j
      }
    }), U = {
      changeHighlight: function(a) {
        var j = this.currentRegion,
          i = this.target,
          h = this.regionShapes[j],
          g;
        h && (g = this.renderRegion(j, a), ar.isArray(g) || ar.isArray(h) ? (i.replaceWithShapes(h, g), this.regionShapes[j] = ar.map(g, function(b) {
          return b.id
        })) : (i.replaceWithShape(h, g), this.regionShapes[j] = g.id))
      },
      render: function() {
        var a = this.values,
          n = this.target,
          m = this.regionShapes,
          l, k, j, i;
        if (!this.cls._super.render.call(this)) {
          return
        }
        for (j = a.length; j--;) {
          l = this.renderRegion(j);
          if (l) {
            if (ar.isArray(l)) {
              k = [];
              for (i = l.length; i--;) { l[i].append(), k.push(l[i].id) }
              m[j] = k
            } else { l.append(), m[j] = l.id }
          } else { m[j] = null }
        }
        n.render()
      }
    }, ar.fn.sparkline.line = S = ao(ar.fn.sparkline._base, {
      type: "line",
      init: function(g, f, j, i, h) { S._super.init.call(this, g, f, j, i, h), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget() },
      getRegion: function(g, f, j) {
        var i, h = this.regionMap;
        for (i = h.length; i--;) {
          if (h[i] !== null && f >= h[i][0] && f <= h[i][1]) {
            return h[i][2]
          }
        }
        return undefined
      },
      getCurrentRegionFields: function() {
        var b = this.currentRegion;
        return { isNull: this.yvalues[b] === null, x: this.xvalues[b], y: this.yvalues[b], color: this.options.get("lineColor"), fillColor: this.options.get("fillColor"), offset: b }
      },
      renderHighlight: function() {
        var r = this.currentRegion,
          q = this.target,
          p = this.vertices[r],
          o = this.options,
          n = o.get("spotRadius"),
          m = o.get("highlightSpotColor"),
          l = o.get("highlightLineColor"),
          k, j;
        if (!p) {
          return
        }
        n && m && (k = q.drawCircle(p[0], p[1], n, undefined, m), this.highlightSpotId = k.id, q.insertAfterShape(this.lastShapeId, k)), l && (j = q.drawLine(p[0], this.canvasTop, p[0], this.canvasTop + this.canvasHeight, l), this.highlightLineId = j.id, q.insertAfterShape(this.lastShapeId, j))
      },
      removeHighlight: function() {
        var b = this.target;
        this.highlightSpotId && (b.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (b.removeShapeId(this.highlightLineId), this.highlightLineId = null)
      },
      scanValues: function() {
        var t = this.values,
          s = t.length,
          r = this.xvalues,
          q = this.yvalues,
          p = this.yminmax,
          o, n, m, l, k;
        for (o = 0; o < s; o++) { n = t[o], m = typeof t[o] == "string", l = typeof t[o] == "object" && t[o] instanceof Array, k = m && t[o].split(":"), m && k.length === 2 ? (r.push(Number(k[0])), q.push(Number(k[1])), p.push(Number(k[1]))) : l ? (r.push(n[0]), q.push(n[1]), p.push(n[1])) : (r.push(o), t[o] === null || t[o] === "null" ? q.push(null) : (q.push(Number(n)), p.push(Number(n)))) }
        this.options.get("xvalues") && (r = this.options.get("xvalues")), this.maxy = this.maxyorg = Math.max.apply(Math, p), this.miny = this.minyorg = Math.min.apply(Math, p), this.maxx = Math.max.apply(Math, r), this.minx = Math.min.apply(Math, r), this.xvalues = r, this.yvalues = q, this.yminmax = p
      },
      processRangeOptions: function() {
        var e = this.options,
          d = e.get("normalRangeMin"),
          f = e.get("normalRangeMax");
        d !== undefined && (d < this.miny && (this.miny = d), f > this.maxy && (this.maxy = f)), e.get("chartRangeMin") !== undefined && (e.get("chartRangeClip") || e.get("chartRangeMin") < this.miny) && (this.miny = e.get("chartRangeMin")), e.get("chartRangeMax") !== undefined && (e.get("chartRangeClip") || e.get("chartRangeMax") > this.maxy) && (this.maxy = e.get("chartRangeMax")), e.get("chartRangeMinX") !== undefined && (e.get("chartRangeClipX") || e.get("chartRangeMinX") < this.minx) && (this.minx = e.get("chartRangeMinX")), e.get("chartRangeMaxX") !== undefined && (e.get("chartRangeClipX") || e.get("chartRangeMaxX") > this.maxx) && (this.maxx = e.get("chartRangeMaxX"))
      },
      drawNormalRange: function(r, q, p, o, n) {
        var m = this.options.get("normalRangeMin"),
          l = this.options.get("normalRangeMax"),
          k = q + Math.round(p - p * ((l - this.miny) / n)),
          j = Math.round(p * (l - m) / n);
        this.target.drawRect(r, k, o, j, undefined, this.options.get("normalRangeColor")).append()
      },
      render: function() {
        var aV = this.options,
          aU = this.target,
          aT = this.canvasWidth,
          aS = this.canvasHeight,
          aR = this.vertices,
          aQ = aV.get("spotRadius"),
          aP = this.regionMap,
          aO, aN, aM, aL, aK, aJ, aI, aH, aE, aC, aA, ax, av, at, q, a, aG, aF, aD, aB, az, ay, aw, au, u;
        if (!S._super.render.call(this)) {
          return
        }
        this.scanValues(), this.processRangeOptions(), aw = this.xvalues, au = this.yvalues;
        if (!this.yminmax.length || this.yvalues.length < 2) {
          return
        }
        aL = aK = 0, aO = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, aN = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, aM = this.yvalues.length - 1, aQ && (aT < aQ * 4 || aS < aQ * 4) && (aQ = 0);
        if (aQ) {
          az = aV.get("highlightSpotColor") && !aV.get("disableInteraction");
          if (az || aV.get("minSpotColor") || aV.get("spotColor") && au[aM] === this.miny) { aS -= Math.ceil(aQ) }
          if (az || aV.get("maxSpotColor") || aV.get("spotColor") && au[aM] === this.maxy) { aS -= Math.ceil(aQ), aL += Math.ceil(aQ) }
          if (az || (aV.get("minSpotColor") || aV.get("maxSpotColor")) && (au[0] === this.miny || au[0] === this.maxy)) { aK += Math.ceil(aQ), aT -= Math.ceil(aQ) }
          if (az || aV.get("spotColor") || aV.get("minSpotColor") || aV.get("maxSpotColor") && (au[aM] === this.miny || au[aM] === this.maxy)) { aT -= Math.ceil(aQ) }
        }
        aS--, aV.get("normalRangeMin") !== undefined && !aV.get("drawNormalOnTop") && this.drawNormalRange(aK, aL, aS, aT, aN), aI = [], aH = [aI], at = q = null, a = au.length;
        for (u = 0; u < a; u++) { aE = aw[u], aA = aw[u + 1], aC = au[u], ax = aK + Math.round((aE - this.minx) * (aT / aO)), av = u < a - 1 ? aK + Math.round((aA - this.minx) * (aT / aO)) : aT, q = ax + (av - ax) / 2, aP[u] = [at || 0, q, u], at = q, aC === null ? u && (au[u - 1] !== null && (aI = [], aH.push(aI)), aR.push(null)) : (aC < this.miny && (aC = this.miny), aC > this.maxy && (aC = this.maxy), aI.length || aI.push([ax, aL + aS]), aJ = [ax, aL + Math.round(aS - aS * ((aC - this.miny) / aN))], aI.push(aJ), aR.push(aJ)) }
        aG = [], aF = [], aD = aH.length;
        for (u = 0; u < aD; u++) { aI = aH[u], aI.length && (aV.get("fillColor") && (aI.push([aI[aI.length - 1][0], aL + aS]), aF.push(aI.slice(0)), aI.pop()), aI.length > 2 && (aI[0] = [aI[0][0], aI[1][1]]), aG.push(aI)) }
        aD = aF.length;
        for (u = 0; u < aD; u++) { aU.drawShape(aF[u], aV.get("fillColor"), aV.get("fillColor")).append() }
        aV.get("normalRangeMin") !== undefined && aV.get("drawNormalOnTop") && this.drawNormalRange(aK, aL, aS, aT, aN), aD = aG.length;
        for (u = 0; u < aD; u++) { aU.drawShape(aG[u], aV.get("lineColor"), undefined, aV.get("lineWidth")).append() }
        if (aQ && aV.get("valueSpots")) {
          aB = aV.get("valueSpots"), aB.get === undefined && (aB = new aa(aB));
          for (u = 0; u < a; u++) { ay = aB.get(au[u]), ay && aU.drawCircle(aK + Math.round((aw[u] - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((au[u] - this.miny) / aN)), aQ, undefined, ay).append() }
        }
        aQ && aV.get("spotColor") && au[aM] !== null && aU.drawCircle(aK + Math.round((aw[aw.length - 1] - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((au[aM] - this.miny) / aN)), aQ, undefined, aV.get("spotColor")).append(), this.maxy !== this.minyorg && (aQ && aV.get("minSpotColor") && (aE = aw[ar.inArray(this.minyorg, au)], aU.drawCircle(aK + Math.round((aE - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((this.minyorg - this.miny) / aN)), aQ, undefined, aV.get("minSpotColor")).append()), aQ && aV.get("maxSpotColor") && (aE = aw[ar.inArray(this.maxyorg, au)], aU.drawCircle(aK + Math.round((aE - this.minx) * (aT / aO)), aL + Math.round(aS - aS * ((this.maxyorg - this.miny) / aN)), aQ, undefined, aV.get("maxSpotColor")).append())), this.lastShapeId = aU.getLastShapeId(), this.canvasTop = aL, aU.render()
      }
    }), ar.fn.sparkline.bar = Q = ao(ar.fn.sparkline._base, U, {
      type: "bar",
      init: function(aW, aV, aU, aT, aS) {
        var aR = parseInt(aU.get("barWidth"), 10),
          aQ = parseInt(aU.get("barSpacing"), 10),
          aP = aU.get("chartRangeMin"),
          aO = aU.get("chartRangeMax"),
          aN = aU.get("chartRangeClip"),
          aM = Infinity,
          aL = -Infinity,
          aK, aJ, aI, aH, aG, aF, aE, aD, aC, aB, aA, az, ay, ax, aw, av, au, at, v, q, j, i, h;
        Q._super.init.call(this, aW, aV, aU, aT, aS);
        for (aF = 0, aE = aV.length; aF < aE; aF++) {
          q = aV[aF], aK = typeof q == "string" && q.indexOf(":") > -1;
          if (aK || ar.isArray(q)) { aw = !0, aK && (q = aV[aF] = aj(q.split(":"))), q = ai(q, null), aJ = Math.min.apply(Math, q), aI = Math.max.apply(Math, q), aJ < aM && (aM = aJ), aI > aL && (aL = aI) }
        }
        this.stacked = aw, this.regionShapes = {}, this.barWidth = aR, this.barSpacing = aQ, this.totalBarWidth = aR + aQ, this.width = aT = aV.length * aR + (aV.length - 1) * aQ, this.initTarget(), aN && (ay = aP === undefined ? -Infinity : aP, ax = aO === undefined ? Infinity : aO), aG = [], aH = aw ? [] : aG;
        var f = [],
          a = [];
        for (aF = 0, aE = aV.length; aF < aE; aF++) {
          if (aw) {
            av = aV[aF], aV[aF] = v = [], f[aF] = 0, aH[aF] = a[aF] = 0;
            for (au = 0, at = av.length; au < at; au++) { q = v[au] = aN ? am(av[au], ay, ax) : av[au], q !== null && (q > 0 && (f[aF] += q), aM < 0 && aL > 0 ? q < 0 ? a[aF] += Math.abs(q) : aH[aF] += q : aH[aF] += Math.abs(q - (q < 0 ? aL : aM)), aG.push(q)) }
          } else { q = aN ? am(aV[aF], ay, ax) : aV[aF], q = aV[aF] = ak(q), q !== null && aG.push(q) }
        }
        this.max = az = Math.max.apply(Math, aG), this.min = aA = Math.min.apply(Math, aG), this.stackMax = aL = aw ? Math.max.apply(Math, f) : az, this.stackMin = aM = aw ? Math.min.apply(Math, aG) : aA, aU.get("chartRangeMin") !== undefined && (aU.get("chartRangeClip") || aU.get("chartRangeMin") < aA) && (aA = aU.get("chartRangeMin")), aU.get("chartRangeMax") !== undefined && (aU.get("chartRangeClip") || aU.get("chartRangeMax") > az) && (az = aU.get("chartRangeMax")), this.zeroAxis = aC = aU.get("zeroAxis", !0), aA <= 0 && az >= 0 && aC ? aB = 0 : aC == 0 ? aB = aA : aA > 0 ? aB = aA : aB = az, this.xaxisOffset = aB, aD = aw ? Math.max.apply(Math, aH) + Math.max.apply(Math, a) : az - aA, this.canvasHeightEf = aC && aA < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1, aA < aB ? (i = aw && az >= 0 ? aL : az, j = (i - aB) / aD * this.canvasHeight, j !== Math.ceil(j) && (this.canvasHeightEf -= 2, j = Math.ceil(j))) : j = this.canvasHeight, this.yoffset = j, ar.isArray(aU.get("colorMap")) ? (this.colorMapByIndex = aU.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = aU.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === undefined && (this.colorMapByValue = new aa(this.colorMapByValue))), this.range = aD
      },
      getRegion: function(f, e, h) {
        var g = Math.floor(e / this.totalBarWidth);
        return g < 0 || g >= this.values.length ? undefined : g
      },
      getCurrentRegionFields: function() {
        var g = this.currentRegion,
          f = ad(this.values[g]),
          j = [],
          i, h;
        for (h = f.length; h--;) { i = f[h], j.push({ isNull: i === null, value: i, color: this.calcColor(h, i, g), offset: g }) }
        return j
      },
      calcColor: function(a, p, o) {
        var n = this.colorMapByIndex,
          m = this.colorMapByValue,
          l = this.options,
          k, j;
        return this.stacked ? k = l.get("stackedBarColor") : k = p < 0 ? l.get("negBarColor") : l.get("barColor"), p === 0 && l.get("zeroColor") !== undefined && (k = l.get("zeroColor")), m && (j = m.get(p)) ? k = j : n && n.length > o && (k = n[o]), ar.isArray(k) ? k[a % k.length] : k
      },
      renderRegion: function(aB, aA) {
        var az = this.values[aB],
          ay = this.options,
          ax = this.xaxisOffset,
          aw = [],
          av = this.range,
          au = this.stacked,
          at = this.target,
          I = aB * this.totalBarWidth,
          H = this.canvasHeightEf,
          G = this.yoffset,
          F, E, D, C, B, A, z, y, l, a;
        az = ar.isArray(az) ? az : [az], z = az.length, y = az[0], C = ag(null, az), a = ag(ax, az, !0);
        if (C) {
          return ay.get("nullColor") ? (D = aA ? ay.get("nullColor") : this.calcHighlightColor(ay.get("nullColor"), ay), F = G > 0 ? G - 1 : G, at.drawRect(I, F, this.barWidth - 1, 0, D, D)) : undefined
        }
        B = G;
        for (A = 0; A < z; A++) {
          y = az[A];
          if (au && y === ax) {
            if (!a || l) {
              continue
            }
            l = !0
          }
          av > 0 ? E = Math.floor(H * (Math.abs(y - ax) / av)) + 1 : E = 1, y < ax || y === ax && G === 0 ? (F = B, B += E) : (F = G - E, G -= E), D = this.calcColor(A, y, aB), aA && (D = this.calcHighlightColor(D, ay)), aw.push(at.drawRect(I, F, this.barWidth - 1, E - 1, D, D))
        }
        return aw.length === 1 ? aw[0] : aw
      }
    }), ar.fn.sparkline.tristate = O = ao(ar.fn.sparkline._base, U, {
      type: "tristate",
      init: function(a, n, m, l, k) {
        var j = parseInt(m.get("barWidth"), 10),
          i = parseInt(m.get("barSpacing"), 10);
        O._super.init.call(this, a, n, m, l, k), this.regionShapes = {}, this.barWidth = j, this.barSpacing = i, this.totalBarWidth = j + i, this.values = ar.map(n, Number), this.width = l = n.length * j + (n.length - 1) * i, ar.isArray(m.get("colorMap")) ? (this.colorMapByIndex = m.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = m.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === undefined && (this.colorMapByValue = new aa(this.colorMapByValue))), this.initTarget()
      },
      getRegion: function(e, d, f) {
        return Math.floor(d / this.totalBarWidth)
      },
      getCurrentRegionFields: function() {
        var b = this.currentRegion;
        return { isNull: this.values[b] === undefined, value: this.values[b], color: this.calcColor(this.values[b], b), offset: b }
      },
      calcColor: function(j, i) {
        var p = this.values,
          o = this.options,
          n = this.colorMapByIndex,
          m = this.colorMapByValue,
          l, k;
        return m && (k = m.get(j)) ? l = k : n && n.length > i ? l = n[i] : p[i] < 0 ? l = o.get("negBarColor") : p[i] > 0 ? l = o.get("posBarColor") : l = o.get("zeroBarColor"), l
      },
      renderRegion: function(v, u) {
        var t = this.values,
          s = this.options,
          r = this.target,
          q, p, o, n, m, l;
        q = r.pixelHeight, o = Math.round(q / 2), n = v * this.totalBarWidth, t[v] < 0 ? (m = o, p = o - 1) : t[v] > 0 ? (m = 0, p = o - 1) : (m = o - 1, p = 2), l = this.calcColor(t[v], v);
        if (l === null) {
          return
        }
        return u && (l = this.calcHighlightColor(l, s)), r.drawRect(n, m, this.barWidth - 1, p - 1, l, l)
      }
    }), ar.fn.sparkline.discrete = M = ao(ar.fn.sparkline._base, U, {
      type: "discrete",
      init: function(a, j, i, h, g) { M._super.init.call(this, a, j, i, h, g), this.regionShapes = {}, this.values = j = ar.map(j, Number), this.min = Math.min.apply(Math, j), this.max = Math.max.apply(Math, j), this.range = this.max - this.min, this.width = h = i.get("width") === "auto" ? j.length * 2 : this.width, this.interval = Math.floor(h / j.length), this.itemWidth = h / j.length, i.get("chartRangeMin") !== undefined && (i.get("chartRangeClip") || i.get("chartRangeMin") < this.min) && (this.min = i.get("chartRangeMin")), i.get("chartRangeMax") !== undefined && (i.get("chartRangeClip") || i.get("chartRangeMax") > this.max) && (this.max = i.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = i.get("lineHeight") === "auto" ? Math.round(this.canvasHeight * 0.3) : i.get("lineHeight")) },
      getRegion: function(e, d, f) {
        return Math.floor(d / this.itemWidth)
      },
      getCurrentRegionFields: function() {
        var b = this.currentRegion;
        return { isNull: this.values[b] === undefined, value: this.values[b], offset: b }
      },
      renderRegion: function(F, E) {
        var D = this.values,
          C = this.options,
          B = this.min,
          A = this.max,
          z = this.range,
          y = this.interval,
          x = this.target,
          w = this.canvasHeight,
          v = this.lineHeight,
          u = w - v,
          t, s, r, f;
        return s = am(D[F], B, A), f = F * y, t = Math.round(u - u * ((s - B) / z)), r = C.get("thresholdColor") && s < C.get("thresholdValue") ? C.get("thresholdColor") : C.get("lineColor"), E && (r = this.calcHighlightColor(r, C)), x.drawLine(f, t, f, t + v, r)
      }
    }), ar.fn.sparkline.bullet = K = ao(ar.fn.sparkline._base, {
      type: "bullet",
      init: function(j, i, p, o, n) {
        var m, l, k;
        K._super.init.call(this, j, i, p, o, n), this.values = i = aj(i), k = i.slice(), k[0] = k[0] === null ? k[2] : k[0], k[1] = i[1] === null ? k[2] : k[1], m = Math.min.apply(Math, i), l = Math.max.apply(Math, i), p.get("base") === undefined ? m = m < 0 ? m : 0 : m = p.get("base"), this.min = m, this.max = l, this.range = l - m, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = o = p.get("width") === "auto" ? "4.0em" : o, this.target = this.$el.simpledraw(o, n, p.get("composite")), i.length || (this.disabled = !0), this.initTarget()
      },
      getRegion: function(f, e, h) {
        var g = this.target.getShapeAt(f, e, h);
        return g !== undefined && this.shapes[g] !== undefined ? this.shapes[g] : undefined
      },
      getCurrentRegionFields: function() {
        var b = this.currentRegion;
        return { fieldkey: b.substr(0, 1), value: this.values[b.substr(1)], region: b }
      },
      changeHighlight: function(f) {
        var e = this.currentRegion,
          h = this.valueShapes[e],
          g;
        delete this.shapes[h];
        switch (e.substr(0, 1)) {
          case "r":
            g = this.renderRange(e.substr(1), f);
            break;
          case "p":
            g = this.renderPerformance(f);
            break;
          case "t":
            g = this.renderTarget(f)
        }
        this.valueShapes[e] = g.id, this.shapes[g.id] = e, this.target.replaceWithShape(h, g)
      },
      renderRange: function(g, f) {
        var j = this.values[g],
          i = Math.round(this.canvasWidth * ((j - this.min) / this.range)),
          h = this.options.get("rangeColors")[g - 2];
        return f && (h = this.calcHighlightColor(h, this.options)), this.target.drawRect(0, 0, i - 1, this.canvasHeight - 1, h, h)
      },
      renderPerformance: function(f) {
        var e = this.values[1],
          h = Math.round(this.canvasWidth * ((e - this.min) / this.range)),
          g = this.options.get("performanceColor");
        return f && (g = this.calcHighlightColor(g, this.options)), this.target.drawRect(0, Math.round(this.canvasHeight * 0.3), h - 1, Math.round(this.canvasHeight * 0.4) - 1, g, g)
      },
      renderTarget: function(h) {
        var g = this.values[0],
          l = Math.round(this.canvasWidth * ((g - this.min) / this.range) - this.options.get("targetWidth") / 2),
          k = Math.round(this.canvasHeight * 0.1),
          j = this.canvasHeight - k * 2,
          i = this.options.get("targetColor");
        return h && (i = this.calcHighlightColor(i, this.options)), this.target.drawRect(l, k, this.options.get("targetWidth") - 1, j - 1, i, i)
      },
      render: function() {
        var f = this.values.length,
          e = this.target,
          h, g;
        if (!K._super.render.call(this)) {
          return
        }
        for (h = 2; h < f; h++) { g = this.renderRange(h).append(), this.shapes[g.id] = "r" + h, this.valueShapes["r" + h] = g.id }
        this.values[1] !== null && (g = this.renderPerformance().append(), this.shapes[g.id] = "p1", this.valueShapes.p1 = g.id), this.values[0] !== null && (g = this.renderTarget().append(), this.shapes[g.id] = "t0", this.valueShapes.t0 = g.id), e.render()
      }
    }), ar.fn.sparkline.pie = J = ao(ar.fn.sparkline._base, {
      type: "pie",
      init: function(a, n, m, l, k) {
        var j = 0,
          i;
        J._super.init.call(this, a, n, m, l, k), this.shapes = {}, this.valueShapes = {}, this.values = n = ar.map(n, Number), m.get("width") === "auto" && (this.width = this.height);
        if (n.length > 0) {
          for (i = n.length; i--;) { j += n[i] }
        }
        this.total = j, this.initTarget(), this.radius = Math.floor(Math.min(this.canvasWidth, this.canvasHeight) / 2)
      },
      getRegion: function(f, e, h) {
        var g = this.target.getShapeAt(f, e, h);
        return g !== undefined && this.shapes[g] !== undefined ? this.shapes[g] : undefined
      },
      getCurrentRegionFields: function() {
        var b = this.currentRegion;
        return { isNull: this.values[b] === undefined, value: this.values[b], percent: this.values[b] / this.total * 100, color: this.options.get("sliceColors")[b % this.options.get("sliceColors").length], offset: b }
      },
      changeHighlight: function(f) {
        var e = this.currentRegion,
          h = this.renderSlice(e, f),
          g = this.valueShapes[e];
        delete this.shapes[g], this.target.replaceWithShape(g, h), this.valueShapes[e] = h.id, this.shapes[h.id] = e
      },
      renderSlice: function(F, E) {
        var D = this.target,
          C = this.options,
          B = this.radius,
          A = C.get("borderWidth"),
          z = C.get("offset"),
          y = 2 * Math.PI,
          x = this.values,
          w = this.total,
          v = z ? 2 * Math.PI * (z / 360) : 0,
          u, t, s, r, q;
        r = x.length;
        for (s = 0; s < r; s++) {
          u = v, t = v, w > 0 && (t = v + y * (x[s] / w));
          if (F === s) {
            return q = C.get("sliceColors")[s % C.get("sliceColors").length], E && (q = this.calcHighlightColor(q, C)), D.drawPieSlice(B, B, B - A, u, t, undefined, q)
          }
          v = t
        }
      },
      render: function() {
        var i = this.target,
          h = this.values,
          n = this.options,
          m = this.radius,
          l = n.get("borderWidth"),
          k, j;
        if (!J._super.render.call(this)) {
          return
        }
        l && i.drawCircle(m, m, Math.floor(m - l / 2), n.get("borderColor"), undefined, l).append();
        for (j = h.length; j--;) { h[j] && (k = this.renderSlice(j).append(), this.valueShapes[j] = k.id, this.shapes[k.id] = j) }
        i.render()
      }
    }), ar.fn.sparkline.box = ab = ao(ar.fn.sparkline._base, {
      type: "box",
      init: function(a, j, i, h, g) { ab._super.init.call(this, a, j, i, h, g), this.values = ar.map(j, Number), this.width = i.get("width") === "auto" ? "4.0em" : h, this.initTarget(), this.values.length || (this.disabled = 1) },
      getRegion: function() {
        return 1
      },
      getCurrentRegionFields: function() {
        var b = [{ field: "lq", value: this.quartiles[0] }, { field: "med", value: this.quartiles[1] }, { field: "uq", value: this.quartiles[2] }];
        return this.loutlier !== undefined && b.push({ field: "lo", value: this.loutlier }), this.routlier !== undefined && b.push({ field: "ro", value: this.routlier }), this.lwhisker !== undefined && b.push({ field: "lw", value: this.lwhisker }), this.rwhisker !== undefined && b.push({ field: "rw", value: this.rwhisker }), b
      },
      render: function() {
        var ax = this.target,
          aw = this.values,
          av = aw.length,
          au = this.options,
          at = this.canvasWidth,
          I = this.canvasHeight,
          H = au.get("chartRangeMin") === undefined ? Math.min.apply(Math, aw) : au.get("chartRangeMin"),
          G = au.get("chartRangeMax") === undefined ? Math.max.apply(Math, aw) : au.get("chartRangeMax"),
          F = 0,
          E, D, C, B, A, z, y, x, w, v, g;
        if (!ab._super.render.call(this)) {
          return
        }
        if (au.get("raw")) { au.get("showOutliers") && aw.length > 5 ? (D = aw[0], E = aw[1], B = aw[2], A = aw[3], z = aw[4], y = aw[5], x = aw[6]) : (E = aw[0], B = aw[1], A = aw[2], z = aw[3], y = aw[4]) } else {
          aw.sort(function(d, c) {
            return d - c
          }), B = al(aw, 1), A = al(aw, 2), z = al(aw, 3), C = z - B;
          if (au.get("showOutliers")) {
            E = y = undefined;
            for (w = 0; w < av; w++) { E === undefined && aw[w] > B - C * au.get("outlierIQR") && (E = aw[w]), aw[w] < z + C * au.get("outlierIQR") && (y = aw[w]) }
            D = aw[0], x = aw[av - 1]
          } else { E = aw[0], y = aw[av - 1] }
        }
        this.quartiles = [B, A, z], this.lwhisker = E, this.rwhisker = y, this.loutlier = D, this.routlier = x, g = at / (G - H + 1), au.get("showOutliers") && (F = Math.ceil(au.get("spotRadius")), at -= 2 * Math.ceil(au.get("spotRadius")), g = at / (G - H + 1), D < E && ax.drawCircle((D - H) * g + F, I / 2, au.get("spotRadius"), au.get("outlierLineColor"), au.get("outlierFillColor")).append(), x > y && ax.drawCircle((x - H) * g + F, I / 2, au.get("spotRadius"), au.get("outlierLineColor"), au.get("outlierFillColor")).append()), ax.drawRect(Math.round((B - H) * g + F), Math.round(I * 0.1), Math.round((z - B) * g), Math.round(I * 0.8), au.get("boxLineColor"), au.get("boxFillColor")).append(), ax.drawLine(Math.round((E - H) * g + F), Math.round(I / 2), Math.round((B - H) * g + F), Math.round(I / 2), au.get("lineColor")).append(), ax.drawLine(Math.round((E - H) * g + F), Math.round(I / 4), Math.round((E - H) * g + F), Math.round(I - I / 4), au.get("whiskerColor")).append(), ax.drawLine(Math.round((y - H) * g + F), Math.round(I / 2), Math.round((z - H) * g + F), Math.round(I / 2), au.get("lineColor")).append(), ax.drawLine(Math.round((y - H) * g + F), Math.round(I / 4), Math.round((y - H) * g + F), Math.round(I - I / 4), au.get("whiskerColor")).append(), ax.drawLine(Math.round((A - H) * g + F), Math.round(I * 0.1), Math.round((A - H) * g + F), Math.round(I * 0.9), au.get("medianColor")).append(), au.get("target") && (v = Math.ceil(au.get("spotRadius")), ax.drawLine(Math.round((au.get("target") - H) * g + F), Math.round(I / 2 - v), Math.round((au.get("target") - H) * g + F), Math.round(I / 2 + v), au.get("targetColor")).append(), ax.drawLine(Math.round((au.get("target") - H) * g + F - v), Math.round(I / 2), Math.round((au.get("target") - H) * g + F + v), Math.round(I / 2), au.get("targetColor")).append()), ax.render()
      }
    }),
    function() {
      document.namespaces && !document.namespaces.v ? (ar.fn.sparkline.hasVML = !0, document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML")) : ar.fn.sparkline.hasVML = !1;
      var a = document.createElement("canvas");
      ar.fn.sparkline.hasCanvas = !!a.getContext && !!a.getContext("2d")
    }(), V = ao({
      init: function(f, e, h, g) { this.target = f, this.id = e, this.type = h, this.args = g },
      append: function() {
        return this.target.appendShape(this), this
      }
    }), T = ao({
      _pxregex: /(\d+)(px)?\s*$/i,
      init: function(a, f, e) {
        if (!a) {
          return
        }
        this.width = a, this.height = f, this.target = e, this.lastShapeId = null, e[0] && (e = e[0]), ar.data(e, "_jqs_vcanvas", this)
      },
      drawLine: function(h, g, l, k, j, i) {
        return this.drawShape([
          [h, g],
          [l, k]
        ], j, i)
      },
      drawShape: function(f, e, h, g) {
        return this._genShape("Shape", [f, e, h, g])
      },
      drawCircle: function(h, g, l, k, j, i) {
        return this._genShape("Circle", [h, g, l, k, j, i])
      },
      drawPieSlice: function(i, h, n, m, l, k, j) {
        return this._genShape("PieSlice", [i, h, n, m, l, k, j])
      },
      drawRect: function(h, g, l, k, j, i) {
        return this._genShape("Rect", [h, g, l, k, j, i])
      },
      getElement: function() {
        return this.canvas
      },
      getLastShapeId: function() {
        return this.lastShapeId
      },
      reset: function() { alert("reset not implemented") },
      _insert: function(a, d) { ar(d).html(a) },
      _calculatePixelDims: function(a, h, g) {
        var f;
        f = this._pxregex.exec(h), f ? this.pixelHeight = f[1] : this.pixelHeight = ar(g).height(), f = this._pxregex.exec(a), f ? this.pixelWidth = f[1] : this.pixelWidth = ar(g).width()
      },
      _genShape: function(e, d) {
        var f = L++;
        return d.unshift(f), new V(this, f, e, d)
      },
      appendShape: function(b) { alert("appendShape not implemented") },
      replaceWithShape: function(d, c) { alert("replaceWithShape not implemented") },
      insertAfterShape: function(d, c) { alert("insertAfterShape not implemented") },
      removeShapeId: function(b) { alert("removeShapeId not implemented") },
      getShapeAt: function(e, d, f) { alert("getShapeAt not implemented") },
      render: function() { alert("render not implemented") }
    }), R = ao(T, {
      init: function(a, h, g, f) { R._super.init.call(this, a, h, g), this.canvas = document.createElement("canvas"), g[0] && (g = g[0]), ar.data(g, "_jqs_vcanvas", this), ar(this.canvas).css({ display: "inline-block", width: a, height: h, verticalAlign: "top" }), this._insert(this.canvas, g), this._calculatePixelDims(a, h, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = f, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = undefined, ar(this.canvas).css({ width: this.pixelWidth, height: this.pixelHeight }) },
      _getContext: function(f, e, h) {
        var g = this.canvas.getContext("2d");
        return f !== undefined && (g.strokeStyle = f), g.lineWidth = h === undefined ? 1 : h, e !== undefined && (g.fillStyle = e), g
      },
      reset: function() {
        var b = this._getContext();
        b.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = undefined
      },
      _drawShape: function(j, i, p, o, n) {
        var m = this._getContext(p, o, n),
          l, k;
        m.beginPath(), m.moveTo(i[0][0] + 0.5, i[0][1] + 0.5);
        for (l = 1, k = i.length; l < k; l++) { m.lineTo(i[l][0] + 0.5, i[l][1] + 0.5) }
        p !== undefined && m.stroke(), o !== undefined && m.fill(), this.targetX !== undefined && this.targetY !== undefined && m.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = j)
      },
      _drawCircle: function(j, i, p, o, n, m, l) {
        var k = this._getContext(n, m, l);
        k.beginPath(), k.arc(i, p, o, 0, 2 * Math.PI, !1), this.targetX !== undefined && this.targetY !== undefined && k.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = j), n !== undefined && k.stroke(), m !== undefined && k.fill()
      },
      _drawPieSlice: function(r, q, p, o, n, m, l, k) {
        var j = this._getContext(l, k);
        j.beginPath(), j.moveTo(q, p), j.arc(q, p, o, n, m, !1), j.lineTo(q, p), j.closePath(), l !== undefined && j.stroke(), k && j.fill(), this.targetX !== undefined && this.targetY !== undefined && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = r)
      },
      _drawRect: function(i, h, n, m, l, k, j) {
        return this._drawShape(i, [
          [h, n],
          [h + m, n],
          [h + m, n + l],
          [h, n + l],
          [h, n]
        ], k, j)
      },
      appendShape: function(b) {
        return this.shapes[b.id] = b, this.shapeseq.push(b.id), this.lastShapeId = b.id, b.id
      },
      replaceWithShape: function(f, e) {
        var h = this.shapeseq,
          g;
        this.shapes[e.id] = e;
        for (g = h.length; g--;) { h[g] == f && (h[g] = e.id) }
        delete this.shapes[f]
      },
      replaceWithShapes: function(i, h) {
        var n = this.shapeseq,
          m = {},
          l, k, j;
        for (k = i.length; k--;) { m[i[k]] = !0 }
        for (k = n.length; k--;) { l = n[k], m[l] && (n.splice(k, 1), delete this.shapes[l], j = k) }
        for (k = h.length; k--;) { n.splice(j, 0, h[k].id), this.shapes[h[k].id] = h[k] }
      },
      insertAfterShape: function(f, e) {
        var h = this.shapeseq,
          g;
        for (g = h.length; g--;) {
          if (h[g] === f) {
            h.splice(g + 1, 0, e.id), this.shapes[e.id] = e;
            return
          }
        }
      },
      removeShapeId: function(e) {
        var d = this.shapeseq,
          f;
        for (f = d.length; f--;) {
          if (d[f] === e) {
            d.splice(f, 1);
            break
          }
        }
        delete this.shapes[e]
      },
      getShapeAt: function(e, d, f) {
        return this.targetX = d, this.targetY = f, this.render(), this.currentTargetShapeId
      },
      render: function() {
        var i = this.shapeseq,
          h = this.shapes,
          n = i.length,
          m = this._getContext(),
          l, k, j;
        m.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
        for (j = 0; j < n; j++) { l = i[j], k = h[l], this["_draw" + k.type].apply(this, k.args) }
        this.interact || (this.shapes = {}, this.shapeseq = [])
      }
    }), P = ao(T, {
      init: function(a, h, g) {
        var f;
        P._super.init.call(this, a, h, g), g[0] && (g = g[0]), ar.data(g, "_jqs_vcanvas", this), this.canvas = document.createElement("span"), ar(this.canvas).css({ display: "inline-block", position: "relative", overflow: "hidden", width: a, height: h, margin: "0px", padding: "0px", verticalAlign: "top" }), this._insert(this.canvas, g), this._calculatePixelDims(a, h, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, f = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", f), this.group = ar(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
      },
      _drawShape: function(z, y, x, w, v) {
        var u = [],
          t, s, r, q, p, o, n;
        for (n = 0, o = y.length; n < o; n++) { u[n] = "" + y[n][0] + "," + y[n][1] }
        return t = u.splice(0, 1), v = v === undefined ? 1 : v, s = x === undefined ? ' stroked="false" ' : ' strokeWeight="' + v + 'px" strokeColor="' + x + '" ', r = w === undefined ? ' filled="false"' : ' fillColor="' + w + '" filled="true" ', q = u[0] === u[u.length - 1] ? "x " : "", p = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + z + '" ' + s + r + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + t + " l " + u.join(", ") + " " + q + 'e"> </v:shape>', p
      },
      _drawCircle: function(t, s, r, q, p, o, n) {
        var m, l, k;
        return s -= q, r -= q, m = p === undefined ? ' stroked="false" ' : ' strokeWeight="' + n + 'px" strokeColor="' + p + '" ', l = o === undefined ? ' filled="false"' : ' fillColor="' + o + '" filled="true" ', k = '<v:oval  id="jqsshape' + t + '" ' + m + l + ' style="position:absolute;top:' + r + "px; left:" + s + "px; width:" + q * 2 + "px; height:" + q * 2 + 'px"></v:oval>', k
      },
      _drawPieSlice: function(F, E, D, C, B, A, z, y) {
        var x, w, v, u, t, s, r, q;
        if (B === A) {
          return ""
        }
        A - B === 2 * Math.PI && (B = 0, A = 2 * Math.PI), w = E + Math.round(Math.cos(B) * C), v = D + Math.round(Math.sin(B) * C), u = E + Math.round(Math.cos(A) * C), t = D + Math.round(Math.sin(A) * C);
        if (w === u && v === t) {
          if (A - B < Math.PI) {
            return ""
          }
          w = u = E + C, v = t = D
        }
        return w === u && v === t && A - B < Math.PI ? "" : (x = [E - C, D - C, E + C, D + C, w, v, u, t], s = z === undefined ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + z + '" ', r = y === undefined ? ' filled="false"' : ' fillColor="' + y + '" filled="true" ', q = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + F + '" ' + s + r + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + E + "," + D + " wa " + x.join(", ") + ' x e"> </v:shape>', q)
      },
      _drawRect: function(i, h, n, m, l, k, j) {
        return this._drawShape(i, [
          [h, n],
          [h, n + l],
          [h + m, n + l],
          [h + m, n],
          [h, n]
        ], k, j)
      },
      reset: function() { this.group.innerHTML = "" },
      appendShape: function(d) {
        var c = this["_draw" + d.type].apply(this, d.args);
        return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", c) : this.prerender += c, this.lastShapeId = d.id, d.id
      },
      replaceWithShape: function(a, h) {
        var g = ar("#jqsshape" + a),
          f = this["_draw" + h.type].apply(this, h.args);
        g[0].outerHTML = f
      },
      replaceWithShapes: function(a, l) {
        var k = ar("#jqsshape" + a[0]),
          j = "",
          i = l.length,
          h;
        for (h = 0; h < i; h++) { j += this["_draw" + l[h].type].apply(this, l[h].args) }
        k[0].outerHTML = j;
        for (h = 1; h < a.length; h++) { ar("#jqsshape" + a[h]).remove() }
      },
      insertAfterShape: function(a, h) {
        var g = ar("#jqsshape" + a),
          f = this["_draw" + h.type].apply(this, h.args);
        g[0].insertAdjacentHTML("afterEnd", f)
      },
      removeShapeId: function(a) {
        var d = ar("#jqsshape" + a);
        this.group.removeChild(d[0])
      },
      getShapeAt: function(f, e, h) {
        var g = f.id.substr(8);
        return g
      },
      render: function() { this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0) }
    })
});
(function(e, d, f) {
  typeof define == "function" && define.amd ? define(["jquery"], function(a) {
    return f(a, e, d), a.mobile
  }) : f(e.jQuery, e, d)
})(this, document, function(f, e, h, g) {
  (function(b) { b.mobile = {} })(f),
  function(i, c) {
    var j = { touch: "ontouchend" in h };
    i.mobile.support = i.mobile.support || {}, i.extend(i.support, j), i.extend(i.mobile.support, j)
  }(f),
  function(aI, aH, aG, aF) {
    function ak(b) {
      while (b && typeof b.originalEvent != "undefined") { b = b.originalEvent }
      return b
    }

    function aj(y, x) {
      var w = y.type,
        v, u, t, s, r, q, j, d, a;
      y = aI.Event(y), y.type = x, v = y.originalEvent, u = aI.event.props, w.search(/^(mouse|click)/) > -1 && (u = az);
      if (v) {
        for (j = u.length, s; j;) { s = u[--j], y[s] = v[s] }
      }
      w.search(/mouse(down|up)|click/) > -1 && !y.which && (y.which = 1);
      if (w.search(/^touch/) !== -1) {
        t = ak(v), w = t.touches, r = t.changedTouches, q = w && w.length ? w[0] : r && r.length ? r[0] : aF;
        if (q) {
          for (d = 0, a = aB.length; d < a; d++) { s = aB[d], y[s] = q[s] }
        }
      }
      return y
    }

    function ai(a) {
      var k = {},
        j, i;
      while (a) {
        j = aI.data(a, aE);
        for (i in j) { j[i] && (k[i] = k.hasVirtualBinding = !0) }
        a = a.parentNode
      }
      return k
    }

    function ah(a, j) {
      var i;
      while (a) {
        i = aI.data(a, aE);
        if (i && (!j || i[j])) {
          return a
        }
        a = a.parentNode
      }
      return null
    }

    function ag() { aq = !1 }

    function af() { aq = !0 }

    function ae() { am = 0, at.length = 0, ar = !1, af() }

    function ad() { ag() }

    function ac() { ab(), ax = setTimeout(function() { ax = 0, ae() }, aI.vmouse.resetTimerDuration) }

    function ab() { ax && (clearTimeout(ax), ax = 0) }

    function aa(a, k, j) {
      var i;
      if (j && j[a] || !j && ah(k.target, a)) { i = aj(k, a), aI(k.target).trigger(i) }
      return i
    }

    function Z(a) {
      var j = aI.data(a.target, aD);
      if (!ar && (!am || am !== j)) {
        var i = aa("v" + a.type, a);
        i && (i.isDefaultPrevented() && a.preventDefault(), i.isPropagationStopped() && a.stopPropagation(), i.isImmediatePropagationStopped() && a.stopImmediatePropagation())
      }
    }

    function Y(a) {
      var l = ak(a).touches,
        k, j;
      if (l && l.length === 1) {
        k = a.target, j = ai(k);
        if (j.hasVirtualBinding) {
          am = an++, aI.data(k, aD, am), ab(), ad(), au = !1;
          var i = ak(a).touches[0];
          aw = i.pageX, av = i.pageY, aa("vmouseover", a, j), aa("vmousedown", a, j)
        }
      }
    }

    function X(b) {
      if (aq) {
        return
      }
      au || aa("vmousecancel", b, ai(b.target)), au = !0, ac()
    }

    function W(a) {
      if (aq) {
        return
      }
      var l = ak(a).touches[0],
        k = au,
        j = aI.vmouse.moveDistanceThreshold,
        i = ai(a.target);
      au = au || Math.abs(l.pageX - aw) > j || Math.abs(l.pageY - av) > j, au && !k && aa("vmousecancel", a, i), aa("vmousemove", a, i), ac()
    }

    function V(j) {
      if (aq) {
        return
      }
      af();
      var i = ai(j.target),
        l;
      aa("vmouseup", j, i);
      if (!au) {
        var k = aa("vclick", j, i);
        k && k.isDefaultPrevented() && (l = ak(j).changedTouches[0], at.push({ touchID: am, x: l.clientX, y: l.clientY }), ar = !0)
      }
      aa("vmouseout", j, i), au = !1, ac()
    }

    function U(a) {
      var j = aI.data(a, aE),
        i;
      if (j) {
        for (i in j) {
          if (j[i]) {
            return !0
          }
        }
      }
      return !1
    }

    function T() {}

    function S(a) {
      var d = a.substr(1);
      return {
        setup: function(i, c) {
          U(this) || aI.data(this, aE, {});
          var b = aI.data(this, aE);
          b[a] = !0, ay[a] = (ay[a] || 0) + 1, ay[a] === 1 && ao.bind(d, Z), aI(this).bind(d, T), ap && (ay.touchstart = (ay.touchstart || 0) + 1, ay.touchstart === 1 && ao.bind("touchstart", Y).bind("touchend", V).bind("touchmove", W).bind("scroll", X))
        },
        teardown: function(j, i) {
          --ay[a], ay[a] || ao.unbind(d, Z), ap && (--ay.touchstart, ay.touchstart || ao.unbind("touchstart", Y).unbind("touchmove", W).unbind("touchend", V).unbind("scroll", X));
          var c = aI(this),
            b = aI.data(this, aE);
          b && (b[a] = !1), c.unbind(d, T), U(this) || c.removeData(aE)
        }
      }
    }
    var aE = "virtualMouseBindings",
      aD = "virtualTouchID",
      aC = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
      aB = "clientX clientY pageX pageY screenX screenY".split(" "),
      aA = aI.event.mouseHooks ? aI.event.mouseHooks.props : [],
      az = aI.event.props.concat(aA),
      ay = {},
      ax = 0,
      aw = 0,
      av = 0,
      au = !1,
      at = [],
      ar = !1,
      aq = !1,
      ap = "addEventListener" in aG,
      ao = aI(aG),
      an = 1,
      am = 0,
      al;
    aI.vmouse = { moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500 };
    for (var R = 0; R < aC.length; R++) { aI.event.special[aC[R]] = S(aC[R]) }
    ap && aG.addEventListener("click", function(s) {
      var r = at.length,
        q = s.target,
        p, o, n, m, l, a;
      if (r) {
        p = s.clientX, o = s.clientY, al = aI.vmouse.clickDistanceThreshold, n = q;
        while (n) {
          for (m = 0; m < r; m++) {
            l = at[m], a = 0;
            if (n === q && Math.abs(l.x - p) < al && Math.abs(l.y - o) < al || aI.data(n, aD) === l.touchID) {
              s.preventDefault(), s.stopPropagation();
              return
            }
          }
          n = n.parentNode
        }
      }
    }, !0)
  }(f, e, h),
  function(t, s, r) {
    function c(a, k, j) {
      var i = j.type;
      j.type = k, t.event.dispatch.call(a, j), j.type = i
    }
    var q = t(h);
    t.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(a, d) {
      t.fn[d] = function(b) {
        return b ? this.bind(d, b) : this.trigger(d)
      }, t.attrFn && (t.attrFn[d] = !0)
    });
    var p = t.mobile.support.touch,
      o = "touchmove scroll",
      n = p ? "touchstart" : "mousedown",
      m = p ? "touchend" : "mouseup",
      l = p ? "touchmove" : "mousemove";
    t.event.special.scrollstart = {
      enabled: !0,
      setup: function() {
        function i(b, d) { k = d, c(a, k ? "scrollstart" : "scrollstop", b) }
        var a = this,
          u = t(a),
          k, j;
        u.bind(o, function(d) {
          if (!t.event.special.scrollstart.enabled) {
            return
          }
          k || i(d, !0), clearTimeout(j), j = setTimeout(function() { i(d, !1) }, 50)
        })
      }
    }, t.event.special.tap = {
      tapholdThreshold: 750,
      setup: function() {
        var a = this,
          d = t(a);
        d.bind("vmousedown", function(y) {
          function u() { clearTimeout(v) }

          function k() { u(), d.unbind("vclick", b).unbind("vmouseup", u), q.unbind("vmousecancel", k) }

          function b(i) { k(), x === i.target && c(a, "tap", i) }
          if (y.which && y.which !== 1) {
            return !1
          }
          var x = y.target,
            w = y.originalEvent,
            v;
          d.bind("vmouseup", u).bind("vclick", b), q.bind("vmousecancel", k), v = setTimeout(function() { c(a, "taphold", t.Event("taphold", { target: x })) }, t.event.special.tap.tapholdThreshold)
        })
      }
    }, t.event.special.swipe = {
      scrollSupressionThreshold: 30,
      durationThreshold: 1000,
      horizontalDistanceThreshold: 30,
      verticalDistanceThreshold: 75,
      start: function(a) {
        var d = a.originalEvent.touches ? a.originalEvent.touches[0] : a;
        return { time: (new Date).getTime(), coords: [d.pageX, d.pageY], origin: t(a.target) }
      },
      stop: function(i) {
        var d = i.originalEvent.touches ? i.originalEvent.touches[0] : i;
        return { time: (new Date).getTime(), coords: [d.pageX, d.pageY] }
      },
      handleSwipe: function(a, d) { d.time - a.time < t.event.special.swipe.durationThreshold && Math.abs(a.coords[0] - d.coords[0]) > t.event.special.swipe.horizontalDistanceThreshold && Math.abs(a.coords[1] - d.coords[1]) < t.event.special.swipe.verticalDistanceThreshold && a.origin.trigger("swipe").trigger(a.coords[0] > d.coords[0] ? "swipeleft" : "swiperight") },
      setup: function() {
        var a = this,
          d = t(a);
        d.bind(n, function(i) {
          function j(v) {
            if (!u) {
              return
            }
            k = t.event.special.swipe.stop(v), Math.abs(u.coords[0] - k.coords[0]) > t.event.special.swipe.scrollSupressionThreshold && v.preventDefault()
          }
          var u = t.event.special.swipe.start(i),
            k;
          d.bind(l, j).one(m, function() { d.unbind(l, j), u && k && t.event.special.swipe.handleSwipe(u, k), u = k = r })
        })
      }
    }, t.each({ scrollstop: "scrollstart", taphold: "tap", swipeleft: "swipe", swiperight: "swipe" }, function(a, d) { t.event.special[a] = { setup: function() { t(this).bind(d, t.noop) } } })
  }(f, this)
});
(function(s, q, v) {
  var z = "placeholder" in q.createElement("input");
  var u = "placeholder" in q.createElement("textarea");
  var p = v.fn;
  var w = v.valHooks;
  var y = v.propHooks;
  var n;
  var o;
  if (z && u) {
    o = p.placeholder = function() {
      return this
    };
    o.input = o.textarea = true
  } else {
    o = p.placeholder = function() {
      var a = this;
      a.filter((z ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({ "focus.placeholder": x, "blur.placeholder": t }).data("placeholder-enabled", true).trigger("blur.placeholder");
      return a
    };
    o.input = z;
    o.textarea = u;
    n = {
      get: function(b) {
        var c = v(b);
        var a = c.data("placeholder-password");
        if (a) {
          return a[0].value
        }
        return c.data("placeholder-enabled") && c.hasClass("placeholder") ? "" : b.value
      },
      set: function(c, a) {
        var d = v(c);
        var b = d.data("placeholder-password");
        if (b) {
          return b[0].value = a
        }
        if (!d.data("placeholder-enabled")) {
          return c.value = a
        }
        if (a == "") {
          c.value = a;
          if (c != q.activeElement) { t.call(c) }
        } else {
          if (d.hasClass("placeholder")) { x.call(c, true, a) || (c.value = a) } else { c.value = a }
        }
        return d
      }
    };
    if (!z) {
      w.input = n;
      y.value = n
    }
    if (!u) {
      w.textarea = n;
      y.value = n
    }
    v(function() {
      v(q).delegate("form", "submit.placeholder", function() {
        var a = v(".placeholder", this).each(x);
        setTimeout(function() { a.each(t) }, 10)
      })
    });
    v(s).bind("beforeunload.placeholder", function() { v(".placeholder").each(function() { this.value = "" }) })
  }

  function r(b) {
    var c = {};
    var a = /^jQuery\d+$/;
    v.each(b.attributes, function(d, e) {
      if (e.specified && !a.test(e.name)) { c[e.name] = e.value }
    });
    return c
  }

  function x(c, b) {
    var d = this;
    var a = v(d);
    if (d.value == a.attr("placeholder") && a.hasClass("placeholder")) {
      if (a.data("placeholder-password")) {
        a = a.hide().next().show().attr("id", a.removeAttr("id").data("placeholder-id"));
        if (c === true) {
          return a[0].value = b
        }
        a.focus()
      } else {
        d.value = "";
        a.removeClass("placeholder");
        d == q.activeElement && d.select()
      }
    }
  }

  function t() {
    var a;
    var e = this;
    var b = v(e);
    var c = this.id;
    if (e.value == "") {
      if (e.type == "password") {
        if (!b.data("placeholder-textinput")) {
          try { a = b.clone().attr({ type: "text" }) } catch (d) { a = v("<input>").attr(v.extend(r(this), { type: "text" })) }
          a.removeAttr("name").data({ "placeholder-password": b, "placeholder-id": c }).bind("focus.placeholder", x);
          b.data({ "placeholder-textinput": a, "placeholder-id": c }).before(a)
        }
        b = b.removeAttr("id").hide().prev().attr("id", c).show()
      }
      b.addClass("placeholder");
      b[0].value = b.attr("placeholder")
    } else { b.removeClass("placeholder") }
  }
}(this, document, jQuery));
! function(b) {
  var a = function(c) {
    this.$element = b(c);
    this.$prev = this.$element.prev();
    !this.$prev.length && (this.$parent = this.$element.parent())
  };
  a.prototype = {
    constructor: a,
    init: function() {
      var d = this.$element,
        e = d.data()["toggle"].split(":")[1],
        c = d.data("target");
      d.hasClass("in") || d[e](c).addClass("in")
    },
    reset: function() {
      this.$parent && this.$parent.prepend(this.$element);
      !this.$parent && this.$element.insertAfter(this.$prev);
      this.$element.removeClass("in")
    }
  };
  b.fn.shift = function(c) {
    return this.each(function() {
      var e = b(this),
        d = e.data("shift");
      if (!d) { e.data("shift", (d = new a(this))) }
      if (typeof c == "string") { d[c]() }
    })
  };
  b.fn.shift.Constructor = a
}(window.jQuery);
Date.now = Date.now || function() {
  return +new Date
};
! function(a) {
  a(function() {
    a("input[placeholder], textarea[placeholder]").placeholder();
    a("[data-toggle=popover]").popover();
    a(document).on("click", ".popover-title .close", function(i) {
      var g = a(i.target),
        h = g.closest(".popover").prev();
      h && h.popover("hide")
    });
    a.fn.dropdown.Constructor.prototype.change = function(l) {
      l.preventDefault();
      var h = a(l.target),
        j, i = false,
        k, g;
      !h.is("a") && (h = h.closest("a"));
      k = h.closest(".dropdown-menu");
      g = k.parent().find(".dropdown-label");
      $labelHolder = g.text();
      j = h.find("input");
      i = j.is(":checked");
      if (j.is(":disabled")) {
        return
      }
      if (j.attr("type") == "radio" && i) {
        return
      }
      if (j.attr("type") == "radio") { k.find("li").removeClass("active") }
      h.parent().removeClass("active");
      !i && h.parent().addClass("active");
      j.prop("checked", !j.prop("checked"));
      $items = k.find("li > a > input:checked");
      if ($items.length) {
        $text = [];
        $items.each(function() {
          var m = a(this).parent().text();
          m && $text.push(a.trim(m))
        });
        $text = $text.length < 4 ? $text.join(", ") : $text.length + " selected";
        g.html($text)
      } else { g.html(g.data("placeholder")) }
    };
    a(document).on("click.dropdown-menu", ".dropdown-select > li > a", a.fn.dropdown.Constructor.prototype.change);
    a("[data-toggle=tooltip]").tooltip();
    a(document).on("click", '[data-toggle^="class"]', function(j) {
      j && j.preventDefault();
      var i = a(j.target),
        h, g;
      !i.data("toggle") && (i = i.closest('[data-toggle^="class"]'));
      h = i.data()["toggle"].split(":")[1];
      g = a(i.data("target") || i.attr("href"));
      g.toggleClass(h);
      i.toggleClass("active")
    });
    a(document).on("click", ".panel-toggle", function(j) {
      j && j.preventDefault();
      var i = a(j.target),
        h = "collapse",
        g;
      if (!i.is("a")) { i = i.closest("a") }
      g = i.closest(".panel");
      g.find(".panel-body").toggleClass(h);
      i.toggleClass("active")
    });
    a(".carousel.auto").carousel();
    a(document).on("click.button.data-api", "[data-loading-text]", function(h) {
      var g = a(h.target);
      g.is("i") && (g = g.parent());
      g.button("loading")
    });
    a(".carousel").swiperight(function() { a(this).find(".left").trigger("click") });
    a(".carousel").swipeleft(function() { a(this).find(".right").trigger("click") });
    var e = function() {
      return !!("ontouchstart" in window) || !!("onmsgesturechange" in window)
    };
    !e() && a("html").addClass("no-touch");
    var f = a(window);
    var c = function(g) {
      if (g == "reset") {
        a('[data-toggle^="shift"]').shift("reset");
        return
      }
      a('[data-toggle^="shift"]').shift("init")
    };
    f.width() < 768 && c();
    var d, b = f.width();
    f.resize(function() {
      if (b !== f.width()) {
        clearTimeout(d);
        d = setTimeout(function() {
          f.width() < 767 && c();
          f.width() >= 768 && c("reset");
          b = f.width()
        }, 500)
      }
    })
  })
}(window.jQuery);
Date.now = Date.now || function() {
  return +new Date
};
! function($) {
  $(function() {
    var isRgbaSupport = function() {
      var value = "rgba(1,1,1,0.5)",
        el = document.createElement("p"),
        result = false;
      try {
        el.style.color = value;
        result = /^rgba/.test(el.style.color)
      } catch (e) {}
      el = null;
      return result
    };
    var toRgba = function(str, alpha) {
      var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
      var matches = patt.exec(str);
      return "rgba(" + parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16) + "," + alpha + ")"
    };
    var generateSparkline = function($re) {
      $(".sparkline").each(function() {
        var $data = $(this).data();
        if ($re && !$data.resize) {
          return
        }
        if ($data.type == "bar") {
          !$data.barColor && ($data.barColor = "#3fcf7f");
          !$data.barSpacing && ($data.barSpacing = 2);
          $(this).next(".axis").find("li").css("width", $data.barWidth + "px").css("margin-right", $data.barSpacing + "px")
        }($data.type == "pie") && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
        $data.spotColor = $data.minSpotColor = $data.maxSpotColor = $data.highlightSpotColor = $data.lineColor;
        $(this).sparkline($data.data || "html", $data);
        if ($(this).data("compositeData")) {
          var $cdata = {};
          $cdata.composite = true;
          $cdata.spotRadius = $data.spotRadius;
          $cdata.lineColor = $data.compositeLineColor || "#a3e2fe";
          $cdata.fillColor = $data.compositeFillColor || "#e3f6ff";
          $cdata.highlightLineColor = $data.highlightLineColor;
          $cdata.spotColor = $cdata.minSpotColor = $cdata.maxSpotColor = $cdata.highlightSpotColor = $cdata.lineColor;
          isRgbaSupport() && ($cdata.fillColor = toRgba($cdata.fillColor, 0.5));
          $(this).sparkline($(this).data("compositeData"), $cdata)
        }
        if ($data.type == "line") { $(this).next(".axis").addClass("axis-full") }
      })
    };
    var sparkResize;
    $(window).resize(function(e) {
      clearTimeout(sparkResize);
      sparkResize = setTimeout(function() { generateSparkline(true) }, 500)
    });
    generateSparkline(false);
    var updatePie = function($that) {
      var $this = $that,
        $text = $("span", $this),
        $oldValue = $text.html(),
        $newValue = Math.round(100 * Math.random());
      $this.data("easyPieChart").update($newValue);
      $({ v: $oldValue }).animate({ v: $newValue }, { duration: 1000, easing: "swing", step: function() { $text.text(Math.ceil(this.v)) } })
    };
    $(".easypiechart").each(function() {
      var $barColor = $(this).data("barColor") || function($percent) {
          $percent /= 100;
          return "rgb(" + Math.round(255 * (1 - $percent)) + ", " + Math.round(255 * $percent) + ", 125)"
        },
        $trackColor = $(this).data("trackColor") || "#c8d2db",
        $scaleColor = $(this).data("scaleColor"),
        $lineWidth = $(this).data("lineWidth") || 12,
        $size = $(this).data("size") || 130,
        $animate = $(this).data("animate") || 1000;
      $(this).easyPieChart({
        barColor: $barColor,
        trackColor: $trackColor,
        scaleColor: $scaleColor,
        lineCap: "butt",
        lineWidth: $lineWidth,
        size: $size,
        animate: $animate,
        onStop: function() {
          var $this = this.$el;
          $this.data("loop") && setTimeout(function() { $this.data("loop") && updatePie($this) }, 2000)
        }
      })
    });
    $(document).on("click", '[data-toggle^="class:pie"]', function(e) {
      e && e.preventDefault();
      var $btn = $(e.target),
        $loop = $("[data-loop]").data("loop"),
        $target;
      !$btn.data("toggle") && ($btn = $btn.closest('[data-toggle^="class"]'));
      $target = $btn.data("target");
      !$target && ($target = $btn.closest("[data-loop]"));
      $target.data("loop", !$loop);
      !$loop && updatePie($("[data-loop]"))
    });
    $(".combodate").each(function() {
      $(this).combodate();
      $(this).next(".combodate").find("select").addClass("form-control")
    });
    $(".datepicker").each(function() { $(this).datepicker() });
    $(".dropfile").each(function() {
      var $dropbox = $(this);
      if (typeof window.FileReader === "undefined") {
        $("small", this).html("File API & FileReader API not supported").addClass("text-danger");
        return
      }
      this.ondragover = function() {
        $dropbox.addClass("hover");
        return false
      };
      this.ondragend = function() {
        $dropbox.removeClass("hover");
        return false
      };
      this.ondrop = function(e) {
        e.preventDefault();
        $dropbox.removeClass("hover").html("");
        var file = e.dataTransfer.files[0],
          reader = new FileReader();
        reader.onload = function(event) { $dropbox.append($("<img>").attr("src", event.target.result)) };
        reader.readAsDataURL(file);
        return false
      }
    });
    var addPill = function($input) {
      var $text = $input.val(),
        $pills = $input.closest(".pillbox"),
        $repeat = false,
        $repeatPill;
      if ($text == "") {
        return
      }
      $("li", $pills).text(function(i, v) {
        if (v == $text) {
          $repeatPill = $(this);
          $repeat = true
        }
      });
      if ($repeat) {
        $repeatPill.fadeOut().fadeIn();
        return
      }
      $item = $('<li class="label bg-default">' + $text + "</li> ");
      $item.insertBefore($input);
      $input.val("");
      $pills.trigger("change", $item)
    };
    $(".pillbox input").on("blur", function() { addPill($(this)) });
    $(".pillbox input").on("keypress", function(e) {
      if (e.which == 13) {
        e.preventDefault();
        addPill($(this))
      }
    });
    $(".slider").each(function() { $(this).slider() });
    $(document).on("click", "[data-wizard]", function(e) {
      var $this = $(this),
        href;
      var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
      var option = $this.data("wizard");
      var item = $target.wizard("selectedItem");
      var $step = $(this).closest(".step-content").find(".step-pane:eq(" + (item.step - 1) + ")");
      if ($step.find("input, select, textarea").data("required") && !$step.find("input, select, textarea").parsley("validate")) {
        return false
      } else {
        $target.wizard(option);
        var activeStep = (option == "next") ? (item.step + 1) : (item.step - 1);
        var prev = ($(this).hasClass("btn-prev") && $(this)) || $(this).prev();
        prev.attr("disabled", (activeStep == 1) ? true : false)
      }
    });
    $(".portlet").each(function() { $(".portlet").sortable({ connectWith: ".portlet", iframeFix: false, items: ".portlet-item", opacity: 0.8, helper: "original", revert: true, forceHelperSize: true, placeholder: "sortable-box-placeholder round-all", forcePlaceholderSize: true, tolerance: "pointer" }) })
  })
}(window.jQuery);
$(document).ready(function() {
  $("#docs pre code").each(function() {
    var m = $(this);
    var d = m.html();
    m.html(d.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
  });

  function b(m, d) {
    return Math.floor(Math.random() * (d - m + 1)) + m
  }
  $(document).on("click", ".the-icons a", function(d) { d && d.preventDefault() });
  $(document).on("change", 'table thead [type="checkbox"]', function(n) {
    n && n.preventDefault();
    var m = $(n.target).closest("table"),
      d = $(n.target).is(":checked");
    $('tbody [type="checkbox"]', m).prop("checked", d)
  });
  $(document).on("click", '[data-toggle^="progress"]', function(d) {
    d && d.preventDefault();
    $el = $(d.target);
    $target = $($el.data("target"));
    $(".progress", $target).each(function() {
      var m = 50,
        n, o = $(".progress-bar", this).last();
      ($(this).hasClass("progress-mini") || $(this).hasClass("progress-small")) && (m = 100);
      n = Math.floor(Math.random() * m) + "%";
      o.css("width", n).attr("data-original-title", n)
    })
  });

  function k(d) {
    var n = $("#panel-notifications"),
      o = $(".count-n:first", n),
      m = $(".list-group-item:first", n).clone(),
      p = parseInt(o.text());
    $(".count-n", n).fadeOut().fadeIn().text(p + 1);
    m.attr("href", d.link);
    m.find(".pull-left").html(d.icon);
    m.find(".media-body").html(d.title);
    m.hide().prependTo(n.find(".list-group")).slideDown().css("display", "block")
  }
  var h = { icon: '<i class="fa fa-envelope-o fa-2x text-default"></i>', title: 'Added the mail app, Check it out.<br><small class="text-muted">2 July 13</small>', link: "mail.html" };
  var l = { icon: '<i class="fa fa-calendar fa-2x text-default"></i>', title: 'Added the calendar, Get it.<br><small class="text-muted">10 July 13</small>', link: "calendar.html" };
  var a = { icon: '<i class="fa fa-clock-o fa-2x text-default"></i>', title: 'Added the timeline, view it here.<br><small class="text-muted">1 minute ago</small>', link: "timeline.html" };
  window.setTimeout(function() { k(h) }, 2000);
  window.setTimeout(function() { k(l) }, 3500);
  window.setTimeout(function() { k(a) }, 5000);
  var c = new Date();
  var g = c.getDate();
  var e = c.getMonth();
  var j = c.getFullYear();
  var i = function(m) {
    var d = { title: $.trim(m.text()), className: m.attr("class").replace("label", "") };
    m.data("eventObject", d);
    m.draggable({ zIndex: 999, revert: true, revertDuration: 0 })
  };
  $(".calendar").each(function() {
    $(this).fullCalendar({
      header: { left: "prev,next today", center: "title", right: "month,agendaWeek,agendaDay" },
      editable: true,
      droppable: true,
      drop: function(n, o) {
        var m = $(this).data("eventObject");
        var d = $.extend({}, m);
        d.start = n;
        d.allDay = o;
        $("#calendar").fullCalendar("renderEvent", d, true);
        if ($("#drop-remove").is(":checked")) { $(this).remove() }
      },
      events: [{ title: "All Day Event", start: new Date(j, e, 1) }, { title: "Long Event", start: new Date(j, e, g - 5), end: new Date(j, e, g - 2), className: "bg-primary" }, { id: 999, title: "Repeating Event", start: new Date(j, e, g - 3, 16, 0), allDay: false }, { id: 999, title: "Repeating Event", start: new Date(j, e, g + 4, 16, 0), allDay: false }, { title: "Meeting", start: new Date(j, e, g, 10, 30), allDay: false }, { title: "Lunch", start: new Date(j, e, g, 12, 0), end: new Date(j, e, g, 14, 0), allDay: false }, { title: "Birthday Party", start: new Date(j, e, g + 1, 19, 0), end: new Date(j, e, g + 1, 22, 30), allDay: false }, { title: "Click for Google", start: new Date(j, e, 28), end: new Date(j, e, 29), url: "http://google.com/" }]
    })
  });
  $("#myEvents").on("change", function(m, d) { i($(d)) });
  $("#myEvents li").each(function() { i($(this)) });
  var f = function(d) {
    this._formatter = d.formatter;
    this._columns = d.columns;
    this._delay = d.delay
  };
  f.prototype = {
    columns: function() {
      return this._columns
    },
    data: function(n, o) {
      var m = "js/data/datagrid.json";
      var d = this;
      setTimeout(function() {
        var p = $.extend(true, [], d._data);
        $.ajax(m, { dataType: "json", async: false, type: "GET" }).done(function(s) {
          p = s.geonames;
          if (n.search) {
            p = _.filter(p, function(z) {
              var y = false;
              _.each(z, function(A) {
                if (_.isString(A) || _.isFinite(A)) {
                  if (A.toString().toLowerCase().indexOf(n.search.toLowerCase()) !== -1) { y = true }
                }
              });
              return y
            })
          }
          if (n.filter) {
            p = _.filter(p, function(y) {
              switch (n.filter.value) {
                case "lt5m":
                  if (y.population < 5000000) {
                    return true
                  }
                  break;
                case "gte5m":
                  if (y.population >= 5000000) {
                    return true
                  }
                  break;
                default:
                  return true;
                  break
              }
            })
          }
          var t = p.length;
          if (n.sortProperty) {
            p = _.sortBy(p, n.sortProperty);
            if (n.sortDirection === "desc") { p.reverse() }
          }
          var w = n.pageIndex * n.pageSize;
          var v = w + n.pageSize;
          var r = (v > t) ? t : v;
          var q = Math.ceil(t / n.pageSize);
          var u = n.pageIndex + 1;
          var x = w + 1;
          p = p.slice(w, v);
          if (d._formatter) { d._formatter(p) }
          o({ data: p, start: x, end: r, count: t, pages: q, page: u })
        }).fail(function(q) {})
      }, d._delay)
    }
  };
  $("#MyStretchGrid").each(function() { $(this).datagrid({ dataSource: new f({ columns: [{ property: "toponymName", label: "Name", sortable: true }, { property: "countrycode", label: "Country", sortable: true }, { property: "population", label: "Population", sortable: true }, { property: "fcodeName", label: "Type", sortable: true }, { property: "geonameId", label: "Edit", sortable: true }], formatter: function(d) { $.each(d, function(m, n) { n.geonameId = '<a href="#edit?geonameid=' + n.geonameId + '"><i class="fa fa-pencil"></i></a>' }) } }) }) });
  $('[data-ride="datatables"]').each(function() {
    var d = $(this).dataTable({ bProcessing: true, sAjaxSource: "js/data/datatable.json", sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>", sPaginationType: "full_numbers", aoColumns: [{ mData: "engine" }, { mData: "browser" }, { mData: "platform" }, { mData: "version" }, { mData: "grade" }] })
  });
  if ($.fn.select2) {
    $("#select2-option").select2();
    $("#select2-tags").select2({ tags: ["red", "green", "blue"], tokenSeparators: [",", " "] })
  }
});
