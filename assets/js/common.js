
var baseUrl = 'https://mobile.sxwinstar.net/CashCoupon'

String.prototype.getQuery = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = this.substr(this.indexOf("?") + 1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
var urlx = new String(window.location);
