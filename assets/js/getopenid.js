

$(function () {
    var policePersonOpenId = $.cookie("policePersonOpenId");
    //如果cookie中不存在openid
    if (policePersonOpenId == null && policePersonOpenId == '' && policePersonOpenId == "undefined") {
        getCode();
    }
})

/**
 * 2017-12-27
 * 切分url，获取code
 */
function getCode() {
    var url = window.location.href;
    // 解析地址
    var code = url.split("code=")[1].split("&")[0];

    getOpenid(code);
}

/**
 *  2017-06-27
 * 获取OpenId
 * param code
 */
function getOpenid(code) {
    if (code == "") {
        $.alert("系统错误,请重试", "警告");
    } else {
        var param = 'http://113.142.56.149:80/CashCoupon' + "/oauthServlet?code=" + code;
        $.ajax({
            url: param,
            type: "GET",
            async: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (data) {
                if (data.data.openid == "-1") {
                    $.alert("系统错误,请重试", "警告");
                    // wx.closeWindow();
                } else {
                    var openId = data.data.openid;
                    // $("#openId").val(openId);
                    $.cookie("policePersonOpenId", openId, { expires: 7 });

                }
            }
        }, 'json');
    }

}



