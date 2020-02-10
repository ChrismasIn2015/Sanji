<template>
    <div class="main-canvas">
        <canvas id='myCanvas'>不支持Canvas</canvas>
    </div>
</template>

<script>
export default {
    mounted () {
			
    }
}
</script>

<style scoped>
.main-canvas{
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