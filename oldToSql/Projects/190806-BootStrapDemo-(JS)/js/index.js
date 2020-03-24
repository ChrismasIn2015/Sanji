// ********************************************************************************为已经存在的#menu-ul-li-a添加herf=#h2属性
var con = document.querySelector("#content");
var h1s = document.querySelectorAll("#content h1");
var h2s = document.querySelectorAll("#content h2");
// 遍历menu
var uls = document.querySelectorAll("#menu ul");
var h2j = 0;
for(var i=0;i<uls.length-1;i++){
	// 为每一个ul的头一个li-a添加h1
	uls[i].children[0].lastElementChild.innerHTML=h1s[i].innerHTML;
	uls[i].children[0].lastElementChild.href="#"+h1s[i].id;
	// 为每一个ul的li-a添加h2
	for(var j=1;j<uls[i].children.length;j++){
		uls[i].children[j].lastElementChild.innerHTML=h2s[h2j].innerHTML;
		uls[i].children[j].lastElementChild.href="#"+h2s[h2j].id;
		h2j++;
	}
}

// *********************************************************************************为右侧的菜单添加高度函数
var h1s = document.querySelectorAll("#content h1");
var menuh1s = new Array(0);
menuh1s[0] = h1s[0].offsetTop+250;

for(var i=1; i<h1s.length;i++){
	// menuh1s[menuh1s.length] = h1s[i].offsetTop+380-menuh1s[menuh1s.length-1];
	menuh1s[menuh1s.length] = h1s[i].offsetTop+250;
}
console.log(menuh1s)
window.onscroll = function(){
	
	var hsTop = menuh1s[0];
	var top = document.documentElement.scrollTop;
	// 所有li为none
	for(var x=0;x<uls.length;x++){
		for(var y=1;y<uls[x].children.length;y++){
			// 色块
			uls[x].children[0].firstChild.style.display = "none";
			uls[x].children[y].style.display = "none";	
		}
	}
	//确定页面位置
	var page = 0;
	for(var i=1;i<=menuh1s.length;i++){
		if(top >= hsTop){
			hsTop = menuh1s[i];
			page = i;
			continue;
		}
		break;
	}
	console.log(page)
	console.log(page)
	//开始设置menu
	if(page>=1){
		document.querySelector("#menu").style.position = "fixed";
		document.querySelector("#menu").style.top = "0px";
		for(var j=1;j<uls[page-1].children.length;j++){
			// 色块
			uls[page-1].children[0].firstChild.style.display = "block";
			// 展示对应li
			uls[page-1].children[j].style.display = "inline-block";
			uls[page-1].children[j].style.left = 20+"px";
		}
	}else{
		document.querySelector("#menu").style.position = "";
		document.querySelector("#menu").style.top = "";
	}
}
			