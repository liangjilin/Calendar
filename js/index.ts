/// <reference path = "jquery.d.ts" />
(function () {
    // 閏年每月天數
    let month_olympic: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // 平年每月天數（2月只有28天）
    let month_normal: number[] = { ...month_olympic }
    month_normal[1] = 28

    let month_name: string[] = [
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
    ]

    // 天數列表ul
    const daysBox: any = $("#days-box")
    // 上一月按鈕
    const prev = $("#prev") // 推斷為any類型
    // 下一月按鈕
    const next = $("#next")
    // 標題-月
    const ctitle = $("#calendar-title")
    // 標題-年 
    const cyear = $("#calendar-year")

    // 日期對象
    let my_date = new Date()

    // 當前年月日對象-接口
    interface NowDate {
        year: number
        month: number
        day: number
    }

    // 年月日接口---用接口定义函数的形状
    interface monthYearDay {
        (year: number, month: number, day?: number): number // 可选属性day
    }


    let todayDate: NowDate = {
        year: my_date.getFullYear(),    // 當前-年
        month: my_date.getMonth(),      // 當前-月
        day: my_date.getDate()          // 當前-日
    }

    // 获取某年某月第一天是星期几
    let dayStart: monthYearDay = function dayStart(year: number, month: number) { // 用接口定义函数的形状
        let tmpDate = new Date(year, month, 1);
        return (tmpDate.getDay());
    }

    // 獲得每月总天數
    let daysMonth: monthYearDay = function (year: number, month: number) { // 用接口定义函数的形状
        // 计算某年是不是闰年
        let tmp = year % 4

        if (tmp == 0) {
            return (month_olympic[month]);
        } else {
            return (month_normal[month]);
        }
    }

    function initDate (year: number, month: number, day: number) {
        let str = ""
        let totalDay: number = daysMonth(year, month)               // 获取该月总天数
        let firstDay: number = dayStart(year, month)                // 获取该月第一天是星期几
        let myclass: string

        for (let i = 1; i < firstDay; i++) { 
            str += "<li></li>"                                      // 为起始日之前的日期创建空白节点
        }

        for (let i = 1; i <= totalDay; i++) {
            if ((i < day && year === my_date.getFullYear() && month === my_date.getMonth()) || year < my_date.getFullYear() || (year === my_date.getFullYear() && month < my_date.getMonth())) { 
                myclass = "lightgrey"          // 当该日期在今天之前时，以浅灰色字体显示
            } else if (i === day && year === my_date.getFullYear() && month === my_date.getMonth()) {
                myclass = "green greenbox"     // 当天日期以绿色背景突出显示
            } else {
                myclass = "darkgrey"           // 当该日期在今天之后时，以深灰字体显示
            }
            str += "<li class='" + myclass + "'>" + i + "</li>"  // 创建日期节点
        }

        daysBox.html(str)                    // 设置日期显示
        ctitle.html(month_name[month])       // 设置英文月份显示
        cyear.html(year)                     // 设置年份显示
    }

    // 月份切換(上一月，下一月)
    function changeDate (e: any, str: string) {
        e.preventDefault()
        str === 'prev' ? todayDate.month-- : todayDate.month++

        if (todayDate.month < 0) {
            todayDate.year--
            todayDate.month = 11
        } else if (todayDate.month > 11) {
            todayDate.year++
            todayDate.month = 0
        }

        initDate(todayDate.year, todayDate.month, todayDate.day)
    }

    prev.click(function (e: any) {
        changeDate(e, 'prev')
    })

    next.click(function (e: any) {
        changeDate(e, 'next')
    })

    // 日期初始化
    initDate(todayDate.year, todayDate.month, todayDate.day)
})();
