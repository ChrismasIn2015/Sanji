<template>
    <div class="index">
        <div class="index-entry">
            <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
            <div class="entry common-btn blue-on" @click.stop="toHistory">
                时间
            </div>
        </div>

        <!-- 每日标记 -->
        <planBoard />
    </div>
</template>

<script>
    import planBoard from './components/planBoard.vue'
    export default {
        data() {
            return {}
        },
        components: {
            planBoard,
        },
        methods: {
            toLibrary() {
                this.$router.push({ name: 'library' })
            },
            toHistory() {
                this.$router.push({ name: 'history' })
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import './styles/index.scss';
</style>
