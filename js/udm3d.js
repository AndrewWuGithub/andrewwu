
var Udm3d = 
{
	createNew: function(pack,center)
	{
		// some code here
		var udm3d = {}	
		udm3d.pack = pack
		udm3d.center = center
		udm3d.pack_trans_element = [30,15]
		udm3d.scale = 1


		//--------------------------------------------------
		udm3d.clear = function()
		{ 
			udm3d.pack = []
		}
		//--------------------------------------------------
		udm3d.showPack = function()
		{
			return udm3d.pack
		}
		//--------------------------------------------------
		udm3d.addNewBox = function(size,position,color)
		{
			rate = 1
			size = [size[0]*rate,size[1]*rate,size[2]*rate]
			position = [position[0] + udm3d.center[0],position[1] + udm3d.center[1],position[2] + udm3d.center[2]]

			a1 = [position[0] - 0.5*size[0],position[1] - 0.5*size[1],position[2] - 0.5*size[2],color]
			b1 = [position[0] + 0.5*size[0],position[1] - 0.5*size[1],position[2] - 0.5*size[2],color]
			c1 = [position[0] + 0.5*size[0],position[1] + 0.5*size[1],position[2] - 0.5*size[2],color]
			d1 = [position[0] - 0.5*size[0],position[1] + 0.5*size[1],position[2] - 0.5*size[2],color]

			a11 = [position[0] - 0.5*size[0],position[1] - 0.5*size[1],position[2] + 0.5*size[2],color]
			b11 = [position[0] + 0.5*size[0],position[1] - 0.5*size[1],position[2] + 0.5*size[2],color]
			c11 = [position[0] + 0.5*size[0],position[1] + 0.5*size[1],position[2] + 0.5*size[2],color]
			d11 = [position[0] - 0.5*size[0],position[1] + 0.5*size[1],position[2] + 0.5*size[2],color]
			cube = [a1,b1,c1,d1,a11,b11,c11,d11]
			udm3d.pack.push(cube)
		}

		//--------------------------------------------------
		udm3d.addNewBoxFromCode = function(cube,color)
		{
			a = 1
		
			for(num in cube)
			{
				i = cube[num]
				i[0] = i[0] + udm3d.center[0]
				i[1] = i[1] + udm3d.center[1]
				i[2] = i[2] + udm3d.center[2]
				i.push(color)
				
				udm3d.pack.push(i)
			}
		}
		//--------------------------------------------------
		udm3d.addNewText = function(position,text)
		{

			position = [position[0] + udm3d.center[0],position[1] + udm3d.center[1],position[2] + udm3d.center[2]]
			a1 = [position[0],position[1],position[2],text]
			
			text = [a1]
			udm3d.pack.push(text)
		}
		//--------------------------------------------------
		udm3d.transX = function(locate,angle) 
		{
			center = udm3d.center
			// angle < (0,360)
			pointx = center[0]
			pointy = center[1]
			pinntz = center[2]
			x = locate[0]
			y = locate[1]
			z = locate[2]
			angle = (angle / 360) * 2 * 3.1415926
			if(angle >= 0)
			{
				angle = angle % 360
				rx = (x-pointx)*Math.cos(angle) + (y-pointy)*Math.sin(angle)+pointx
				ry = (y-pointy)*Math.cos(angle) - (x-pointx)*Math.sin(angle)+pointy
			}
			else
			{
				angle = - angle
				angle = angle % 360
				rx = (x-pointx)*Math.cos(angle) - (y-pointy)*Math.sin(angle)+pointx
				ry = (x-pointx)*Math.sin(angle) + (y-pointy)*Math.cos(angle)+pointy
			}
			rx = rx.toFixed(5)
			ry = ry.toFixed(5)

			newTemp = [rx,ry,z]
			return newTemp
		}
		//--------------------------------------------------
		udm3d.transY = function(locate,angle)
		{
			center = udm3d.center
			pointx0 = center[0]
			pointy0 = center[1]
			pointz0 = center[2]
			x0 = locate[0]
			y0 = locate[1]
			z0 = locate[2]
			x = y0
			y = z0
			pointx = pointy0
			pointy = pointz0
			angle = -angle
			angle = (angle / 360) * 2 * 3.1415926 
			if(angle >= 0)
			{
				rx = (x-pointx)*Math.cos(angle) + (y-pointy)*Math.sin(angle)+pointx
				ry = (y-pointy)*Math.cos(angle) - (x-pointx)*Math.sin(angle)+pointy
			}
			else
			{
				angle = - angle
				rx = (x-pointx)*Math.cos(angle) - (y-pointy)*Math.sin(angle)+pointx
				ry = (x-pointx)*Math.sin(angle) + (y-pointy)*Math.cos(angle)+pointy
			}	
			newTemp = [x0,ry]
			return newTemp
		}
		//--------------------------------------------------
		udm3d.refresh3D = function(locate_delta)
		{
			center = udm3d.center
			for (num1 in udm3d.pack)
			{
				obj = udm3d.pack[num1]

				for (num2 in obj)
				{
					i = obj[num2]
					i[0] = (i[0]-center[0]) * udm3d.scale + center[0]
					i[1] = (i[1]-center[1]) * udm3d.scale + center[1]
					i[2] = (i[2]-center[2]) * udm3d.scale + center[2]
					obj[num2] = i

				}
				udm3d.pack[num1] = obj
			}
			//printx("imhere~~~!"+udm3d.pack)
			pack = udm3d.pack
			// locate_delta = 0 or pp
			try
			{
				deltax = locate_delta[0]
				deltay = locate_delta[1]
				anglex = deltax / 10
				angley = deltay / 10
				udm3d.pack_trans_element[0] += anglex

				if(udm3d.pack_trans_element[0] >= 0)
				{
					udm3d.pack_trans_element[0] = udm3d.pack_trans_element[0] %360
				}
				else
				{
					udm3d.pack_trans_element[0] = - udm3d.pack_trans_element[0]
					udm3d.pack_trans_element[0] = udm3d.pack_trans_element[0] %360
					udm3d.pack_trans_element[0] = 360 - udm3d.pack_trans_element[0]
				}
				udm3d.pack_trans_element[1] += angley

				if(udm3d.pack_trans_element[1] > 90)
				{
					udm3d.pack_trans_element[1] = 90
				}
				if(udm3d.pack_trans_element[1] < -90)
				{
					udm3d.pack_trans_element[1] = -90
				}	
			}
			catch(error)
			{
				temp = []
			}
			pack_show = []

			for (num1 in pack)
			{
				obj = pack[num1]

				obj_show = []
				for (num2 in obj)
				{
					i = obj[num2]
					m = udm3d.transX(i,udm3d.pack_trans_element[0])
					n = udm3d.transY(m,udm3d.pack_trans_element[1])
					temp2 = [n[0],n[1],i[3]]
					obj_show.push(temp2)
					//obj[num2] = i
				}
				pack_show.push(obj_show)
				//pack[num1] = obj
			}

			output = []
			for (num1 in pack_show)
			{
				obj = pack_show[num1]
			
				if(obj.length == 8)
				{
					// is a cube 
					temp = udm3d.drawCube(obj)
					for (num2 in temp)
					{
						i = temp[num2]
						output.push(i)
					}		
				}
				if(obj.length == 1)
				{
					temp = udm3d.drawText(obj)
					for (num2 in temp)
					{
						i = temp[num2]
						output.push(i)
					}
						
				}
				if(obj.length == 2)
				{
					temp = udm3d.drawPipe(obj)
					for (num2 in temp)
					{
						i = temp[num2]
						output.push(i)
					}
				}
			}
			udm3d.pack_show = pack_show
			//printx(output)
			return output
		}
		//--------------------------------------------------
		udm3d.drawPipe = function(pack)
		{

			// pack : [[point],[point]]
			lineForDraw = []
			lineForDraw.push([pack[0],pack[1],pack[0][2]])
			// [[450.0, 370.0, '#006939'], [450.0, 370.0, '#006939'], '#006939']
			return lineForDraw
		}
		//--------------------------------------------------
		udm3d.drawCube = function(pack)
		{
			// print('pack-----',pack)
			// pack: [[point],[point],[point]]
			pack1 = [pack[0],pack[1],pack[2],pack[3]]
			pack2 = [pack[4],pack[5],pack[6],pack[7]]
			lineForDraw = []
			// : [[[x1,y1][x2,y2]]]
			for (i = 0; i < 3; i++) 
			{
				lineForDraw.push([pack1[0],pack1[3],pack1[0][2]])
				lineForDraw.push([pack1[i],pack1[i+1],pack1[i][2]])
			}
			for (i = 0; i < 3; i++) 
			{
				lineForDraw.push([pack2[0],pack2[3],pack2[0][2]])
				lineForDraw.push([pack2[i],pack2[i+1],pack2[i][2]])
			}
			for (i = 0; i < 4; i++) 
			{
				lineForDraw.push([pack1[i],pack2[i],pack1[i][2]])
			}
			return lineForDraw

		}
		//--------------------------------------------------
		udm3d.drawText = function(obj)
		{
			// obj : [[point]]
			lineForDraw = []
			obj = obj[0] 
			lineForDraw.push([[obj[0],obj[1]],[obj[0],obj[1]],obj[2]])
			return lineForDraw
		}
		//--------------------------------------------------
		udm3d.changeScale = function(tf)
		{
			center = udm3d.center
			if (tf > 0)
			{
				t = 1.05
			}
				
			if (tf < 0)
			{
				t = 0.95
			}
				
			udm3d.scale = t * udm3d.scale
		}


		//--------------------------------------------------
		
		//--------------------------------------------------

		//--------------------------------------------------
		return udm3d;
　　}
}
