// export
const compareTime = (time1, time2 = +new Date()) => {
	let diffTime = time1 - time2;
	diffTime = diffTime > 0 ? diffTime : - diffTime;
	// 时间计算
	let date = Math.floor(diffTime / (24 * 60 * 60 * 1000));
	date = date < 10 ? '0' + date : date;
	diffTime = diffTime - date * 24 * 60 * 60 * 1000;
	let hours = Math.floor(diffTime / (60 * 60 * 1000));
	hours = hours < 10 ? '0' + hours : hours;
	diffTime = diffTime - hours * 60 * 60 * 1000;
	let  minutes = Math.floor(diffTime / (60 * 1000));
	minutes = minutes < 10 ? '0' + minutes : minutes;
	diffTime = diffTime - minutes * 60 * 1000;
	let seconds = Math.floor(diffTime / (1000));
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return {
		date,
		hours,
		minutes,
		seconds
	}
};
// export default {
// 	diffTime
// }