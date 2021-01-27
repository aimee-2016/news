export const calculationDate = (item) => {
    let date = new Date(item.pubDate);
    let date2 = new Date(item.nowDate);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 > 9 ? date.getMonth() +1 : "0" + (date.getMonth() +1);
    let day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();
    let num = date2.getTime() - date.getTime();
    if (num >= 604800000) {
      if (date.getFullYear() === date2.getFullYear()) {
        return `${month} - ${day}`;
      } else {
        return `${year} - ${month} - ${day}`;
      }
    }
    if (num >= 86400000) {
      if (new Date(num).getDay() === 0) {
        return (new Date(num).getDay() + 1) + "天前";
      } else {
        return new Date(num).getDay() + "天前";
      }
    }
    if (num >= 3600000) {
      return new Date(num).getHours() + "小时前";
    }
    if (num >= 180000) {
      return new Date(num).getMinutes() + "分钟前";
    }
    if (num < 180000) {
      return "刚刚";
    }
  }