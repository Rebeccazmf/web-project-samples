/*****************************弹出层插件调用*******************************/
  	var followUsLayer,LotteryLayer;
	var jiazaiz = null;
	var success = false,//投票是否成功
		//isFollowed = false, //读取是否已关注
		todayVotedNum = 0,  //读取今天已投了几票
		hasVotedThisOne = false; //读取今天是否已投过这个人

	//点击投票按钮
	$('body').on('click','.votebtn',function(e){
		e.stopPropagation();
		var mid = this.title;
		//判断是否满足投票条件（是否已关注，是否未投满）
		//alert(isLogin+","+isFollowed);
		
		showLoding();
		
		var jf = this;
		
		if(isLogin!="false")
		{
			window.location=isLogin;
			return false;
		}
		
		if(isFollowed==false){
			askFollow();
			return false;
		}
		
		$.ajax({
			
			type:"post",
			url:"ajax.php",
			data:"id="+mid,
			success: function(data){
				layer.close(jiazaiz);
				if(data=="success"){
				
				jiafen(jf);
				
				layer.open({
					content: '名城苏州提醒您投票成功！',
					style: ' border:none;',
					time: 3,
					success:function(){
						if(czaa){
							czaa=false;
							lottery();
						}
						}
					});
				}else{
					showMsg(data);
				}
			}
			
		});
		/*if(todayVotedNum >=10)
			showMsg('您今天已投满10票，请明天继续哦！');
		else if(hasVotedThisOne)
			showMsg('您今天已投过票给当前女神，请投给其他人哦！');
		else{
			//提交代码写在这
			
			//提交成功后	
			success = true;
			
			if(success){
				layer.open({
					content: '投票成功，谢谢支持！',
					style: ' border:none;',
					time: 3,
					success:function(){
						//读取cookies判断是否已经显示过抽奖层，若没有
						lottery();
					}
				});
			}else{
				//失败原因写在这
				showMsg('失败原因写在这');
			}
		}*/
	});
	
	//显示提示语
	function showMsg(msg){
		layer.open({
			content: msg,
			style: ' border:none;',
			time: 3
		});
	}
	//显示加载层
	function showLoding(){
		jiazaiz = layer.open({
			content: '数据加载中...',
			style: ' border:none;',
			type:2,
			time:10
		});
	}
	//显示加关注层
	function askFollow(){
		followUsLayer = layer.open({
			type: 1,
			style: 'width:90%; border-radius:10px;',
			content: '<div class="follow_us_layer"><h2>请关注公众号后投票</h2><p>请先关注并进入 "名城苏州网" 微信公众号，点击"最强CP"菜单，进行报名或投票。</p><a href="http://mp.weixin.qq.com/s?__biz=MjM5NDA2MjkxNQ==&mid=202432101&idx=1&sn=3e33634e6705cb1433b1875cfcbc8744#rd" class="btn">一键关注</a>',
			fixed:true
		}); 
	}
	//显示抽奖层
	function lottery(){
		LotteryLayer = layer.open({
			type: 1,
			style: 'width:90%;padding: 15px;',
			content: '<div class="lottery_layer"><a href="index.php" class="close">×</a><p>名城君将每日抽取9名幸运网友送出奖品，其中3名每人获得<mark>价值280元的贝黎诗护理现金券一张</mark>，其中6名每人获得<mark>价值50元的龙凤金店全场通用代金券一张</mark>。每周还抽取50名幸运网友，每人获得<mark>由苏融贷提供的20元手机话费</mark>。<br>参与抽奖的网友，请留下您的联系电话与姓名，并点击“提交”。不需要则点击“跳过”。</p><form action="addname.php" method="post"><input type="text" name="uname" id="yourname" placeholder="填写您的姓名"><input type="tel" name="mob" id="yourtel" placeholder="填写便于联系领奖的电话"><input type="submit" class="btn" value="提交" id="lottery_submit"><input type="button" class="btn" value="跳过" id="lottery_cancel"></form><p class="center">关注苏融贷 领千元体验礼金   <a href="">【关注】</a></p>',
			fixed:true
		}); 
	}
	//抽奖提交
	/*$('body').on('click','#lottery_submit',function(){
		//记录信息，加入cookies
		layer.close(LotteryLayer);
	});*/
	//抽奖放弃
	$('body').on('click','#lottery_cancel',function(){
		//记录信息，加入cookies
		layer.close(LotteryLayer);
	});

	$('body').on('click','[data-url]',function(){
		window.location.href=$(this).data('url');
	});

	$('body').on('focus','input[type="text"],input[type="tel"],textarea',function(e){
		$('menu').hide();
	});
	$('body').on('blur','input[type="text"],input[type="tel"],textarea',function(e){
		$('menu').show();
	});
	$(window).load(function() {
		$('nav a').eq($('body').data('nav')).addClass('active');
	});