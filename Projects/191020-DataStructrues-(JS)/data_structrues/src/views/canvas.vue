<template>
    <div class="canvas">
        <canvas id='myCanvas'>不支持Canvas</canvas>
    </div>
</template>

<script>
export default {
    mounted () {
        // 1.
        let canvas = document.getElementById("myCanvas");
        canvas.width = 800;
        canvas.height = 600;
        let context = canvas.getContext("2d"); // 1.1 创建一个状态
        context.beginPath() // 1.2 保留原状态 新状态开始====================================================

        // # 绘制
        // # 绘制线段
        // context.strokeStyle = '#124324' // 直线样式
        // context.lineWidth = 5 // 宽度
        // context.stroke() // 绘制直线
        
        // # 充填
        // context.fillStyle = "#FF0000" // 充填样式
        // context.fill() // 进行充填

        // 2. 设置状态 => 执行状态/绘制

        // 2.1 设置直线状态
        // context.moveTo(100, 100) // 起点
        // context.lineTo(200, 200) // 终点

        // 2.2 设置矩形状态
        // context.fillRect(0,0,100,100); // 从左上原点/宽高/绘制矩形 rectangle

        // 2.3 设置圆状态
        let centerx = 100, centery = 100, radius = 100 // 圆心/半径
        let startAngle = 0
        let endingAngle = (Math.PI) // 弧度值 = 东->西边 = 0->Math.PI
        context.strokeStyle = '#888888' // 直线样式
        context.lineWidth = 1 // 宽度
        let anticlockwise = false // (可选)是否要逆时针
        // context.arc( centerx, centery, radius, startAngle, endingAngle, false )
        context.arc( centerx, centery, radius, startAngle, endingAngle, false )
        context.stroke() // 绘制直线

        
        // context.closePath() // 1.2 (可选)保留原状态/新状态开始/会自动封闭线段====================================================
    }
}
</script>

<style scoped>
.canvas{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#myCanvas{
    border: 1px solid black;
}
</style>