// (function(){
// 	var imgWidth = $('.focus_thumbs img').width();
// 	var $focusEle = $('.focus_thumbs');
// 	var len = $focusEle.find('li').length;

// 	var autoplayFlag = 0;
// 	// 定义
// 	var autoplay = true;
// 	var pause = true;
// 	var delay = 3;

// 	// 滚动
// 	var turn = (n) => {
// 		let curr = $('.dot.active').index();
// 		let pos = curr + n;
// 		if( pos < 0) {
// 			pos = pos + len;
// 		} else if( pos >= len) {
// 			pos = pos - len;
// 		}
		
// 		$focusEle.animate({left: -pos * imgWidth + 'px'}, 1000);

// 		let $currDot = $('.focus_pagination .dot').eq(pos);
// 		$currDot.siblings().removeClass('active');
// 		$currDot.addClass('active');
// 	};

// 	// 生成dot
// 	var createDots = len => {
// 		var $dotsEle = $('.focus_pagination');
// 		var $dotsImgEle = $('.items img');
// 		for(var i = 0; i < len; i++) {
// 			$dotsEle[0].innerHTML += `<a href="javascript:void(0);" class="dot"><img src=${$dotsImgEle.eq(i).attr('src')} alt=${$dotsImgEle.eq(i).attr('alt')} /></a>`;
// 		}
// 		$dotsEle.find('.dot').eq(0).addClass('active');
// 		// 最后一个dot去掉margin-left
// 		$dotsEle.find('.dot').eq(0).css('margin-left', 0);
// 		// 点击事件
// 		$dotsEle.on('click', event => {
// 			let target = $(event.target);
// 			target = target.hasClass('dot') ? target : target.parents('.dot');

// 			if(target.length > 0) {
// 				autoplay &&	clearInterval(autoplayFlag);
// 				target.siblings().removeClass('active');
// 				target.addClass('active');
// 				$focusEle.animate({left: -target.index('.dot') * imgWidth + 'px'}, 500);
// 				if(autoplay) {
// 					autoplayFlag = setInterval(() => {
// 						turn(1);
// 					}, delay * 1000);
// 				}
// 			}
// 		});
// 	};

// 	// 初始化轮播图
// 	var initFocus = len => {
// 		$focusEle.width(len * imgWidth + 'px');
// 		createDots(len);
// 		// 自动播放
// 		if(autoplay) {
// 			autoplayFlag = setInterval(() => {
// 				turn(1);
// 			}, delay * 1000);
// 			// 鼠标暂停
// 			if(pause) {	
// 				$focusEle.on('mouseenter', event => {
// 					clearInterval(autoplayFlag);
// 				});
// 				$focusEle.on('mouseleave', event => {
// 					autoplayFlag = setInterval(() => {
// 						turn(1);
// 					}, delay * 1000);
// 				})
			
// 			}
// 		}
// 	};

// 	initFocus(len);

// })();

/**
 * 使用方法：new Lunbo({config}).initFocus()
 * 							再initFocus()前可以自定义createArrows和createDots()方法
 *params: {contetnElem: docElem, autoplay: true, delay: 3, hasDot: true, hsaArrow: true}
 * return: div.focus-dots-content包含N个a.dot,需要自定义样式
 *					div.focus-arrows-content包含a.focus-arrow-pre和a.focus-arrow-next，需要自定义样式
 *
 * 未实现： 鼠标悬浮悬浮暂停
 *					
 * 兼容IE 8
 */
class Lunbo {
	constructor(config) {
		let {
			contentElem,
			autoplay,
			pause,
			contin,
			delay,
			hasDot,
			hasArrow
		} = config;

		this.contentElem = contentElem.length ? contentElem[0] : contentElem;
		this.autoplay = autoplay || true;
		this.pause = pause || true;
		this.contin = contin || 1;
		this.delay = delay || 3;
		this.hasDot = hasDot || true;
		this.hasArrow = hasArrow || true;

		this.imgListElem = contentElem.querySelector('ul');
		this.len = contentElem.querySelectorAll('img').length;
		this.imgWidth = contentElem.clientWidth;
		this._n = 0;
		this.movingFlag = null;
		// 将init函数提出，之后手动调用，再调用前可以自定义createArrows和createDots函数
		// this.initFocus();
	}

	turn(n) {
		// 目的地
		let pos = this._n + n;
		if( pos < 0) {
			pos = pos + this.len;
		} else if( pos >= this.len) {
			pos = pos - this.len;
		}

		// 滚动到该目的地
		let nextLeft = - pos * this.imgWidth;
		let currLeft = - this._n * this.imgWidth;
		let diffLeft = nextLeft - currLeft;

		if(this.movingFlag) {
			clearInterval(this.movingFlag);
			this.movingFlag = null;
		}
		this.movingFlag = setInterval(() => {
			// 每次移动距离
			let move = diffLeft / (this.contin * 1000 ) * 13;
			// 每次需要移动到的位置
			let moveLeft = parseFloat(this.contentElem.querySelector('ul').style.left) + move;
			
			// 最后一张图片 
			if(move < 0) {
				// 移动到的位置在目标位置的右边
				if(moveLeft <= nextLeft) {
					moveLeft = nextLeft;
					clearInterval(this.movingFlag);
					this.movingFlag = null;
				}
			} else if(move > 0) {
				// 移动到的位置再目标位置的左边
				if(moveLeft >= nextLeft) {
					moveLeft = nextLeft;
					clearInterval(this.movingFlag);
					this.movingFlag = null;
				}
			}
			
			this.contentElem.querySelector('ul').style.left = moveLeft + 'px';
		}, 13);
		
		this._n = pos;

		// dot修改
		if(this.hasDot){
			let dotElems = this.contentElem.parentNode.querySelectorAll('.dot');
			for(let i = 0,len = dotElems.length; i < len; i ++) {
				dotElems[i].classList.remove('active');
			}
			dotElems[pos].classList.add('active');
		} 
	}

	createDots() {
		let dotContentElem = document.createElement('div');
		dotContentElem.setAttribute('class', 'focus-dots-content');
		dotContentElem.setAttribute('style', 'position: absolute;');

		let str = '<a href="javascript:void(0);" class="dot active" style="display:inline-block;"></a>';
		for(let i = 1; i < this.len; i++) {
			str += '<a href="javascript:void(0);" class="dot" style="display:inline-block;"></a>';
		}
		dotContentElem.innerHTML = str;

		this.contentElem.parentNode.appendChild(dotContentElem);
	}

	createArrow() {
		let arrowContentElem = document.createElement('div');
		arrowContentElem.setAttribute('class', 'focus-arrows-content');

		let str = '<a href="javascript:void(0);" class="focus-arrow-pre"></a>' +
				'<a href="javascript:void(0);" class="focus-arrow-next"></a>';
		arrowContentElem.innerHTML = str;
		this.contentElem.parentNode.appendChild(arrowContentElem);
	}

	addEvent() {
		if(this.hasArrow) {
			let arrowContentElem = this.contentElem.parentNode.querySelector('.focus-arrows-content');
			arrowContentElem.onclick = event => {
				let target = event.target || event.srcElement;
				if(target.className === 'focus-arrow-pre') {
					this.movingFlag && clearInterval(this.movingFlag);
					this.turn(-1);
				}
				if(target.className === 'focus-arrow-next') {
					this.movingFlag && clearInterval(this.movingFlag);
					this.turn(1);
				}
			};
		}

		if(this.hasDot) {
				let dotContentElem = this.contentElem.parentNode.querySelector('.focus-dots-content');

				let dotElems = dotContentElem.querySelectorAll('.dot');
				dotContentElem.onclick = event => {
				let target = event.target || event.srcElement;
				if(target.className.indexOf('dot') !== -1) {
					if(target.className.indexOf('active') !== -1) {
						return;
					}
					let targetIndex = 0;
					dotElems.forEach( (item, index) => {
						if(item === target) {
							targetIndex = index;
						}
					});
					this.turn(targetIndex - this._n);
				}
			};
		}
	}

	initFocus() {
		this.imgListElem.style.width = this.len * this.imgWidth + 'px';
		this.imgListElem.style.position = 'absolute';
		this.imgListElem.style.left = 0;

		this.hasArrow && this.createArrow();
		this.hasDot && this.createDots();

		this.addEvent();
		
		// 样式初始化
		this.contentElem.style.position = 'relative';
		this.contentElem.style.fontSize = 0;
		this.contentElem.style.overflow = 'hidden';

		let imgElems = this.contentElem.querySelectorAll('li');
		let imgHeight = this.contentElem.clientHeight;
		imgElems.forEach(item => {
			item.style.display = 'inline-block';
			item.style.width = this.imgWidth + 'px';
			item.style.height = imgHeight + 'px';
			item.querySelector('img').style.width = '100%';
			item.querySelector('img').style.height = '100%';
		});
		// 自动播放
		if(this.autoplay) {
			this.autoplayFlag = setInterval(() => {
				this.turn(1);
			}, this.delay * 1000);
			// 鼠标暂停
			if(this.pause) {
				if(this.contentElem.addEventListener) {
					this.contentElem.addEventListener('mouseenter', () => {
						clearInterval(this.autoplayFlag);
					});
					this.contentElem.addEventListener('mouseleave', () => {
						this.autoplayFlag = setInterval(() => {
							this.turn(1);
						}, this.delay * 1000);
					})
				} else if(this.contentElem.attachEvent) {
					this.contentElem.attachEvent('onmouseenter', () => {
						clearInterval(this.autoplayFlag);
					});
					this.contentElem.attachEvent('onmouseleave', () => {
						this.autoplayFlag = setInterval(() => {
							this.turn(1);
						}, this.delay * 1000);
					})
				}
			}
		}
	}
}

new Lunbo({contentElem: document.querySelector('.block-image-focus')}).initFocus();
var mainLunbo = new Lunbo({contentElem: document.querySelector('.mod-focus')});
mainLunbo.createDots = () => {
		let imgElems = mainLunbo.contentElem.querySelectorAll('img');
		let dotContentElem = document.createElement('div');
		dotContentElem.setAttribute('class', 'focus-dots-content');
		let str = '';
		for(var i = 0; i < mainLunbo.len; i++) {
			str += `<a href="javascript:void(0);" class="dot"><img src=${imgElems[i].src} alt=${imgElems[i].alt} /></a>`;
		}
		str += '</div>';
		dotContentElem.innerHTML = str;

		let content = document.querySelector('.mod-focus');
		content = content.parentNode;
		content.appendChild(dotContentElem);

		let dotElems = dotContentElem.querySelectorAll('.dot');
		dotElems[0].classList.add('active');
	}
mainLunbo.initFocus();