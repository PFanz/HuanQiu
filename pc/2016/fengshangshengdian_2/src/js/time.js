'use strict';

// export
var compareTime = function compareTime(time1) {
	var time2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : +new Date();

	var diffTime = time1 - time2;
	diffTime = diffTime > 0 ? diffTime : -diffTime;
	// 时间计算
	var date = Math.floor(diffTime / (24 * 60 * 60 * 1000));
	date = date < 10 ? '0' + date : date;
	diffTime = diffTime - date * 24 * 60 * 60 * 1000;
	var hours = Math.floor(diffTime / (60 * 60 * 1000));
	hours = hours < 10 ? '0' + hours : hours;
	diffTime = diffTime - hours * 60 * 60 * 1000;
	var minutes = Math.floor(diffTime / (60 * 1000));
	minutes = minutes < 10 ? '0' + minutes : minutes;
	diffTime = diffTime - minutes * 60 * 1000;
	var seconds = Math.floor(diffTime / 1000);
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return {
		date: date,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
};
// export default {
// 	diffTime
// }