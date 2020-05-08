<template>
    <div class="plan-board">
        <!-- 每日标记 -->
        <div class="flex-x-reverse">
            <div class="color-block" @click.stop="renderTimeBlock">
                <div class="block" :class="timeBlockColor">
                    {{ timeBlockName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { chargeHHMMRange } from '@/utils/utils.js'
    export default {
        data() {
            return {
                timeBlockName: '',
                timeBlockColor: '',
                timeLine: [
                    {
                        time: ['06:00', '08:30'],
                        tip: 'Math',
                        styles: {
                            class: 'c-red',
                        },
                    },
                    {
                        time: ['09:30', '12:00'],
                        tip: 'CS',
                        styles: {
                            class: 'c-yellow',
                        },
                    },
                    {
                        time: ['13:40', '18:00'],
                        tip: 'Work',
                        styles: {
                            class: 'c-blue',
                        },
                    },
                    {
                        time: ['21:00', '00:00'],
                        tip: 'En',
                        styles: {
                            class: 'c-green',
                        },
                    },
                ],
            }
        },
        mounted() {
            this.renderTimeBlock()
        },
        methods: {
            renderTimeBlock() {
                for (let i = 0; i < this.timeLine.length; i++) {
                    let plan = this.timeLine[i]
                    if (chargeHHMMRange(plan.time)) {
                        this.timeBlockName = plan.tip + ' ' + plan.time[1]
                        this.timeBlockColor = plan.styles.class
                        return
                    }
                }
                this.timeBlockName = 'no'
                this.timeBlockColor = 'c-white'
            },
        },
    }
</script>

<style lang="scss" scoped>
    // Time Block
    .color-block {
        // width: 18rem;
        // height: 18rem;
        .block {
            width: 8rem;
            height: 8rem;
            line-height: 8rem;
            margin: 0.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .c-red {
            background-color: rgba(255, 125, 212, 0.5);
            &:hover {
                background-color: rgba(255, 125, 212, 1);
            }
        }
        .c-yellow {
            background-color: rgba(235, 255, 125, 0.5);
            &:hover {
                background-color: rgba(235, 255, 125, 1);
            }
        }
        .c-blue {
            background-color: rgba(125, 229, 255, 0.5);
            &:hover {
                background-color: rgba(125, 229, 255, 1);
            }
        }
        .c-green {
            background-color: rgba(125, 255, 194, 0.5);
            &:hover {
                background-color: rgba(125, 255, 194, 1);
            }
        }
        .c-white {
            background-color: rgba(207, 207, 207, 0.5);
            &:hover {
                background-color: rgba(207, 207, 207, 1);
            }
        }
    }
</style>
