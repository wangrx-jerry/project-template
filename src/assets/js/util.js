import Vue from "vue";
import ElementUI from "element-ui";
class Helper {
  constructor() {}

  clone(obj, deep = true) {
    if (!(obj instanceof Object)) {
      return obj;
    }
    if (deep) {
      if (Array.isArray(obj)) {
        let cloneObj = [];
        for (let [, o] of obj.entries()) {
          cloneObj.push(this.clone(o, true));
        }
        return cloneObj;
      } else {
        let cloneObj = {};
        for (let k in obj) {
          if (Array.isArray(obj[k])) {
            let a = [];
            for (let i = 0; i < obj[k].length; i++) {
              a.push(this.clone(obj[k][i], true));
            }
            cloneObj[k] = a;
          } else if (typeof obj[k] !== "object") {
            cloneObj[k] = obj[k];
          } else {
            cloneObj[k] = this.clone(obj[k], true);
          }
        }
        return cloneObj;
      }
    } else {
      if (Array.isArray(obj)) {
        return [].concat(obj);
      } else {
        return Object.assign({}, obj);
      }
    }
  }
  //搜狗浏览器上面
  // 如果在template直接用Object.entries就报错
  entries(obj) {
    return Object.entries(obj);
  }
  values(obj) {
    return Object.values(obj);
  }
  isEmptyObj(obj) {
    for (let key in obj) {
      if (obj[key]) {
        return false;
      }
    }
    return true;
  }
  getDefaultStyle(obj, attribute) {
    return obj.currentStyle
      ? obj.currentStyle[attribute]
      : document.defaultView.getComputedStyle(obj, false)[attribute];
  }
  getOffset(node) {
    function getParentOffset(node) {
      let left = node.offsetLeft || 0;
      let top = node.offsetTop || 0;
      if (node.offsetParent) {
        let offset = getParentOffset(node.offsetParent);
        left += offset.left;
        top += offset.top;
      }
      return {
        left,
        top
      };
    }
    return getParentOffset(node);
  }

  //交集
  intersect() {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        var str = arguments[i][j];
        if (!obj[str]) {
          obj[str] = 1;
        } else {
          obj[str]++;
          if (obj[str] === arguments.length) {
            result.push(str);
          }
        } //end else
      } //end for j
    } //end for i
    return result;
  }

  //   格式化时间：年月日
  getDate(timeStamp = new Date().getTime(), splitSymble = "-", disDay = 0) {
    if (!timeStamp) return "";
    if (typeof timeStamp === "string") {
      timeStamp = timeStamp.replace(/-/g, "/");
    }
    let date = new Date(
      new Date(timeStamp).getTime() - disDay * 24 * 60 * 60 * 1000
    );
    let beauty = num => {
      return num > 9 ? num : "0" + num;
    };
    return (
      date.getFullYear() +
      splitSymble +
      beauty(date.getMonth() + 1) +
      splitSymble +
      beauty(date.getDate())
    );
  }

  //   格式化时间：时分秒
  getTimeDetail(timeStamp = new Date().getTime(), splitSymble = ":") {
    if (typeof timeStamp === "string") {
      timeStamp = timeStamp.replace(/-/g, "/");
    }
    let date = new Date(timeStamp);
    let beauty = num => {
      return num > 9 ? num : "0" + num;
    };
    return (
      beauty(date.getHours()) +
      splitSymble +
      beauty(date.getMinutes()) +
      splitSymble +
      beauty(date.getSeconds())
    );
  }

  addClass(obj, cls) {
    var obj_class = obj.className, //获取 class 内容.
      blank = obj_class !== "" ? " " : ""; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
    obj.className = added; //替换原来的 class.
  }

  removeClass(obj, cls) {
    var obj_class = " " + obj.className + " "; //获取 class 内容, 并在首尾各加一个空格. ex: 'abc    bcd' -> ' abc    bcd '
    obj_class = obj_class.replace(/(\s+)/gi, " "); //将多余的空字符替换成一个空格. ex: ' abc    bcd ' -> ' abc bcd '
    var removed = obj_class.replace(" " + cls + " ", " "); //在原来的 class 替换掉首尾加了空格的 class. ex: ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, ""); //去掉首尾空格. ex: 'bcd ' -> 'bcd'
    obj.className = removed; //替换原来的 class.
  }

  hasClass(obj, cls) {
    var obj_class = obj.className, //获取 class 内容.
      obj_class_lst = obj_class.split(" "); //通过split空字符将cls转换成数组.
    for (const n of obj_class_lst) {
      if (n === cls) {
        //循环数组, 判断是否包含cls
        return true;
      }
    }
    return false;
  }

  //   打印指定区域
  printArea(id, title = "打印页面") {
    if (!id) {
      ElementUI.Message({
        message: "未获取到打印区域",
        type: "warning",
        showClose: true
      });
      return;
    }
    let targetDom = document.getElementById(id),
      printPage = targetDom.innerHTML;
    let oPop = window.open("", "oPop");
    let str = "<!DOCTYPE html>";
    str += "<html>";
    str += "<head>";
    str += '<meta charset="utf-8">';
    str += '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">';
    str += "<title>" + title + "</title>";
    str += "<style>";
    str += `.df{display: flex;}
				.pb20{padding-bottom:20px}
				.mr20{margin-right:20px}
				.mt20{margin-top:20px}
				table{border-collapse: collapse}
				.yl-table{width: 100%;table-layout: fixed;}
				.yl-table th,.yl-table td{padding: 10px; text-align: center;vertical-align: middle;background-color: #fff;word-break: break-all }
				.yl-table th{font-weight: bold;text-align: center; color: #909399;background-color: #fff; }
				.yl-table td{ color: #000; }
				.yl-table.border{border-top: 1px solid #000;border-left: 1px solid #000; border-radius: 3px; }
				.yl-table.border td,.yl-table.border th{ border-right: 1px solid #000;border-bottom: 1px solid #000;word-break: break-all; }
				.printHide{display: none;}
				.printShow{display: block;}
				.l{ float: left; }
				.r{ float: right; }
				.pct25{ width: 25%; }
				.tc{text-align: center;}
				.tl{text-align:left}
				.f12{font-size:12px;}
				`;
    // .scale-page {transform: scaleY(${scale}); transform-origin: 0 0;height: 840px; overflow:hidden}
    str += "</style>";
    str += "</head>";
    str += "<body>";
    str += printPage;
    str += "</body>";
    str += "</html>";
    oPop.document.write(str);
    oPop.print();
    oPop.close();
  }

  getCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  }

  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1 * 24 * 60 * 60 * 1000);
    var cval = this.getCookie(name);
    if (cval !== null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }

  // 获取url后面的请求参数
  GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") !== -1) {
      var strs = url.substr(1).split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  // 小数位限制
  limitPoint(value, point = 2, max = 99999999) {
    value = String(value);
    value = value.replace(/[^\d.]/g, ""); // 只能输入数字
    if (point === 0) {
      if (value.length === 1) {
        value = value.replace(/[^0-9]/g, "");
      } else {
        value = value.replace(/\D/g, "");
      }
    } else if (point === 1) {
      value = value
        .replace(/[^\d.]/g, "")
        //只允许一个小数点
        .replace(/^\./g, "")
        .replace(/\.{2,}/g, ".")
        //只能输入小数点后三位
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
    } else if (point === 2) {
      value = value
        .replace(/[^\d.]/g, "")
        //只允许一个小数点
        .replace(/^\./g, "")
        .replace(/\.{2,}/g, ".")
        //只能输入小数点后2位
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    } else if (point === 3) {
      value = value
        .replace(/[^\d.]/g, "")
        //只允许一个小数点
        .replace(/^\./g, "")
        .replace(/\.{2,}/g, ".")
        //只能输入小数点后三位
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d\d).*$/, "$1$2.$3");
    } else if (point === 4) {
      value = value
        .replace(/[^\d.]/g, "")
        //只允许一个小数点
        .replace(/^\./g, "")
        .replace(/\.{2,}/g, ".")
        //只能输入小数点后三位
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3");
    }
    if (value.indexOf(".") < 0 && value !== "") {
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      value = parseFloat(value);
    }
    if (value > max) {
      value = value.toString();
      value = value.substr(0, value.length - 1);
    }
    if (value === "") {
      return "";
    } else {
      return value;
    }
  }

  // 对obj已有属性赋值，用于准备接口入参
  setTarget(obj, source) {
    source = source || {};
    for (let k in obj) {
      if (Array.isArray(source[k])) {
        //arr
        obj[k] = [].concat(source[k]);
      } else if (typeof source[k] !== "object" || !source[k]) {
        obj[k] = source[k] || "";
      } else {
        //object
        obj[k] = Object.assign({}, source[k]);
      }
    }
  }

  //数字金额转换文字
  numToChinese(n) {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    var head = n < 0 ? "欠" : "";
    n = Math.abs(n);
    var s = "";
    for (var i = 0; i < fraction.length; i++) {
      s += (
        digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
      ).replace(/零./, "");
    }
    s = s || "整";
    n = Math.floor(n);
    for (var o = 0; o < unit[0].length && n > 0; o++) {
      var p = "";
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][o] + s;
    }
    return (
      head +
      s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整")
    );
  }

  //保存用户搜索条件
  setParamCache(key, param) {
    try {
      localStorage.setItem(key, JSON.stringify(param));
    } catch (e) {
      return;
    }
  }
  //获取保存的搜索条件
  getParamCache(key, fun) {
    //var key = window.location.pathname + '_' + hb.User.fgidUserID;
    var param = localStorage.getItem(key);
    if (typeof fun === "function") {
      try {
        fun(JSON.parse(param));
      } catch (e) {
        return;
      }
    }
  }
  //格式话日期格式 yyyy-MM-dd
  initDate(date) {
    if (date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    } else {
      return;
    }
  }

  compare(key) {
    return (a, b) => {
      let value1 = a[key],
        value2 = b[key];
      return value1 - value2;
    };
  }

  sortByKey(arr, key) {
    return arr.sort(this.compare(key));
  }
}
let util = new Helper();
Vue.prototype.util = util;
export default util;
