# VBA - 学习笔记

## 通用TIPS

```
03版本Excel.xls
07版本Excel.xlsx
vba版本Excel.xlsm


# 接口http://quotes.money.163.com/service/chddata.html?code=0600606&start=20190422&end=20190426&fields=TCLOSE

TCLOSE:收盘价


1.使用下划线_表示下一行是这行的连续，文本不适用（&）
2.'注释这样写'
3.使用视图：对象浏览器：查找库-对象-对象...成员/方法
4.使用视图：立即窗口：可以直接对工作簿进行
5. Set关键字 使变量指向具体实现
6.一般来说对象("名称")是具体对象，仅对象表示想要调用对象方法
7.Chr(10)换行
```

## 语法

```
# 可以使用Exit xxx 来退出特定程序段

判断1
    IF 条件 Then 
        程序1
    Else/ElseIf Then
        程序2
    End If
判断2
	Select Case 变量
		Case Value1
			程序1
		Case Else
	End Select
注：Exit Do/For 立即跳出循环
循环1
	Do (While/Until) 条件
		程序段
	Loop Until 条件
循环2
	For counter = start To end (Step num 计数增加值)
		程序段
	Next counter（指计数器增加1）
循环3
	For Each 变量 In 集合
		程序段
	Next 变量
循环4
	With 对象
		对某单一对象执行程序段
	End With
自定义函数：可以直接在表格里调用
	Function name(...)
		代码
		name=返回值：可以是数组
	End Function


子程序过程：Sub - ：仅仅进行动作
函数过程：（Public）Function - End Function：仅仅进行计算
属性过程-自定义对象：
```

## 数据结构

```
# 使用Application.Transpose行列互换
# 调用Sub ：Call name
# 调用函数：
数组
	一维数组：是一行，大小9，编号0-9，实际10
		Dim name(capa) As Type
		4 = 5个位置0-4
	二维数组：  
		Dim name(row,column) As Variant
		name(y，x)
	获得最大编号
		Ubound(数组)
	获得最大编号
		Ubound(数组,维度)
    动态数组
        Dim arr() As Type
        Redim arr(capa)
            充填
        Stop
        Redim Preserve(指保留原值) arr(moreCapa)
            充填
        Stop
    推荐直接充填数组
        Dim arr
            arr = Range("范围")
        Stop
    再直接充填单元格
        范围 = 数组名称
        # 不论数组多大，仅能充填范围内的单元格
    清空数组
    	Erase arr1
    数组作为参数的函数
    	Application.Max(arr)
    	Min/Count/A/Match/Sum
    生成数组的函数
    Application
    	Split（arr,分隔符）
    	Join（arr,分隔符）：加入分隔符
    	Filter（数组，条件，是/否）:筛选是/否数组
    	Index(二维，y，x):返回数组
    	VLookUp(数组里的需查找值
    	，范围/可以用数组表示，)
    	SumIf/CountIf - 可以使用数组作为参数
    	
```

## 字典

```
字典：Key:Item
# Key不重复，大数据量推荐使用字典
# 由scrrun.dll提供
	Set d = CreateObject("scripting dictionary")
```

## 声明变量

```
声明变量Dim/As
	Boolean：与AND，或OR，非NOT
    Integer%
    Long&
    Single!：使用&符号进行连接
    Double#
    Date
    String$
    Variant:任意数据类型
    Type:自定义)
```

 

## 工作簿

```
工作簿
	Workbooks("*.xlsx")：指定工作表
		新建.Add
		保存.Save
		另存为.SaveAs"目录"
	Workbook
		路径Path
	ActiveWorkbook
```



## 工作表

```
工作表
	Sheets("*.xlsx")：指定工作表
	Sheets(数字)：按打开顺序
		单元格.Cells(y,x)
		范围.Range("A1")
		计数.Count
		无后缀名称.Name
		新增.Add - 需要命名
		移动.Move before/after:=
		复制.Copy before/after:=
		删除.Delete
遍历工作表
	For Each sh In Worksheets
        sh.Select
        Call 设置A1格式
    Next
```



## 单元格

```
单元格
	Range(范围).Select
	Range(范围).Offset(y,x).Select
	原点单元格.Resize(行,列)
	原点单元格.Resize(行)
	不相邻Union(单元格1，单元格2...).Select
	获取行
		.Row
		.EntirRow.Select
	获取列
		.Column
		.EntirColumn.Select
	获取真实值.Value
	获取文本值.Text
	获取公式.Formula
	移动.End(xlUp)：返回含数值的最上单元格
行列
	Rows(数字)
	Range("数字")
	Columns(数字)
	Columns("字母")
	整个.EntirRow/Column
	插入.Insert
复制
	1复制到.Copy/Cut 目标格
	2.Copy → ActiveSheet.Paste.目标格
充填
	源格赋值 → 范围.FillDown-Right/Left
查询
	不推荐使用循环查找
	Application.WorksheetFunction.CountIf(...)
	Application.WorksheetFunction.Match(目标,范围,0)
	Sheets().().Find(目标,Lookat:=xlWhole):返回单元格
```



## 文件系统

```
文件系统
	返回文件路径
		Dir("目录.后缀")
		对象.path：返回路径字符串
	新建文件夹 MkDir 路径
	删除文件夹 RmDir 路径
	重命名/移动 Name "" As ""
	是否存在
		FileFolderExists(path)
	文件大小
		Len(文件引用)
    复制
    	FileCopy "源.xlsx","目标.xlsx"
	删除
		Kill "目标.xlsx"
	
			
```

