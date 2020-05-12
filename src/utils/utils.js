// *********************************** 1.时间类 ***********************************
export function getYYMMDD(mills) {
  // 传入的是毫秒
  let time = new Date(mills)
  let year = time.getFullYear()
  let month =
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  return String(year) + '-' + String(month) + '-' + String(day)
}

export function getMM(mills) {
  // 传入的是毫秒
  let time = new Date(mills)
  let month =
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  return String(month)
}

export function getDD(mills) {
  // 传入的是毫秒
  let time = new Date(mills)
  let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  return String(day)
}

// 判断当前时间是否在某个营业范围内
export function chargeHHMMRange(range) {
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

// *********************************** 2.文件类 ***********************************
// 2.1 图片类
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
  // theBlob.lastModifiedDate = new Date();
  // theBlob.name = fileName;
  return file
}

// *********************************** 3.系统类 ***********************************
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
