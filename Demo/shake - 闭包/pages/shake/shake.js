
let accelerometerKeeper = function(){
	let accelerometerListener = false
	let coordinate = 0
	let coordinateTimer = null
	
	return {
		getCoordinate: function () {
			if (!accelerometerListener) {
				setInterval(function () {
					coordinate++
				}, 1000)
				console.log('监听器启动')
				accelerometerListener = true
			}
			return coordinate
		}
	}
}();

export default accelerometerKeeper