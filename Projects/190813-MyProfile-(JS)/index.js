// 监听pageContainer控制页面上下滚动
var index = 0;
var count = 0;
var timer = null;
// 1.绑定监听函数
document.querySelector('.pageContainer').addEventListener('mousewheel',pageScroll,false);
//手动滚动函数
function myScroll(bool){
	if(bool){
		if(index==-300 || timer!=null) return;//到达底部
	}else{
		if(index==0 || timer!=null) return;//到达底部
	}
	clearInterval(timer);//函数防抖：连续触发只执行最后一次
	timer = setInterval(()=>{
		bool ? index -= 1:index += 1;//1=向下移动
		document.querySelector('.pageContainer').style.top = index+'%';
		if(index%100==0){//移动了一页，就不再移动
			clearInterval(timer);
			timer=null;
			// console.log(index)
			return;
		}
	},1);
}
// 滚动函数
function pageScroll(event){
	// console.log(event)
	// 2.编写监听函数（滚轮向下是-120）
	if(event.wheelDelta == -148 || event.wheelDelta == -120 || event.wheelDelta == -150){//向下
		if(index==-300 || timer!=null) return;//到达底部
		clearInterval(timer);//函数防抖：连续触发只执行最后一次
		timer = setInterval(()=>{
			index -= 1;
			document.querySelector('.pageContainer').style.top = index+'%';
			if(index%100==0){//移动了一页，就不再移动
				clearInterval(timer);
				timer=null;
				// console.log(index)
				return;
			}
		},1);
	}
		
	if(event.wheelDelta == 148 || event.wheelDelta == 120 || event.wheelDelta == 150){//向上
		if(index==0 || timer!=null) return;//到达底部
		clearInterval(timer);//函数防抖：连续触发只执行最后一次
		timer = setInterval(()=>{
			index += 1;
			document.querySelector('.pageContainer').style.top = index+'%';
			if(index%100==0){//移动了一页，就不再移动
				clearInterval(timer);
				timer=null;
				// console.log(index)
				return;
			}
		},1);
	}		
}
