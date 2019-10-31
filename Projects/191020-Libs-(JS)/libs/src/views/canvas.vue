<template>
    <div class="canvas">
        <canvas id='myCanvas'>不支持Canvas</canvas>
    </div>
</template>

<script>
export default {
    mounted () {
		// 1. prepare
		let canvas = document.getElementById("myCanvas");
		canvas.width = 1200;
		canvas.height = 600;
		let context = canvas.getContext("2d");
		
		// 2.
		var mousePos = [0, 0];
		var nodes = []; // 存储星星
		var edges = []; // 存储边
		
		// 3 设置自适应
		window.onresize = function () {
			canvasEl.width = document.body.clientWidth
			canvasEl.height = canvasEl.clientHeight;
			if (nodes.length == 0) {
				constructNodes();
			}
			render();
		};
		window.onresize();
		
		// 4
		function constructNodes() {
			for (var i = 0; i < 100; i++) {
				var node = {
					drivenByMouse: i == 0,
					x: Math.random() * canvasEl.width,
					y: Math.random() * canvasEl.height,
					vx: Math.random() * 1 - 0.5,
					vy: Math.random() * 1 - 0.5,
					radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3,
				};
				nodes.push(node);
			}
			nodes.forEach(function (e) {
				nodes.forEach(function (e2) {
					if (e == e2) { return; }
					var edge = {
						from: e,
						to: e2,
					}
					addEdge(edge);
				});
			});
		}
		
		// 5
		function addEdge(edge) {
			var ignore = false;
			edges.forEach(function (e) {
				if (e.from == edge.from && e.to == edge.to) {
					ignore = true;
				}
				if (e.to == edge.from && e.from == edge.to) {
					ignore = true;
				}
			});
			if (!ignore) {
				edges.push(edge);
			}
		}
		
		// 6
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