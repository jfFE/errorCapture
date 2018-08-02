import timeStr from './common/getTime.js';

function initEc(Ec) { //初始化这个类
	Ec.prototype.init = (cb) => {
		this.ecData = {
			errorMesg: '', //错误信息
			errorTip: '', //针对错误信息，做出的人性化提示
			errorFile: '', //错误文件路径名称
			errorLine: '', //错误代码行
			errorColum: '', //错误代码列
			userAgent: { //用户代理信息

			},
			errorTime: '', //发生错误的事件
			userLocation: '' //发生错误所处地点
		}
		this.cb = cb;
		bindEvent(ec);
	}
}

function bindEvent(ec) { //给window绑定错误事件处理程序
	window.onerror = (errorMesg, errorUrl, errorLine, errorColum, other) => { //如果页面触发了错误
		//获取这些错误信息
		ec.ecData.errorMesg = errorMesg;
		ec.ecData.errorFile = errorFile;
		ec.ecData.errorLine = errorLine;
		ec.ecData.errorColum = errorColum;
		ec.ecData.errorTime = timeStr;

		//执行初始化时用户传入的回调函数，在该函数中执行对错误信息的上报操作
		this.cb();
	}
}

export default {
	initEc
}