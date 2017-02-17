//<![CDATA[
$(function(){
	(function(){
		var curr = 0;
		$("#jsNav2 .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#js2 li").eq(i).fadeIn("slow").siblings("li").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		
		var pg = function(flag){
			//flag:true��ʾǰ���� false��ʾ����
			if (flag) {
				if (curr == 0) {
					todo = 4;
				} else {
					todo = (curr - 1) % 2;
				}
			} else {
				todo = (curr + 1) % 2;
			}
			$("#jsNav2 .trigger").eq(todo).click();
		};
		
		//ǰ��
		$("#prev").click(function(){
			pg(true);
			return false;
		});
		
		//����
		$("#next").click(function(){
			pg(false);
			return false;
		});
		
		//�Զ���
		var timer = setInterval(function(){
			todo = (curr + 1) % 2;
			$("#jsNav2 .trigger").eq(todo).click();
		},5000);
		
		//������ͣ�ڴ�������ʱֹͣ�Զ���
		$("#jsNav2 a").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % 2;
					$("#jsNav2 .trigger").eq(todo).click();
				},5000);			
			}
		);
	})();
});



