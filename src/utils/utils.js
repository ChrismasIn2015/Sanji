// *********************************** 1.时间类 ***********************************
// 返回'2020-12-05'
export function getYYMMDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let year = time.getFullYear()
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(year) + '-' + String(month) + '-' + String(day)
}

// 返回'2020-12-05'中的'2020'
export function getYY(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let year = time.getFullYear()
    return String(year)
}

// 返回'2020-12-05'中的'12'
export function getMM(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    return String(month)
}

// 返回'2020-12-05'中的'05'
export function getDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(day)
}

// 判断当前时间是否在某个营业范围 ["09:00", "02:00"] 内
export function chargeHHMMRange(range) {
    if (!range || typeof range !== 'object' || range.length < 2) return false
    // 传入的是字符串数组 ["09:00", "02:00"]
    let start = getYYMMDD(Date.now()) + ' ' + range[0]
    let end = getYYMMDD(Date.now()) + ' ' + range[1]

    // 跨日，把 start 变为明日0点
    if (Date.parse(start) > Date.parse(end)) {
        let tomorrow = getYYMMDD(Date.now() + 86400000) + ' ' + '00:00'
        end = getYYMMDD(Date.parse(tomorrow)) + ' ' + range[1]
    }

    // 判断
    let charge = Date.parse(start) <= Date.now() && Date.now() <= Date.parse(end)
    return charge
}

// 输入开始日期的毫秒数，结束日期的毫秒数，返回(年份：月份：数组)的Map
export function getCalendarMatrix(startMills, endMills) {
    // Tip：一天是 86400000 毫秒
    let vacationList = getVacation()
    let calendarMatrix = new Map()
    let todayMill = Date.now()
    let dayCount = (endMills - startMills) / 86400000
    if (endMills - startMills < 0) return calendarMatrix

    // 制作日历矩阵
    for (let i = 0; i <= dayCount; i++) {
        // *1 如果没有年份，则设置年份
        let nowDayMill = startMills + i * 86400000
        let yearKey = new Date(nowDayMill).getFullYear().toString()
        let yearValue = calendarMatrix.get(yearKey)
        if (!yearValue) calendarMatrix.set(yearKey, new Map())
        // *2 如果没有月份，则设置月份
        let monthKey = getMM(nowDayMill)
        let monthValue = calendarMatrix.get(yearKey).get(monthKey)
        if (!monthValue) calendarMatrix.get(yearKey).set(monthKey, [])

        // ** 设置当前的日数
        let dayString = getDD(nowDayMill)

        // ** 使得月份数组首位总为星期一
        monthValue = calendarMatrix.get(yearKey).get(monthKey)
        if (monthValue.length === 0) {
            let weekDay = new Date(`${yearKey}-${monthKey}-${dayString}`).getDay() - 1
            if (weekDay === -1) weekDay = 6
            for (let weekDayCount = 0; weekDayCount < weekDay; weekDayCount++) {
                calendarMatrix
                    .get(yearKey)
                    .get(monthKey)
                    .push({
                        year: yearKey,
                        month: monthKey,
                        day: '',
                        past: nowDayMill < todayMill,
                        disable: true,
                        // today: false,
                        type: 0,
                    })
            }
        }

        // ** 添加节假日/加班日字段 0 正常日 1 加班 2 节假日
        let type = 0
        for (let i = 0; i < vacationList.length; i++) {
            let dayCharge = vacationList[i]
            if (dayCharge.year === yearKey && dayCharge.month === monthKey && dayCharge.day === dayString) {
                type = dayCharge.type
                break // 跳出这个循环
            }
        }

        // *3 往月份数组里添加日期
        let dateEntry = {
            year: yearKey,
            month: monthKey,
            day: dayString,
            past: nowDayMill < todayMill,
            today: getYYMMDD(todayMill) === `${yearKey}-${monthKey}-${dayString}`,
            type: type,
        }
        calendarMatrix
            .get(yearKey)
            .get(monthKey)
            .push(dateEntry)
    }
    return calendarMatrix
}
function getVacation() {
    return [
        { type: 1, year: '2020', month: '09', day: '27' },
        { type: 2, year: '2020', month: '10', day: '01' },
        { type: 2, year: '2020', month: '10', day: '02' },
        { type: 2, year: '2020', month: '10', day: '03' },
        { type: 2, year: '2020', month: '10', day: '04' },
        { type: 2, year: '2020', month: '10', day: '05' },
        { type: 2, year: '2020', month: '10', day: '06' },
        { type: 2, year: '2020', month: '10', day: '07' },
        { type: 2, year: '2020', month: '10', day: '08' },
        { type: 1, year: '2020', month: '10', day: '10' },
    ]
}

// 将 2345601 转为周一至周日
export function getChineseWeek(week) {
    let myWeek = ''
    switch (week) {
        case 1:
            myWeek = '周一'
            break
        case 2:
            myWeek = '周二'
            break
        case 3:
            myWeek = '周三'
            break
        case 4:
            myWeek = '周四'
            break
        case 5:
            myWeek = '周五'
            break
        case 6:
            myWeek = '周六'
            break
        case 0:
            myWeek = '周日'
            break
    }
    return myWeek
}

// *********************************** 2.文件类 ***********************************
// URL图片下载
export function getUrlImage(targetName) {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = function() {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL('image/png')
        let a = document.createElement('a')
        a.href = dataURL
        a.download = targetName || 'image.png'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            canvas = null
        }, 500)
    }
}
// base64 => Blob : 从网上完全复制的
export function base64toBlob(base64) {
    let arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
// Blob => File : 从网上完全复制的
export function blobToFile(theBlob, fileName, fileType) {
    let file = new window.File([theBlob], fileName, fileType)
    return file
}
// H5获取本地图片
export function getLocalImage(isMultiple, callback) {
    let tag = document.createElement('input')
    tag.type = 'file'
    tag.accept = 'image/*'
    tag.ref = 'file'
    tag.style.display = 'none'
    tag.multiple = isMultiple
    tag.addEventListener('change', callback)
    document.getElementById('app').appendChild(tag)
    tag.click()
}
// 复制网页选中内容
export function mouseCopy(target, next) {
    let transfer = document.createElement('input')
    document.body.appendChild(transfer)
    transfer.value = target // 这里表示想要复制的内容
    transfer.focus()
    transfer.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
    }
    transfer.blur()
    document.body.removeChild(transfer)
    next ? next(target) : ''
}

// *********************************** 移动端长按 @touchstart="start" @touchmove="move" @touchend="end"
// **************** 从网上复制下来的移动端长按触发 ****************
export const longClick = {
    start() {
        this.longClick = 0
        this.timeOutEvent = setTimeout(() => {
            this.longClick = 1
            // async
        }, 500)
    },
    move(e) {
        clearTimeout(this.timeOutEvent)
        this.timeOutEvent = 0
        e.preventDefault()
    },
    end() {
        clearTimeout(this.timeOutEvent)
        if (this.timeOutEvent && this.longClick === 0) {
            //此处为点击事件
        }
        return false
    },
}
// **************** 从网上复制下来的移动端长按触发 End ****************
