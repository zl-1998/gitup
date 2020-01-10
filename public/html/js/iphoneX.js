
	$(function(){
			function isIPhoneX(fn){
			    var u = navigator.userAgent;
			    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			    if (isIOS) {        
			        if (screen.height == 812 && screen.width == 375){
				//	        alert('我是iphoneX')//是iphoneX
				//把.main的底部增大20px(设计标准34px)
							var pb_num= parseInt(  $('.main').css('padding-bottom'));
							var x_pb_num=pb_num + 34 + 'px';
							$('.main').css('padding-bottom',x_pb_num);  
				//把底部菜单往上移动20px(设计标准34px)			
							var pb_foot= parseInt(  $('.footer').css('padding-bottom'));
							var x_pb_foot=pb_foot+ 34 + 'px';
							$('.footer').css('padding-bottom',x_pb_foot);
	
			        }else{
		//	            alert('我不是iphoneX') //不是iphoneX
			        } 
			    }
			}
			
			isIPhoneX();  //执行代码
			
		
	})
