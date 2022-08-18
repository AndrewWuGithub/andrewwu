

//-------------------------------------------------------------------------------------
// preSet：


center = [640,360,360]
center_vector = [100,100,100]

//-------------------------------------------------------------------------------------
function printx(text)
{
	document.write(text)
	document.write("<br>")
}

//document.write("<hr>")
//-------------------------------------------------------------------------------------



a1 = [center_vector[0],center_vector[1],center_vector[2],"※"]
cPoint = [a1]
//-------------------------------------------------
a1 = [center_vector[0]+ 30,center_vector[1],center_vector[2],"N"]
N = [a1]
//-------------------------------------------------
a1 = [center_vector[0]- 30,center_vector[1],center_vector[2],"S"]
S = [a1]
//-------------------------------------------------
a1 = [center_vector[0],center_vector[1] - 30,center_vector[2],"W"]
W = [a1]
//-------------------------------------------------
a1 = [center_vector[0],center_vector[1] + 30,center_vector[2],"E"]
E = [a1]
//-------------------------------------------------
a1 = [center_vector[0],center_vector[1],center_vector[2] + 30,"▼"]
D = [a1]
//-------------------------------------------------
a1 = [center_vector[0],center_vector[1],center_vector[2] - 30,"▲"]
U = [a1]

pack = []
pack_vector = [cPoint,N,S,W,E,U,D]


u3d = Udm3d.createNew(pack,center)
//u3d_vector = Udm3d.createNew(pack_vector,center_vector)

u3d.scale = 0.25


//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
var drawTextOnScreen = function(text,position,size,color)
{

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.font= size + "px Arial";
	//ctx.font="30px Arial";
	ctx.fillStyle= color
	ctx.textAlign="center"
	ctx.fillText(text,position[0],position[1]);

	//printx("haha")
}






var drawLine = function(lineForDraw)
{
	//printx("im in drawLine"+lineForDraw+"???")	
	for (num in lineForDraw)
	{
		i = lineForDraw[num]
		// i : [[450.0, 370.0, '#006939'], [450.0, 370.0, '#006939'], '#006939']
		a = i[2]
		b = a.split("")
		if(b[0] == '#')
		{
			//graph.create_line(i[0][0],i[0][1],i[1][0],i[1][1],fill = str(i[2]),width = 2)
			var c=document.getElementById("myCanvas");
			var ctx=c.getContext("2d");
			//ctx.fillStyle="#FB630C";
			ctx.moveTo(i[0][0],i[0][1]);
			ctx.lineTo(i[1][0],i[1][1]);
			ctx.stroke()
		}
		else
		{
			// 如果I0=I1 说明该线段是一个点，此时I3为该位置的文本
			//graph.create_text(i[0],text = i[2])

			//printx("i0"+i[0])
			var c=document.getElementById("myCanvas");
			var ctx=c.getContext("2d");
			ctx.font="20px Arial";
			//ctx.font="30px Arial";

			temp = i[2].split("@")
			text = temp[0]
			//pin1
			try
			{
				color = temp[1]
			}
			catch(error)
			{
				color = "#000000"	
			}
		
			ctx.fillStyle=color;
			tx = i[0][0]
			ty = i[0][1]
			ctx.textAlign="center"
			ctx.fillText(text,tx,ty);


		}

	}	
}



var tellPostion = function (event) 
{  //鼠标定位赋值函数
	x = 0
	y = 0
    var posX = 0, posY = 0;  //临时变量值
    var e = event || window.event;  //标准化事件对象

    if (e.pageX || e.pageY) 
	{  //获取鼠标指针的当前坐标值
        posX = e.pageX;
        posY = e.pageY;
    } 

	else if (e.clientX || e.clientY) 
	{
        posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    }
    //o.style.position = "absolute";  //定义当前对象为绝对定位
    //o.style.top = (posY + y) + "px";  //用鼠标指针的y轴坐标和传入偏移值设置对象y轴坐标
    //o.style.left = (posX + x) + "px";  //用鼠标指针的x轴坐标和传入偏移值设置对象x轴坐标
	locate_mouse = [posX,posY]
	return locate_mouse
}
function clearCanvas()
{  
    var c=document.getElementById("myCanvas");  
    var cxt=c.getContext("2d");  
    c.height=c.height;  
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#000000";   //#d8d8d8
	ctx.fillRect(0,0,5000,5000);
}  

	

ifMousePressed = 0
locate_last = [0,0]

//绑定在鼠标移动时
document.onmousemove = function (event) 
{
	
	//draw (当鼠标被按下时)
	if(ifMousePressed == 1)
	{
		locate_new = tellPostion(event);
		locate_delta = [locate_new[0] - locate_last[0],locate_new[1] - locate_last[1]]
		locate_last = locate_new
		//refresh
		clearCanvas()
		convertDataTo3d()
		drawLine(u3d.refresh3D(locate_delta))
		//drawLine(u3d_vector.refresh3D(locate_delta))
		setFrontImg()

		//printx(u3d_vector.pack)
		//printx(u3d_vector.refresh3D(locate_delta))
	}
	else
	{
		locate_new = tellPostion(event);
		locate_last = locate_new
	}	
}

//绑定鼠标按下
document.onmousedown = function (event) 
{
	ifMousePressed = 1
	locate = tellPostion(event);
	x_click = locate[0]
	y_click = locate[1]
	locate_temp = [x_click,y_click]

	//printx(locate_temp)
}



//绑定鼠标松开时
document.onmouseup = function (event) 
{
	ifMousePressed = 0
}






//鼠标滚轮

/*
var scrollFunc = function (e) {  
	e = e || window.event;  
	if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
		if (e.wheelDelta > 0) { //当滑轮向上滚动时  
			tf = 1
		}  
		if (e.wheelDelta < 0) { //当滑轮向下滚动时  
			tf = -1
		}  
	} else if (e.detail) {  //Firefox滑轮事件  
		if (e.detail> 0) { //当滑轮向下滚动时  
			tf = -1
		}  
		if (e.detail< 0) { //当滑轮向上滚动时  
			tf = 1 
		}  
	} 

	//u3d.changeScale(tf)
	//refresh
	clearCanvas()
	convertDataTo3d()
	drawLine(u3d.refresh3D([0.1,0.1]))
	//drawLine(u3d_vector.refresh3D([0.1,0.1]))
} 
//IE、Opera注册事件
if(document.attachEvent){document.attachEvent('onmousewheel',scrollFunc);}
//Firefox使用addEventListener添加滚轮事件  
if (document.addEventListener) {//firefox  
document.addEventListener('DOMMouseScroll', scrollFunc, false);}  
//Safari与Chrome属于同一类型
window.onmousewheel = document.onmousewheel = scrollFunc; 
//event.wheelDelta 滚动方向上：120下：-120  Firefox：event.detail 滚动方向上：-3下:3

*/

/*
#五五五五五五五亚亚亚五五王三二二二二一二二二三王玉亚双双玉玉玉五五五玉
#五五五五五亚叒鼷鼷鼷五二一一一、、、一一一一一一二王玉亚玉玉玉五五玉玉
#五五五王玉奤鼷鼷器王一一一一一一一一一一一一一一一二王叒器期叕玉玉玉玉
#五玉玉王叕鼷鼷叕三一一一一一一一一一一一一二二二二二叒鼷鼷鼷鼷鼷叕玉玉
#五亚亚五器鼷叒二一一一一一一一一一一一一二二二二二二玉鼷鼷鼷鼷鼷鼷四玉
#五亚玉五期鼷三一一一一一一二二二二二二二二二二二二三三双鼷鼷鼷鼷鼷鳍亚
#玉玉亚玉亚五二二二二二二二二二二二二二二二二二三三三三王鼷鼷鼷鼷鼷鳍双
#双亚亚亚五二二二二二二二二二二二二二三三三三三三三三王王双鼷鼷鼷鼷双亚
#双双双亚三一二二三三五双三三三三三三三王王王王王王王王王五鳍鼷鼷叒三玉
#叕叒奤叕二二二三三玉鼷鼷亚二三三王王五双鳍叕玉五王王王王王玉双亚三三亚
#器槭鼷双二二二三五鼷鼷鼷亚二三三王五叒鼷鼷鼷四玉五五王王王五玉五王玉鳍
#鼷鼷鼷鼷王二三五鼷鼷奤玉二二二三王玉鼷鼷鼷鼷奤玉五五王王王王五五五器鼷
#鼷鼷鼷鳍三二三亚鼷亚一一一二三三三三亚鼷鼷鼷鼷四玉玉玉玉玉五玉玉叕鼷鼷
#鼷鼷鼷鼷五三三王王一一一二二三二三三三双鼷鼷鼷鼷亚玉玉玉玉双双双鼷鼷鼷
#鼷鼷鼷鼷玉三三三二一一一二三三三王王三王叕鼷鼷奤双玉玉玉亚四叒鼷鼷鼷鼷
#鼷鼷鼷鼷鼷玉三王二二三三三王王三三王王王玉四四亚亚玉亚亚叕崎鼷鼷鼷鼷鼷
#鼷鼷鼷鼷鼷鼷鳍双五二玉鼷槭崎鳍叒亚五王王玉双双亚亚双叒崎鼷鼷鼷鼷鼷鼷鼷
#鼷鼷鼷鼷鼷鼷鼷鼷叒玉五双鼷鼷鼷鼷四玉亚双崎鳍叕叕叕奤鼷鼷鼷鼷鼷鼷鼷鼷鼷
#鼷鼷鼷鼷叒崎鼷鼷叒叕叕双叕崎叕叕叒期鳍鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷
#鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷槭鳍鳍鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷鼷
*/




planets = []
for (i= 0;i<=120;i++)
{
	x = Math.floor(Math.random() * 10000) - 2000
	y = Math.floor(Math.random() * 10000) - 2000
	size = Math.floor(Math.random() * 10)

	temp = Math.random()
	pre = 1
	if(temp<=0.5)
	{
		pre = -1
	}
	x = x * pre
	y = y * pre

	planets.push([x,y,size])
}




// pinConvertData
function convertDataTo3d()
{
	//u3d = udm3d.createNew(pack,center)	
	u3d.clear()
	size = [20,20,20]



	// Star1

	star_position = [0,0]
	star_size = 1000
	star_layer1 = 290
	star_layer2 = 430
	color_inner = "#ffffff"
	color_midd = "#76A5EB"
	color_outter = "#C31A85"


	for (i=0;i<=2*star_size;i++)
	{
		x = Math.floor(Math.random() * star_size)-star_size/2
		y = Math.floor(Math.random() * star_size)-star_size/2
		z = Math.floor(Math.random() * star_size)-star_size/2
		position = [x,y,z]
		color = color_midd
		if(x<=star_layer1 && -star_layer1<=x)
		{
			if(y<=star_layer1 && -star_layer1<=y)
			{
				if(z<=star_layer1 && -star_layer1<=z)
				{
					color = color_inner //#E55A01
				}
			}	
		}
		color_edge = color_outter
		edge = star_layer2
		if(x>=edge || -edge>=x)
		{	
			color = color_edge //#E55A01
		}
		if(edge<=y || -edge>=y)
		{
			color = color_edge //#E55A01
		}
	
		if(z>=edge || -edge>=z)
		{
			color = color_edge //#E55A01
		}
		//u3d.addNewBox(size,position,color)
		temp = Math.random()
		if(temp <= 0.5)
		{
			text = "●"
		}
		else
		{
			text = "●"
		}
		text = text+"@"+color

		position[0] += star_position[0]
		position[1] += star_position[1]
		u3d.addNewText(position,text)


		


	}





	// 行星
	for (num in planets)
	{
		x0 = planets[num][0]
		y0 = planets[num][1]
		size = planets[num][2]
		for (i=0;i<=size/2;i++)
		{	
			x = Math.floor(Math.random() * size)
			y = Math.floor(Math.random() * size)
			z = Math.floor(Math.random() * size)
			position = [x+x0,y+y0,z]
			//u3d.addNewBox(size,position,color)
			color = '#ffffff'
			text = "."
			text = text+"@"+color
			u3d.addNewText(position,text)
		}
	}	
}



function setFrontImg()
{
	/*
	drawTextOnScreen("LOGO",[90,90],"30","#ffffff")
	drawTextOnScreen("About",[300,80],"15","#ffffff")
	drawTextOnScreen("Home",[400,80],"15","#ffffff")
	drawTextOnScreen("Outline",[500,80],"15","#ffffff")
	drawTextOnScreen("Works",[600,80],"15","#ffffff")
	drawTextOnScreen("Members",[700,80],"15","#ffffff")
	drawTextOnScreen("Archive",[800,80],"15","#ffffff")
	drawTextOnScreen("Blog",[900,80],"15","#ffffff")

	drawTextOnScreen("November",[1170,170],"34","#ffffff")
	drawTextOnScreen("9-12",[1170,130],"82","#ffffff")


	drawTextOnScreen("CALIBRATION",[640,600],"190","#ffffff")
	drawTextOnScreen("iii Exhibition 2021 BoxyBit / testing; Shu nei ",[640,670],"9","#ffffff")
	drawTextOnScreen("The university of Tokyo Graduate School ; III/GSII",[640,650],"15","#ffffff")
	*/
}

function nextFrame()
{
	clearCanvas()
	convertDataTo3d()
	drawLine(u3d.refresh3D([3,0]))
	//drawLine(u3d_vector.refresh3D([5,0]))
	setFrontImg()
}

var c=0;
function showLogin()
{
	nextFrame()
}
//setInterval方法或字符串 ，毫秒，参数数组（方法的）)
setInterval("showLogin()","30");//showLogin()函数名一定要带括号

