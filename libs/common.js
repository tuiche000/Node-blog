const crypto = require('crypto');
function toDou(n) {
    return n < 10 ? '0' + n : '' + n;
}
module.exports = {
    //MD5加密后缀
    MD5_SUFFIX: '啊师傅dajskjdl;as$%#$^%$^&%打卡机深asdas!@#$^%$&^%das刻的了解啊是&*^%*%*()*()*dskda尽快回来',
    md5: function (str) {
        var obj = crypto.createHash('md5');

        obj.update(str);

        return obj.digest('hex');
    },

    //时间戳转换时间
    time2date: function (timestamp) {
        var oDate = new Date();
        oDate.setTime(timestamp * 1000);

        return oDate.getFullYear() + '-' + toDou(oDate.getMonth() + 1) + '-' + toDou(oDate.getDate()) + ' ' + toDou(oDate.getHours()) + ':' + toDou(oDate.getMinutes()) + ':' + toDou(oDate.getSeconds());
    }
}