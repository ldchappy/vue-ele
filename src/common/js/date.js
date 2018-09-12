export function formatDate(date,fmt){
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4-RegExp.$1.length));
	}
	let o = {
		'M+' : date.getMonth() + 1,
		'd+' : date.getDate(),
		'h+' : date.getHours(),
		'm+' : date.getMinutes(),
		's+' : date.getSeconds()
	};
	for(let k in o){
		if(new RegExp(`(${k})`).test(fmt)){
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length ===1 ) ? str : padLeftZero(str));
		}
	}
	return fmt;
}
function padLeftZero(str){
	return ('00' + str).substr(str.length);
}

//解析url函数
/**
 * export 导出模块
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */
export function urlParse(){
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = rul.match(reg);
	if(arr){
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		});
	}
	return obj;
}

/**
 * localstorage 存储 收藏商家
 * window.localStorage = __seller__
 * 存储行数 saveToLocal(id,key,value)
 * 读取函数 loadFormLocal(id,key,value)
 */
export function saveToLocal(id,key,value){
	let seller = window.localStorage.__seller__;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	}

	seller = JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret || def;
}