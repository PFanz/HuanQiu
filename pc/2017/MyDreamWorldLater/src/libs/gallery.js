var Gallery = (function () {
  // IE 11 以上
  function e () {
    var t = navigator.userAgent.toLowerCase(),
      e = /(webkit)[ \/]([\w.]+)/,
      n = /(opera)(?:.*version)?[ \/]([\w.]+)/,
      i = /(msie) ([\w.]+)/,
      o = /(mozilla)(?:.*? rv:([\w.]+))?/,
      r = e.exec(t) || n.exec(t) || i.exec(t) || t.indexOf('compatible') < 0 && o.exec(t) || []
    var b = { browser: r[1] || '', version: r[2] || '0', msie: r[1] == 'msie' }
    return b.msie == 1 ? b.version : 11
  }

  function l (e) {
    var l = e.options,
      i = l.galleryContainer.find('.gallery_item'),
      t = i.length,
      n = i.width(),
      a = i.height()
    if (t == l.slidesPerView) {
      var o = l.galleryContainer.html()
      l.galleryContainer.append(o), i = l.galleryContainer.find('.gallery_item')
    }
    i.each(function () { $(this).css('margin-left', -n / 2), $(this)[0].style[g + 'ransitionDuration'] = l.speed + 'ms' }), e.options.galleryContainer.css({ width: n * l.slidesPerView, height: a }), r(e, l.initialSlide)
  }

  function t (e) {
    {
      var l = e.options.galleryContainer
      e.options.galleryContainer.find('.gallery_item').length
    }
    e.fs = l.find('.gallery_active'), e.rm = l.find('.gallery_right_middle'), e.rb = l.find('.gallery_right_back'), e.lm = l.find('.gallery_left_middle'), e.lb = l.find('.gallery_left_back')
  }

  function n (e) {
    var l = e.options,
      i = l.galleryContainer.find('.gallery_item'),
      t = i.length,
      n = $(l.gallery_prev),
      r = $(l.gallery_next)
    if (n.length > 0 && n.click(function () { e.lm.click() }), r.length > 0 && r.click(function () { e.rm.click() }), l.galleryContainer.on('click', '.gallery_item', function () {
      var l = $(this),
        i = l.index()
      e.toSlide(i)
    }), l.autoPlay) {
      setInterval(function () {
        var l = $('.gallery_active').index()
        l = (l + 1) % t, e.toSlide(l)
      }, l.autoPlay)
    }
  }

  function r (l, i, n) {
    var r = l.options,
      o = r.galleryContainer.find('.gallery_item'),
      d = o.length
    o.eq(i).addClass('gallery_active')
    var g = (i + 1) % d
    o.eq(g).addClass('gallery_right_middle')
    var f = (i - 1 + d) % d
    if (o.eq(f).addClass('gallery_left_middle'), r.slidesPerView == 5) {
      var y = (i + 2) % d
      o.eq(y).addClass('gallery_right_back')
      var c = (i - 2 + d) % d
      o.eq(c).addClass('gallery_left_back')
    }
    t(l), e() < 10 && typeof n === 'number' && ((i > n && i != 0 || i == 0 && n == d - 1) && (o.removeClass('z-index3 z-index2'), l.rm.addClass('z-index2'), l.lm.addClass('z-index3')), (n > i && i != d - 1 || i == d - 1 && n == 0) && (o.removeClass('z-index3 z-index2'), l.lm.addClass('z-index2'), l.rm.addClass('z-index3'))), s(l), r.slidesPerView == 5 ? a([i, g, y, f, c], l) : a([i, g, f], l)
  }

  function a (e, l) { for (var i = l.options, t = i.galleryContainer.find('.gallery_item'), n = t.length, r = 0; n > r; r++) $.inArray(r, e) > -1 || o(l, t.eq(r), 0, 0, 8 * i.depth) }

  function o (e, l, i, t, n) {
    if (l[0].style[g + 'ransform'] = 'translate3d(' + -t + 'px,0,' + -n + 'px) rotateX(0deg) rotateY(' + i + 'deg)', !g) {
      var r = -e.options.galleryContainer.find('.gallery_item').width()
      l.animate({ 'margin-left': r / 2 - t }, e.options.speed, 'linear')
    }
  }

  function s (e) {
    {
      var l = e.options,
        i = l.galleryContainer,
        t = i.find('.gallery_item'),
        n = t.width()
      t.height()
    }
    o(e, i.find('.gallery_left_middle'), l.rotate, n + l.stretch, l.depth), o(e, i.find('.gallery_active'), 0, 0, 0), o(e, i.find('.gallery_right_middle'), -l.rotate, -n - l.stretch, l.depth), l.slidesPerView == 5 && (o(e, i.find('.gallery_left_back'), 1.4 * l.rotate, 2 * (n + l.stretch), 2 * l.depth), o(e, i.find('.gallery_right_back'), 1.4 * -l.rotate, 2 * (-n - l.stretch), 2 * l.depth))
  }

  function d (e, l) {
    var i = { index: l }
    if (typeof e.options.onGalleryStart === 'function' && e.options.onGalleryStart(i), typeof e.options.onGalleryEnd === 'function') {
      var t = e.options
      setTimeout(function () { t.onGalleryEnd(i) }, t.speed)
    }
    var n = e.fs.index()
    n != l && (e.fs.removeClass('gallery_active'), e.rm.removeClass('gallery_right_middle'), e.lm.removeClass('gallery_left_middle'), e.rb.removeClass('gallery_right_back'), e.lb.removeClass('gallery_left_back'), r(e, l, n))
  }
  var g = (function () {
      if (e() < 10) return !1
      var l, t = document.createElement('div').style,
        n = 't,WebkitT,MozT,msT,OT'.split(',')
      for (i = 0; i < n.length; i++) { if (l = n[i] + 'ransform', l in t) return n[i] }
    }()),
    f = function (e) { this.options = $.extend({ rotate: 50, stretch: 0, depth: 150, slidesPerView: 5, speed: 500, initialSlide: 0 }, e), this.options.galleryContainer = $(e.galleryContainer), this.fs = null, this.rm = null, this.rb = null, this.lm = null, this.lb = null, l(this), n(this) }
  return f.prototype = { toSlide: function (e) { d(this, e) } }, { create: function (e) { return new f(e) } }
}())
