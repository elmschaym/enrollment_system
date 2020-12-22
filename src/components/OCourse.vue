<template>
    <div class="cour-s">
        <div class="a">{{ course.id > 1 ? course.program_type : '--' }}</div>
        <div class="n">
            <div class="name">{{ course.id > 1 ? course.name : '&lt;EmptyCourse&gt;'}}</div>
            <div class="info">{{ course.id > 1 ? course.program_type : '--' }}{{ course.name_alias }}, <span style="margin-left: 6px">{{ course.total_units}} units</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            course: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                earned_units: 0
            }
        }
    }
</script>

<style scoped>
    .cour-s { display: grid; grid-template-columns: 48px auto; height: 48px; background-color: #fff; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; border-radius: 24px 24px 0 24px; cursor: pointer; transition: all 0.3s cubic-bezier(.25,.8,.25,1); }
    .cour-s:hover { border-style: solid; border-width: 1px; border-color: transparent #cacaca #b0b0b0 #cacaca; }

    .cour-s .a { background-color: #f5f5f5; height: 46px; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #909090; border-radius: 23px; }
    .cour-s .n { padding: 7px 6px; }
    .cour-s .n .name { font-size: 12px; color: #000; padding-bottom: 6px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; }
    .cour-s .n .info { font-size: 10px; color: #444; }
</style>
