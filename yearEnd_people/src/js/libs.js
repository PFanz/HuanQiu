// Zepto
var Zepto = function() {
    function p(d) {
        return null == d ? String(d) : Z[ma.call(d)] || "object"
    }

    function E(d) {
        return "function" == p(d)
    }

    function C(d) {
        return null != d && d == d.window
    }

    function y(d) {
        return "object" == p(d)
    }

    function m(d) {
        return y(d) && !C(d) && Object.getPrototypeOf(d) == Object.prototype
    }

    function f(d) {
        return W.call(d, function(d) {
            return null != d
        })
    }

    function u(d) {
        return d.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function w(d) {
        return d in B ? B[d] : B[d] = new RegExp("(^|\\s)" + d + "(\\s|$)")
    }

    function z(d, a) {
        return "number" != typeof a || fa[u(d)] ? a : a + "px"
    }

    function q(d) {
        return "children" in d ? Q.call(d.children) : h.map(d.childNodes, function(d) {
            return 1 == d.nodeType ? d : void 0
        })
    }

    function K(d, a) {
        var l, b = d ? d.length : 0;
        for (l = 0; b > l; l++) this[l] = d[l];
        this.length = b;
        this.selector = a || ""
    }

    function t(d, a, l) {
        for (n in a) l && (m(a[n]) || r(a[n])) ? (m(a[n]) && !m(d[n]) && (d[n] = {}), r(a[n]) && !r(d[n]) && (d[n] = []), t(d[n], a[n], l)) : a[n] !== g && (d[n] = a[n])
    }

    function x(d, a) {
        return null == a ? h(d) : h(d).filter(a)
    }

    function v(d, a, l, b) {
        return E(a) ? a.call(d, l, b) : a
    }

    function c(d, a) {
        var l = d.className || "",
            b = l && l.baseVal !== g;
        return a === g ? b ? l.baseVal : l : void(b ? l.baseVal = a : d.className = a)
    }

    function b(d) {
        try {
            return d ? "true" == d || ("false" == d ? !1 : "null" == d ? null : +d + "" == d ? +d : /^[\[\{]/.test(d) ? h.parseJSON(d) : d) : d
        } catch (a) {
            return d
        }
    }

    function e(d, a) {
        a(d);
        for (var l = 0, b = d.childNodes.length; b > l; l++) e(d.childNodes[l], a)
    }
    var g, n, h, J, S, Y, O = [],
        k = O.concat,
        W = O.filter,
        Q = O.slice,
        I = window.document,
        ca = {}, B = {}, fa = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, U = /^\s*<(\w+|!)[^>]*>/,
        R = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        N = /^(?:body|html)$/i,
        ka = /([A-Z])/g,
        H = "val css html text data width height offset".split(" "),
        da = I.createElement("table"),
        a = I.createElement("tr"),
        A = {
            tr: I.createElement("tbody"),
            tbody: da,
            thead: da,
            tfoot: da,
            td: a,
            th: a,
            "*": I.createElement("div")
        }, M = /complete|loaded|interactive/,
        V = /^[\w-]*$/,
        Z = {}, ma = Z.toString,
        F = {}, X = I.createElement("div"),
        l = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, r = Array.isArray || function(d) {
            return d instanceof Array
        };
    return F.matches = function(d, a) {
        if (!a || !d || 1 !== d.nodeType) return !1;
        var l = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.matchesSelector;
        if (l) return l.call(d, a);
        var b, l = d.parentNode,
            r = !l;
        return r && (l = X).appendChild(d), b = ~F.qsa(l, a).indexOf(d), r && X.removeChild(d), b
    }, S = function(d) {
        return d.replace(/-+(.)?/g, function(d, a) {
            return a ? a.toUpperCase() : ""
        })
    }, Y = function(d) {
        return W.call(d, function(a, l) {
            return d.indexOf(a) == l
        })
    }, F.fragment = function(d, a, l) {
        var b, r, c;
        return R.test(d) && (b = h(I.createElement(RegExp.$1))), b || (d.replace && (d = d.replace(L, "<$1></$2>")), a === g && (a = U.test(d) && RegExp.$1), a in A || (a = "*"), c = A[a], c.innerHTML = "" + d, b = h.each(Q.call(c.childNodes), function() {
            c.removeChild(this)
        })), m(l) && (r = h(b), h.each(l, function(d, a) {
            -1 < H.indexOf(d) ? r[d](a) : r.attr(d, a)
        })), b
    }, F.Z = function(d, a) {
        return new K(d, a)
    }, F.isZ = function(d) {
        return d instanceof F.Z
    }, F.init = function(d, a) {
        var l;
        if (!d) return F.Z();
        if ("string" == typeof d)
            if (d = d.trim(), "<" == d[0] && U.test(d)) l = F.fragment(d, RegExp.$1, a), d = null;
            else {
                if (a !== g) return h(a).find(d);
                l = F.qsa(I, d)
            } else {
                if (E(d)) return h(I).ready(d);
                if (F.isZ(d)) return d;
                if (r(d)) l = f(d);
                else if (y(d)) l = [d], d = null;
                else if (U.test(d)) l = F.fragment(d.trim(), RegExp.$1, a), d = null;
                else {
                    if (a !== g) return h(a).find(d);
                    l = F.qsa(I, d)
                }
            }
        return F.Z(l, d)
    }, h = function(d, a) {
        return F.init(d, a)
    }, h.extend = function(d) {
        var a, l = Q.call(arguments, 1);
        return "boolean" == typeof d && (a = d, d = l.shift()), l.forEach(function(l) {
            t(d, l, a)
        }), d
    }, F.qsa = function(d, a) {
        var l, b = "#" == a[0],
            r = !b && "." == a[0],
            c = b || r ? a.slice(1) : a,
            e = V.test(c);
        return d.getElementById && e && b ? (l = d.getElementById(c)) ? [l] : [] : 1 !== d.nodeType && 9 !== d.nodeType && 11 !== d.nodeType ? [] : Q.call(e && !b && d.getElementsByClassName ? r ? d.getElementsByClassName(c) : d.getElementsByTagName(a) : d.querySelectorAll(a))
    }, h.contains = I.documentElement.contains ? function(d, a) {
        return d !== a && d.contains(a)
    } : function(d, a) {
        for (; a && (a = a.parentNode);)
            if (a === d) return !0;
        return !1
    }, h.type = p, h.isFunction = E, h.isWindow = C, h.isArray = r, h.isPlainObject = m, h.isEmptyObject = function(d) {
        for (var a in d) return !1;
        return !0
    }, h.inArray = function(d, a, l) {
        return O.indexOf.call(a, d, l)
    }, h.camelCase = S, h.trim = function(d) {
        return null == d ? "" : String.prototype.trim.call(d)
    }, h.uuid = 0, h.support = {}, h.expr = {}, h.noop = function() {}, h.map = function(d, a) {
        var l, b, r = [];
        if ("number" == typeof d.length)
            for (b = 0; b < d.length; b++) l = a(d[b], b), null != l && r.push(l);
        else
            for (b in d) l = a(d[b], b), null != l && r.push(l);
        return 0 < r.length ? h.fn.concat.apply([], r) : r
    }, h.each = function(d, a) {
        var l;
        if ("number" == typeof d.length)
            for (l = 0; l < d.length && !1 !== a.call(d[l], l, d[l]); l++);
        else
            for (l in d)
                if (!1 === a.call(d[l], l, d[l])) break; return d
    }, h.grep = function(d, a) {
        return W.call(d, a)
    }, window.JSON && (h.parseJSON = JSON.parse), h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(d, a) {
        Z["[object " + a + "]"] = a.toLowerCase()
    }), h.fn = {
        constructor: F.Z,
        length: 0,
        forEach: O.forEach,
        reduce: O.reduce,
        push: O.push,
        sort: O.sort,
        splice: O.splice,
        indexOf: O.indexOf,
        concat: function() {
            var d, a, l = [];
            for (d = 0; d < arguments.length; d++) a = arguments[d], l[d] = F.isZ(a) ? a.toArray() : a;
            return k.apply(F.isZ(this) ? this.toArray() : this, l)
        },
        map: function(d) {
            return h(h.map(this, function(a, l) {
                return d.call(a, l, a)
            }))
        },
        slice: function() {
            return h(Q.apply(this, arguments))
        },
        ready: function(d) {
            return M.test(I.readyState) && I.body ? d(h) : I.addEventListener("DOMContentLoaded", function() {
                d(h)
            }, !1), this
        },
        get: function(d) {
            return d === g ? Q.call(this) : this[0 <= d ? d : d + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(d) {
            return O.every.call(this, function(a, l) {
                return !1 !== d.call(a, l, a)
            }), this
        },
        filter: function(d) {
            return E(d) ? this.not(this.not(d)) : h(W.call(this, function(a) {
                return F.matches(a, d)
            }))
        },
        add: function(d, a) {
            return h(Y(this.concat(h(d, a))))
        },
        is: function(d) {
            return 0 < this.length && F.matches(this[0], d)
        },
        not: function(d) {
            var a = [];
            if (E(d) && d.call !== g) this.each(function(l) {
                d.call(this, l) || a.push(this)
            });
            else {
                var l = "string" == typeof d ? this.filter(d) : "number" == typeof d.length && E(d.item) ? Q.call(d) : h(d);
                this.forEach(function(d) {
                    0 > l.indexOf(d) && a.push(d)
                })
            }
            return h(a)
        },
        has: function(d) {
            return this.filter(function() {
                return y(d) ? h.contains(this, d) : h(this).find(d).size()
            })
        },
        eq: function(d) {
            return -1 === d ? this.slice(d) : this.slice(d, +d + 1)
        },
        first: function() {
            var d = this[0];
            return d && !y(d) ? d : h(d)
        },
        last: function() {
            var d = this[this.length - 1];
            return d && !y(d) ? d : h(d)
        },
        find: function(d) {
            var a = this;
            return d ? "object" == typeof d ? h(d).filter(function() {
                var d = this;
                return O.some.call(a, function(a) {
                    return h.contains(a, d)
                })
            }) : 1 == this.length ? h(F.qsa(this[0], d)) : this.map(function() {
                return F.qsa(this, d)
            }) : h()
        },
        closest: function(d, a) {
            var l = this[0],
                b = !1;
            for ("object" == typeof d && (b = h(d)); l && !(b ? 0 <= b.indexOf(l) : F.matches(l, d));) l = l !== a && !(null != l && l.nodeType == l.DOCUMENT_NODE) && l.parentNode;
            return h(l)
        },
        parents: function(d) {
            for (var a = [], l = this; 0 < l.length;) l = h.map(l, function(d) {
                return (d = d.parentNode) && (null == d || d.nodeType != d.DOCUMENT_NODE) && 0 > a.indexOf(d) ? (a.push(d), d) : void 0
            });
            return x(a, d)
        },
        parent: function(d) {
            return x(Y(this.pluck("parentNode")), d)
        },
        children: function(d) {
            return x(this.map(function() {
                return q(this)
            }), d)
        },
        contents: function() {
            return this.map(function() {
                return this.contentDocument || Q.call(this.childNodes)
            })
        },
        siblings: function(d) {
            return x(this.map(function(d, a) {
                return W.call(q(a.parentNode), function(d) {
                    return d !== a
                })
            }), d)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(d) {
            return h.map(this, function(a) {
                return a[d]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = "");
                if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
                    var d = this.style,
                        a;
                    a = this.nodeName;
                    var l, b;
                    a = (ca[a] || (l = I.createElement(a), I.body.appendChild(l), b = getComputedStyle(l, "").getPropertyValue("display"), l.parentNode.removeChild(l), "none" == b && (b = "block"), ca[a] = b), ca[a]);
                    d.display = a
                }
            })
        },
        replaceWith: function(a) {
            return this.before(a).remove()
        },
        wrap: function(a) {
            var l = E(a);
            if (this[0] && !l) var b = h(a).get(0),
            r = b.parentNode || 1 < this.length;
            return this.each(function(c) {
                h(this).wrapAll(l ? a.call(this, c) : r ? b.cloneNode(!0) : b)
            })
        },
        wrapAll: function(a) {
            if (this[0]) {
                h(this[0]).before(a = h(a));
                for (var l;
                    (l = a.children()).length;) a = l.first();
                h(a).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            var l = E(a);
            return this.each(function(b) {
                var r = h(this),
                    c = r.contents();
                b = l ? a.call(this, b) : a;
                c.length ? c.wrapAll(b) : r.append(b)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                h(this).replaceWith(h(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(a) {
            return this.each(function() {
                var l = h(this);
                (a === g ? "none" == l.css("display") : a) ? l.show() : l.hide()
            })
        },
        prev: function(a) {
            return h(this.pluck("previousElementSibling")).filter(a || "*")
        },
        next: function(a) {
            return h(this.pluck("nextElementSibling")).filter(a || "*")
        },
        html: function(a) {
            return 0 in arguments ? this.each(function(l) {
                var b = this.innerHTML;
                h(this).empty().append(v(this, a, l, b))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(a) {
            return 0 in arguments ? this.each(function(l) {
                l = v(this, a, l, this.textContent);
                this.textContent = null == l ? "" : "" + l
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function(a, l) {
            var b;
            return "string" != typeof a || 1 in arguments ? this.each(function(b) {
                if (1 === this.nodeType)
                    if (y(a))
                        for (n in a) {
                            var r = n;
                            b = a[n];
                            null == b ? this.removeAttribute(r) : this.setAttribute(r, b)
                        } else r = a, b = v(this, l, b, this.getAttribute(a)), null == b ? this.removeAttribute(r) : this.setAttribute(r, b)
            }) : this.length && 1 === this[0].nodeType ? !(b = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : b : g
        },
        removeAttr: function(a) {
            return this.each(function() {
                1 === this.nodeType && a.split(" ").forEach(function(a) {
                    this.removeAttribute(a)
                }, this)
            })
        },
        prop: function(a, b) {
            return a = l[a] || a, 1 in arguments ? this.each(function(l) {
                this[a] = v(this, b, l, this[a])
            }) : this[0] && this[0][a]
        },
        data: function(a, l) {
            var r = "data-" + a.replace(ka, "-$1").toLowerCase(),
                r = 1 in arguments ? this.attr(r, l) : this.attr(r);
            return null !== r ? b(r) : g
        },
        val: function(a) {
            return 0 in arguments ? this.each(function(l) {
                this.value = v(this, a, l, this.value)
            }) : this[0] && (this[0].multiple ? h(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(a) {
            if (a) return this.each(function(l) {
                var b = h(this);
                l = v(this, a, l, b.offset());
                var r = b.offsetParent().offset();
                l = {
                    top: l.top - r.top,
                    left: l.left - r.left
                };
                "static" == b.css("position") && (l.position = "relative");
                b.css(l)
            });
            if (!this.length) return null;
            var l = this[0].getBoundingClientRect();
            return {
                left: l.left + window.pageXOffset,
                top: l.top + window.pageYOffset,
                width: Math.round(l.width),
                height: Math.round(l.height)
            }
        },
        css: function(a, l) {
            if (2 > arguments.length) {
                var b, c = this[0];
                if (!c) return;
                if (b = getComputedStyle(c, ""), "string" == typeof a) return c.style[S(a)] || b.getPropertyValue(a);
                if (r(a)) {
                    var e = {};
                    return h.each(a, function(a, d) {
                        e[d] = c.style[S(d)] || b.getPropertyValue(d)
                    }), e
                }
            }
            var k = "";
            if ("string" == p(a)) l || 0 === l ? k = u(a) + ":" + z(a, l) : this.each(function() {
                this.style.removeProperty(u(a))
            });
            else
                for (n in a) a[n] || 0 === a[n] ? k += u(n) + ":" + z(n, a[n]) + ";" : this.each(function() {
                    this.style.removeProperty(u(n))
                });
            return this.each(function() {
                this.style.cssText += ";" + k
            })
        },
        index: function(a) {
            return a ? this.indexOf(h(a)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(a) {
            return a ? O.some.call(this, function(a) {
                return this.test(c(a))
            }, w(a)) : !1
        },
        addClass: function(a) {
            return a ? this.each(function(l) {
                if ("className" in this) {
                    J = [];
                    var b = c(this);
                    v(this, a, l, b).split(/\s+/g).forEach(function(a) {
                        h(this).hasClass(a) || J.push(a)
                    }, this);
                    J.length && c(this, b + (b ? " " : "") + J.join(" "))
                }
            }) : this
        },
        removeClass: function(a) {
            return this.each(function(l) {
                if ("className" in this) {
                    if (a === g) return c(this, "");
                    J = c(this);
                    v(this, a, l, J).split(/\s+/g).forEach(function(a) {
                        J = J.replace(w(a), " ")
                    });
                    c(this, J.trim())
                }
            })
        },
        toggleClass: function(a, l) {
            return a ? this.each(function(b) {
                var r = h(this);
                v(this, a, b, c(this)).split(/\s+/g).forEach(function(a) {
                    (l === g ? !r.hasClass(a) : l) ? r.addClass(a) : r.removeClass(a)
                })
            }) : this
        },
        scrollTop: function(a) {
            if (this.length) {
                var l = "scrollTop" in this[0];
                return a === g ? l ? this[0].scrollTop : this[0].pageYOffset : this.each(l ? function() {
                    this.scrollTop = a
                } : function() {
                    this.scrollTo(this.scrollX, a)
                })
            }
        },
        scrollLeft: function(a) {
            if (this.length) {
                var l = "scrollLeft" in this[0];
                return a === g ? l ? this[0].scrollLeft : this[0].pageXOffset : this.each(l ? function() {
                    this.scrollLeft = a
                } : function() {
                    this.scrollTo(a, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var a = this[0],
                    l = this.offsetParent(),
                    b = this.offset(),
                    r = N.test(l[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : l.offset();
                return b.top -= parseFloat(h(a).css("margin-top")) || 0, b.left -= parseFloat(h(a).css("margin-left")) || 0, r.top += parseFloat(h(l[0]).css("border-top-width")) || 0, r.left += parseFloat(h(l[0]).css("border-left-width")) || 0, {
                    top: b.top - r.top,
                    left: b.left - r.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || I.body; a && !N.test(a.nodeName) && "static" == h(a).css("position");) a = a.offsetParent;
                return a
            })
        }
    }, h.fn.detach = h.fn.remove, ["width", "height"].forEach(function(a) {
        var l = a.replace(/./, function(a) {
            return a[0].toUpperCase()
        });
        h.fn[a] = function(b) {
            var r, c = this[0];
            return b === g ? C(c) ? c["inner" + l] : null != c && c.nodeType == c.DOCUMENT_NODE ? c.documentElement["scroll" + l] : (r = this.offset()) && r[a] : this.each(function(l) {
                c = h(this);
                c.css(a, v(this, b, l, c[a]()))
            })
        }
    }), ["after", "prepend", "before", "append"].forEach(function(a, l) {
        var b = l % 2;
        h.fn[a] = function() {
            var a, d, r = h.map(arguments, function(l) {
                    return a = p(l), "object" == a || "array" == a || null == l ? l : F.fragment(l)
                }),
                c = 1 < this.length;
            return 1 > r.length ? this : this.each(function(a, k) {
                d = b ? k : k.parentNode;
                k = 0 == l ? k.nextSibling : 1 == l ? k.firstChild : 2 == l ? k : null;
                var g = h.contains(I.documentElement, d);
                r.forEach(function(a) {
                    if (c) a = a.cloneNode(!0);
                    else if (!d) return h(a).remove();
                    d.insertBefore(a, k);
                    g && e(a, function(a) {
                        null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                    })
                })
            })
        };
        h.fn[b ? a + "To" : "insert" + (l ? "Before" : "After")] = function(l) {
            return h(l)[a](this), this
        }
    }), F.Z.prototype = K.prototype = h.fn, F.uniq = Y, F.deserializeValue = b, h.zepto = F, h
}();
window.Zepto = Zepto;
void 0 === window.$ && (window.$ = Zepto);
(function(p) {
    function E(b) {
        return b._zid || (b._zid = K++)
    }

    function C(b, e, g, h) {
        if (e = y(e), e.ns) var n = new RegExp("(?:^| )" + e.ns.replace(" ", " .* ?") + "(?: |$)");
        return (c[E(b)] || []).filter(function(b) {
            return !(!b || e.e && b.e != e.e || e.ns && !n.test(b.ns) || g && E(b.fn) !== E(g) || h && b.sel != h)
        })
    }

    function y(b) {
        b = ("" + b).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        }
    }

    function m(b) {
        return n[b] || e && g[b] || b
    }

    function f(b, k, h, f, u, v, t) {
        var J = E(b),
            x = c[J] || (c[J] = []);
        k.split(/\s/).forEach(function(c) {
            if ("ready" == c) return p(document).ready(h);
            var k = y(c);
            k.fn = h;
            k.sel = u;
            k.e in n && (h = function(b) {
                var c = b.relatedTarget;
                return !c || c !== this && !p.contains(this, c) ? k.fn.apply(this, arguments) : void 0
            });
            var J = (k.del = v) || h;
            k.proxy = function(c) {
                if (c = w(c), !c.isImmediatePropagationStopped()) {
                    c.data = f;
                    var e = J.apply(b, c._args == q ? [c] : [c].concat(c._args));
                    return !1 === e && (c.preventDefault(), c.stopPropagation()), e
                }
            };
            k.i = x.length;
            x.push(k);
            "addEventListener" in b && b.addEventListener(m(k.e), k.proxy, k.del && !e && k.e in g || !! t)
        })
    }

    function u(b, k, h, n, f) {
        var p = E(b);
        (k || "").split(/\s/).forEach(function(k) {
            C(b, k, h, n).forEach(function(k) {
                delete c[p][k.i];
                "removeEventListener" in b && b.removeEventListener(m(k.e), k.proxy, k.del && !e && k.e in g || !! f)
            })
        })
    }

    function w(b, c) {
        return (c || !b.isDefaultPrevented) && (c || (c = b), p.each(Y, function(e, g) {
            var n = c[e];
            b[e] = function() {
                return this[g] = h, n && n.apply(c, arguments)
            };
            b[g] = J
        }), (c.defaultPrevented !== q ? c.defaultPrevented : "returnValue" in c ? !1 === c.returnValue : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = h)), b
    }

    function z(b) {
        var c, e = {
                originalEvent: b
            };
        for (c in b) S.test(c) || b[c] === q || (e[c] = b[c]);
        return w(e, b)
    }
    var q, K = 1,
        t = Array.prototype.slice,
        x = p.isFunction,
        v = function(b) {
            return "string" == typeof b
        }, c = {}, b = {}, e = "onfocusin" in window,
        g = {
            focus: "focusin",
            blur: "focusout"
        }, n = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    b.click = b.mousedown = b.mouseup = b.mousemove = "MouseEvents";
    p.event = {
        add: f,
        remove: u
    };
    p.proxy = function(b, c) {
        var e = 2 in arguments && t.call(arguments, 2);
        if (x(b)) {
            var g = function() {
                return b.apply(c, e ? e.concat(t.call(arguments)) : arguments)
            };
            return g._zid = E(b), g
        }
        if (v(c)) return e ? (e.unshift(b[c], b), p.proxy.apply(null, e)) : p.proxy(b[c], b);
        throw new TypeError("expected function");
    };
    p.fn.bind = function(b, c, e) {
        return this.on(b, c, e)
    };
    p.fn.unbind = function(b, c) {
        return this.off(b, c)
    };
    p.fn.one = function(b, c, e, g) {
        return this.on(b, c, e, g, 1)
    };
    var h = function() {
        return !0
    }, J = function() {
            return !1
        }, S = /^([A-Z]|returnValue$|layer[XY]$)/,
        Y = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    p.fn.delegate = function(b, c, e) {
        return this.on(c, b, e)
    };
    p.fn.undelegate = function(b, c, e) {
        return this.off(c, b, e)
    };
    p.fn.live = function(b, c) {
        return p(document.body).delegate(this.selector, b, c), this
    };
    p.fn.die = function(b, c) {
        return p(document.body).undelegate(this.selector, b, c), this
    };
    p.fn.on = function(b, c, e, g, h) {
        var n, m, y = this;
        return b && !v(b) ? (p.each(b, function(b, g) {
            y.on(b, c, e, g, h)
        }), y) : (v(c) || x(g) || !1 === g || (g = e, e = c, c = q), (g === q || !1 === e) && (g = e, e = q), !1 === g && (g = J), y.each(function(q, v) {
            h && (n = function(b) {
                return u(v, b.type, g), g.apply(this, arguments)
            });
            c && (m = function(b) {
                var e, h = p(b.target).closest(c, v).get(0);
                return h && h !== v ? (e = p.extend(z(b), {
                    currentTarget: h,
                    liveFired: v
                }), (n || g).apply(h, [e].concat(t.call(arguments, 1)))) : void 0
            });
            f(v, b, g, e, c, m || n)
        }))
    };
    p.fn.off = function(b, c, e) {
        var g = this;
        return b && !v(b) ? (p.each(b, function(b, e) {
            g.off(b, c, e)
        }), g) : (v(c) || x(e) || !1 === e || (e = c, c = q), !1 === e && (e = J), g.each(function() {
            u(this, b, e, c)
        }))
    };
    p.fn.trigger = function(b, c) {
        return b = v(b) || p.isPlainObject(b) ? p.Event(b) : w(b), b._args = c, this.each(function() {
            b.type in g && "function" == typeof this[b.type] ? this[b.type]() : "dispatchEvent" in this ? this.dispatchEvent(b) : p(this).triggerHandler(b, c)
        })
    };
    p.fn.triggerHandler = function(b, c) {
        var e, g;
        return this.each(function(h, n) {
            e = z(v(b) ? p.Event(b) : b);
            e._args = c;
            e.target = n;
            p.each(C(n, b.type || b), function(b, c) {
                return g = c.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), g
    };
    "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
        p.fn[b] = function(c) {
            return 0 in arguments ? this.bind(b, c) : this.trigger(b)
        }
    });
    p.Event = function(c, e) {
        v(c) || (e = c, c = e.type);
        var g = document.createEvent(b[c] || "Events"),
            h = !0;
        if (e)
            for (var n in e) "bubbles" == n ? h = !! e[n] : g[n] = e[n];
        return g.initEvent(c, h, !0), w(g)
    }
})(Zepto);
(function(p) {
    function E(f, m, c, b) {
        return Math.abs(f - m) >= Math.abs(c - b) ? 0 < f - m ? "Left" : "Right" : 0 < c - b ? "Up" : "Down"
    }

    function C() {
        q = null;
        t.last && (t.el.trigger("longTap"), t = {})
    }

    function y() {
        u && clearTimeout(u);
        w && clearTimeout(w);
        z && clearTimeout(z);
        q && clearTimeout(q);
        u = w = z = q = null;
        t = {}
    }

    function m(f) {
        return ("touch" == f.pointerType || f.pointerType == f.MSPOINTER_TYPE_TOUCH) && f.isPrimary
    }

    function f(f, m) {
        return f.type == "pointer" + m || f.type.toLowerCase() == "mspointer" + m
    }
    var u, w, z, q, K, t = {};
    p(document).ready(function() {
        var x, v, c, b, e = 0,
            g = 0;
        "MSGesture" in window && (K = new MSGesture, K.target = document.body);
        p(document).bind("MSGestureEnd", function(b) {
            (b = 1 < b.velocityX ? "Right" : -1 > b.velocityX ? "Left" : 1 < b.velocityY ? "Down" : -1 > b.velocityY ? "Up" : null) && (t.el.trigger("swipe"), t.el.trigger("swipe" + b))
        }).on("touchstart MSPointerDown pointerdown", function(e) {
            (!(b = f(e, "down")) || m(e)) && (c = b ? e : e.touches[0], e.touches && 1 === e.touches.length && t.x2 && (t.x2 = void 0, t.y2 = void 0), x = Date.now(), v = x - (t.last || x), t.el = p("tagName" in c.target ? c.target : c.target.parentNode), u && clearTimeout(u), t.x1 = c.pageX, t.y1 = c.pageY, 0 < v && 250 >= v && (t.isDoubleTap = !0), t.last = x, q = setTimeout(C, 750), K && b && K.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function(n) {
            if (!(b = f(n, "move")) || m(n)) c = b ? n : n.touches[0], q && clearTimeout(q), q = null, t.x2 = c.pageX, t.y2 = c.pageY, e += Math.abs(t.x1 - t.x2), g += Math.abs(t.y1 - t.y2)
        }).on("touchend MSPointerUp pointerup", function(c) {
            if (!(b = f(c, "up")) || m(c)) q && clearTimeout(q), q = null, t.x2 && 30 < Math.abs(t.x1 - t.x2) || t.y2 && 30 < Math.abs(t.y1 - t.y2) ? z = setTimeout(function() {
                t.el.trigger("swipe");
                t.el.trigger("swipe" + E(t.x1, t.x2, t.y1, t.y2));
                t = {}
            }, 0) : "last" in t && (30 > e && 30 > g ? w = setTimeout(function() {
                var b = p.Event("tap");
                b.cancelTouch = y;
                t.el.trigger(b);
                t.isDoubleTap ? (t.el && t.el.trigger("doubleTap"), t = {}) : u = setTimeout(function() {
                    u = null;
                    t.el && t.el.trigger("singleTap");
                    t = {}
                }, 250)
            }, 0) : t = {}), e = g = 0
        }).on("touchcancel MSPointerCancel pointercancel", y);
        p(window).on("scroll", y)
    });
    "swipe swipeLeft swipeRight swipeUp swipeDown doubleTap tap singleTap longTap".split(" ").forEach(function(f) {
        p.fn[f] = function(m) {
            return this.on(f, m)
        }
    })
})(Zepto);

(function(p, E) {
    var C = p.GreenSockGlobals = p.GreenSockGlobals || p;
    if (!C.TweenLite) {
        var y, m, f, u, w, z = function(a) {
                var b = a.split("."),
                    d = C;
                for (a = 0; b.length > a; a++) d[b[a]] = d = d[b[a]] || {};
                return d
            }, q = z("com.greensock"),
            K = function(a) {
                var b, d = [],
                    c = a.length;
                for (b = 0; b !== c; d.push(a[b++]));
                return d
            }, t = function() {}, x = function() {
                var a = Object.prototype.toString,
                    b = a.call([]);
                return function(d) {
                    return null != d && (d instanceof Array || "object" == typeof d && !! d.push && a.call(d) === b)
                }
            }(),
            v = {}, c = function(a, b, d, e) {
                this.sc = v[a] ? v[a].sc : [];
                v[a] = this;
                this.gsClass = null;
                this.func = d;
                var g = [];
                this.check = function(h) {
                    for (var k, n, f = b.length, m = f; - 1 < --f;)(k = v[b[f]] || new c(b[f], [])).gsClass ? (g[f] = k.gsClass, m--) : h && k.sc.push(this);
                    if (0 === m && d)
                        for (h = ("com.greensock." + a).split("."), k = h.pop(), n = z(h.join("."))[k] = this.gsClass = d.apply(d, g), e && (C[k] = n, "function" == typeof define && define.amd ? define((p.GreenSockAMDPath ? p.GreenSockAMDPath + "/" : "") + a.split(".").pop(), [], function() {
                            return n
                        }) : a === E && "undefined" != typeof module && module.exports && (module.exports = n)), f = 0; this.sc.length > f; f++) this.sc[f].check()
                };
                this.check(!0)
            }, b = p._gsDefine = function(a, b, d, e) {
                return new c(a, b, d, e)
            }, e = q._class = function(a, c, d) {
                return c = c || function() {}, b(a, [], function() {
                    return c
                }, d), c
            };
        b.globals = C;
        var g = [0, 0, 1, 1],
            n = [],
            h = e("easing.Ease", function(a, b, d, c) {
                this._func = a;
                this._type = d || 0;
                this._power = c || 0;
                this._params = b ? g.concat(b) : g
            }, !0),
            J = h.map = {}, S = h.register = function(a, b, d, c) {
                var g, h, k;
                b = b.split(",");
                for (var f = b.length, n = (d || "easeIn,easeOut,easeInOut").split(","); - 1 < --f;)
                    for (g = b[f], d = c ? e("easing." + g, null, !0) : q.easing[g] || {}, h = n.length; - 1 < --h;) k = n[h], J[g + "." + k] = J[k + g] = d[k] = a.getRatio ? a : a[k] || new a
            };
        f = h.prototype;
        f._calcEnd = !1;
        f.getRatio = function(a) {
            if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
            var b = this._type,
                d = this._power,
                c = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
            return 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), 1 === b ? 1 - c : 2 === b ? c : .5 > a ? c / 2 : 1 - c / 2
        };
        y = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
        for (m = y.length; - 1 < --m;) f = y[m] + ",Power" + m, S(new h(null, null, 1, m), f, "easeOut", !0), S(new h(null, null, 2, m), f, "easeIn" + (0 === m ? ",easeNone" : "")), S(new h(null, null, 3, m), f, "easeInOut");
        J.linear = q.easing.Linear.easeIn;
        J.swing = q.easing.Quad.easeInOut;
        var Y = e("events.EventDispatcher", function(a) {
            this._listeners = {};
            this._eventTarget = a || this
        });
        f = Y.prototype;
        f.addEventListener = function(a, b, d, c, e) {
            e = e || 0;
            var g, h = this._listeners[a],
                k = 0;
            null == h && (this._listeners[a] = h = []);
            for (g = h.length; - 1 < --g;) a = h[g], a.c === b && a.s === d ? h.splice(g, 1) : 0 === k && e > a.pr && (k = g + 1);
            h.splice(k, 0, {
                c: b,
                s: d,
                up: c,
                pr: e
            });
            this !== u || w || u.wake()
        };
        f.removeEventListener = function(a, b) {
            var d, c = this._listeners[a];
            if (c)
                for (d = c.length; - 1 < --d;)
                    if (c[d].c === b) return c.splice(d, 1), void 0
        };
        f.dispatchEvent = function(a) {
            var b, d, c, e = this._listeners[a];
            if (e)
                for (b = e.length, d = this._eventTarget; - 1 < --b;)(c = e[b]) && (c.up ? c.c.call(c.s || d, {
                    type: a,
                    target: d
                }) : c.c.call(c.s || d))
        };
        var O = p.requestAnimationFrame,
            k = p.cancelAnimationFrame,
            W = Date.now || function() {
                return (new Date).getTime()
            }, Q = W();
        y = ["ms", "moz", "webkit", "o"];
        for (m = y.length; - 1 < --m && !O;) O = p[y[m] + "RequestAnimationFrame"], k = p[y[m] + "CancelAnimationFrame"] || p[y[m] + "CancelRequestAnimationFrame"];
        e("Ticker", function(a, b) {
            var d, c, e, g, h, f = this,
                n = W(),
                m = !1 !== b && O,
                p = 500,
                q = 33,
                v = function(a) {
                    var b, l;
                    b = W() - Q;
                    b > p && (n += b - q);
                    Q += b;
                    f.time = (Q - n) / 1E3;
                    b = f.time - h;
                    (!d || 0 < b || !0 === a) && (f.frame++, h += b + (b >= g ? .004 : g - b), l = !0);
                    !0 !== a && (e = c(v));
                    l && f.dispatchEvent("tick")
                };
            Y.call(f);
            f.time = f.frame = 0;
            f.tick = function() {
                v(!0)
            };
            f.lagSmoothing = function(a, b) {
                p = a || 1E10;
                q = Math.min(b, p, 0)
            };
            f.sleep = function() {
                null != e && (m && k ? k(e) : clearTimeout(e), c = t, e = null, f === u && (w = !1))
            };
            f.wake = function() {
                null !== e ? f.sleep() : 10 < f.frame && (Q = W() - p + 5);
                c = 0 === d ? t : m && O ? O : function(a) {
                    return setTimeout(a, 0 | 1E3 * (h - f.time) + 1)
                };
                f === u && (w = !0);
                v(2)
            };
            f.fps = function(a) {
                return arguments.length ? (d = a, g = 1 / (d || 60), h = this.time + g, f.wake(), void 0) : d
            };
            f.useRAF = function(a) {
                return arguments.length ? (f.sleep(), m = a, f.fps(d), void 0) : m
            };
            f.fps(a);
            setTimeout(function() {
                m && (!e || 5 > f.frame) && f.useRAF(!1)
            }, 1500)
        });
        f = q.Ticker.prototype = new q.events.EventDispatcher;
        f.constructor = q.Ticker;
        var I = e("core.Animation", function(b, c) {
            if (this.vars = c = c || {}, this._duration = this._totalDuration = b || 0, this._delay = Number(c.delay) || 0, this._timeScale = 1, this._active = !0 === c.immediateRender, this.data = c.data, this._reversed = !0 === c.reversed, A) {
                w || u.wake();
                var d = this.vars.useFrames ? a : A;
                d.add(this, d._time);
                this.vars.paused && this.paused(!0)
            }
        });
        u = I.ticker = new q.Ticker;
        f = I.prototype;
        f._dirty = f._gc = f._initted = f._paused = !1;
        f._totalTime = f._time = 0;
        f._rawPrevTime = -1;
        f._next = f._last = f._onUpdate = f._timeline = f.timeline = null;
        f._paused = !1;
        var i = function() {
            w && 2E3 < W() - Q && u.wake();
            setTimeout(i, 2E3)
        };
        i();
        f.play = function(a, b) {
            return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
        };
        f.pause = function(a, b) {
            return null != a && this.seek(a, b), this.paused(!0)
        };
        f.resume = function(a, b) {
            return null != a && this.seek(a, b), this.paused(!1)
        };
        f.seek = function(a, b) {
            return this.totalTime(Number(a), !1 !== b)
        };
        f.restart = function(a, b) {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, !1 !== b, !0)
        };
        f.reverse = function(a, b) {
            return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
        };
        f.render = function() {};
        f.invalidate = function() {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        };
        f.isActive = function() {
            var a, b = this._timeline,
                d = this._startTime;
            return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= d && d + this.totalDuration() / this._timeScale > a
        };
        f._enabled = function(a, b) {
            return w || u.wake(), this._gc = !a, this._active = this.isActive(), !0 !== b && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
        };
        f._kill = function() {
            return this._enabled(!1, !1)
        };
        f.kill = function(a, b) {
            return this._kill(a, b), this
        };
        f._uncache = function(a) {
            for (a = a ? this : this.timeline; a;) a._dirty = !0, a = a.timeline;
            return this
        };
        f._swapSelfInParams = function(a) {
            for (var b = a.length, d = a.concat(); - 1 < --b;) "{self}" === a[b] && (d[b] = this);
            return d
        };
        f.eventCallback = function(a, b, d, c) {
            if ("on" === (a || "").substr(0, 2)) {
                var e = this.vars;
                if (1 === arguments.length) return e[a];
                null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = x(d) && -1 !== d.join("").indexOf("{self}") ? this._swapSelfInParams(d) : d, e[a + "Scope"] = c);
                "onUpdate" === a && (this._onUpdate = b)
            }
            return this
        };
        f.delay = function(a) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
        };
        f.duration = function(a) {
            return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== a && this.totalTime(a / this._duration * this._totalTime, !0), this) : (this._dirty = !1, this._duration)
        };
        f.totalDuration = function(a) {
            return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
        };
        f.time = function(a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        };
        f.totalTime = function(a, b, d) {
            if (w || u.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > a && !d && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var c = this._totalDuration,
                        e = this._timeline;
                    if (a > c && !d && (a = c), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? c - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                        for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                }
                this._gc && this._enabled(!0, !1);
                (this._totalTime !== a || 0 === this._duration) && (this.render(a, b, !1), U.length && M())
            }
            return this
        };
        f.progress = f.totalProgress = function(a, b) {
            return arguments.length ? this.totalTime(this.duration() * a, b) : this._time / this.duration()
        };
        f.startTime = function(a) {
            return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
        };
        f.endTime = function(a) {
            return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        };
        f.timeScale = function(a) {
            if (!arguments.length) return this._timeScale;
            if (a = a || 1E-10, this._timeline && this._timeline.smoothChildTiming) {
                var b = this._pauseTime,
                    b = b || 0 === b ? b : this._timeline.totalTime();
                this._startTime = b - (b - this._startTime) * this._timeScale / a
            }
            return this._timeScale = a, this._uncache(!1)
        };
        f.reversed = function(a) {
            return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        };
        f.paused = function(a) {
            if (!arguments.length) return this._paused;
            if (a != this._paused && this._timeline) {
                w || a || u.wake();
                var b = this._timeline,
                    d = b.rawTime(),
                    c = d - this._pauseTime;
                !a && b.smoothChildTiming && (this._startTime += c, this._uncache(!1));
                this._pauseTime = a ? d : null;
                this._paused = a;
                this._active = this.isActive();
                !a && 0 !== c && this._initted && this.duration() && this.render(b.smoothChildTiming ? this._totalTime : (d - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !a && this._enabled(!0, !1), this
        };
        y = e("core.SimpleTimeline", function(a) {
            I.call(this, 0, a);
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        f = y.prototype = new I;
        f.constructor = y;
        f.kill()._gc = !1;
        f._first = f._last = f._recent = null;
        f._sortChildren = !1;
        f.add = f.insert = function(a, b) {
            var d, c;
            if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), d = this._last, this._sortChildren)
                for (c = a._startTime; d && d._startTime > c;) d = d._prev;
            return d ? (a._next = d._next, d._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = d, this._recent = a, this._timeline && this._uncache(!0), this
        };
        f._remove = function(a, b) {
            return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        };
        f.render = function(a, b, d) {
            var c, e = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = a; e;) c = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, d) : e.render((a - e._startTime) * e._timeScale, b, d)), e = c
        };
        f.rawTime = function() {
            return w || u.wake(), this._totalTime
        };
        var B = e("TweenLite", function(a, b, d) {
            if (I.call(this, b, d), this.render = B.prototype.render, null == a) throw "Cannot tween a null target.";
            this.target = a = "string" != typeof a ? a : B.selector(a) || a;
            var c, e;
            c = a.jquery || a.length && a !== p && a[0] && (a[0] === p || a[0].nodeType && a[0].style && !a.nodeType);
            d = this.vars.overwrite;
            if (this._overwrite = d = null == d ? da[B.defaultOverwrite] : "number" == typeof d ? d >> 0 : da[d], (c || a instanceof Array || a.push && x(a)) && "number" != typeof a[0])
                for (this._targets = e = K(a), this._propLookup = [], this._siblings = [], a = 0; e.length > a; a++)(c = e[a]) ? "string" != typeof c ? c.length && c !== p && c[0] && (c[0] === p || c[0].nodeType && c[0].style && !c.nodeType) ? (e.splice(a--, 1), this._targets = e = e.concat(K(c))) : (this._siblings[a] = V(c, this, !1), 1 === d && 1 < this._siblings[a].length && ma(c, this, null, 1, this._siblings[a])) : (c = e[a--] = B.selector(c), "string" == typeof c && e.splice(a + 1, 1)) : e.splice(a--, 1);
            else this._propLookup = {}, this._siblings = V(a, this, !1), 1 === d && 1 < this._siblings.length && ma(a, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === b && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1E-10, this.render(-this._delay))
        }, !0),
            fa = function(a) {
                return a && a.length && a !== p && a[0] && (a[0] === p || a[0].nodeType && a[0].style && !a.nodeType)
            };
        f = B.prototype = new I;
        f.constructor = B;
        f.kill()._gc = !1;
        f.ratio = 0;
        f._firstPT = f._targets = f._overwrittenProps = f._startAt = null;
        f._notifyPluginsOfEnabled = f._lazy = !1;
        B.version = "1.15.0";
        B.defaultEase = f._ease = new h(null, null, 1, 1);
        B.defaultOverwrite = "auto";
        B.ticker = u;
        B.autoSleep = !0;
        B.lagSmoothing = function(a, b) {
            u.lagSmoothing(a, b)
        };
        B.selector = p.$ || p.jQuery || function(a) {
            var b = p.$ || p.jQuery;
            return b ? (B.selector = b, b(a)) : "undefined" == typeof document ? a : document.querySelectorAll ? document.querySelectorAll(a) : document.getElementById("#" === a.charAt(0) ? a.substr(1) : a)
        };
        var U = [],
            R = {};
        m = B._internals = {
            isArray: x,
            isSelector: fa,
            lazyTweens: U
        };
        var L = B._plugins = {}, N = m.tweenLookup = {}, ka = 0,
            H = m.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1
            }, da = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            }, a = I._rootFramesTimeline = new y,
            A = I._rootTimeline = new y,
            M = m.lazyRender = function() {
                var a, b = U.length;
                for (R = {}; - 1 < --b;)(a = U[b]) && !1 !== a._lazy && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                U.length = 0
            };
        A._startTime = u.time;
        a._startTime = u.frame;
        A._active = a._active = !0;
        setTimeout(M, 1);
        I._updateRoot = B.render = function() {
            var b, c, d;
            if (U.length && M(), A.render((u.time - A._startTime) * A._timeScale, !1, !1), a.render((u.frame - a._startTime) * a._timeScale, !1, !1), U.length && M(), !(u.frame % 120)) {
                for (d in N) {
                    c = N[d].tweens;
                    for (b = c.length; - 1 < --b;) c[b]._gc && c.splice(b, 1);
                    0 === c.length && delete N[d]
                }
                if (d = A._first, (!d || d._paused) && B.autoSleep && !a._first && 1 === u._listeners.tick.length) {
                    for (; d && d._paused;) d = d._next;
                    d || u.sleep()
                }
            }
        };
        u.addEventListener("tick", I._updateRoot);
        var V = function(a, b, d) {
            var c, e, g = a._gsTweenID;
            if (N[g || (a._gsTweenID = g = "t" + ka++)] || (N[g] = {
                target: a,
                tweens: []
            }), b && (c = N[g].tweens, c[e = c.length] = b, d))
                for (; - 1 < --e;) c[e] === b && c.splice(e, 1);
            return N[g].tweens
        }, Z = function(a, b, d, c) {
                var e, g, h = a.vars.onOverwrite;
                return h && (e = h(a, b, d, c)), h = B.onOverwrite, h && (g = h(a, b, d, c)), !1 !== e && !1 !== g
            }, ma = function(a, b, d, c, e) {
                var g, h, f;
                if (1 === c || 4 <= c) {
                    a = e.length;
                    for (g = 0; a > g; g++)
                        if ((f = e[g]) !== b) f._gc || Z(f, b) && f._enabled(!1, !1) && (h = !0);
                        else if (5 === c) break;
                    return h
                }
                var k, n = b._startTime + 1E-10,
                    m = [],
                    p = 0,
                    q = 0 === b._duration;
                for (g = e.length; - 1 < --g;)(f = e[g]) === b || f._gc || f._paused || (f._timeline !== b._timeline ? (k = k || F(b, 0, q), 0 === F(f, k, q) && (m[p++] = f)) : n >= f._startTime && f._startTime + f.totalDuration() / f._timeScale > n && ((q || !f._initted) && 2E-10 >= n - f._startTime || (m[p++] = f)));
                for (g = p; - 1 < --g;)(f = m[g], 2 === c && f._kill(d, a, b) && (h = !0), 2 !== c || !f._firstPT && f._initted) && (2 === c || Z(f, b)) && f._enabled(!1, !1) && (h = !0);
                return h
            }, F = function(a, b, d) {
                for (var c = a._timeline, e = c._timeScale, g = a._startTime; c._timeline;) {
                    if (g += c._startTime, e *= c._timeScale, c._paused) return -100;
                    c = c._timeline
                }
                return g /= e, g > b ? g - b : d && g === b || !a._initted && 2E-10 > g - b ? 1E-10 : (g += a.totalDuration() / a._timeScale / e) > b + 1E-10 ? 0 : g - b - 1E-10
            };
        f._init = function() {
            var a, b, d, c = this.vars,
                e = this._overwrittenProps,
                g = this._duration,
                f = !! c.immediateRender,
                k = c.ease;
            if (c.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill());
                d = {};
                for (a in c.startAt) d[a] = c.startAt[a];
                if (d.overwrite = !1, d.immediateRender = !0, d.lazy = f && !1 !== c.lazy, d.startAt = d.delay = null, this._startAt = B.to(this.target, 0, d), f)
                    if (0 < this._time) this._startAt = null;
                    else if (0 !== g) return
            } else if (c.runBackwards && 0 !== g)
                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                else {
                    0 !== this._time && (f = !1);
                    d = {};
                    for (a in c) H[a] && "autoCSS" !== a || (d[a] = c[a]);
                    if (d.overwrite = 0, d.data = "isFromStart", d.lazy = f && !1 !== c.lazy, d.immediateRender = f, this._startAt = B.to(this.target, 0, d), f) {
                        if (0 === this._time) return
                    } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = k = k ? k instanceof h ? k : "function" == typeof k ? new h(k, c.easeParams) : J[k] || B.defaultEase : B.defaultEase, c.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, c.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (a = this._targets.length; - 1 < --a;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], e ? e[a] : null) && (b = !0);
            else b = this._initProps(this.target, this._propLookup, this._siblings, e); if (b && B._onPluginEvent("_onInitAllProps", this), e && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), c.runBackwards)
                for (d = this._firstPT; d;) d.s += d.c, d.c = -d.c, d = d._next;
            this._onUpdate = c.onUpdate;
            this._initted = !0
        };
        f._initProps = function(a, b, d, c) {
            var e, g, h, f, k;
            if (null == a) return !1;
            R[a._gsTweenID] && M();
            if (!this.vars.css && a.style && a !== p && a.nodeType && L.css && !1 !== this.vars.autoCSS) {
                g = this.vars;
                var n, m = {};
                for (n in g) H[n] || n in a && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!L[n] || L[n] && L[n]._autoCSS) || (m[n] = g[n], delete g[n]);
                g.css = m
            }
            for (e in this.vars) {
                if (g = this.vars[e], H[e]) g && (g instanceof Array || g.push && x(g)) && -1 !== g.join("").indexOf("{self}") && (this.vars[e] = this._swapSelfInParams(g, this));
                else if (L[e] && (f = new L[e])._onInitTween(a, this.vars[e], this)) {
                    this._firstPT = k = {
                        _next: this._firstPT,
                        t: f,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: e,
                        pg: !0,
                        pr: f._priority
                    };
                    for (g = f._overwriteProps.length; - 1 < --g;) b[f._overwriteProps[g]] = this._firstPT;
                    (f._priority || f._onInitAllProps) && (h = !0);
                    (f._onDisable || f._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = b[e] = k = {
                    _next: this._firstPT,
                    t: a,
                    p: e,
                    f: "function" == typeof a[e],
                    n: e,
                    pg: !1,
                    pr: 0
                }, k.s = k.f ? a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]() : parseFloat(a[e]), k.c = "string" == typeof g && "=" === g.charAt(1) ? parseInt(g.charAt(0) + "1", 10) * Number(g.substr(2)) : Number(g) - k.s || 0;
                k && k._next && (k._next._prev = k)
            }
            return c && this._kill(c, a) ? this._initProps(a, b, d, c) : 1 < this._overwrite && this._firstPT && 1 < d.length && ma(a, this, b, this._overwrite, d) ? (this._kill(b, a), this._initProps(a, b, d, c)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (R[a._gsTweenID] = !0), h)
        };
        f.render = function(a, b, d) {
            var c, e, g, h, f = this._time,
                k = this._duration;
            g = this._rawPrevTime;
            if (a >= k) this._totalTime = this._time = k, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (c = !0, e = "onComplete"), 0 === k && (this._initted || !this.vars.lazy || d) && (this._startTime === this._timeline._duration && (a = 0), (0 === a || 0 > g || 1E-10 === g && "isPause" !== this.data) && g !== a && (d = !0, 1E-10 < g && (e = "onReverseComplete")), this._rawPrevTime = h = !b || a || g === a ? a : 1E-10);
            else if (1E-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== f || 0 === k && 0 < g && 1E-10 !== g) && (e = "onReverseComplete", c = this._reversed), 0 > a && (this._active = !1, 0 === k && (this._initted || !this.vars.lazy || d) && (0 <= g && (1E-10 !== g || "isPause" !== this.data) && (d = !0), this._rawPrevTime = h = !b || a || g === a ? a : 1E-10)), this._initted || (d = !0);
            else if (this._totalTime = this._time = a, this._easeType) {
                var m = a / k,
                    p = this._easeType,
                    q = this._easePower;
                (1 === p || 3 === p && .5 <= m) && (m = 1 - m);
                3 === p && (m *= 2);
                1 === q ? m *= m : 2 === q ? m *= m * m : 3 === q ? m *= m * m * m : 4 === q && (m *= m * m * m * m);
                this.ratio = 1 === p ? 1 - m : 2 === p ? m : .5 > a / k ? m / 2 : 1 - m / 2
            } else this.ratio = this._ease.getRatio(a / k); if (this._time !== f || d) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!d && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = f, this._rawPrevTime = g, U.push(this), this._lazy = [a, b], void 0;
                    this._time && !c ? this.ratio = this._ease.getRatio(this._time / k) : c && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }!1 !== this._lazy && (this._lazy = !1);
                this._active || !this._paused && this._time !== f && 0 <= a && (this._active = !0);
                0 !== f || (this._startAt && (0 <= a ? this._startAt.render(a, b, d) : e || (e = "_dummyGS")), !this.vars.onStart || 0 === this._time && 0 !== k || !b && this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n));
                for (g = this._firstPT; g;) g.f ? g.t[g.p](g.c * this.ratio + g.s) : g.t[g.p] = g.c * this.ratio + g.s, g = g._next;
                this._onUpdate && (0 > a && this._startAt && -1E-4 !== a && this._startAt.render(a, b, d), b || (this._time !== f || c) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n));
                e && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate && -1E-4 !== a && this._startAt.render(a, b, d), c && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || n), 0 === k && 1E-10 === this._rawPrevTime && 1E-10 !== h && (this._rawPrevTime = 0))
            }
        };
        f._kill = function(a, b, d) {
            if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            b = "string" != typeof b ? b || this._targets || this.target : B.selector(b) || b;
            var c, e, g, h, f, k, n;
            if ((x(b) || fa(b)) && "number" != typeof b[0])
                for (c = b.length; - 1 < --c;) this._kill(a, b[c]) && (k = !0);
            else {
                if (this._targets)
                    for (c = this._targets.length; - 1 < --c;) {
                        if (b === this._targets[c]) {
                            f = this._propLookup[c] || {};
                            this._overwrittenProps = this._overwrittenProps || [];
                            e = this._overwrittenProps[c] = a ? this._overwrittenProps[c] || {} : "all";
                            break
                        }
                    } else {
                        if (b !== this.target) return !1;
                        f = this._propLookup;
                        e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    } if (f) {
                        if (c = a || f, a = a !== e && "all" !== e && a !== f && ("object" != typeof a || !a._tempKill), d && (B.onOverwrite || this.vars.onOverwrite)) {
                            for (g in c) f[g] && (n || (n = []), n.push(g));
                            if (!Z(this, d, b, n)) return !1
                        }
                        for (g in c)(h = f[g]) && (h.pg && h.t._kill(c) && (k = !0), h.pg && 0 !== h.t._overwriteProps.length || (h._prev ? h._prev._next = h._next : h === this._firstPT && (this._firstPT = h._next), h._next && (h._next._prev = h._prev), h._next = h._prev = null), delete f[g]), a && (e[g] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
            }
            return k
        };
        f.invalidate = function() {
            return this._notifyPluginsOfEnabled && B._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], I.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -1E-10, this.render(-this._delay)), this
        };
        f._enabled = function(a, b) {
            if (w || u.wake(), a && this._gc) {
                var d, c = this._targets;
                if (c)
                    for (d = c.length; - 1 < --d;) this._siblings[d] = V(c[d], this, !0);
                else this._siblings = V(this.target, this, !0)
            }
            return I.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? B._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
        };
        B.to = function(a, b, c) {
            return new B(a, b, c)
        };
        B.from = function(a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new B(a, b, c)
        };
        B.fromTo = function(a, b, c, e) {
            return e.startAt = c, e.immediateRender = 0 != e.immediateRender && 0 != c.immediateRender, new B(a, b, e)
        };
        B.delayedCall = function(a, b, c, e, g) {
            return new B(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                onCompleteScope: e,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                onReverseCompleteScope: e,
                immediateRender: !1,
                lazy: !1,
                useFrames: g,
                overwrite: 0
            })
        };
        B.set = function(a, b) {
            return new B(a, 0, b)
        };
        B.getTweensOf = function(a, b) {
            if (null == a) return [];
            a = "string" != typeof a ? a : B.selector(a) || a;
            var c, e, g, h;
            if ((x(a) || fa(a)) && "number" != typeof a[0]) {
                c = a.length;
                for (e = []; - 1 < --c;) e = e.concat(B.getTweensOf(a[c], b));
                for (c = e.length; - 1 < --c;)
                    for (h = e[c], g = c; - 1 < --g;) h === e[g] && e.splice(c, 1)
            } else
                for (e = V(a).concat(), c = e.length; - 1 < --c;)(e[c]._gc || b && !e[c].isActive()) && e.splice(c, 1);
            return e
        };
        B.killTweensOf = B.killDelayedCallsTo = function(a, b, c) {
            "object" == typeof b && (c = b, b = !1);
            b = B.getTweensOf(a, b);
            for (var e = b.length; - 1 < --e;) b[e]._kill(c, a)
        };
        var X = e("plugins.TweenPlugin", function(a, b) {
            this._overwriteProps = (a || "").split(",");
            this._propName = this._overwriteProps[0];
            this._priority = b || 0;
            this._super = X.prototype
        }, !0);
        if (f = X.prototype, X.version = "1.10.1", X.API = 2, f._firstPT = null, f._addTween = function(a, b, c, e, g, h) {
            var f, k;
            return null != e && (f = "number" == typeof e || "=" !== e.charAt(1) ? Number(e) - c : parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2))) ? (this._firstPT = k = {
                _next: this._firstPT,
                t: a,
                p: b,
                s: c,
                c: f,
                f: "function" == typeof a[b],
                n: g || b,
                r: h
            }, k._next && (k._next._prev = k), k) : void 0
        }, f.setRatio = function(a) {
            for (var b, c = this._firstPT; c;) b = c.c * a + c.s, c.r ? b = Math.round(b) : 1E-6 > b && -1E-6 < b && (b = 0), c.f ? c.t[c.p](b) : c.t[c.p] = b, c = c._next
        }, f._kill = function(a) {
            var b, c = this._overwriteProps,
                e = this._firstPT;
            if (null != a[this._propName]) this._overwriteProps = [];
            else
                for (b = c.length; - 1 < --b;) null != a[c[b]] && c.splice(b, 1);
            for (; e;) null != a[e.n] && (e._next && (e._next._prev = e._prev), e._prev ? (e._prev._next = e._next, e._prev = null) : this._firstPT === e && (this._firstPT = e._next)), e = e._next;
            return !1
        }, f._roundProps = function(a, b) {
            for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
        }, B._onPluginEvent = function(a, b) {
            var c, e, g, h, f, k = b._firstPT;
            if ("_onInitAllProps" === a) {
                for (; k;) {
                    f = k._next;
                    for (e = g; e && e.pr > k.pr;) e = e._next;
                    (k._prev = e ? e._prev : h) ? k._prev._next = k : g = k;
                    (k._next = e) ? e._prev = k : h = k;
                    k = f
                }
                k = b._firstPT = g
            }
            for (; k;) k.pg && "function" == typeof k.t[a] && k.t[a]() && (c = !0), k = k._next;
            return c
        }, X.activate = function(a) {
            for (var b = a.length; - 1 < --b;) a[b].API === X.API && (L[(new a[b])._propName] = a[b]);
            return !0
        }, b.plugin = function(a) {
            if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
            var b, c = a.propName,
                g = a.priority || 0,
                h = a.overwriteProps,
                k = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, f = e("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                    X.call(this, c, g);
                    this._overwriteProps = h || []
                }, !0 === a.global),
                n = f.prototype = new X(c);
            n.constructor = f;
            f.API = a.API;
            for (b in k) "function" == typeof a[b] && (n[k[b]] = a[b]);
            return f.version = a.version, X.activate([f]), f
        }, y = p._gsQueue) {
            for (m = 0; y.length > m; m++) y[m]();
            for (f in v) v[f].func || p.console.log("GSAP encountered missing dependency: com.greensock." + f)
        }
        w = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");

var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(p, E, C) {
        var y = function(c) {
            E.call(this, c);
            this._labels = {};
            this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren;
            this.smoothChildTiming = !0 === this.vars.smoothChildTiming;
            this._sortChildren = !0;
            this._onUpdate = this.vars.onUpdate;
            var b, e = this.vars;
            for (b in e) c = e[b], u(c) && -1 !== c.join("").indexOf("{self}") && (e[b] = this._swapSelfInParams(c));
            u(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
        }, m = C._internals,
            f = m.isSelector,
            u = m.isArray,
            w = m.lazyTweens,
            z = m.lazyRender,
            q = [],
            K = _gsScope._gsDefine.globals,
            t = function(c) {
                var b, e = {};
                for (b in c) e[b] = c[b];
                return e
            }, x = function(c, b, e, g) {
                var f = c._timeline,
                    h = f._totalTime;
                !b && this._forcingPlayhead || f._rawPrevTime === c._startTime || (f.pause(c._startTime), b && b.apply(g || f, e || q), this._forcingPlayhead && f.seek(h))
            }, v = function(c) {
                var b, e = [],
                    g = c.length;
                for (b = 0; b !== g; e.push(c[b++]));
                return e
            }, m = y.prototype = new E;
        return y.version = "1.15.0", m.constructor = y, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(c, b, e, g) {
            var f = e.repeat && K.TweenMax || C;
            return b ? this.add(new f(c, b, e), g) : this.set(c, e, g)
        }, m.from = function(c, b, e, g) {
            return this.add((e.repeat && K.TweenMax || C).from(c, b, e), g)
        }, m.fromTo = function(c, b, e, g, f) {
            var h = g.repeat && K.TweenMax || C;
            return b ? this.add(h.fromTo(c, b, e, g), f) : this.set(c, g, f)
        }, m.staggerTo = function(c, b, e, g, n, h, m, p) {
            m = new y({
                onComplete: h,
                onCompleteParams: m,
                onCompleteScope: p,
                smoothChildTiming: this.smoothChildTiming
            });
            "string" == typeof c && (c = C.selector(c) || c);
            c = c || [];
            f(c) && (c = v(c));
            g = g || 0;
            0 > g && (c = v(c), c.reverse(), g *= -1);
            for (h = 0; c.length > h; h++) e.startAt && (e.startAt = t(e.startAt)), m.to(c[h], b, t(e), h * g);
            return this.add(m, n)
        }, m.staggerFrom = function(c, b, e, g, f, h, m, p) {
            return e.immediateRender = 0 != e.immediateRender, e.runBackwards = !0, this.staggerTo(c, b, e, g, f, h, m, p)
        }, m.staggerFromTo = function(c, b, e, g, f, h, m, p, q) {
            return g.startAt = e, g.immediateRender = 0 != g.immediateRender && 0 != e.immediateRender, this.staggerTo(c, b, g, f, h, m, p, q)
        }, m.call = function(c, b, e, g) {
            return this.add(C.delayedCall(0, c, b, e), g)
        }, m.set = function(c, b, e) {
            return e = this._parseTimeOrLabel(e, 0, !0), null == b.immediateRender && (b.immediateRender = e === this._time && !this._paused), this.add(new C(c, 0, b), e)
        }, y.exportRoot = function(c, b) {
            c = c || {};
            null == c.smoothChildTiming && (c.smoothChildTiming = !0);
            var e, g, f = new y(c),
                h = f._timeline;
            null == b && (b = !0);
            h._remove(f, !0);
            f._startTime = 0;
            f._rawPrevTime = f._time = f._totalTime = h._time;
            for (e = h._first; e;) g = e._next, b && e instanceof C && e.target === e.vars.onComplete || f.add(e, e._startTime - e._delay), e = g;
            return h.add(f, 0), f
        }, m.add = function(c, b, e, g) {
            var f, h, m;
            if ("number" != typeof b && (b = this._parseTimeOrLabel(b, 0, !0, c)), !(c instanceof p)) {
                if (c instanceof Array || c && c.push && u(c)) {
                    e = e || "normal";
                    g = g || 0;
                    f = c.length;
                    for (h = 0; f > h; h++) u(m = c[h]) && (m = new y({
                        tweens: m
                    })), this.add(m, b), "string" != typeof m && "function" != typeof m && ("sequence" === e ? b = m._startTime + m.totalDuration() / m._timeScale : "start" === e && (m._startTime -= m.delay())), b += g;
                    return this._uncache(!0)
                }
                if ("string" == typeof c) return this.addLabel(c, b);
                if ("function" != typeof c) throw "Cannot add " + c + " into the timeline; it is not a tween, timeline, function, or string.";
                c = C.delayedCall(0, c)
            }
            if (E.prototype.add.call(this, c, b), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (e = this, c = e.rawTime() > c._startTime; e._timeline;) c && e._timeline.smoothChildTiming ? e.totalTime(e._totalTime, !0) : e._gc && e._enabled(!0, !1), e = e._timeline;
            return this
        }, m.remove = function(c) {
            if (c instanceof p) return this._remove(c, !1);
            if (c instanceof Array || c && c.push && u(c)) {
                for (var b = c.length; - 1 < --b;) this.remove(c[b]);
                return this
            }
            return "string" == typeof c ? this.removeLabel(c) : this.kill(null, c)
        }, m._remove = function(c, b) {
            E.prototype._remove.call(this, c, b);
            var e = this._last;
            return e ? this._time > e._startTime + e._totalDuration / e._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, m.append = function(c, b) {
            return this.add(c, this._parseTimeOrLabel(null, b, !0, c))
        }, m.insert = m.insertMultiple = function(c, b, e, g) {
            return this.add(c, b || 0, e, g)
        }, m.appendMultiple = function(c, b, e, g) {
            return this.add(c, this._parseTimeOrLabel(null, b, !0, c), e, g)
        }, m.addLabel = function(c, b) {
            return this._labels[c] = this._parseTimeOrLabel(b), this
        }, m.addPause = function(c, b, e, g) {
            b = C.delayedCall(0, x, ["{self}", b, e, g], this);
            return b.data = "isPause", this.add(b, c)
        }, m.removeLabel = function(c) {
            return delete this._labels[c], this
        }, m.getLabelTime = function(c) {
            return null != this._labels[c] ? this._labels[c] : -1
        }, m._parseTimeOrLabel = function(c, b, e, g) {
            var f;
            if (g instanceof p && g.timeline === this) this.remove(g);
            else if (g && (g instanceof Array || g.push && u(g)))
                for (f = g.length; - 1 < --f;) g[f] instanceof p && g[f].timeline === this && this.remove(g[f]);
            if ("string" == typeof b) return this._parseTimeOrLabel(b, e && "number" == typeof c && null == this._labels[b] ? c - this.duration() : 0, e);
            if (b = b || 0, "string" != typeof c || !isNaN(c) && null == this._labels[c]) null == c && (c = this.duration());
            else {
                if (f = c.indexOf("="), -1 === f) return null == this._labels[c] ? e ? this._labels[c] = this.duration() + b : b : this._labels[c] + b;
                b = parseInt(c.charAt(f - 1) + "1", 10) * Number(c.substr(f + 1));
                c = 1 < f ? this._parseTimeOrLabel(c.substr(0, f - 1), 0, e) : this.duration()
            }
            return Number(c) + b
        }, m.seek = function(c, b) {
            return this.totalTime("number" == typeof c ? c : this._parseTimeOrLabel(c), !1 !== b)
        }, m.stop = function() {
            return this.paused(!0)
        }, m.gotoAndPlay = function(c, b) {
            return this.play(c, b)
        }, m.gotoAndStop = function(c, b) {
            return this.pause(c, b)
        }, m.render = function(c, b, e) {
            this._gc && this._enabled(!0, !1);
            var g, f, h, m, p = this._dirty ? this.totalDuration() : this._totalDuration,
                u = this._time,
                v = this._startTime,
                k = this._timeScale,
                t = this._paused;
            if (c >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (f = !0, m = "onComplete", 0 === this._duration && (0 === c || 0 > this._rawPrevTime || 1E-10 === this._rawPrevTime) && this._rawPrevTime !== c && this._first && (g = !0, 1E-10 < this._rawPrevTime && (m = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || c || this._rawPrevTime === c ? c : 1E-10, c = p + 1E-4) : 1E-7 > c ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && 1E-10 !== this._rawPrevTime && (0 < this._rawPrevTime || 0 > c && 0 <= this._rawPrevTime)) && (m = "onReverseComplete", f = this._reversed), 0 > c ? (this._active = !1, 0 <= this._rawPrevTime && this._first && (g = !0), this._rawPrevTime = c) : (this._rawPrevTime = this._duration || !b || c || this._rawPrevTime === c ? c : 1E-10, c = 0, this._initted || (g = !0))) : this._totalTime = this._time = this._rawPrevTime = c, this._time !== u && this._first || e || g) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && 0 < c && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || q)), this._time >= u)
                    for (g = this._first; g && (h = g._next, !this._paused || t);)(g._active || g._startTime <= this._time && !g._paused && !g._gc) && (g._reversed ? g.render((g._dirty ? g.totalDuration() : g._totalDuration) - (c - g._startTime) * g._timeScale, b, e) : g.render((c - g._startTime) * g._timeScale, b, e)), g = h;
                else
                    for (g = this._last; g && (h = g._prev, !this._paused || t);)(g._active || u >= g._startTime && !g._paused && !g._gc) && (g._reversed ? g.render((g._dirty ? g.totalDuration() : g._totalDuration) - (c - g._startTime) * g._timeScale, b, e) : g.render((c - g._startTime) * g._timeScale, b, e)), g = h;
                this._onUpdate && (b || (w.length && z(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || q)));
                m && (this._gc || (v === this._startTime || k !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (f && (w.length && z(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[m] && this.vars[m].apply(this.vars[m + "Scope"] || this, this.vars[m + "Params"] || q)))
            }
        }, m._hasPausedChild = function() {
            for (var c = this._first; c;) {
                if (c._paused || c instanceof y && c._hasPausedChild()) return !0;
                c = c._next
            }
            return !1
        }, m.getChildren = function(c, b, e, g) {
            g = g || -9999999999;
            for (var f = [], h = this._first, m = 0; h;) g > h._startTime || (h instanceof C ? !1 !== b && (f[m++] = h) : (!1 !== e && (f[m++] = h), !1 !== c && (f = f.concat(h.getChildren(!0, b, e)), m = f.length))), h = h._next;
            return f
        }, m.getTweensOf = function(c, b) {
            var e, g, f = this._gc,
                h = [],
                m = 0;
            f && this._enabled(!0, !0);
            e = C.getTweensOf(c);
            for (g = e.length; - 1 < --g;)(e[g].timeline === this || b && this._contains(e[g])) && (h[m++] = e[g]);
            return f && this._enabled(!1, !0), h
        }, m.recent = function() {
            return this._recent
        }, m._contains = function(c) {
            for (c = c.timeline; c;) {
                if (c === this) return !0;
                c = c.timeline
            }
            return !1
        }, m.shiftChildren = function(c, b, e) {
            e = e || 0;
            for (var g, f = this._first, h = this._labels; f;) f._startTime >= e && (f._startTime += c), f = f._next;
            if (b)
                for (g in h) h[g] >= e && (h[g] += c);
            return this._uncache(!0)
        }, m._kill = function(c, b) {
            if (!c && !b) return this._enabled(!1, !1);
            for (var e = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), g = e.length, f = !1; - 1 < --g;) e[g]._kill(c, b) && (f = !0);
            return f
        }, m.clear = function(c) {
            var b = this.getChildren(!1, !0, !0),
                e = b.length;
            for (this._time = this._totalTime = 0; - 1 < --e;) b[e]._enabled(!1, !1);
            return !1 !== c && (this._labels = {}), this._uncache(!0)
        }, m.invalidate = function() {
            for (var c = this._first; c;) c.invalidate(), c = c._next;
            return p.prototype.invalidate.call(this)
        }, m._enabled = function(c, b) {
            if (c === this._gc)
                for (var e = this._first; e;) e._enabled(c, !0), e = e._next;
            return E.prototype._enabled.call(this, c, b)
        }, m.totalTime = function() {
            this._forcingPlayhead = !0;
            var c = p.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, c
        }, m.duration = function(c) {
            return arguments.length ? (0 !== this.duration() && 0 !== c && this.timeScale(this._duration / c), this) : (this._dirty && this.totalDuration(), this._duration)
        }, m.totalDuration = function(c) {
            if (!arguments.length) {
                if (this._dirty) {
                    var b, e, g = 0;
                    e = this._last;
                    for (var f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, 0 > e._startTime && !e._paused && (g -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), e = e._startTime + e._totalDuration / e._timeScale, e > g && (g = e), e = b;
                    this._duration = this._totalDuration = g;
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== c && this.timeScale(this._totalDuration / c), this
        }, m.usesFrames = function() {
            for (var c = this._timeline; c._timeline;) c = c._timeline;
            return c === p._rootFramesTimeline
        }, m.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, y
    }, !0)
});

_gsScope._gsDefine && _gsScope._gsQueue.pop()();

(function(p) {
    var E = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[p]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], E) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = E())
})("TimelineLite");

_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(p, E) {
        var C, y, m, f, u = function() {
                p.call(this, "css");
                this._overwriteProps.length = 0;
                this.setRatio = u.prototype.setRatio
            }, w = _gsScope._gsDefine.globals,
            z = {}, q = u.prototype = new p("css");
        q.constructor = u;
        u.version = "1.15.0";
        u.API = 2;
        u.defaultTransformPerspective = 0;
        u.defaultSkewType = "compensated";
        q = "px";
        u.suffixMap = {
            top: q,
            right: q,
            bottom: q,
            left: q,
            width: q,
            height: q,
            fontSize: q,
            padding: q,
            margin: q,
            perspective: q,
            lineHeight: ""
        };
        var K, t, x, v, c, b, e = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            n = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            h = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            J = /(?:\d|\-|\+|=|#|\.)*/g,
            S = /opacity *= *([^)]*)/i,
            Y = /opacity:([^;]*)/i,
            O = /alpha\(opacity *=.+?\)/i,
            k = /^(rgb|hsl)/,
            W = /([A-Z])/g,
            Q = /-([a-z])/gi,
            I = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            ca = function(a, b) {
                return b.toUpperCase()
            }, B = /(?:Left|Right|Width)/i,
            fa = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            U = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            R = /,(?=[^\)]*(?:\(|$))/gi,
            L = Math.PI / 180,
            N = 180 / Math.PI,
            ka = {}, H = document,
            da = function(a) {
                return H.createElementNS ? H.createElementNS("http://www.w3.org/1999/xhtml", a) : H.createElement(a)
            }, a = da("div"),
            A = da("img"),
            M = u._internals = {
                _specialProps: z
            }, V = navigator.userAgent,
            Z = function() {
                var a = V.indexOf("Android"),
                    e = da("a");
                return x = -1 !== V.indexOf("Safari") && -1 === V.indexOf("Chrome") && (-1 === a || 3 < Number(V.substr(a + 8, 1))), c = x && 6 > Number(V.substr(V.indexOf("Version/") + 8, 1)), v = -1 !== V.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(V) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(V)) && (b = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
            }(),
            ma = function(a) {
                return S.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, F = "",
            X = "",
            l = function(b, c) {
                c = c || a;
                var e, d, va = c.style;
                if (void 0 !== va[b]) return b;
                b = b.charAt(0).toUpperCase() + b.substr(1);
                e = ["O", "Moz", "ms", "Ms", "Webkit"];
                for (d = 5; - 1 < --d && void 0 === va[e[d] + b];);
                return 0 <= d ? (X = 3 === d ? "ms" : e[d], F = "-" + X.toLowerCase() + "-", X + b) : null
            }, r = H.defaultView ? H.defaultView.getComputedStyle : function() {}, d = u.getStyle = function(a, b, c, e, d) {
                var g;
                return Z || "opacity" !== b ? (!e && a.style[b] ? g = a.style[b] : (c = c || r(a)) ? g = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(W, "-$1").toLowerCase()) : a.currentStyle && (g = a.currentStyle[b]), null == d || g && "none" !== g && "auto" !== g && "auto auto" !== g ? g : d) : ma(a)
            }, ja = M.convertToPixels = function(b, c, e, g, i) {
                if ("px" === g || !g) return e;
                if ("auto" === g || !e) return 0;
                var f, D, h, k = B.test(c),
                    m = b;
                f = a.style;
                var l = 0 > e;
                if (l && (e = -e), "%" === g && -1 !== c.indexOf("border")) f = e / 100 * (k ? b.clientWidth : b.clientHeight);
                else {
                    if (f.cssText = "border:0 solid red;position:" + d(b, "position") + ";line-height:0;", "%" !== g && m.appendChild) f[k ? "borderLeftWidth" : "borderTopWidth"] = e + g;
                    else {
                        if (m = b.parentNode || H.body, D = m._gsCache, h = E.ticker.frame, D && k && D.time === h) return D.width * e / 100;
                        f[k ? "width" : "height"] = e + g
                    }
                    m.appendChild(a);
                    f = parseFloat(a[k ? "offsetWidth" : "offsetHeight"]);
                    m.removeChild(a);
                    k && "%" === g && !1 !== u.cacheWidths && (D = m._gsCache = m._gsCache || {}, D.time = h, D.width = f / e * 100);
                    0 !== f || i || (f = ja(b, c, e, g, !0))
                }
                return l ? -f : f
            }, Fa = M.calculateOffset = function(a, b, c) {
                if ("absolute" !== d(a, "position", c)) return 0;
                var e = "left" === b ? "Left" : "Top";
                c = d(a, "margin" + e, c);
                return a["offset" + e] - (ja(a, b, parseFloat(c), c.replace(J, "")) || 0)
            }, pa = function(a, b) {
                var c, e, d = {};
                if (b = b || r(a, null))
                    if (c = b.length)
                        for (; - 1 < --c;) d[b[c].replace(Q, ca)] = b.getPropertyValue(b[c]);
                    else
                        for (c in b) d[c] = b[c];
                    else if (b = a.currentStyle || a.style)
                    for (c in b) "string" == typeof c && void 0 === d[c] && (d[c.replace(Q, ca)] = b[c]);
                return Z || (d.opacity = ma(a)), e = ra(a, b, !1), d.rotation = e.rotation, d.skewX = e.skewX, d.scaleX = e.scaleX, d.scaleY = e.scaleY, d.x = e.x, d.y = e.y, ia && (d.z = e.z, d.rotationX = e.rotationX, d.rotationY = e.rotationY, d.scaleZ = e.scaleZ), d.filters && delete d.filters, d
            }, aa = function(a, b, c, e, d) {
                var g, f, k, m = {}, l = a.style;
                for (f in c) "cssText" !== f && "length" !== f && isNaN(f) && (b[f] !== (g = c[f]) || d && d[f]) && -1 === f.indexOf("Origin") && ("number" == typeof g || "string" == typeof g) && (m[f] = "auto" !== g || "left" !== f && "top" !== f ? "" !== g && "auto" !== g && "none" !== g || "string" != typeof b[f] || "" === b[f].replace(h, "") ? g : 0 : Fa(a, f), void 0 !== l[f] && (k = new Aa(l, f, l[f], k)));
                if (e)
                    for (f in e) "className" !== f && (m[f] = e[f]);
                return {
                    difs: m,
                    firstMPT: k
                }
            }, Oa = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            }, Pa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            ua = function(a, b) {
                null != a && "" !== a && "auto" !== a && "auto auto" !== a || (a = "0 0");
                var c = a.split(" "),
                    e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0],
                    d = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
                return null == d ? d = "0" : "center" === d && (d = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== d.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === d.charAt(1), b.ox = parseFloat(e.replace(h, "")), b.oy = parseFloat(d.replace(h, ""))), e + " " + d + (2 < c.length ? " " + c[2] : "")
            }, Ga = function(a, b) {
                return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
            }, ga = function(a, b) {
                return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a)
            }, qa = function(a, b, c, e) {
                var d, g, f;
                return null == a ? f = b : "number" == typeof a ? f = a : (d = a.split("_"), g = Number(d[0].replace(h, "")) * (-1 === a.indexOf("rad") ? 1 : N) - ("=" === a.charAt(1) ? 0 : b), d.length && (e && (e[c] = b + g), -1 !== a.indexOf("short") && (g %= 360, g !== g % 180 && (g = 0 > g ? g + 360 : g - 360)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 3599999999640) % 360 - 360 * (0 | g / 360) : -1 !== a.indexOf("ccw") && 0 < g && (g = (g - 3599999999640) % 360 - 360 * (0 | g / 360))), f = b + g), 1E-6 > f && -1E-6 < f && (f = 0), f
            }, oa = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ya = function(a, b, c) {
                return a = 0 > a ? a + 1 : 1 < a ? a - 1 : a, 0 | 255 * (1 > 6 * a ? b + 6 * (c - b) * a : .5 > a ? c : 2 > 3 * a ? b + 6 * (c - b) * (2 / 3 - a) : b) + .5
            }, za = u.parseColor = function(a) {
                var b, c, d, g, f, D;
                return a && "" !== a ? "number" == typeof a ? [a >> 16, 255 & a >> 8, 255 & a] : ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), oa[a] ? oa[a] : "#" === a.charAt(0) ? (4 === a.length && (b = a.charAt(1), c = a.charAt(2), d = a.charAt(3), a = "#" + b + b + c + c + d + d), a = parseInt(a.substr(1), 16), [a >> 16, 255 & a >> 8, 255 & a]) : "hsl" === a.substr(0, 3) ? (a = a.match(e), g = Number(a[0]) % 360 / 360, f = Number(a[1]) / 100, D = Number(a[2]) / 100, c = .5 >= D ? D * (f + 1) : D + f - D * f, b = 2 * D - c, 3 < a.length && (a[3] = Number(a[3])), a[0] = ya(g + 1 / 3, b, c), a[1] = ya(g, b, c), a[2] = ya(g - 1 / 3, b, c), a) : (a = a.match(e) || oa.transparent, a[0] = Number(a[0]), a[1] = Number(a[1]), a[2] = Number(a[2]), 3 < a.length && (a[3] = Number(a[3])), a)) : oa.black
            }, j = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (q in oa) j += "|" + q + "\\b";
        var j = RegExp(j + ")", "gi"),
            Ha = function(a, b, c, d) {
                if (null == a) return function(a) {
                    return a
                };
                var g, f = b ? (a.match(j) || [""])[0] : "",
                    D = a.split(f).join("").match(n) || [],
                    h = a.substr(0, a.indexOf(D[0])),
                    k = ")" === a.charAt(a.length - 1) ? ")" : "",
                    m = -1 !== a.indexOf(" ") ? " " : ",",
                    l = D.length,
                    p = 0 < l ? D[0].replace(e, "") : "";
                return l ? g = b ? function(a) {
                    var b, e, ha;
                    if ("number" == typeof a) a += p;
                    else if (d && R.test(a)) {
                        a = a.replace(R, "|").split("|");
                        for (ha = 0; a.length > ha; ha++) a[ha] = g(a[ha]);
                        return a.join(",")
                    }
                    if (b = (a.match(j) || [f])[0], e = a.split(b).join("").match(n) || [], ha = e.length, l > ha--)
                        for (; l > ++ha;) e[ha] = c ? e[0 | (ha - 1) / 2] : D[ha];
                    return h + e.join(m) + m + b + k + (-1 !== a.indexOf("inset") ? " inset" : "")
                } : function(a) {
                    var b, e;
                    if ("number" == typeof a) a += p;
                    else if (d && R.test(a)) {
                        a = a.replace(R, "|").split("|");
                        for (e = 0; a.length > e; e++) a[e] = g(a[e]);
                        return a.join(",")
                    }
                    if (b = a.match(n) || [], e = b.length, l > e--)
                        for (; l > ++e;) b[e] = c ? b[0 | (e - 1) / 2] : D[e];
                    return h + b.join(m) + k
                } : function(a) {
                    return a
                }
            }, Ba = function(a) {
                return a = a.split(","),
                function(b, c, e, d, g, f, h) {
                    e = (c + "").split(" ");
                    h = {};
                    for (c = 0; 4 > c; c++) h[a[c]] = e[c] = e[c] || e[(c - 1) / 2 >> 0];
                    return d.parse(b, h, g, f)
                }
            }, Aa = (M._setPluginRatio = function(a) {
                this.plugin.setRatio(a);
                for (var b, c, e = this.data, d = e.proxy, g = e.firstMPT; g;) b = d[g.v], g.r ? b = Math.round(b) : 1E-6 > b && -1E-6 < b && (b = 0), g.t[g.p] = b, g = g._next;
                if (e.autoRotate && (e.autoRotate.rotation = d.rotation), 1 === a)
                    for (g = e.firstMPT; g;) {
                        if (c = g.t, c.type) {
                            if (1 === c.type) {
                                b = c.xs0 + c.s + c.xs1;
                                for (a = 1; c.l > a; a++) b += c["xn" + a] + c["xs" + (a + 1)];
                                c.e = b
                            }
                        } else c.e = c.s + c.xs0;
                        g = g._next
                    }
            }, function(a, b, c, e, d) {
                this.t = a;
                this.p = b;
                this.v = c;
                this.r = d;
                e && (e._prev = this, this._next = e)
            }),
            T = (M._parseToProxy = function(a, b, c, e, d, g) {
                var f, h, k, m = e,
                    l = {}, p = {};
                h = c._transform;
                var n = ka;
                c._transform = null;
                ka = b;
                e = a = c.parse(a, b, e, d);
                ka = n;
                for (g && (c._transform = h, m && (m._prev = null, m._prev && (m._prev._next = null))); e && e !== m;) {
                    if (1 >= e.type && (f = e.p, p[f] = e.s + e.c, l[f] = e.s, g || (k = new Aa(e, "s", f, k, e.r), e.c = 0), 1 === e.type))
                        for (c = e.l; 0 < --c;) h = "xn" + c, f = e.p + "_" + h, p[f] = e.data[h], l[f] = e[h], g || (k = new Aa(e, h, f, k, e.rxp[h]));
                    e = e._next
                }
                return {
                    proxy: l,
                    end: p,
                    firstMPT: k,
                    pt: a
                }
            }, M.CSSPropTween = function(a, b, c, e, d, g, h, k, m, l, G) {
                this.t = a;
                this.p = b;
                this.s = c;
                this.c = e;
                this.n = h || b;
                a instanceof T || f.push(this.n);
                this.r = k;
                this.type = g || 0;
                m && (this.pr = m, C = !0);
                this.b = void 0 === l ? c : l;
                this.e = void 0 === G ? c + e : G;
                d && (this._next = d, d._prev = this)
            }),
            wa = u.parseComplex = function(a, b, c, d, f, h, D, m, l, p) {
                c = c || h || "";
                D = new T(a, b, 0, 0, D, p ? 2 : 1, null, !1, m, c, d);
                d += "";
                var G, n, q, u, v;
                a = c.split(", ").join(",").split(" ");
                b = d.split(", ").join(",").split(" ");
                m = a.length;
                var r = !1 !== K;
                (-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (a = a.join(" ").replace(R, ", ").split(" "), b = b.join(" ").replace(R, ", ").split(" "), m = a.length);
                m !== b.length && (a = (h || "").split(" "), m = a.length);
                D.plugin = l;
                D.setRatio = p;
                for (c = 0; m > c; c++)
                    if (G = a[c], l = b[c], q = parseFloat(G), q || 0 === q) D.appendXtra("", q, Ga(l, q), l.replace(g, ""), r && -1 !== l.indexOf("px"), !0);
                    else if (f && ("#" === G.charAt(0) || oa[G] || k.test(G))) p = "," === l.charAt(l.length - 1) ? ")," : ")", G = za(G), l = za(l), (h = 6 < G.length + l.length) && !Z && 0 === l[3] ? (D["xs" + D.l] += D.l ? " transparent" : "transparent", D.e = D.e.split(b[c]).join("transparent")) : (Z || (h = !1), D.appendXtra(h ? "rgba(" : "rgb(", G[0], l[0] - G[0], ",", !0, !0).appendXtra("", G[1], l[1] - G[1], ",", !0).appendXtra("", G[2], l[2] - G[2], h ? "," : p, !0), h && (G = 4 > G.length ? 1 : G[3], D.appendXtra("", G, (4 > l.length ? 1 : l[3]) - G, p, !1)));
                else if (h = G.match(e)) {
                    if (n = l.match(g), !n || n.length !== h.length) return D;
                    for (l = p = 0; h.length > l; l++) v = h[l], u = G.indexOf(v, p), D.appendXtra(G.substr(p, u - p), Number(v), Ga(n[l], v), "", r && "px" === G.substr(u + v.length, 2), 0 === l), p = u + v.length;
                    D["xs" + D.l] += G.substr(p)
                } else D["xs" + D.l] += D.l ? " " + G : G; if (-1 !== d.indexOf("=") && D.data) {
                    p = D.xs0 + D.data.s;
                    for (c = 1; D.l > c; c++) p += D["xs" + c] + D.data["xn" + c];
                    D.e = p + D["xs" + c]
                }
                return D.l || (D.type = -1, D.xs0 = D.e), D.xfirst || D
            }, ba = 9,
            q = T.prototype;
        for (q.l = q.pr = 0; 0 < --ba;) q["xn" + ba] = 0, q["xs" + ba] = "";
        q.xs0 = "";
        q._next = q._prev = q.xfirst = q.data = q.plugin = q.setRatio = q.rxp = null;
        q.appendXtra = function(a, b, c, e, d, g) {
            var f = this.l;
            return this["xs" + f] += g && f ? " " + a : a || "", c || 0 === f || this.plugin ? (this.l++, this.type = this.setRatio ? 2 : 1, this["xs" + this.l] = e || "", 0 < f ? (this.data["xn" + f] = b + c, this.rxp["xn" + f] = d, this["xn" + f] = b, this.plugin || (this.xfirst = new T(this, "xn" + f, b, c, this.xfirst || this, 0, this.n, d, this.pr), this.xfirst.xs0 = 0), this) : (this.data = {
                s: b + c
            }, this.rxp = {}, this.s = b, this.c = c, this.r = d, this)) : (this["xs" + f] += b + (e || ""), this)
        };
        var o = function(a, b) {
            b = b || {};
            this.p = b.prefix ? l(a) || a : a;
            z[a] = z[this.p] = this;
            this.format = b.formatter || Ha(b.defaultValue, b.color, b.collapsible, b.multi);
            b.parser && (this.parse = b.parser);
            this.clrs = b.color;
            this.multi = b.multi;
            this.keyword = b.keyword;
            this.dflt = b.defaultValue;
            this.pr = b.priority || 0
        }, P = M._registerComplexSpecialProp = function(a, b, c) {
                "object" != typeof b && (b = {
                    parser: c
                });
                var e = a.split(","),
                    d = b.defaultValue;
                c = c || [d];
                for (a = 0; e.length > a; a++) b.prefix = 0 === a && b.prefix, b.defaultValue = c[a] || d, new o(e[a], b)
            }, Qa = function(a) {
                if (!z[a]) {
                    var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                    P(a, {
                        parser: function(a, c, e, d, g, f, h) {
                            var k = w.com.greensock.plugins[b];
                            k ? a = (k._cssRegister(), z[e].parse(a, c, e, d, g, f, h)) : (window.console && console.log("Error: " + b + " js file not loaded."), a = g);
                            return a
                        }
                    })
                }
            }, q = o.prototype;
        q.parseComplex = function(a, b, c, e, d, g) {
            var f, h, k, l, m, p, n = this.keyword;
            if (this.multi && (R.test(c) || R.test(b) ? (h = b.replace(R, "|").split("|"), k = c.replace(R, "|").split("|")) : n && (h = [b], k = [c])), k) {
                l = k.length > h.length ? k.length : h.length;
                for (f = 0; l > f; f++) b = h[f] = h[f] || this.dflt, c = k[f] = k[f] || this.dflt, n && (m = b.indexOf(n), p = c.indexOf(n), m !== p && (c = -1 === p ? k : h, c[f] += " " + n));
                b = h.join(", ");
                c = k.join(", ")
            }
            return wa(a, this.p, b, c, this.clrs, this.dflt, e, this.pr, d, g)
        };
        q.parse = function(a, b, c, e, g, f) {
            return this.parseComplex(a.style, this.format(d(a, this.p, m, !1, this.dflt)), this.format(b), g, f)
        };
        u.registerSpecialProp = function(a, b, c) {
            P(a, {
                parser: function(a, e, d, g, f, h) {
                    f = new T(a, d, 0, 0, f, 2, d, !1, c);
                    return f.plugin = h, f.setRatio = b(a, e, g._tween, d), f
                },
                priority: c
            })
        };
        var s, Ja = "scaleX scaleY scaleZ x y z skewX skewY rotation rotationX rotationY perspective xPercent yPercent".split(" "),
            ea = l("transform"),
            Ra = F + "transform",
            ta = l("transformOrigin"),
            ia = null !== l("perspective"),
            Ca = M.Transform = function() {
                this.perspective = parseFloat(u.defaultTransformPerspective) || 0;
                this.force3D = !1 !== u.defaultForce3D && ia ? u.defaultForce3D || "auto" : !1
            }, Sa = window.SVGElement,
            Ka = function(a, b, c) {
                var e;
                a = H.createElementNS("http://www.w3.org/2000/svg", a);
                var d = /([a-z])([A-Z])/g;
                for (e in c) a.setAttributeNS(null, e.replace(d, "$1-$2").toLowerCase(), c[e]);
                return b.appendChild(a), a
            }, La = document.documentElement,
            Ta = function() {
                var a, c, e, d = b || /Android/i.test(V) && !window.chrome;
                return H.createElementNS && !d && (a = Ka("svg", La), c = Ka("rect", a, {
                    width: 100,
                    height: 50,
                    x: 100
                }), e = c.getBoundingClientRect().width, c.style[ta] = "50% 50%", c.style[ea] = "scaleX(0.5)", d = e === c.getBoundingClientRect().width, La.removeChild(a)), d
            }(),
            Ma = function(a, b, c) {
                a = a.getBBox();
                b = ua(b).split(" ");
                c.xOrigin = (-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * a.width : parseFloat(b[0])) + a.x;
                c.yOrigin = (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * a.height : parseFloat(b[1])) + a.y
            }, ra = M.getTransform = function(a, b, c, e) {
                if (a._gsTransform && c && !e) return a._gsTransform;
                var g, f, h, k, l, p, G, n = c ? a._gsTransform || new Ca : new Ca,
                    q = 0 > n.scaleX,
                    v = ia ? parseFloat(d(a, ta, b, !1, "0 0 0").split(" ")[2]) || n.zOrigin || 0 : 0,
                    r = parseFloat(u.defaultTransformPerspective) || 0;
                if (ea ? f = d(a, Ra, b, !0) : a.currentStyle && (f = a.currentStyle.filter.match(fa), f = f && 4 === f.length ? [f[0].substr(4), Number(f[2].substr(4)), Number(f[1].substr(4)), f[3].substr(4), n.x || 0, n.y || 0].join() : ""), g = !f || "none" === f || "matrix(1, 0, 0, 1, 0, 0)" === f, n.svg = !! (Sa && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM)), n.svg && (Ma(a, d(a, ta, m, !1, "50% 50%") + "", n), s = u.useSVGTransformAttr || Ta, h = a.getAttribute("transform"), g && h && -1 !== h.indexOf("matrix") && (f = h, g = 0)), !g) {
                    h = (f || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
                    for (g = h.length; - 1 < --g;) f = Number(h[g]), h[g] = (k = f - (f |= 0)) ? (0 | 1E5 * k + (0 > k ? -.5 : .5)) / 1E5 + f : f;
                    if (16 === h.length) {
                        q = h[8];
                        r = h[9];
                        b = h[10];
                        e = h[12];
                        k = h[13];
                        f = h[14];
                        n.zOrigin && (f = -n.zOrigin, e = q * f - h[12], k = r * f - h[13], f = b * f + n.zOrigin - h[14]);
                        var t, A, y = h[0],
                            x = h[1],
                            B = h[2],
                            E = h[3],
                            z = h[4],
                            la = h[5],
                            w = h[6],
                            F = h[7];
                        h = h[11];
                        var C = Math.atan2(x, la);
                        n.rotation = C * N;
                        C && (t = Math.cos(-C), A = Math.sin(-C), y = y * t + z * A, l = x * t + la * A, la = x * -A + la * t, w = B * -A + w * t, x = l);
                        C = Math.atan2(q, y);
                        n.rotationY = C * N;
                        C && (t = Math.cos(-C), A = Math.sin(-C), G = y * t - q * A, l = x * t - r * A, p = B * t - b * A, r = x * A + r * t, b = B * A + b * t, h = E * A + h * t, y = G, x = l);
                        C = Math.atan2(w, b);
                        n.rotationX = C * N;
                        C && (t = Math.cos(-C), A = Math.sin(-C), l = la * t + r * A, p = w * t + b * A, r = la * -A + r * t, b = w * -A + b * t, h = F * -A + h * t, la = l, w = p);
                        n.scaleX = (0 | 1E5 * Math.sqrt(y * y + x * x) + .5) / 1E5;
                        n.scaleY = (0 | 1E5 * Math.sqrt(la * la + r * r) + .5) / 1E5;
                        n.scaleZ = (0 | 1E5 * Math.sqrt(w * w + b * b) + .5) / 1E5;
                        n.skewX = 0;
                        n.perspective = h ? 1 / (0 > h ? -h : h) : 0;
                        n.x = e;
                        n.y = k;
                        n.z = f
                    } else ia && !e && h.length && n.x === h[4] && n.y === h[5] && (n.rotationX || n.rotationY) || void 0 !== n.x && "none" === d(a, "display", b) || (p = (l = 6 <= h.length) ? h[0] : 1, t = h[1] || 0, G = h[2] || 0, A = l ? h[3] : 1, n.x = h[4] || 0, n.y = h[5] || 0, h = Math.sqrt(p * p + t * t), l = Math.sqrt(A * A + G * G), p = p || t ? Math.atan2(t, p) * N : n.rotation || 0, G = G || A ? Math.atan2(G, A) * N + p : n.skewX || 0, 90 < Math.abs(G) && 270 > Math.abs(G) && (q ? (h *= -1, G += 0 >= p ? 180 : -180, p += 0 >= p ? 180 : -180) : (l *= -1, G += 0 >= G ? 180 : -180)), n.scaleX = h, n.scaleY = l, n.rotation = p, n.skewX = G, ia && (n.rotationX = n.rotationY = n.z = 0, n.perspective = r, n.scaleZ = 1));
                    n.zOrigin = v;
                    for (g in n) 2E-5 > n[g] && -2E-5 < n[g] && (n[g] = 0)
                }
                return c && (a._gsTransform = n), n
            }, Ua = function(a) {
                var c, e, d = this.data,
                    g = -d.rotation * L,
                    f = g + d.skewX * L,
                    h = (0 | Math.cos(g) * d.scaleX * 1E5) / 1E5,
                    k = (0 | Math.sin(g) * d.scaleX * 1E5) / 1E5,
                    l = (0 | Math.sin(f) * -d.scaleY * 1E5) / 1E5,
                    m = (0 | Math.cos(f) * d.scaleY * 1E5) / 1E5,
                    f = this.t.style;
                if (g = this.t.currentStyle) {
                    e = k;
                    k = -l;
                    l = -e;
                    c = g.filter;
                    f.filter = "";
                    var n, p;
                    e = this.t.offsetWidth;
                    var q = this.t.offsetHeight,
                        u = "absolute" !== g.position,
                        t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + k + ", M21=" + l + ", M22=" + m,
                        v = d.x + e * d.xPercent / 100,
                        r = d.y + q * d.yPercent / 100;
                    if (null != d.ox && (n = (d.oxp ? .01 * e * d.ox : d.ox) - e / 2, p = (d.oyp ? .01 * q * d.oy : d.oy) - q / 2, v += n - (n * h + p * k), r += p - (n * l + p * m)), u ? (n = e / 2, p = q / 2, t += ", Dx=" + (n - (n * h + p * k) + v) + ", Dy=" + (p - (n * l + p * m) + r) + ")") : t += ", sizingMethod='auto expand')", f.filter = -1 !== c.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.replace(U, t) : t + " " + c, (0 === a || 1 === a) && 1 === h && 0 === k && 0 === l && 1 === m && (u && -1 === t.indexOf("Dx=0, Dy=0") || S.test(c) && 100 !== parseFloat(RegExp.$1) || -1 === c.indexOf(c.indexOf("Alpha")) && f.removeAttribute("filter")), !u)
                        for (a = 8 > b ? 1 : -1, n = d.ieOffsetX || 0, p = d.ieOffsetY || 0, d.ieOffsetX = Math.round((e - ((0 > h ? -h : h) * e + (0 > k ? -k : k) * q)) / 2 + v), d.ieOffsetY = Math.round((q - ((0 > m ? -m : m) * q + (0 > l ? -l : l) * e)) / 2 + r), ba = 0; 4 > ba; ba++) h = Pa[ba], k = g[h], e = -1 !== k.indexOf("px") ? parseFloat(k) : ja(this.t, h, parseFloat(k), k.replace(J, "")) || 0, k = e !== d[h] ? 2 > ba ? -d.ieOffsetX : -d.ieOffsetY : 2 > ba ? n - d.ieOffsetX : p - d.ieOffsetY, f[h] = (d[h] = Math.round(e - k * (0 === ba || 2 === ba ? 1 : a))) + "px"
                }
            }, Da = M.set3DTransformRatio = function(a) {
                var b, c, e, d, g, f, h, k, l, m, n, p, q, t, u, r, A, x, y, B, C, w = this.data,
                    E = this.t.style,
                    z = w.rotation * L,
                    F = w.scaleX,
                    aa = w.scaleY,
                    M = w.scaleZ,
                    I = w.x,
                    J = w.y,
                    K = w.z,
                    H = w.perspective;
                if (!(1 !== a && 0 !== a || "auto" !== w.force3D || w.rotationY || w.rotationX || 1 !== M || H || K)) return Na.call(this, a), void 0;
                v && (1E-4 > F && -1E-4 < F && (F = M = 2E-5), 1E-4 > aa && -1E-4 < aa && (aa = M = 2E-5), !H || w.z || w.rotationX || w.rotationY || (H = 0));
                if (z || w.skewX) r = Math.cos(z), A = Math.sin(z), a = r, d = A, w.skewX && (z -= w.skewX * L, r = Math.cos(z), A = Math.sin(z), "simple" === w.skewType && (x = Math.tan(w.skewX * L), x = Math.sqrt(1 + x * x), r *= x, A *= x)), b = -A, g = r;
                else {
                    if (!(w.rotationY || w.rotationX || 1 !== M || H || w.svg)) return E[ea] = (w.xPercent || w.yPercent ? "translate(" + w.xPercent + "%," + w.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + J + "px," + K + "px)" + (1 !== F || 1 !== aa ? " scale(" + F + "," + aa + ")" : ""), void 0;
                    a = g = 1;
                    b = d = 0
                }
                m = 1;
                c = e = f = h = k = l = n = p = q = 0;
                t = H ? -1 / H : 0;
                u = w.zOrigin;
                (z = w.rotationY * L) && (r = Math.cos(z), A = Math.sin(z), k = m * -A, p = t * -A, c = a * A, f = d * A, m *= r, t *= r, a *= r, d *= r);
                (z = w.rotationX * L) && (r = Math.cos(z), A = Math.sin(z), x = b * r + c * A, y = g * r + f * A, B = l * r + m * A, C = q * r + t * A, c = b * -A + c * r, f = g * -A + f * r, m = l * -A + m * r, t = q * -A + t * r, b = x, g = y, l = B, q = C);
                1 !== M && (c *= M, f *= M, m *= M, t *= M);
                1 !== aa && (b *= aa, g *= aa, l *= aa, q *= aa);
                1 !== F && (a *= F, d *= F, k *= F, p *= F);
                u && (n -= u, e = c * n, h = f * n, n = m * n + u);
                w.svg && (e += w.xOrigin - (w.xOrigin * a + w.yOrigin * b), h += w.yOrigin - (w.xOrigin * d + w.yOrigin * g));
                e = (x = (e += I) - (e |= 0)) ? (0 | 1E5 * x + (0 > x ? -.5 : .5)) / 1E5 + e : e;
                h = (x = (h += J) - (h |= 0)) ? (0 | 1E5 * x + (0 > x ? -.5 : .5)) / 1E5 + h : h;
                n = (x = (n += K) - (n |= 0)) ? (0 | 1E5 * x + (0 > x ? -.5 : .5)) / 1E5 + n : n;
                r = w.xPercent || w.yPercent ? "translate(" + w.xPercent + "%," + w.yPercent + "%) matrix3d(" : "matrix3d(";
                r = r + ((0 | 1E5 * a) / 1E5 + "," + (0 | 1E5 * d) / 1E5 + "," + (0 | 1E5 * k) / 1E5) + ("," + (0 | 1E5 * p) / 1E5 + "," + (0 | 1E5 * b) / 1E5 + "," + (0 | 1E5 * g) / 1E5);
                r += "," + (0 | 1E5 * l) / 1E5 + "," + (0 | 1E5 * q) / 1E5 + "," + (0 | 1E5 * c) / 1E5;
                r += "," + (0 | 1E5 * f) / 1E5 + "," + (0 | 1E5 * m) / 1E5 + "," + (0 | 1E5 * t) / 1E5;
                r += "," + e + "," + h + "," + n + "," + (H ? 1 + -n / H : 1) + ")";
                E[ea] = r
            }, Na = M.set2DTransformRatio = function(a) {
                var b, c, e, d, g, f, h, k, l, m = this.data,
                    n = this.t,
                    p = n.style,
                    q = m.x,
                    r = m.y;
                return !(m.rotationX || m.rotationY || m.z || !0 === m.force3D || "auto" === m.force3D && 1 !== a && 0 !== a) || m.svg && s || !ia ? (e = m.scaleX, d = m.scaleY, m.rotation || m.skewX || m.svg ? (b = m.rotation * L, c = b - m.skewX * L, g = Math.cos(b) * e, f = Math.sin(b) * e, h = Math.sin(c) * -d, k = Math.cos(c) * d, m.svg && (q += m.xOrigin - (m.xOrigin * g + m.yOrigin * h), r += m.yOrigin - (m.xOrigin * f + m.yOrigin * k), 1E-6 > q && -1E-6 < q && (q = 0), 1E-6 > r && -1E-6 < r && (r = 0)), l = (0 | 1E5 * g) / 1E5 + "," + (0 | 1E5 * f) / 1E5 + "," + (0 | 1E5 * h) / 1E5 + "," + (0 | 1E5 * k) / 1E5 + "," + q + "," + r + ")", m.svg && s ? n.setAttribute("transform", "matrix(" + l) : p[ea] = (m.xPercent || m.yPercent ? "translate(" + m.xPercent + "%," + m.yPercent + "%) matrix(" : "matrix(") + l) : p[ea] = (m.xPercent || m.yPercent ? "translate(" + m.xPercent + "%," + m.yPercent + "%) matrix(" : "matrix(") + e + ",0,0," + d + "," + q + "," + r + ")", void 0) : (this.setRatio = Da, Da.call(this, a), void 0)
            }, q = Ca.prototype;
        q.x = q.y = q.z = q.skewX = q.skewY = q.rotation = q.rotationX = q.rotationY = q.zOrigin = q.xPercent = q.yPercent = 0;
        q.scaleX = q.scaleY = q.scaleZ = 1;
        P("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
            parser: function(b, c, e, g, f, h, k) {
                if (g._lastParsedTransform === k) return f;
                g._lastParsedTransform = k;
                var l, n, p, q, r, t;
                c = g._transform = ra(b, m, !0, k.parseTransform);
                var A = b.style,
                    v = Ja.length,
                    w = {};
                if ("string" == typeof k.transform && ea) p = a.style, p[ea] = k.transform, p.display = "block", p.position = "absolute", H.body.appendChild(a), l = ra(a, null, !1), H.body.removeChild(a);
                else if ("object" == typeof k) {
                    if (l = {
                        scaleX: ga(null != k.scaleX ? k.scaleX : k.scale, c.scaleX),
                        scaleY: ga(null != k.scaleY ? k.scaleY : k.scale, c.scaleY),
                        scaleZ: ga(k.scaleZ, c.scaleZ),
                        x: ga(k.x, c.x),
                        y: ga(k.y, c.y),
                        z: ga(k.z, c.z),
                        xPercent: ga(k.xPercent, c.xPercent),
                        yPercent: ga(k.yPercent, c.yPercent),
                        perspective: ga(k.transformPerspective, c.perspective)
                    }, t = k.directionalRotation, null != t)
                        if ("object" == typeof t)
                            for (p in t) k[p] = t[p];
                        else k.rotation = t;
                        "string" == typeof k.x && -1 !== k.x.indexOf("%") && (l.x = 0, l.xPercent = ga(k.x, c.xPercent));
                    "string" == typeof k.y && -1 !== k.y.indexOf("%") && (l.y = 0, l.yPercent = ga(k.y, c.yPercent));
                    l.rotation = qa("rotation" in k ? k.rotation : "shortRotation" in k ? k.shortRotation + "_short" : "rotationZ" in k ? k.rotationZ : c.rotation, c.rotation, "rotation", w);
                    ia && (l.rotationX = qa("rotationX" in k ? k.rotationX : "shortRotationX" in k ? k.shortRotationX + "_short" : c.rotationX || 0, c.rotationX, "rotationX", w), l.rotationY = qa("rotationY" in k ? k.rotationY : "shortRotationY" in k ? k.shortRotationY + "_short" : c.rotationY || 0, c.rotationY, "rotationY", w));
                    l.skewX = null == k.skewX ? c.skewX : qa(k.skewX, c.skewX);
                    l.skewY = null == k.skewY ? c.skewY : qa(k.skewY, c.skewY);
                    (n = l.skewY - c.skewY) && (l.skewX += n, l.rotation += n)
                }
                ia && null != k.force3D && (c.force3D = k.force3D, r = !0);
                c.skewType = k.skewType || c.skewType || u.defaultSkewType;
                for ((n = c.force3D || c.z || c.rotationX || c.rotationY || l.z || l.rotationX || l.rotationY || l.perspective) || null == k.scale || (l.scaleZ = 1); - 1 < --v;) e = Ja[v], q = l[e] - c[e], (1E-6 < q || -1E-6 > q || null != k[e] || null != ka[e]) && (r = !0, f = new T(c, e, c[e], q, f), e in w && (f.e = w[e]), f.xs0 = 0, f.plugin = h, g._overwriteProps.push(f.n));
                return q = k.transformOrigin, q && c.svg && (Ma(b, q, l), f = new T(c, "xOrigin", c.xOrigin, l.xOrigin - c.xOrigin, f, -1, "transformOrigin"), f.b = c.xOrigin, f.e = f.xs0 = l.xOrigin, f = new T(c, "yOrigin", c.yOrigin, l.yOrigin - c.yOrigin, f, -1, "transformOrigin"), f.b = c.yOrigin, f.e = f.xs0 = l.yOrigin, q = "0px 0px"), (q || ia && n && c.zOrigin) && (ea ? (r = !0, e = ta, q = (q || d(b, e, m, !1, "50% 50%")) + "", f = new T(A, e, 0, 0, f, -1, "transformOrigin"), f.b = A[e], f.plugin = h, ia ? (p = c.zOrigin, q = q.split(" "), c.zOrigin = (2 < q.length && (0 === p || "0px" !== q[2]) ? parseFloat(q[2]) : p) || 0, f.xs0 = f.e = q[0] + " " + (q[1] || "50%") + " 0px", f = new T(c, "zOrigin", 0, 0, f, -1, f.n), f.b = p, f.xs0 = f.e = c.zOrigin) : f.xs0 = f.e = q) : ua(q + "", c)), r && (g._transformType = c.svg && s || !n && 3 !== this._transformType ? 2 : 3), f
            },
            prefix: !0
        });
        P("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        });
        P("borderRadius", {
            defaultValue: "0px",
            parser: function(a, b, c, e, f) {
                b = this.format(b);
                var g, h, k, n, p, q, r, t, u, A, v, w, x, z, B = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    C = a.style;
                e = parseFloat(a.offsetWidth);
                t = parseFloat(a.offsetHeight);
                b = b.split(" ");
                for (g = 0; B.length > g; g++) this.p.indexOf("border") && (B[g] = l(B[g])), n = k = d(a, B[g], m, !1, "0px"), -1 !== n.indexOf(" ") && (k = n.split(" "), n = k[0], k = k[1]), p = h = b[g], q = parseFloat(n), A = n.substr((q + "").length), (v = "=" === p.charAt(1)) ? (r = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), r *= parseFloat(p), u = p.substr((r + "").length - (0 > r ? 1 : 0)) || "") : (r = parseFloat(p), u = p.substr((r + "").length)), "" === u && (u = y[c] || A), u !== A && (w = ja(a, "borderLeft", q, A), x = ja(a, "borderTop", q, A), "%" === u ? (n = w / e * 100 + "%", k = x / t * 100 + "%") : "em" === u ? (z = ja(a, "borderLeft", 1, "em"), n = w / z + "em", k = x / z + "em") : (n = w + "px", k = x + "px"), v && (p = parseFloat(n) + r + u, h = parseFloat(k) + r + u)), f = wa(C, B[g], n + " " + k, p + " " + h, !1, "0px", f);
                return f
            },
            prefix: !0,
            formatter: Ha("0px 0px 0px 0px", !1, !0)
        });
        P("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(a, c, e, f, g, h) {
                var k, l, n;
                e = m || r(a, null);
                e = this.format((e ? b ? e.getPropertyValue("background-position-x") + " " + e.getPropertyValue("background-position-y") : e.getPropertyValue("background-position") : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0");
                var p = this.format(c);
                if (-1 !== e.indexOf("%") != (-1 !== p.indexOf("%")) && (k = d(a, "backgroundImage").replace(I, ""), k && "none" !== k)) {
                    c = e.split(" ");
                    f = p.split(" ");
                    A.setAttribute("src", k);
                    for (k = 2; - 1 < --k;) e = c[k], l = -1 !== e.indexOf("%"), l !== (-1 !== f[k].indexOf("%")) && (n = 0 === k ? a.offsetWidth - A.width : a.offsetHeight - A.height, c[k] = l ? parseFloat(e) / 100 * n + "px" : 100 * (parseFloat(e) / n) + "%");
                    e = c.join(" ")
                }
                return this.parseComplex(a.style, e, p, g, h)
            },
            formatter: ua
        });
        P("backgroundSize", {
            defaultValue: "0 0",
            formatter: ua
        });
        P("perspective", {
            defaultValue: "0px",
            prefix: !0
        });
        P("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        });
        P("transformStyle", {
            prefix: !0
        });
        P("backfaceVisibility", {
            prefix: !0
        });
        P("userSelect", {
            prefix: !0
        });
        P("margin", {
            parser: Ba("marginTop,marginRight,marginBottom,marginLeft")
        });
        P("padding", {
            parser: Ba("paddingTop,paddingRight,paddingBottom,paddingLeft")
        });
        P("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(a, c, e, f, g, h) {
                var k, l, n;
                return 9 > b ? (l = a.currentStyle, n = 8 > b ? " " : ",", k = "rect(" + l.clipTop + n + l.clipRight + n + l.clipBottom + n + l.clipLeft + ")", c = this.format(c).split(",").join(n)) : (k = this.format(d(a, this.p, m, !1, this.dflt)), c = this.format(c)), this.parseComplex(a.style, k, c, g, h)
            }
        });
        P("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        });
        P("autoRound,strictUnits", {
            parser: function(a, b, c, e, d) {
                return d
            }
        });
        P("border", {
            defaultValue: "0px solid #000",
            parser: function(a, b, c, e, f, g) {
                return this.parseComplex(a.style, this.format(d(a, "borderTopWidth", m, !1, "0px") + " " + d(a, "borderTopStyle", m, !1, "solid") + " " + d(a, "borderTopColor", m, !1, "#000")), this.format(b), f, g)
            },
            color: !0,
            formatter: function(a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(j) || ["#000"])[0]
            }
        });
        P("borderWidth", {
            parser: Ba("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        });
        P("float,cssFloat,styleFloat", {
            parser: function(a, b, c, e, d) {
                a = a.style;
                e = "cssFloat" in a ? "cssFloat" : "styleFloat";
                return new T(a, e, 0, 0, d, -1, c, !1, 0, a[e], b)
            }
        });
        var bg = function(a) {
            var b, c = this.t,
                e = c.filter || d(this.data, "filter") || "";
            a = 0 | this.s + this.c * a;
            100 === a && (-1 === e.indexOf("atrix(") && -1 === e.indexOf("radient(") && -1 === e.indexOf("oader(") ? (c.removeAttribute("filter"), b = !d(this.data, "filter")) : (c.filter = e.replace(O, ""), b = !0));
            b || (this.xn1 && (c.filter = e = e || "alpha(opacity=" + a + ")"), -1 === e.indexOf("pacity") ? 0 === a && this.xn1 || (c.filter = e + " alpha(opacity=" + a + ")") : c.filter = e.replace(S, "opacity=" + a))
        };
        P("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(a, b, c, e, f, g) {
                var h = parseFloat(d(a, "opacity", m, !1, "1")),
                    k = a.style,
                    l = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), l && 1 === h && "hidden" === d(a, "visibility", m) && 0 !== b && (h = 0), Z ? f = new T(k, "opacity", h, b - h, f) : (f = new T(k, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = l ? 1 : 0, k.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = bg), l && (f = new T(k, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", e._overwriteProps.push(f.n), e._overwriteProps.push(c)), f
            }
        });
        var bh = function(a, b) {
            b && (a.removeProperty ? ("ms" === b.substr(0, 2) && (b = "M" + b.substr(1)), a.removeProperty(b.replace(W, "-$1").toLowerCase())) : a.removeAttribute(b))
        }, Wa = function(a) {
                if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                    this.t.setAttribute("class", 0 === a ? this.b : this.e);
                    for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : bh(c, b.p), b = b._next;
                    1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
        P("className", {
            parser: function(a, b, c, e, d, f, g) {
                var h, k, l, n, p = a.getAttribute("class") || "",
                    q = a.style.cssText;
                if (d = e._classNamePT = new T(a, c, 0, 0, d, 2), d.setRatio = Wa, d.pr = -11, C = !0, d.b = p, c = pa(a, m), k = a._gsClassPT) {
                    l = {};
                    for (n = k.data; n;) l[n.p] = 1, n = n._next;
                    k.setRatio(1)
                }
                return a._gsClassPT = d, d.e = "=" !== b.charAt(1) ? b : p.replace(RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), e._tween._duration && (a.setAttribute("class", d.e), h = aa(a, c, pa(a), g, l), a.setAttribute("class", p), d.data = h.firstMPT, a.style.cssText = q, d = d.xfirst = e.parse(a, h.difs, d, f)), d
            }
        });
        var bi = function(a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b, c, e, d = this.t.style,
                    f = z.transform.parse;
                if ("all" === this.e) d.cssText = "", e = !0;
                else
                    for (a = this.e.split(" ").join("").split(","), c = a.length; - 1 < --c;) b = a[c], z[b] && (z[b].parse === f ? e = !0 : b = "transformOrigin" === b ? ta : z[b].p), bh(d, b);
                e && (bh(d, ea), this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        P("clearProps", {
            parser: function(a, b, c, e, d) {
                return d = new T(a, c, 0, 0, d, 2), d.setRatio = bi, d.e = b, d.pr = -10, d.data = e._tween, C = !0, d
            }
        });
        q = ["bezier", "throwProps", "physicsProps", "physics2D"];
        for (ba = q.length; ba--;) Qa(q[ba]);
        q = u.prototype;
        q._firstPT = q._lastParsedTransform = q._transform = null;
        q._onInitTween = function(a, b, e) {
            if (!a.nodeType) return !1;
            this._target = a;
            this._tween = e;
            this._vars = b;
            K = b.autoRound;
            C = !1;
            y = b.suffixMap || u.suffixMap;
            m = r(a, "");
            f = this._overwriteProps;
            var g, h, k, l, n = a.style;
            if (t && "" === n.zIndex && (g = d(a, "zIndex", m), ("auto" === g || "" === g) && this._addLazySet(n, "zIndex", 0)), "string" == typeof b && (k = n.cssText, g = pa(a, m), n.cssText = k + ";" + b, g = aa(a, g, pa(a)).difs, !Z && Y.test(b) && (g.opacity = parseFloat(RegExp.$1)), b = g, n.cssText = k), this._firstPT = e = this.parse(a, b, null), this._transformType) {
                b = 3 === this._transformType;
                ea ? x && (t = !0, "" === n.zIndex && (h = d(a, "zIndex", m), ("auto" === h || "" === h) && this._addLazySet(n, "zIndex", 0)), c && this._addLazySet(n, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : n.zoom = 1;
                for (h = e; h && h._next;) h = h._next;
                g = new T(a, "transform", 0, 0, null, 2);
                this._linkCSSP(g, null, h);
                g.setRatio = b && ia ? Da : ea ? Na : Ua;
                g.data = this._transform || ra(a, m, !0);
                f.pop()
            }
            if (C) {
                for (; e;) {
                    a = e._next;
                    for (h = k; h && h.pr > e.pr;) h = h._next;
                    (e._prev = h ? h._prev : l) ? e._prev._next = e : k = e;
                    (e._next = h) ? h._prev = e : l = e;
                    e = a
                }
                this._firstPT = k
            }
            return !0
        };
        q.parse = function(a, b, c, e) {
            var f, g, h, l, n, p, q, t, u, A = a.style;
            for (f in b) {
                n = b[f];
                if (g = z[f]) c = g.parse(a, n, f, this, c, e, b);
                else if (g = d(a, f, m) + "", t = "string" == typeof n, "color" === f || "fill" === f || "stroke" === f || -1 !== f.indexOf("Color") || t && k.test(n)) t || (n = za(n), n = (3 < n.length ? "rgba(" : "rgb(") + n.join(",") + ")"), c = wa(A, f, g, n, !0, "transparent", c, 0, e);
                else if (!t || -1 === n.indexOf(" ") && -1 === n.indexOf(",")) {
                    p = (h = parseFloat(g)) || 0 === h ? g.substr((h + "").length) : "";
                    if ("" === g || "auto" === g)
                        if ("width" === f || "height" === f) {
                            h = a;
                            var v = f;
                            p = m;
                            u = parseFloat("width" === v ? h.offsetWidth : h.offsetHeight);
                            var v = Oa[v],
                                w = v.length;
                            for (p = p || r(h, null); - 1 < --w;) u -= parseFloat(d(h, "padding" + v[w], p, !0)) || 0, u -= parseFloat(d(h, "border" + v[w] + "Width", p, !0)) || 0;
                            h = u;
                            p = "px"
                        } else "left" === f || "top" === f ? (h = Fa(a, f, m), p = "px") : (h = "opacity" !== f ? 0 : 1, p = "");
                        (u = t && "=" === n.charAt(1)) ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), q = n.replace(J, "")) : (l = parseFloat(n), q = t ? n.substr((l + "").length) || "" : "");
                        "" === q && (q = f in y ? y[f] : p);
                    n = l || 0 === l ? (u ? l + h : l) + q : b[f];
                    p !== q && "" !== q && (l || 0 === l) && h && (h = ja(a, f, h, p), "%" === q ? (h /= ja(a, f, 100, "%") / 100, !0 !== b.strictUnits && (g = h + "%")) : "em" === q ? h /= ja(a, f, 1, "em") : "px" !== q && (l = ja(a, f, l, q), q = "px"), u && (l || 0 === l) && (n = l + h + q));
                    u && (l += h);
                    !h && 0 !== h || !l && 0 !== l ? void 0 !== A[f] && (n || "NaN" != n + "" && null != n) ? (c = new T(A, f, l || h || 0, 0, c, -1, f, !1, 0, g, n), c.xs0 = "none" !== n || "display" !== f && -1 === f.indexOf("Style") ? n : g) : window.console && console.log("invalid " + f + " tween value: " + b[f]) : (c = new T(A, f, h, l - h, c, 0, f, !1 !== K && ("px" === q || "zIndex" === f), 0, g, n), c.xs0 = q)
                } else c = wa(A, f, g, n, !0, null, c, 0, e);
                e && c && !c.plugin && (c.plugin = e)
            }
            return c
        };
        q.setRatio = function(a) {
            var b, c, e, d = this._firstPT;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1E-6 === this._tween._rawPrevTime)
                    for (; d;) {
                        if (b = d.c * a + d.s, d.r ? b = Math.round(b) : 1E-6 > b && -1E-6 < b && (b = 0), d.type)
                            if (1 === d.type)
                                if (e = d.l, 2 === e) d.t[d.p] = d.xs0 + b + d.xs1 + d.xn1 + d.xs2;
                                else if (3 === e) d.t[d.p] = d.xs0 + b + d.xs1 + d.xn1 + d.xs2 + d.xn2 + d.xs3;
                        else if (4 === e) d.t[d.p] = d.xs0 + b + d.xs1 + d.xn1 + d.xs2 + d.xn2 + d.xs3 + d.xn3 + d.xs4;
                        else if (5 === e) d.t[d.p] = d.xs0 + b + d.xs1 + d.xn1 + d.xs2 + d.xn2 + d.xs3 + d.xn3 + d.xs4 + d.xn4 + d.xs5;
                        else {
                            c = d.xs0 + b + d.xs1;
                            for (e = 1; d.l > e; e++) c += d["xn" + e] + d["xs" + (e + 1)];
                            d.t[d.p] = c
                        } else -1 === d.type ? d.t[d.p] = d.xs0 : d.setRatio && d.setRatio(a);
                        else d.t[d.p] = b + d.xs0;
                        d = d._next
                    } else
                        for (; d;) 2 !== d.type ? d.t[d.p] = d.b : d.setRatio(a), d = d._next;
                else
                    for (; d;) 2 !== d.type ? d.t[d.p] = d.e : d.setRatio(a), d = d._next
        };
        q._enableTransforms = function(a) {
            this._transform = this._transform || ra(this._target, m, !0);
            this._transformType = this._transform.svg && s || !a && 3 !== this._transformType ? 2 : 3
        };
        var bj = function() {
            this.t[this.p] = this.e;
            this.data._linkCSSP(this, this._next, null, !0)
        };
        q._addLazySet = function(a, b, c) {
            a = this._firstPT = new T(a, b, 0, 0, this._firstPT, 2);
            a.e = c;
            a.setRatio = bj;
            a.data = this
        };
        q._linkCSSP = function(a, b, c, e) {
            return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, e = !0), c ? c._next = a : e || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        };
        q._kill = function(a) {
            var b, c, e, d = a;
            if (a.autoAlpha || a.alpha) {
                d = {};
                for (c in a) d[c] = a[c];
                d.opacity = 1;
                d.autoAlpha && (d.visibility = 1)
            }
            return a.className && (b = this._classNamePT) && (e = b.xfirst, e && e._prev ? this._linkCSSP(e._prev, b._next, e._prev._prev) : e === this._firstPT && (this._firstPT = b._next), b._next && this._linkCSSP(b._next, b._next._next, e._prev), this._classNamePT = null), p.prototype._kill.call(this, d)
        };
        var bk = function(a, b, c) {
            var e, d, f;
            if (a.slice)
                for (e = a.length; - 1 < --e;) bk(a[e], b, c);
            else
                for (a = a.childNodes, e = a.length; - 1 < --e;) d = a[e], f = d.type, d.style && (b.push(pa(d)), c && c.push(d)), 1 !== f && 9 !== f && 11 !== f || !d.childNodes.length || bk(d, b, c)
        };
        return u.cascadeTo = function(a, b, c) {
            var e, d, f = E.to(a, b, c),
                g = [f],
                h = [],
                k = [],
                l = [],
                m = E._internals.reservedProps;
            a = f._targets || f.target;
            bk(a, h, l);
            f.render(b, !0);
            bk(a, k);
            f.render(0, !0);
            f._enabled(!0);
            for (a = l.length; - 1 < --a;)
                if (e = aa(l[a], h[a], k[a]), e.firstMPT) {
                    e = e.difs;
                    for (d in c) m[d] && (e[d] = c[d]);
                    g.push(E.to(l[a], b, e))
                }
            return g
        }, p.activate([u]), u
    }, !0)
});

_gsScope._gsDefine && _gsScope._gsQueue.pop()();

(function(p) {
    var E = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[p]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], E) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = E())
})("CSSPlugin");

_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(p) {
        var E, C, y, m = _gsScope.GreenSockGlobals || _gsScope,
            f = 2 * Math.PI,
            u = Math.PI / 2,
            w = m.com.greensock._class,
            z = function(b, c) {
                var f = w("easing." + b, function() {}, !0),
                    m = f.prototype = new p;
                return m.constructor = f, m.getRatio = c, f
            }, q = p.register || function() {}, K = function(b, c, f, m) {
                c = w("easing." + b, {
                    easeOut: new c,
                    easeIn: new f,
                    easeInOut: new m
                }, !0);
                return q(c, b), c
            }, t = function(b, c, f) {
                this.t = b;
                this.v = c;
                f && (this.next = f, f.prev = this, this.c = f.v - c, this.gap = f.t - b)
            }, x = function(b, c) {
                var f = w("easing." + b, function(b) {
                    this._p1 = b || 0 === b ? b : 1.70158;
                    this._p2 = 1.525 * this._p1
                }, !0),
                    m = f.prototype = new p;
                return m.constructor = f, m.getRatio = c, m.config = function(b) {
                    return new f(b)
                }, f
            }, x = K("Back", x("BackOut", function(b) {
                return --b * b * ((this._p1 + 1) * b + this._p1) + 1
            }), x("BackIn", function(b) {
                return b * b * ((this._p1 + 1) * b - this._p1)
            }), x("BackInOut", function(b) {
                return 1 > (b *= 2) ? .5 * b * b * ((this._p2 + 1) * b - this._p2) : .5 * ((b -= 2) * b * ((this._p2 + 1) * b + this._p2) + 2)
            })),
            v = w("easing.SlowMo", function(b, c, f) {
                null == b ? b = .7 : 1 < b && (b = 1);
                this._p = 1 !== b ? c || 0 === c ? c : .7 : 0;
                this._p1 = (1 - b) / 2;
                this._p2 = b;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = !0 === f
            }, !0),
            c = v.prototype = new p;
        return c.constructor = v, c.getRatio = function(b) {
            var c = b + (.5 - b) * this._p;
            return this._p1 > b ? this._calcEnd ? 1 - (b = 1 - b / this._p1) * b : c - (b = 1 - b / this._p1) * b * b * b * c : b > this._p3 ? this._calcEnd ? 1 - (b = (b - this._p3) / this._p1) * b : c + (b - c) * (b = (b - this._p3) / this._p1) * b * b * b : this._calcEnd ? 1 : c
        }, v.ease = new v(.7, .7), c.config = v.config = function(b, c, f) {
            return new v(b, c, f)
        }, E = w("easing.SteppedEase", function(b) {
            b = b || 1;
            this._p1 = 1 / b;
            this._p2 = b + 1
        }, !0), c = E.prototype = new p, c.constructor = E, c.getRatio = function(b) {
            return 0 > b ? b = 0 : 1 <= b && (b = .999999999), (this._p2 * b >> 0) * this._p1
        }, c.config = E.config = function(b) {
            return new E(b)
        }, C = w("easing.RoughEase", function(b) {
            b = b || {};
            for (var c, f, m, h, q = b.taper || "none", u = [], v = 0, w = h = 0 | (b.points || 20), k = !1 !== b.randomize, x = !0 === b.clamp, y = b.template instanceof p ? b.template : null, z = "number" == typeof b.strength ? .4 * b.strength : .4; - 1 < --w;) b = k ? Math.random() : 1 / h * w, c = y ? y.getRatio(b) : b, "none" === q ? f = z : "out" === q ? (m = 1 - b, f = m * m * z) : "in" === q ? f = b * b * z : .5 > b ? (m = 2 * b, f = .5 * m * m * z) : (m = 2 * (1 - b), f = .5 * m * m * z), k ? c += Math.random() * f - .5 * f : w % 2 ? c += .5 * f : c -= .5 * f, x && (1 < c ? c = 1 : 0 > c && (c = 0)), u[v++] = {
                x: b,
                y: c
            };
            u.sort(function(b, c) {
                return b.x - c.x
            });
            f = new t(1, 1, null);
            for (w = h; - 1 < --w;) h = u[w], f = new t(h.x, h.y, f);
            this._prev = new t(0, 0, 0 !== f.t ? f : f.next)
        }, !0), c = C.prototype = new p, c.constructor = C, c.getRatio = function(b) {
            var c = this._prev;
            if (b > c.t) {
                for (; c.next && b >= c.t;) c = c.next;
                c = c.prev
            } else
                for (; c.prev && c.t >= b;) c = c.prev;
            return this._prev = c, c.v + (b - c.t) / c.gap * c.c
        }, c.config = function(b) {
            return new C(b)
        }, C.ease = new C, K("Bounce", z("BounceOut", function(b) {
            return 1 / 2.75 > b ? 7.5625 * b * b : 2 / 2.75 > b ? 7.5625 * (b -= 1.5 / 2.75) * b + .75 : 2.5 / 2.75 > b ? 7.5625 * (b -= 2.25 / 2.75) * b + .9375 : 7.5625 * (b -= 2.625 / 2.75) * b + .984375
        }), z("BounceIn", function(b) {
            return 1 / 2.75 > (b = 1 - b) ? 1 - 7.5625 * b * b : 2 / 2.75 > b ? 1 - (7.5625 * (b -= 1.5 / 2.75) * b + .75) : 2.5 / 2.75 > b ? 1 - (7.5625 * (b -= 2.25 / 2.75) * b + .9375) : 1 - (7.5625 * (b -= 2.625 / 2.75) * b + .984375)
        }), z("BounceInOut", function(b) {
            var c = .5 > b;
            return b = c ? 1 - 2 * b : 2 * b - 1, b = 1 / 2.75 > b ? 7.5625 * b * b : 2 / 2.75 > b ? 7.5625 * (b -= 1.5 / 2.75) * b + .75 : 2.5 / 2.75 > b ? 7.5625 * (b -= 2.25 / 2.75) * b + .9375 : 7.5625 * (b -= 2.625 / 2.75) * b + .984375, c ? .5 * (1 - b) : .5 * b + .5
        })), K("Circ", z("CircOut", function(b) {
            return Math.sqrt(1 - --b * b)
        }), z("CircIn", function(b) {
            return -(Math.sqrt(1 - b * b) - 1)
        }), z("CircInOut", function(b) {
            return 1 > (b *= 2) ? -.5 * (Math.sqrt(1 - b * b) - 1) : .5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
        })), y = function(b, c, g) {
            var m = w("easing." + b, function(b, c) {
                this._p1 = b || 1;
                this._p2 = c || g;
                this._p3 = this._p2 / f * (Math.asin(1 / this._p1) || 0)
            }, !0);
            b = m.prototype = new p;
            return b.constructor = m, b.getRatio = c, b.config = function(b, c) {
                return new m(b, c)
            }, m
        }, K("Elastic", y("ElasticOut", function(b) {
            return this._p1 * Math.pow(2, -10 * b) * Math.sin((b - this._p3) * f / this._p2) + 1
        }, .3), y("ElasticIn", function(b) {
            return -(this._p1 * Math.pow(2, 10 * --b) * Math.sin((b - this._p3) * f / this._p2))
        }, .3), y("ElasticInOut", function(b) {
            return 1 > (b *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * --b) * Math.sin((b - this._p3) * f / this._p2) : .5 * this._p1 * Math.pow(2, -10 * --b) * Math.sin((b - this._p3) * f / this._p2) + 1
        }, .45)), K("Expo", z("ExpoOut", function(b) {
            return 1 - Math.pow(2, -10 * b)
        }), z("ExpoIn", function(b) {
            return Math.pow(2, 10 * (b - 1)) - .001
        }), z("ExpoInOut", function(b) {
            return 1 > (b *= 2) ? .5 * Math.pow(2, 10 * (b - 1)) : .5 * (2 - Math.pow(2, -10 * (b - 1)))
        })), K("Sine", z("SineOut", function(b) {
            return Math.sin(b * u)
        }), z("SineIn", function(b) {
            return -Math.cos(b * u) + 1
        }), z("SineInOut", function(b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        })), w("easing.EaseLookup", {
            find: function(b) {
                return p.map[b]
            }
        }, !0), q(m.SlowMo, "SlowMo", "ease,"), q(C, "RoughEase", "ease,"), q(E, "SteppedEase", "ease,"), x
    }, !0)
});

_gsScope._gsDefine && _gsScope._gsQueue.pop()();

// 图片预加载对象
$(function() {
    function p() {
        this.tags = {}
    }
    var E = $(window),
        C = $("body"),
        y = $(".stage"),
        m = {
            autoResize: function() {
                var f = E.width(),
                    p = E.height();
                TweenLite.set(C, {
                    width: f,
                    height: p
                });
                m.globalScale = p / 504;
                TweenLite.set(y, {
                    width: 504,
                    height: 320,
                    "background-color": "black",
                    display: "block",
                    scale: m.globalScale,
                    x: 0,
                    y: 0
                });
                TweenLite.set(y, {
                    rotationZ: 90,
                    x: f - (f - 320 * m.globalScale) / 2
                });
                p > f && (TweenLite.set($(".loading .icon"), {
                    rotationZ: 90
                }), TweenLite.set($(".loading p"), {
                    rotationZ: 90
                }))
            },
            debug: function() {
                var f, m = $("body"),
                    p, z, q = 0;
                f = $('<div id="debugger"><div class="output"></div><div class="btns"></div></div>');
                p = f.find(".output");
                z = f.find(".btns");
                m.append(f);
                return {
                    log: function(f) {
                        q++;
                        p.html(p.html() + "<p>" + f + "</p>");
                        10 <= q && ($(p.children()[0]).remove(), q = 10);
                        $("#debugger")[0].scrollTop = 9999999
                    },
                    show: function() {
                        f.show()
                    },
                    hide: function() {
                        f.hide()
                    },
                    addBtn: function(f, m) {
                        var p = $("<button>" + f + "</button>");
                        p.off("touchstart").on("touchstart", function() {
                            m && m()
                        });
                        z.append(p)
                    }
                }
            }(),
            isGhostMode: 1
        };
    window.utils = m;
    E.off("resize", m.autoResize).on("resize", m.autoResize);
    setTimeout(m.autoResize, 0);
    p.prototype.load = function(f) {
        var m = f.tag,
            p = f.path,
            z = f.list,
            q = f.onProgress || function() {}, y = f.onComplete || function() {}, t = 0,
            x = this;
        this.tags[m] = {
            name: m,
            list: z,
            imgPool: {}
        };
        z.forEach(function(f, c) {
            var b = p + f,
                e = $("<img />").attr("src", b);
            e.on("load", function() {
                t += 1;
                var c = t / z.length * 100;
                C.append(e);
                e.css({
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                });
                x.tags[m].imgPool[f] = {
                    width: e.width(),
                    height: e.height(),
                    url: b
                };
                e.remove();
                q.apply(x, [x.tags[m], c]);
                t === z.length && y.apply(x, [x.tags[m]])
            })
        })
    };
    window.ImgLoader = p
});