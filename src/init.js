import timeStr from './common/getTime.js';
import {
	addEvent,
	getEventObj
} from './common/event.js';
import {
	initGetDomTarget,
	createTargetStr
} from './getDomTarget.js';
import './common/listenAjax.js';

// import {
// 	getLocation
// } from './getLocation.js';

export function initEc(Ec) { //初始化这个类

	Ec.prototype.init = function(cb) {
		if (cb === undefined || cb === null || typeof cb !== 'function') {
			return;
		}
		this.ecData = {
			errorMesg: '', //错误信息
			errorTip: '', //错误信息类型
			errorFile: '', //错误文件路径名称
			errorLine: '', //错误代码行
			errorColum: '', //错误代码列
			userAgent: navigator.userAgent, //用户代理信息
			errorTime: '', //发生错误的事件
			userLocation: '', //发生错误所处地点
			domTarget: '' //触发错误的dom元素
		}
		this.cb = cb;
		bindGlobalErrorEvent.call(this);
		listenGlobalAjax.call(this);
		initGetDomTarget.call(this);
		// getLocation.call(this);//初始化获取用户地址方法，但由于较多浏览器不支持（目前只有ie能正常获取定位信息），并且使用html5获取定位会使浏览器弹框提示用户点击允许定位，影响了现有产品业务逻辑，故不使用该功能
	}
}

function bindGlobalErrorEvent() { //给window绑定错误事件处理程序
	addEvent(window, 'error', e => { //如果页面触发了错误
		e = getEventObj(e);
		//获取这些错误信息
		this.ecData.errorMesg = e.message;
		this.ecData.errorTip = 'js运行错误';
		this.ecData.errorFile = e.filename;
		this.ecData.errorLine = e.lineno;
		this.ecData.errorColum = e.colno;
		// this.ecData.errorTime = timeStr;//后台人员要求传date对象，所以直接传下面的了
		this.ecData.errorTime = new Date();
		setTimeout(() => {
			if (this.target) { //如果ec实例有错误触发目标，那么生成对应的dom字符串，供传给后台保存，以便清晰记录准确定位
				this.ecData.domTarget = createTargetStr.call(this);
			}
			//执行初始化时用户传入的回调函数，在该函数中执行对错误信息的上报操作
			this.cb(this.ecData);
		}, 0)
	})
}

function listenGlobalAjax() { //监听全局ajax
	addEvent(window, 'ajaxReadyStateChange', e => {
		e = getEventObj(e);
		let detail = e.detail,
			isNeedSubmit = false;
		if (detail.readyState == 4) {
			if (detail.status == 404) {
				this.ecData.errorMesg = `${detail.responseURL} is 404`;
				this.ecData.errorTip = `${detail.responseURL}找不到`;
				isNeedSubmit = true;
			}
			if (detail.status == 500) {
				this.ecData.errorMesg = `服务器发生错误`;
			}
		}
		if (isNeedSubmit) {
			this.ecData.errorTip = 'ajax错误';
			this.ecData.errorFile = location.href; //上报当前所在位置
			this.ecData.errorTime = new Date();
			setTimeout(() => {
				if (this.target) {
					this.ecData.domTarget = createTargetStr.call(this);
				}
				this.cb(this.ecData);
			}, 0)
		}
	});
}

export default {
	initEc
}