! function(win, lib) {  // 叹号，加号优先级较高
        var timer,
            doc = win.document,
            docElem = doc.documentElement,
            vpMeta = doc.querySelector('meta[name="viewport"]'),
            flexMeta = doc.querySelector('meta[name="flexible"]'),
            dpr = 0,
            scale = 0,
            flexible = lib.flexible || (lib.flexible = {}); // 将flexible暴露给全局对象lib

        if (vpMeta) {
            var initial = vpMeta.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
            if (initial) {
                scale = parseFloat(initial[1]); 
                dpr = parseInt(1 / scale); 
            }
        }   else if (flexMeta) {
            var flexMetaContent = flexMeta.getAttribute("content");
            if (flexMetaContent) {
                var initial = flexMetaContent.match(/initial\-dpr=([\d\.]+)/),
                    maximum = flexMetaContent.match(/maximum\-dpr=([\d\.]+)/);
                if (initial) {
                    dpr = parseFloat(initial[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
                if (maximum) {
                    dpr = parseFloat(maximum[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
            }
        }
        // 计算dpr和scale
        if (!dpr && !scale) {
            var u = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi)), // android情况下u==null，iphone情况下u==['iphone','iphone']
                _dpr = win.devicePixelRatio; // 获得设备dpr

            dpr = u ? ((_dpr >= 3 && (!dpr || dpr >= 3)) ? 3 : (_dpr >= 2 && (!dpr || dpr >= 2)) ? 2 : 1) : 1; // android:dpr==1 iphone:自身dpr>=3且(手动设置dpr>=3,或者没有手动设置)就设置dpr==3
            scale = 1 / dpr; 
        }

        docElem.setAttribute("data-dpr", dpr);

        // 设置缩放 meta中的scale
        if (!vpMeta) {
            vpMeta = doc.createElement("meta");

            vpMeta.setAttribute("name", "viewport");
            vpMeta.setAttribute("content",
                "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no");

            if (docElem.firstElementChild) {
                docElem.firstElementChild.appendChild(vpMeta)
            } else {
                var div = doc.createElement("div");
                div.appendChild(vpMeta);
                doc.write(div.innerHTML);
            }
        }
        // 设置字体大小
        function setFontSize() {
            var winWidth = docElem.getBoundingClientRect().width;

            if (winWidth / dpr > 540) {
                (winWidth = 540 * dpr);
            }

            var baseSize = winWidth / 10;

            docElem.style.fontSize = baseSize + "px";
            flexible.rem = win.rem = baseSize;
        }
        // 大小改变事件
        win.addEventListener("resize", function() {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }, false);
        // 方向改变事件，横屏/竖屏
        win.addEventListener("orientationchange", function() {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }, false);
        // 页面显示事件
        win.addEventListener("pageshow", function(e) {
            if (e.persisted) {
                clearTimeout(timer);
                timer = setTimeout(setFontSize, 300);
            }
        }, false);

        if ("complete" === doc.readyState) {
            doc.body.style.fontSize = 12 * dpr + "px";
        } else {
            doc.addEventListener("DOMContentLoaded", function() {
                doc.body.style.fontSize = 12 * dpr + "px";
            }, false);
        }

        setFontSize();

        flexible.dpr = win.dpr = dpr;

        flexible.refreshRem = setFontSize;

        flexible.rem2px = function(d) {
            var c = parseFloat(d) * this.rem;
            if ("string" == typeof d && d.match(/rem$/)) {
                c += "px";
            }
            return c;
        };

        flexible.px2rem = function(d) {
            var c = parseFloat(d) / this.rem;

            if ("string" == typeof d && d.match(/px$/)) {
                c += "rem";
            }
            return c;
        }
    }(window, window.lib || (window.lib = {}));  // 创建一个全局对象