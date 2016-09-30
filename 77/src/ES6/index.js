// 对话类
class Dialogue {
	constructor(config) {
		// 对话数组
		this.dialogue1 = config.dialogue1;
		this.dialogue2 = config.dialogue2;
		// 对话序号
		this.index = 0;
		// 自动对话
		this.autoplay = config.autoplay || true;
		this.spaceTime = config.spaceTime || 1200;
		// 点击加快对话
		this.clickable = config.clickable || true;

		// 添加事件
		// 自动播放
		if(this.autoplay) {
			this.intervalId = setInterval( this.switch.bind(this), this.spaceTime);

			setTimeout( () => {
					clearInterval(this.intervalId);
				}, 
				this.spaceTime * this.dialogue1.length + this.spaceTime * this.dialogue2.length + 3000);
		}
		// 点击加快对话
		if(this.clickable) {
			let container = document.querySelector('#dialogue1').parentNode;
			container.onclick = () => {
					if( this.index < this.dialogue1.length + this.dialogue2.length ) {
					this.switch();
				}
			};
		}
	}

	switch() {
		let dialogueElement1 = document.querySelector('#dialogue1');
		let dialogueElement2 = document.querySelector('#dialogue2');
		let youElement = document.querySelector('.you');
		if(this.index > this.dialogue1.length + this.dialogue2.length) {
			return;
		}

		if(this.index == this.dialogue1.length + this.dialogue2.length) {
			// 添加爱心
			if(document.querySelector('#dialogue1 span').innerHTML.length !== 0) {
				document.querySelector('#dialogue1 span').innerHTML = '';
				dialogueElement1.style.backgroundImage = 'url(dist/imgs/heart.png)';
				dialogueElement1.style.backgroundSize = '45%';
				dialogueElement1.style.backgroundOrigin = 'border-box';
				// 添加箭
				youElement.classList.add('heart');
			}
			this.index ++;
			return;
		} else if(youElement.className.indexOf('heart') !== -1){
			youElement.classList.remove('heart');

			dialogueElement1.style.backgroundImage = 'url(dist/imgs/dialogue-1.png)';
			dialogueElement1.style.backgroundSize = 'contain';
			return;
		}
		// 切换第二个话
		if(this.index % 2 === 0) {
			if(this.index === 0) {
				dialogueElement1.style.backgroundImage = 'url(dist/imgs/dialogue-1.png)';
				dialogueElement1.style.backgroundRepeat = 'no-repeat';
				dialogueElement1.style.backgroundPosition = 'center';
				dialogueElement1.style.backgroundSize = 'contain';
				dialogueElement1.style.backgroundOrigin = 'border-box';
			}
			dialogueElement1.removeChild(document.querySelector('#dialogue1 span'));
			dialogueElement1.innerHTML = '<span>' + this.dialogue1[this.index / 2] + '</span>';
			// 对话居中
			if(this.index === 2) {
				dialogueElement1.style.padding = '1rem 1rem';
			} else {
				dialogueElement1.style.padding = '1.3rem 1rem';
			}
		} else {
			if(this.index == 1) {
				dialogueElement2.style.backgroundImage = 'url(dist/imgs/dialogue-2.png)';
				dialogueElement2.style.backgroundRepeat = 'no-repeat';
				dialogueElement2.style.backgroundPosition = 'center';
				dialogueElement2.style.backgroundSize = 'contain';
				dialogueElement2.style.backgroundOrigin = 'border-box';
			}
			dialogueElement2.removeChild(document.querySelector('#dialogue2 span'));
			dialogueElement2.innerHTML = '<span>' + this.dialogue2[(this.index - 1) / 2] + '</span>';
			// 对话居中
			if(this.index == 5) {
				dialogueElement2.style.padding = '.9rem .5rem';
			} else {
				dialogueElement2.style.padding = '1.3rem 1rem';
			}
		}
		this.index ++;
		return;
	}

	destory() {
		document.querySelector('#dialogue1 span').innerHTML = '';
		document.querySelector('#dialogue2 span').innerHTML = '';
		document.querySelector('#dialogue1').style.backgroundImage = '';
		document.querySelector('#dialogue2').style.backgroundImage = '';
		document.querySelector('.you').classList.remove('heart');
		clearInterval(this.intervalId);
	}
}

// 单选样式
Array.prototype.forEach.call(document.querySelectorAll('label'), el => {
	el.addEventListener('click', event => {
		var target = event.target || event.srcElement;
		// 不包含checked
		if(target.className.indexOf('checked') == -1) {
			Array.prototype.forEach.call(target.parentNode.querySelectorAll('label'), ele => {
				ele.classList.remove('checked');
			});
			target.classList.add('checked');
		}
	});
});

var iMark = 0;	
$('#musicBtn').on('touchstart',function(){
	if(iMark == 0)
	{
		$('#musicBtn').addClass('paused');	
		audio.pause();
		iMark = 1;
	}
	else
	{
		$('#musicBtn').removeClass('paused');
		audio.play();
		iMark = 0;	
	}
});

document.body.addEventListener('click', event => {
	event.preventDefault(); 
	let target = event.target || event.srcElement;
	if(target.className == 'pass') {
		mySwiper.slideNext();
		return ;
	} 
	if(target.className.indexOf('choose') !== -1) {
		function test(){};
		let index = target.getAttribute('data');
		// 结果
		mySwiper.appendSlide(results[ index - 2 ]);
		mySwiper.slideTo(9, 0, true);
	}

// 	if(target.id == 'musicBtn') {
// 		if(iMark==0)
// 		{
// 			$("#musicBtn").addClass("paused");	
// 			audio.pause();
// 			iMark=1;
// 		}
// 		else
// 		{
// 			$("#musicBtn").removeClass("paused");
// 			audio.play();
// 			iMark=0;	
// 		}
// 	}
})
