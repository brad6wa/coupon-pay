$(function () {
  var prepay_id;
  var paySign;
  var appId;
  var timeStamp;
  var nonceStr;
  var packageStr;
  var signType;
  function pay() {
    var url = baseUrl + '/tongyixiadan';
    $.ajax({
      type: "post",
      url: url,
      dataType: "json",
      data: { openid: $.cookie("policePersonOpenId") },
      success: function (data) {
        if (data.resultCode == 'SUCCESS') {
          appId = data.appId;
          paySign = data.paySign;
          timeStamp = data.timeStamp;
          nonceStr = data.nonceStr;
          packageStr = data.packageStr;
          signType = data.signType;
          callpay();
        } else {
          alert("统一下单失败");
        }
      }
    });
  }

  function onBridgeReady() {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": appId,     //公众号名称，由商户传入
        "paySign": paySign,         //微信签名
        "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": nonceStr, //随机串
        "package": packageStr,  //预支付交易会话标识
        "signType": signType     //微信签名方式
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          //window.location.replace("index.html");
          alert('支付成功');
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          alert('支付取消');
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          alert('支付失败');
        } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      }
    );
  }
  function callpay() {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }
})