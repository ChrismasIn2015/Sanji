// 目录
// 1.时间类
// 2.本地文件类

// *********************************** 1.时间类 ***********************************
export function getYYMMDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let year = time.getFullYear()
    let month =
        time.getMonth() + 1 < 10
            ? '0' + (time.getMonth() + 1)
            : time.getMonth() + 1
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(year) + '-' + String(month) + '-' + String(day)
}

export function getMM(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let month =
        time.getMonth() + 1 < 10
            ? '0' + (time.getMonth() + 1)
            : time.getMonth() + 1
    return String(month)
}

export function getDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(day)
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
