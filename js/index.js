var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/// <reference path = "jquery.d.ts" />
(function () {
    // 閏年每月天數
    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 平年每月天數（2月只有28天）
    var month_normal = __assign({}, month_olympic);
    month_normal[1] = 28;
    var month_name = [
        "January",
        "Febrary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Auguest",
        "September",
        "October",
        "November",
        "December"
    ];
    // 天數列表ul
    var daysBox = $("#days-box");
    // 上一月按鈕
    var prev = $("#prev"); // 推斷為any類型
    // 下一月按鈕
    var next = $("#next");
    // 標題-月
    var ctitle = $("#calendar-title");
    // 標題-年 
    var cyear = $("#calendar-year");
    // 日期對象
    var my_date = new Date();
    var todayDate = {
        year: my_date.getFullYear(),
        month: my_date.getMonth(),
        day: my_date.getDate() // 當前-日
    };
    // 获取某年某月第一天是星期几
    var dayStart = function dayStart(year, month) {
        var tmpDate = new Date(year, month, 1);
        return (tmpDate.getDay());
    };
    // 獲得每月总天數
    var daysMonth = function (year, month) {
        // 计算某年是不是闰年
        var tmp = year % 4;
        if (tmp == 0) {
            return (month_olympic[month]);
        }
        else {
            return (month_normal[month]);
        }
    };
    function initDate(year, month, day) {
        var str = "";
        var totalDay = daysMonth(year, month); // 获取该月总天数
        var firstDay = dayStart(year, month); // 获取该月第一天是星期几
        var myclass;
        for (var i = 1; i < firstDay; i++) {
            str += "<li></li>"; // 为起始日之前的日期创建空白节点
        }
        for (var i = 1; i <= totalDay; i++) {
            if ((i < day && year === my_date.getFullYear() && month === my_date.getMonth()) || year < my_date.getFullYear() || (year === my_date.getFullYear() && month < my_date.getMonth())) {
                myclass = "lightgrey"; // 当该日期在今天之前时，以浅灰色字体显示
            }
            else if (i === day && year === my_date.getFullYear() && month === my_date.getMonth()) {
                myclass = "green greenbox"; // 当天日期以绿色背景突出显示
            }
            else {
                myclass = "darkgrey"; // 当该日期在今天之后时，以深灰字体显示
            }
            str += "<li class='" + myclass + "'>" + i + "</li>"; // 创建日期节点
        }
        daysBox.html(str); // 设置日期显示
        ctitle.html(month_name[month]); // 设置英文月份显示
        cyear.html(year); // 设置年份显示
    }
    // 月份切換(上一月，下一月)
    function changeDate(e, str) {
        e.preventDefault();
        str === 'prev' ? todayDate.month-- : todayDate.month++;
        if (todayDate.month < 0) {
            todayDate.year--;
            todayDate.month = 11;
        }
        else if (todayDate.month > 11) {
            todayDate.year++;
            todayDate.month = 0;
        }
        initDate(todayDate.year, todayDate.month, todayDate.day);
    }
    prev.click(function (e) {
        changeDate(e, 'prev');
    });
    next.click(function (e) {
        changeDate(e, 'next');
    });
    // 日期初始化
    initDate(todayDate.year, todayDate.month, todayDate.day);
})();
