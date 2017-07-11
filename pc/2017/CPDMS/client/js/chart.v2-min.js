$(document).ready(function() {
  function e(e) {
    0 == e ? (c = .8 * c, p = .8 * p) : (c /= .8, p /= .8);
    var t = d[0][0].getAttribute("viewBox").split(",");
    d[0][0].setAttribute("viewBox", "" + parseInt(t[0]) + "," + parseInt(t[1]) + "," + c + "," + p)
  }

  function t(e, t) {
    var a = e,
      n = {},
      r = {};
    return a.forEach(function(e, t) {
      switch (e.articletype) {
        case "website":
          mediaType = " éå ¢ç¶ç»æ¬ç´", imageSrc = "/v2/images/small/global.svg";
          break;
        case "weibo":
          mediaType = " éå äºéæ°¾ç´", imageSrc = "/v2/images/small/weibo.svg";
          break;
        case "weixin":
          mediaType = " éå äºæ·âç´", imageSrc = "/v2/images/small/wechat.svg";
          break;
        case "webapp":
          mediaType = " éåPPéï¿½", imageSrc = "/v2/images/small/mobile.svg";
          break;
        case "webbbs":
          mediaType = " éå £îé§æ¶³ç´", imageSrc = "/v2/images/small/group.svg";
          break;
        case "news":
          mediaType = " éå å§¤ç»¾é©ç´", imageSrc = "/v2/images/small/paper.svg";
          break;
        case "null":
          mediaType = " éå æ½µå©§æªè´ç»ç´ç´", imageSrc = "/v2/images/small/empty.svg";
          break;
        default:
          mediaType = " éå æ¹­é­ã¯ç´", imageSrc = "/v2/images/small/question.svg"
      }
      switch (e.sourcetype) {
        case "website":
          mediaType = " éå ¢ç¶ç»æ¬ç´", sourceSrc = "/v2/images/small/global.svg";
          break;
        case "weibo":
          mediaType = " éå äºéæ°¾ç´", sourceSrc = "/v2/images/small/weibo.svg";
          break;
        case "weixin":
          mediaType = " éå äºæ·âç´", sourceSrc = "/v2/images/small/wechat.svg";
          break;
        case "webapp":
          mediaType = " éåPPéï¿½", sourceSrc = "/v2/images/small/mobile.svg";
          break;
        case "webbbs":
          mediaType = " éå £îé§æ¶³ç´", sourceSrc = "/v2/images/small/group.svg";
          break;
        case "news":
          mediaType = " éå å§¤ç»¾é©ç´", sourceSrc = "/v2/images/small/paper.svg";
          break;
        case "null":
          mediaType = " éå æ½µå©§æªè´ç»ç´ç´", sourceSrc = "/v2/images/small/empty.svg";
          break;
        default:
          mediaType = " éå æ¹­é­ã¯ç´", sourceSrc = "/v2/images/small/question.svg"
      }
      r[e.target] || (r[e.target] = e.articletype), !u[e.target] && (u[e.target] = []), u[e.target].indexOf(e.papername) < 0 && u[e.target].push(e.papername), e.from = e.source, e.to = e.target, e.target = n[e.target] || (n[e.target] = { dataType: "target", name: e.target, type: e.type, targetType: e.articletype, imageSrc: imageSrc, papername: e.papername }), e.source = n[e.source] || (n[e.source] = { dataType: "source", name: e.source, type: e.type, sourceType: e.sourcetype, imageSrc: sourceSrc })
    }), { links: a, nodes: n }
  }

  function a(e, t) {
    function a() { t.hide(), t.siblings(".fn-s-screen").show(), p.setAttribute("width", n), p.setAttribute("height", r), p.setAttribute("viewBox", "" + parseInt(c[0]) + "," + parseInt(c[1]) + "," + n + "," + r) }
    var n = $(top.window).width(),
      r = $(top.window).height() - 148,
      i = $(top.document.body),
      s = i.find("#myframe"),
      o = i.find("#content").children(".sidebar"),
      l = o.eq(0).outerWidth() + o.eq(1).outerWidth(),
      c = d[0][0].getAttribute("viewBox").split(","),
      p = d[0][0];
    e ? (top.full = !0, s.css({ position: "fixed", left: l, "z-index": 1e3 }).animate({ left: 0 }, 30, function() { a() })) : (top.full = !1, n = $("body").width() - l, r = $("body").height() - 48, s.animate({ left: l }, 30, function() { a(), s.css("position", "static") }))
  }
  var n = /\/(\w+)\.aspx/,
    r = top.location.href,
    i = location.search,
    s = null;
  (s = n.exec(r)) && ("newsreprinted" != s[1] ? top.full === !0 ? ($("#fn-s-screen").hide(), $("#fn-s-exitScreen").show()) : ($("#fn-s-screen").show(), $("#fn-s-exitScreen").hide()) : i += "&sametype=3"), $(".fn-s-header").click(function() {
    var e = $(this);
    e.hasClass("open") ? (e.removeClass("open"), e.siblings(".fn-s-body").hide()) : (e.addClass("open"), e.siblings(".fn-s-body").show())
  });
  var o = $(top.document.body),
    l = null;
  l = o.find("#myframe").length ? o.find("#myframe") : o.find("#chartIframe");
  var c = l.outerWidth() > 858 ? l.outerWidth() : 858,
    p = l.outerHeight() - 48 > 800 ? l.outerHeight() - 48 : 800,
    d = null,
    u = {};
  $.post("/Command/dataPost.aspx" + i, function(e) {
    function a(e) {
      e ? (v = v.data(l), v.enter().append("path").attr("class", function(e) {
        return e.onlyTag ? "link " + e.type + " " + e.onlyTag : "link " + e.type
      })) : (v = v.data(l), v.enter().append("path").attr("class", function(e) {
        return e.onlyTag ? "link " + e.type + " " + e.onlyTag : "link " + e.type
      }).attr("marker-end", function(e) {
        return "url(#" + e.type + ")"
      })), b = b.data(m), b.enter().append("text").attr("x", 8).attr("y", "0.31em").attr("class", function(e) {
        return e.onlyTag ? "text " + e.type + " " + e.onlyTag : "text " + e.type
      }).text(function(e) {
        return e.name
      }), y = y.data(m), y.enter().append("image").attr("xlink:href", function(e) {
        return e.imageSrc
      }).attr("width", "20px").attr("height", "20px").attr("class", function(e) {
        return e.onlyTag ? "node " + e.type + " " + e.onlyTag : "node " + e.type
      }).on("click", function(e, t) {
        if (e && !e.unclickable) {
          if (!e.targetType || "website" != e.targetType && "webapp" != e.targetType && "webbbs" != e.targetType) {
            for (var n = !1, r = l.length, i = 0; i < r; i++) {
              var s = l[i];
              s.to == e.name && (n = !0)
            }
            if (!n) return
          } else;
          if (e.loaded) {
            var o = $("." + e.onlyTag);
            "none" == o.eq(0).css("display") ? o.show() : o.hide()
          } else {
            e.loaded = !0;
            var c = e.name,
              p = {};
            for (var i in u)
              if (i === c) {
                var d = u[i],
                  g = d.length,
                  p = null,
                  f = 360 / g,
                  h = Math.PI,
                  y = "only" + parseInt(1e10 * Math.random());
                e.onlyTag = y;
                for (var b = 0; b < g; b++) p = { dataType: "target", unclickable: !0, imageSrc: e.imageSrc, name: d[b], type: "extend", onlyTag: y, index: e.index + 1, weight: e.weight + 10, x: e.x + 100 * Math.cos(f * (b + 1) * h / 180), y: e.y + 100 * Math.sin(f * (b + 1) * h / 180), px: e.px + 100 * Math.cos(f * (b + 1) * h / 180), py: e.py + 100 * Math.sin(f * (b + 1) * h / 180) }, m.push(p), l.push({ source: e, target: p, type: "extend", onlyTag: y })
              }
            a(!0)
          }
        }
      }).call(h.drag), h.start()
    }

    function n() {
      v.attr("d", i), y.attr("x", function(e) {
        return e.x - 8
      }).attr("y", function(e) {
        return e.y - 8
      }), b.attr("transform", r)
    }

    function r(e) {
      return "translate(" + e.x + "," + e.y + ")"
    }

    function i(e) {
      if (e.source.x != e.target.x) {
        var t = e.source.x,
          a = e.source.y,
          n = e.target.x,
          r = e.target.y,
          i = Math.sqrt((n - t) * (n - t) + (r - a) * (r - a)),
          s = (n - t) / i * 8 + t,
          o = (r - a) / i * 8 + a,
          l = (n - t) / i * (i - 8) + t,
          c = (r - a) / i * (i - 8) + a,
          p = l - s,
          d = c - o,
          u = Math.sqrt(p * p + d * d);
        return "M" + s + "," + o + "A" + u + "," + u + " 0 0,1 " + l + "," + c
      }
      var p = e.target.x - e.source.x,
        d = e.target.y - e.source.y,
        u = Math.sqrt(p * p + d * d);
      return "M" + e.source.x + "," + e.source.y + "A" + u + "," + u + " 0 0,1 " + e.target.x + "," + e.target.y
    }
    var s = JSON.parse(e);
    $(".fn-innerContent-headBox-label:eq(0)>span").html("&nbsp;" + s.count + "&nbsp;"), $(".fn-innerContent-headBox-label:eq(1)>span").html("&nbsp;" + s.mediacount + "&nbsp;"), $(".fn-s-svgLoad").hide();
    var o = t(s.data, !0),
      l = o.links,
      g = o.nodes,
      m = d3.values(g),
      f = l.length <= 160 ? 80 : l.length <= 240 ? 100 : 120,
      h = d3.layout.force().nodes(m).links(l).size([c, p]).linkDistance(f).charge(-300).on("tick", n);
    d = d3.select("body").append("svg").attr("width", c).attr("height", p).attr("viewBox", "0, 0, " + c + ", " + p), d.append("defs").selectAll("marker").data(["suit", "licensing", "resolved"]).enter().append("marker").attr("id", function(e) {
      return e
    }).attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("refY", 0).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("style", function(e) {
      switch (e) {
        case "suit":
          return "fill: #666;";
        case "licensing":
          return "fill: rgb(247, 68, 97)";
        case "resolved":
          return "fill: rgb(3, 101, 100)";
        default:
          return "fill: #999"
      }
    }).attr("d", "M0,-5L10,0L0,5"), d.append("g").attr("class", "fn-s-nodeG").attr("id", "fn-s-nodeG"), d.append("g").attr("class", "fn-s-textG").attr("id", "fn-s-textG"), d.append("g").attr("class", "fn-s-linkG").attr("id", "fn-s-linkG"), d.append("g").attr("class", "fn-s-lineG").attr("id", "fn-s-lineG");
    var y = d.select("#fn-s-nodeG").selectAll("image"),
      b = d.select("#fn-s-textG").selectAll("text"),
      v = d.select("#fn-s-linkG").selectAll("path");
    d.select("#fn-s-lineG").selectAll("line");
    a()
  }), $("body").mousedown(function(t) {
    if (d) {
      if ("svg" != t.target.localName) return !1;
      var a = d[0][0].getAttribute("viewBox").split(","),
        n = t.pageX,
        r = t.pageY;
      $(document).bind("mousemove", function(e) {
        var t = e.pageX - n,
          i = e.pageY - r;
        d[0][0].setAttribute("viewBox", "" + (parseInt(a[0]) - t) + "," + (parseInt(a[1]) - i) + "," + a[2] + "," + a[3])
      }), $(document).mouseup(function() { $(document).unbind("mousemove") }), $("body").get(0).onmousewheel = function(t) {
        if (t = t || window.event, t.wheelDelta / 12, t.wheelDelta > 0) e(0);
        else {
          if (!(t.wheelDelta < 0)) return;
          e(1)
        }
        return !1
      }
    }
  }), $(".zoom_out_map").bind("click", function() { e(0) }), $(".zoom_in_map").bind("click", function() { e(1) }), $("#fn-s-screen").bind("click", function() { a(!0, $(this)) }), $("#fn-s-exitScreen").bind("click", function() { a(!1, $(this)) }), $(window).resize(function() {
    var e = d[0][0],
      t = $(top.document.body),
      a = (t.find("#myframe"), t.find("#content").children(".sidebar")),
      n = d[0][0].getAttribute("viewBox").split(","),
      r = a.eq(0).outerWidth() + a.eq(1).outerWidth(),
      i = t.width() - r > 200 ? t.width() - r : 200,
      s = t.height() - 48 > 200 ? t.height() - 48 : 200;
    e.setAttribute("width", i), e.setAttribute("height", s), e.setAttribute("viewBox", "" + parseInt(n[0]) + "," + parseInt(n[1]) + "," + i + "," + s)
  })
});
