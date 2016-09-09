### 轮播图
#### 0. 使用方法
按外容器div > 内容器div > ul > (li > img)来编写HTML，按照图片宽高为内容器设置宽高。  
<small>只需要引入`/dist/js/lunbo.js/`</small>

Eg.
```html
<div class="lunbo-block">
		<div class="images-content">
			<ul>
				<li><<img src="dist/images/photo-1.png" alt=""></li>
				<li><<img src="dist/images/photo-2.png" alt=""></li>
				<li><img src="dist/images/photo-3.png" alt=""></li>
				<li><img src="dist/images/photo-4.png" alt=""></li>
				<li><img src="dist/images/photo-5.png" alt=""></li>
			</ul>
		</div>
	</div>
```
		ps:外容器是为了定义dots、arrow在轮播图外的情况
			li中可以自定义a标签等
			类名用于添加自定义样式，以及设置内容器款高
			具体调用参见(参数)项中，contentElem参数为内容器
#### 1. 参数
参数为js对象，至少包含属性contentElem，值为轮播图容器Dom对象或jQuery对象。  

Eg.
```javascript
new Lunbo({
			contentElem: document.querySelector('.images-content'),
			autoplay: true,
			hasDot: true,
			hasArrow: true
		}).init();
```
其他参数及默认值：
```javascript
var defaultConfig = {
			autoplay: true,			// 自动播放
			pause: true,				// 鼠标悬浮是否暂停
			contin: 1,					// 滚动持续时间，单位s
			delay: 3,						// 滚动延迟，单位s
			hasDot: false,			// 是否拥有dots		样式需要自定义
			hasArrow: false			// 是否拥有Arrow			样式需要自定义
		};
```

#### 2. 返回值
Arrows:
```html
<div class="focus-arrows-content">
	<a href="javascript:void(0);" class="focus-arrow-pre"></a>
	<a href="javascript:void(0);" class="focus-arrow-next"></a>
</div>
```
Dots:(根据图片个数自动生成)
```html
<div class="focus-dots-content">
	<a href="javascript:void(0);" class="dot active"></a>
	<a href="javascript:void(0);" class="dot"></a>
</div>
```

#### 3. 高级应用
自定义dot、arrow，只需要在调用init()方法之前，添加createDots()方法，或createArrows()方法。  

Eg.
```javascript
var mainLunbo = new Lunbo({ contentElem: document.querySelector('.mod-focus') });
mainLunbo.createDots = function () {
	var imgElems = mainLunbo.contentElem.querySelectorAll('img');
	// 最好使用createElement创建的Dom节点像页面添加元素
	var dotContentElem = document.createElement('div');
	dotContentElem.setAttribute('class', 'focus-dots-content');
	var str = '';
	for (var i = 0; i < mainLunbo.len; i++) {
		str += '<a href="javascript:void(0);" class="dot"><img src=' + imgElems[i].src + ' alt=' + imgElems[i].alt + ' /></a>';
	}
	str += '</div>';
	dotContentElem.innerHTML = str;

	var content = document.querySelector('.mod-focus');
	content = content.parentNode;
	content.appendChild(dotContentElem);

	var dotElems = dotContentElem.querySelectorAll('.dot');
	dotElems[0].classList.add('active');
};
mainLunbo.init();
```