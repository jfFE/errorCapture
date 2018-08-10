function getUA(){
  let uaObj = {}; //用户代理对象，用于存放浏览器属性
  let ua = navigator.userAgent.toLowerCase();
  let reg; //用于索引正则匹配到的值
  (reg = ua.match(/msie ([\d\.]+)/)) ? uaObj.ie = reg[1] :           //IE 8-10
  (reg = ua.match(/rv:([\d.]+)\) like gecko/)) ? uaObj.ie = reg[1] : //IE 11
  (reg = ua.match(/edge\/([\d\.]+)/)) ? uaObj.edge = reg[1] :        //Edge
  (reg = ua.match(/lbbrowser/)) ? uaObj.liebao = 'Liebao' :         //猎豹
  (reg = ua.match(/metasr/)) ? uaObj.sougou = 'Sougou' :     //搜狗
  (reg = ua.match(/qqbrowser\/([\d\.]+)/)) ? uaObj.qq = reg[1] :       //QQ
  (reg = ua.match(/qihu/)) ? uaObj.qihu = '360' :                      //360
  (reg = ua.match(/firefox\/([\d\.]+)/)) ? uaObj.firefox = reg[1] :     //Firefox
  (reg = ua.match(/(?:opera|opr).([\d\.]+)/)) ? uaObj.opera = reg[1] :  //Opera
  (reg = ua.match(/chrome\/([\d\.]+)/)) ? uaObj.chrome = reg[1] :       //Chrome
  (reg = ua.match(/version\/([\d\.]+).*safari/)) ? uaObj.safari = reg[1] : 0; //Safari

  if (uaObj.ie) return ('IE: ' + uaObj.ie);
  if (uaObj.edge) return ('EDGE: ' + uaObj.edge);
  if (uaObj.liebao) return ('Liebao');
  if (uaObj.sougou) return ('Sougou: ' + uaObj.sougou);
  if (uaObj.qq) return ('QQ: ' + uaObj.qq);
  if (uaObj.qihu) return ('360');
  if (uaObj.firefox) return ('Firefox: ' + uaObj.firefox);
  if (uaObj.chrome) return ('Chrome: ' + uaObj.chrome);
  if (uaObj.opera) return ('Opera: ' + uaObj.opera);
  if (uaObj.safari) return ('Safari: ' + uaObj.safari);
  return 'Unknown';
}

export default {getUA}
