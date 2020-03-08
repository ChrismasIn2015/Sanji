export function getYYMMDD(mills) {
  // 传入的是毫秒
  let time = new Date(mills);
  let year = time.getFullYear();
  let month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  return String(year) + "-" + String(month) + "-" + String(day);
}

export function getMM(mills) {
  // 传入的是毫秒
  let time = new Date(mills);
  let month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  return String(month);
}

export function getDD(mills) {
  // 传入的是毫秒
  let time = new Date(mills);
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  return String(day);
}
