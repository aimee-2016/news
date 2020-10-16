export function formatSeconds(value) {
    let theTime = parseInt(value);// 秒
    let middle= 0;// 分
    let hour= 0;// 小时
  
    if(theTime > 60) {
        middle= parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(middle> 60) {
            hour= parseInt(middle/60);
            middle= parseInt(middle%60);
        }
    }
    let result = "00:00:"+parseInt(theTime).toString().padStart(2, "0");
    if(middle > 0) {
        result = "00:"+parseInt(middle).toString().padStart(2, "0")+":"+result;
    }
    if(hour> 0) {
        result = ""+parseInt(hour).toString().padStart(2, "0")+":"+result;
    }
    return result;
  }