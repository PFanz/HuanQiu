/**
 * Created by sq on 2016/4/7.
 * 支持list if语句，现已支持嵌套使用
 * list语句传入的是array 对象，其他的传入的是obj对象
 * 由于现在模板，在套用之前，需要将数据事先处理一遍，现在添加给添加一个标识，里面用带有本字段的函数
 * 1. 添加优先取哪个字段 -- step two  --已添加-对函数也添加了此操作
 * 2. 实现简单的四则运算和三目运算 -- step three  --开始-暂停
 * 3. 如果是循环语句，将index暴露在模板上--step one --已添加
 */

(function ($) {
    $.extend({
        multiMode: function (options) {
            var _default = {
                "template": "",       //必须传进去               "_class": "",         //默认为fn+mode
                "removeClass": "",    //需要移除的class
                "data": [],           //解析的数据                "beforeInit": null,
                "afterInit": null
            };
            options = $.extend({}, _default, options);
            function MultiMode() {
                this.options = options;
                this.$con = this.options.$con;
            }

            //去除单引号/双引号
            MultiMode.prototype.delQuot = function (str) {
                if (typeof str == "string") {   //先判断是否是字符串类型，如果不是直接返回传入的值
                    var reg = /'(.*?)'|"(.*?)"/g;
                    while (match = reg.exec(str)) {
                        if (match[0].indexOf('"') == 0) {
                            str = str.replace(match[0], "&quot;" + (match[1] ? match[1] : match[2]) + "&quot;");
                        } else {
                            str = str.replace(match[0], "&apos;" + (match[1] ? match[1] : match[2]) + "&apos;");
                        }
                    }
                    str = str.replace(/"|'/g, " ");  //将不符合成对出现的"|'用空格代替
                }
                return str;
            };
            //取数据，允许设置优先取哪个字段，就把优先取的字段放在前面，使用|分隔开
            MultiMode.prototype.super = function (str, data) {
                var arr = str.split("|"),
                    len = arr.length, ai = null;
                for (var i = 0; i < len; i++) {
                    ai = $.trim(arr[i]);
                    if (data[ai]) {
                        return this.delQuot(data[ai]);  // 进行去除特殊字符串操作
                    }
                }
                return "";
            };
            //返回一个拼接好的html片段
            MultiMode.prototype.innerListOp = function (data, template) {
                var code = "var r = []; \n",
                    html = "";
                var reg = /\{([^\}]+)?\}/g,
                    match = null,
                    cursor = 0, i = 0;
                var self = this;
                template = template.replace(/\"/g, "'");
                //当是if或者elseif时， tag-true: if  tag-false: true
                function ifCase(str, tag) {
                    var regInner = /\((.+)\)/g, matchInner = null;
                    if (matchInner = regInner.exec(str)) {
                        var ss = matchInner[1];
                        var matchIf = null;
                        var regIf = /\$\$index|\s*[a-zA-Z_]\w*\s*/g;
                        while (matchIf = regIf.exec(ss)) {
                            var ssIf = $.trim(matchIf[0]);
                            var ii = str.indexOf(ssIf);
                            var sign = str.substring(ii - 1, ii);
                            //console.log(ssIf);
                            if (!/^indexOf|substring|substr$/.test(ssIf) && sign !== '"' && sign !== "'") {

                                if (ssIf.indexOf("|") >= 0) {  //看看是否有多个字段选项
                                    str = str.replace(ssIf, self.super(ssIf, data));
                                } else if (!(ssIf == "true" || ssIf == "false")) {
                                    if (data[ssIf] !== undefined) {//如果含有此字段，则取值，否则，不变
                                        if (typeof data[ssIf] === "number") {
                                            str = str.replace(ssIf, data[ssIf]);
                                        } else {
                                            str = str.replace(ssIf, "\"" + data[ssIf] + "\"");
                                        }
                                    } else {
                                        str = str = str.replace(ssIf, undefined);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (console) {
                            console.log("判断条件必须包含在(英文括号)里面");
                        }
                    }
                    if (!tag) {
                        str = str.replace("elseif", "}else if");
                    }
                    return str;
                }

                var innerMatch = null;
                if (innerMatch = /\{#list(\s*(([a-zA-Z_]\w*\s*\|\s*)*([a-zA-Z_]\w*)))?\}/.exec(template)) {
                    var innerEnd = template.lastIndexOf("{#/list}"),
                        innerTemp = template.substring(innerMatch.index, innerEnd + 8),
                        filed = $.trim(innerMatch[1]);
                    html = this.splitTemplate(innerTemp, data, filed);
                    template = template.substring(0, innerMatch.index) + html.replace(/\n|\r|\t/g, "") + template.substring(innerEnd + 8);  //改变模板
                }
                while (match = reg.exec(template)) {
                    var m1 = match[1];                   //匹配的字符串
                    var regOther = /^#[if|else|\/if]+/;
                    var regFun = /fun_([a-zA-Z]\w*)\(((((\w*|(([a-zA-Z_]\w*\s*\|\s*)*([a-zA-Z_]\w*)))\s*,\s*)+)?(\w*|(([a-zA-Z_]\w*\s*\|\s*)*([a-zA-Z_]\w*))))\)/;//测试是否传入的是一个函数，添加了判断一下是否有优先选择参数的情况，判断代码为(([a-zA-Z_]\w*\s*\|\s*)*([a-zA-Z_]\w*))
                    var match0 = match[0],
                        match1 = m1.substring(1);
                    code += "r.push(\"" + template.substring(cursor, match.index) + "\");\n";
                    var mJudge = m1.match(regOther);
                    if (mJudge) {
                        var switchReg = $.trim(mJudge[0]).substring(1);
                        switch (switchReg) {
                            case "if":
                                code += ifCase(match1, true) + "{\n";
                                break;
                            case "/if":
                                code += "\n}";
                                break;
                            case "else":
                                code += ("\n}" + match1 + "{\n");
                                break;
                            case "elseif":
                                code += ifCase(match1, false);
                                code += "{\n";
                        }
                    } else if (m1 == "this") {
                        if ((data instanceof Object) && data.$$change) {
                            code += "r.push(\"" + data.$$value + "\");\n";
                        } else {
                            code += "r.push(\"" + data + "\");\n";
                        }
                    } else if (regFun.test(m1)) {  //如果里面包含处理函数，进行特殊处理
                        var matchFun = regFun.exec(m1);
                        var funName = matchFun[1] + "(";
                        var funArgs = matchFun[2];
                        var funArgsArr = funArgs.split(","),
                            funAl = funArgsArr.length;
                        if (funAl) {
                            //对于函数参数，如果是字符串，则先检测传来的data中是否有此字段，如果有，取此字段的值，如果没有，则，直接传过去此字符串。如果是个数字，直接传数字
                            var fnAi = null,
                                regNum = /\d+/g;//用于检测是否是数字
                            for (var w = 0; w < funAl; w++) {
                                fnAi = $.trim(funArgsArr[w]); //去除空格
                                if (regNum.test(fnAi)) {
                                    funName += parseInt(fnAi);
                                } else if (fnAi.indexOf("|") >= 0) {
                                    funName += ("'" + self.super(fnAi, data) + "'");
                                } else {
                                    if (data[fnAi] !== undefined) {
                                        funName += ("'" + self.delQuot(data[fnAi]) + "'");
                                    } else {
                                        funName += ("'" + fnAi + "'");
                                    }
                                }
                                funName += ",";
                            }
                            funName = funName.substring(0, funName.length - 1) + ")";
                            code += "r.push(\"" + this.delQuot(eval(funName)) + "\");";
                        }
                    } else {    //单纯的取值操作
                        code += "r.push(\"" + self.handleArgs(m1, data) + "\");";
                    }
                    cursor = match.index + match0.length;
                }
                code += "r.push(\"" + template.substring(cursor) + "\");\n";
                code += "return r.join(\"\");\n";
                //console.log(code);
                var fun = new Function(code);
                html = fun();
                return html;
            };
            /*
             * 对if的条件或者函数参数或者不包含在if、函数、list里面的字符串进行处理
             * */
            MultiMode.prototype.handleArgs = function (arg, data) {
                var needVal = arg,
                    self = this;
                /*
                 * 四目运算
                 * */
                var regMathFour = /\s*(\$\$index|\w+\s*)([/\+\-\*\%])(\s*\w+)/,  //四则运算+取余正则
                    fourMatch = null;
                var regThree = /(.+)\?(\s*\w+\s*):(\s*\w+\s*)/,
                    threeMatch = null;
                var regSelf = /(\s*\$\$index|\w+\s*)?(\+\+|--)(\s*\$\$index|\w+\s*)?/,
                    selfMatch = null;   //自加 自减
                var regString = /([a-zA-Z_]\w*)\.(substr|substring)\((\s*\d+\s*)(,\s*\d+\s*)\)/,
                    strMatch = null;//字符串相关操作
                if (fourMatch = regMathFour.exec(arg)) {
                    var first = $.trim(fourMatch[1]),
                        op = fourMatch[2],
                        second = fourMatch[3];
                    first = self.handleDtVal(first, data);
                    second = self.handleDtVal(second, data);
                    if (op != "+") {
                        if (!(parseInt(first)) || !(parseInt(second))) {
                            needVal = "error";
                            console && console.log("运算符两边必须都是数字");
                        } else {
                            first = parseInt(first);
                            second = parseInt(second);
                            switch (op) {
                                case "-":
                                    needVal = first - second;
                                    break;
                                case "*":
                                    needVal = first * second;
                                    break;
                                case "/":
                                    needVal = first / second;
                                    break;
                                case "%":
                                    needVal = first % second;
                                    break;
                            }
                        }
                    } else {
                        if ((typeof parseInt(first) == "number") && (typeof parseInt(second)) == "number") {
                            needVal = parseInt(first) + parseInt(second);
                        } else if (first && second) {  //当相加的另个都不为false时
                            needVal = first + second;
                        } else {
                            needVal = NaN;
                        }
                    }
                } else if (threeMatch = regThree.exec(arg)) {//是否含有三目运算符
                    var condition = $.trim(threeMatch[1]),
                        yes = self.handleDtVal($.trim(threeMatch[2]), data),
                        no = self.handleDtVal($.trim(threeMatch[3]), data);
                    var conReg = /\s*(\$\$index|\w+\s*)(>=|>|<=|<|===|==|\.indexOf\((\s*(\w|[\u4E00-\u9FA5\uf900-\ufa2d])+\s*)\))?(\s*\w+\s*)?/; //
                    var conMatch = conReg.exec(condition);
                    var conFirst = conMatch[1],
                        finalVal = self.handleDtVal(conFirst, data),
                        threeOp = conMatch[2];
                    if (threeOp) {
                        var rightCon = "";
                        if (conMatch[3]) {  //      +|-|*|/|%操作
                            rightCon = conMatch[3] ? conMatch[3] : (conMatch[4] ? conMatch[4] : conMatch[5]);
                            switch (conMatch[2]) {
                                case ">=":
                                    needVal = (finalVal >= rightCon ? yes : no);
                                    break;
                                case ">":
                                    needVal = (finalVal > rightCon ? yes : no);
                                    break;
                                case "<=":
                                    needVal = (finalVal <= rightCon ? yes : no);
                                    break;
                                case "<":
                                    needVal = (finalVal < rightCon ? yes : no);
                                    break;
                                case "===":
                                    needVal = (finalVal === rightCon ? yes : no);
                                    break;
                                case "==":
                                    needVal = (finalVal == rightCon ? yes : no);
                                    break;
                                default:
                                    needVal = (finalVal && finalVal.indexOf(rightCon)) >= 0 ? yes : no;
                            }
                        }
                    } else {
                        needVal = finalVal;
                    }
                } else if (selfMatch = regSelf.exec(arg)) {  //自加自减
                    var selfOp = selfMatch[2];
                    var selfOne = $.trim(selfMatch[1]),
                        selfTwo = $.trim(selfMatch[3]),
                        opVal = selfOne ? self.handleDtVal(selfOne, data) : self.handleDtVal(selfTwo, data);
                    if ((typeof opVal) == "number") {
                        if (selfOne) {
                            switch (selfOp) {
                                case "++":
                                    needVal = opVal++;
                                    break;
                                case "--":
                                    needVal = opVal--;
                                    break;
                            }
                        } else {
                            switch (selfOp) {
                                case "++":
                                    needVal = ++pVal;
                                    break;
                                case "--":
                                    needVal = --opVal;
                                    break;
                            }
                        }
                    } else {
                        needVal = opVal + selfOp;
                    }
                } else if (strMatch = regString.exec(arg)) {
                    var key = strMatch[1],
                        val = self.handleDtVal(key, data),
                        op = strMatch[2],
                        firstA = parseInt($.trim(strMatch[3])),
                        secondA = strMatch[4] ? parseInt($.trim(strMatch[4]).substring(1)) : undefined;
                    if (val) {
                        switch (op) {
                            case "substr":
                                needVal = secondA ? val.substr(firstA, secondA) : val.substr(firstA);
                                break;
                            case "substring":
                                needVal = secondA ? val.substring(firstA, secondA) : val.substring(firstA);
                                break;
                        }
                    } else {
                        needVal = val;
                    }
                } else if (arg.indexOf("|") >= 0) {
                    needVal = self.super(arg, data);
                } else {
                    needVal = self.handleDtVal(arg, data);
                }
                return needVal;
            };
            /*
             * 当取key对应的值时，进行处理操作
             * 先判断key是不是数字，如果是数字，则直接返回
             * 不是数字，再单独处理
             * */
            MultiMode.prototype.handleDtVal = function (key, data) {
                var reg = /^\d+$/;   //先判断
                if (reg.test(key)) {
                    return key;
                } else {
                    var val = data[key], quatMatch = null;
                    if (val !== undefined) {
                        if (typeof val === "string") {     //检测是否是字符串，非字符串没有match方法，会报错
                            val = val.replace(/<|>/g, " ");
                            if (quatMatch = val.match(/"\w*"|"[\u4E00-\u9FA5\uf900-\ufa2d]+"/g)) {
                                val = this.delQuot(val).replace(/\t|\n|\r/g, " ").replace(/\\/g, "");
                            } else {
                                val = val.replace(/\t|\n|\r/g, " ").replace(/\\/g, "");
                            }
                        } else if (typeof val === "number") {

                        } else if ($.isArray(val)) {   //如果是数组，则转成空格隔开的字符串
                            val = val.join(" ");
                        } else if (val instanceof Object) {
                            var alt = "";
                            for (var i in val) {
                                alt += "<div>key: " + i + ", val: " + val[i] + "</div>"
                            }
                            val = alt;
                        } else {
                            //val = "";
                            if (console) {
                                console.log("值为" + typeof val + "类型时，尚未做操作。");
                            }
                        }
                        return val;
                    } else {
                        return undefined;
                    }
                }

            };
            //假设进来的模板都{#list}{#/list}成对出现的，返回的是一个html字符串片段
            MultiMode.prototype.checkHorizontalList = function (template, data) {
                var code = "";
                var regList = /(\{#list(\s+\w*)\}|\{#list\})[^#]+\{\#\/list}/g;
                var match, cursor = 0;
                while (match = regList.exec(template)) {
                    var startIndex = match.index;
                    code += template.substring(cursor, startIndex);
                    cursor = startIndex + match[0].length;
                    code += this.innerListOp(data, match[0]);
                }
                return code;
            };
            MultiMode.prototype.concatHtml = function (tpl, data, filed) {
                var code = "", str = "";
                if (filed) {
                    filed = $.trim(filed);
                    if ($.isArray(data)) {

                    } else {
                        data = filed.indexOf("|") >= 0 ? this.super(filed, data) : data[filed];
                    }
                }
                if ((data instanceof Array)) {
                    for (var i = 0; i < data.length; i++) {
                        var di = data[i];
                        if (di instanceof Object) {  //给循环遍历的模板添加$index
                            di.$$index = i;
                        } else {  //对于非对象，转成对象格式，在做替换的时候，做下判断
                            di = {
                                $$change: true,
                                $$value: di,
                                $$index: i
                            };
                        }
                        str = this.innerListOp(di, tpl);
                        code += str + "\n";
                    }
                } else {
                    str = this.innerListOp(data, tpl);
                    code += str + "\n";
                }
                return code;
            };
            //判断是否有list循环操作
            /*
             * 遍历操作会有两种现象
             * {#list}{#/list}{#list}{#/list}或者是{#list}{#list}{#/list}{#/list}
             * */
            MultiMode.prototype.splitTemplate = function (template, data, filed) {
                var regList = /\{#list(\s*(([a-zA-Z_]\w*\|)*([a-zA-Z_]\w*)))?\}/,
                    startMatch = null,
                    code = '', str = '', _this = this;
                if (startMatch = regList.exec(template)) {
                    var lastMatchIndex = template.lastIndexOf("{#/list}");//获取{#/list}的结束位置
                    var innerTemp = startMatch ? template.substring(startMatch.index + startMatch[0].length, lastMatchIndex) : template; //获取list里面的数据
                    code += _this.innerListOp(data, template.substring(0, startMatch.index));
                    //判断中间是否有{#list}
                    var innerMatch = null;
                    if (innerMatch = regList.exec(innerTemp)) {//里面也存在list标志
                        var innerEndIndex = innerTemp.indexOf("{#/list}");
                        //并列的循环
                        if (innerMatch.index > innerEndIndex) {
                            innerTemp = startMatch[0] + innerTemp + "{#/list}";
                            code += _this.checkHorizontalList(innerTemp, data, innerMatch, innerEndIndex);
                        } else {//嵌套的循环
                            filed = innerMatch[1] ? innerMatch[1] : filed;
                            //console.log(filed);
                            code += _this.concatHtml(innerTemp, data, filed);
                        }
                    } else {   //里面不存在list标志
                        var testFiled = $.trim(startMatch[1]);
                        if (filed) {
                            if (filed.indexOf("|") >= 0) {
                                data = this.super(filed, data);
                            } else {
                                data = data[filed];
                            }
                        } else if (testFiled) {
                            if (testFiled.indexOf("|") >= 0) {
                                data = this.super(testFiled, data);
                            } else {
                                data = $.trim(data[testFiled]);
                            }
                        }
                        code += _this.concatHtml(innerTemp, data);
                    }
                    code += _this.innerListOp(data, template.substring(lastMatchIndex + 8));
                } else {
                    code = _this.innerListOp(data, template);
                }
                return code;
            };
            //对传入的数据和模板做判断
            MultiMode.prototype.buildHtml = function (dd) {
                var data = dd ? ($.isArray(dd) ? dd : dd.data ): this.options.data,
                    html = "";
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                if (data instanceof Object) {  //是否符合解析条件
                    if ((data instanceof Array) && !data.length) {//如果是个空数组，则返回空数组字符串
                        html = "";
                    } else {   //开始解析模板和数据
                        var temp = (dd && dd.temp) ? dd.temp : this.options.template;
                        html = this.splitTemplate(temp, data);
                    }
                } else {
                    if (console) {
                        console.error("传入的数据不符合要求");
                        html = "";
                    }
                }
                return html;
            };
            MultiMode.prototype.init = function () {
                this.options.beforeInit && this.options.beforeInit();
                this.$con.addClass(this.options._class).removeClass(this.options.removeClass).html(this.buildHtml());
                this.options.afterInit && this.options.afterInit();
            };
            MultiMode.prototype.append = function (data) {
                this.$con.append(this.buildHtml({ data: data }));
            };
            MultiMode.prototype.prepend = function (data, temp) {
                this.$con.prepend(this.buildHtml({ data: data, temp: temp }));
            };
            return (new MultiMode());
        }
    });
})(jQuery);