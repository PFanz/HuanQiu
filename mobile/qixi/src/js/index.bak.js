var Dialogue = function(config) {	
	// 对话数组
	this.dialogue1 = config.dialogue1;
	this.dialogue2 = config.dialogue2;
	// 对话序号
	this.index = 0;
	// 自动对话
	this.autoplay = config.autoplay || true;
	this.spaceTime = config.spaceTime || 1000;
	// 点击加快对话
	this.clickable = config.clickable || true;

	// 添加事件
	// 自动播放
	if(this.autoplay) {	
		this.intervalId = setInterval(
			(function(a,b){ 
				return function(){ 
									b.call(a); 
							} 
			})(this,this.switch),			// this.switch.bind(this), 
			this.spaceTime);
		setTimeout(clearInterval(this.intervalId), this.spaceTime * this.dialogue1.length + this.spaceTime * this.dialogue2.length + 1000);
	}
	// 点击加快对话
	if(this.clickable) {
		var that = this;
		var container = document.querySelector('#dialogue1').parentNode;
		container.onclick = function() {
				if( that.index < that.dialogue1.length + that.dialogue2.length ) {
				that.switch();
			}
		};
	}

};

Dialogue.prototype = {

	switch: function() {
		var dialogueElement1 = document.querySelector('#dialogue1');
		var dialogueElement2 = document.querySelector('#dialogue2');
		if(this.index >= this.dialogue1.length + this.dialogue2.length) {
			return;
		}
		// 切换第二个话
		if(this.index % 2 === 0) {
			dialogueElement1.removeChild(document.querySelector('#dialogue1 span'));
			dialogueElement1.innerHTML = '<span>' + this.dialogue1[this.index / 2] + '</span>';
		} else {
			dialogueElement2.removeChild(document.querySelector('#dialogue2 span'));
			dialogueElement2.innerHTML = '<span>' + this.dialogue2[(this.index - 1) / 2] + '</span>';
		}
		this.index ++;
	},

	destory: function() {
		document.querySelector('#dialogue1 span').innerHTML = '';
		document.querySelector('#dialogue2 span').innerHTML = '';
		clearInterval(this.intervalId);
	}
};