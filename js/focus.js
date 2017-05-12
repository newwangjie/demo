(function($) {
  $.fn.JieFocus = function(F) {
    F = $.extend({
      defaultIndex: 0,        // 默认显示第几个，第一个为 0
      trigger: "click",        // 点击方式
      showtime: 2000,          // 切换时间
      showWay: "slow"          // 焦点图切换方式，slow 为渐隐渐现 down 为上下切换
    }, F);

    // $(this)设置为全局变量
    var Obj = $(this);
    function Status(){
      Obj.find('img').each(function(){
        // 浏览器的宽度
        var BrowserWidth = parseInt($(window).width());
        // 找到img的路径
        var Src = $(this).attr('src');
        // 给li添加背景图
        $(this).parents('li').css("background-image","url(" + Src + ")");
        //真实的宽度
        var RealWidth = $(this).width();
        console.log(RealWidth)
        //  如果真实的宽度大于浏览器的宽度显示背景图片
        if (RealWidth >= BrowserWidth) {
          $(this).css("display","block");
        } else {//如果小于浏览器的宽度按照原尺寸显示
          $(this).css("display","none");
        }
      })
    }
    $(window).resize(function(){
      Status();
    });

    $(function(){
      Status();
    });

    // 添加class找到ul和li
    Obj.children('ul').addClass('FocusPic');
    Obj.append('<ul class="FocusNum"></ul>')
    var FocusPic = Obj.children('.FocusPic'),
    // 找到li
    FocusPicLi = FocusPic.children('li'),
    // 找到li的个数
    PicLiSize = FocusPicLi.size();

    // 添加左右按钮div,获得li的个数
    Obj.append('<div class="FocusLeft"></div><div class="FocusRight"></div>');
    var Num = Obj.children('ul.FocusNum');
    for (var i = 1; i <= PicLiSize; i++) {
      Num.append('<li>'+i+'</li>');
    }

    // 定义小点点，添加点击事件

    var NumLi = Num.children('li');
    NumLi.each(function(){
      var Current = $(this),
        NunThis = Current.index();
      if (NunThis == F.defaultIndex) {
        Current.addClass('active');
      }
      Current.on(F.trigger,function() {
        Current.addClass('active').siblings('li').removeClass('active');
        PicSwitch(NunThis);
      });
    });

    // 设定向左向右按钮

    var FocusLeft = Obj.children('.FocusLeft'),
      FocusRight = Obj.children('.FocusRight');

    FocusLeft.click(function(){
      GoLeft();
    });

    FocusRight.click(function(){
      GoRight();
    });

    function GoLeft(){
      var NunThis = Num.children('li.active').index()-1;
      if (NunThis == -1) {
        var NunThis = PicLiSize - 1;
      }
      NumOn(NunThis);
      PicSwitch(NunThis);
    }

    function GoRight(){
      var NunThis = Num.children('li.active').index()+1;
      if (NunThis == PicLiSize) {
        var NunThis = 0;
      }
      NumOn(NunThis);
      PicSwitch(NunThis);
    }

    // 数字切换函数

    function NumOn(NunThis) {
      NumLi.eq(NunThis).addClass("active").siblings().removeClass("active");
    };

    // 焦点图图片切换

    function PicSwitch(NunThis) {
      switch (F.showWay) {
      case "down":
        FocusPicLi.stop().eq(NunThis).fadeIn(400).siblings(this).fadeOut();
        break;
      default:
        FocusPicLi.eq(NunThis).fadeIn(200).siblings().fadeOut();
      }
    };

    // 定时器

    function ActionDo(){
      return setInterval(function(){
        GoRight();
      },F.showtime);
    };

    // 当鼠标位于焦点图之上时清除定时器

    var StopAct = ActionDo();
    Obj.hover(function() {
      clearInterval(StopAct);
    }, function() {
      StopAct = ActionDo();
    });
  }
})(jQuery);
