export function getLocation() { //html5 API获取经纬度
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			let obj = {
				location: `${position.coords.longitude},${position.coords.latitude}`,
				key: '####'
			}
			transformLaAndLoToAddress.call(this, obj);
		}, err => { //定位发生错误，不执行任何操作
			// console.log(err.code, err.message)
			this.ecData.userLocation = '获取定位异常'; //有可能是使用了chrome、Firefox……浏览器发生了超时等错误，也有可能是用户没有允许获取定位
		});
	}
}

function transformLaAndLoToAddress(data) { //把经纬度转换成地址
	let url = 'http://restapi.amap.com/v3/geocode/regeo';
	ajax({
		type: 'POST',
		url,
		data,
		success: response => {
			response = JSON.parse(response);
			this.ecData.userLocation = response.regeocode.formatted_address;
		}
	})
}

function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	var params = formatParams(options.data);

	//创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//接收 - 第三步
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success && options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	if (options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, true);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}
}

function formatParams(data) {
	var arr = [];
	for (var name in data) {
		arr.push(encodeURIComponent(name) + "=" + data[name]);
	}
	return arr.join("&");
}