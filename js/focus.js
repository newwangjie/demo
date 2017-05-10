(function($) {
	$.fn.JieFocus = function(F) {
		F = $.extend({
			defaultIndex: 0,				// 默认显示第几个，第一个为 0
			trigger: "click",				// 点击方式
			showtime: 2000,					// 切换时间
			showWay: "slow"					// 焦点图切换方式，slow 为渐隐渐现 down 为上下切换
		}, F);

		// $(this)设置为全局变量

		var Obj = $(this);

		// 添加class找到ul和li

		Obj.children('ul').addClass('FocusPic');
    Obj.append('<ul class="FocusNum"></ul>')
		var Ul = Obj.children('.FocusPic'),
		 	Li = Ul.children('li'),
			LiSize = Li.size();

		// 添加左右按钮div,获得li的个数

		Obj.append('<div class="FocusLeft"></div><div class="FocusRight"></div>');
		var Num = Obj.children('ul.FocusNum');
		for (var i = 1; i <= LiSize; i++) {
			Num.append('<li>'+i+'</li>');
		}

		// 定义小点点，添加点击事件

		var NumLi = Num.children('li');
		NumLi.each(function(){
			var current = $(this),
				I = current.index();
			if (I==F.defaultIndex) {
				current.addClass('active');
			}
			current.on(F.trigger,function() {
				current.addClass('active').siblings('li').removeClass('active');
				SandH(I);
			});
		});

		// 设定向左向右按钮

		var FL = Obj.children('.FocusLeft'),
			FR = Obj.children('.FocusRight');

		FL.click(function(){
			GoLeft();
		});

		FR.click(function(){
			GoRight();
		});

		// 向左运动函数

		function GoLeft(){
			var I = Num.children('li.active').index()-1;
			if (I==-1) {
				var I = LiSize-1;
			}
      NumOn(I);
			SandH(I);
		}

		// 向右运动函数

		function GoRight(){
			var I = Num.children('li.active').index()+1;
			if (I==LiSize) {
				var I = 0;
			}
			NumOn(I);
			SandH(I);
		}

		// 数字切换函数

		function NumOn(I) {
			NumLi.eq(I).addClass("active").siblings().removeClass("active");
		};

		// 图片切换函数

		function SandH(I) {
			switch (F.showWay) {
			case "down":
        Li.stop().eq(I).fadeIn(400).siblings(this).fadeOut();
				break;
			default:
				Li.eq(I).fadeIn(200).siblings().fadeOut();
			}
		};

		// 定时器

		function actionDo(){
			return setInterval(function(){
				GoRight();
			},F.showtime);
		};

		// 当鼠标位于焦点图之上时清除定时器

		var StopAct = actionDo();
		Obj.hover(function() {
			clearInterval(StopAct);
		}, function() {
			StopAct = actionDo();
		});
	}
})(jQuery);
