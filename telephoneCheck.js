"use strict";

function telephoneCheck(str) {
	if(str.match(/\(/) || str.match(/\)/)) {
		if(!str.match(/\(\d{3}\)/)) {
			return false;
		}
	}

	if(!!str.match(/[^\d\(\d*\)(\d-\d)\s]/)) {
		return false;
	}

	let num = str.match(/\d/g).join('');
	let len = num.length;
	if(len < 10 || len > 11) {
		return false;
	} else if(len == 11) {
		if(num[0] != 1) {
			return false;
		}
	} else {
		return true;
	}
}

console.log(telephoneCheck('-555-55)5-5555'));