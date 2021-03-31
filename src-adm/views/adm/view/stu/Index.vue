<template>
    <div class="wrap-i">
        <div class="list-a" v-for="(a,i) in admission" :key="'adm_'+i">
            <div class="p">
                <div class="a">
                    <div>
                        <span>{{ i+1 }}</span>
                    </div>
                </div>
                <div class="b" v-if="a.course.id > 1">
                    <div>
                        <b>{{ a.course.program_type }} {{ a.course.name }}</b>
                        <span>{{ a.course.department.name }} ({{ a.course.department.name_alias }})</span>
                    </div>
                </div>
                <div class="b" v-else>
                    <div>
                        <b>No Enrollment Found</b>
                        <span>Student has admission but not enrolled in any academic programme.</span>
                    </div>
                </div>
            </div>
            <div class="q" v-if="a.course.id > 1">
                <div class="a">
                    <div>
                        <b>{{ 0 }}</b>
                        <span>Total Units Earned</span>
                    </div>
                </div>
                <div class="b" style="border-left: 1px solid #f0f0f0; border-right: 1px solid #f0f0f0">
                    <div>
                        <b>{{ a.course.total_units }}</b>
                        <span>Total Program Units</span>
                    </div>
                </div>
                <div class="c">
                    <div>
                        <b>{{ a.academic_program.name }}</b>
                        <span>Admission Status</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/edit';
    import 'vue-awesome/icons/caret-down';
    import 'vue-awesome/icons/tag';
    import 'vue-awesome/icons/flask';
    import 'vue-awesome/icons/thermometer';
    import 'vue-awesome/icons/sort';

    export default {
        props: {
            admission: {
                type: Array
            }
        },
        data() {
            return {
                isErrorConnect: false,
                isFetching: false
            }
        },
        methods: {
        },
        mounted() {
            this.$store.commit('setModuleName', 'Student Information');
        }
    }
</script>

<style scoped>
    .list-a { margin: 32px 32px; }

    .p { display: grid; grid-template-columns: 100px auto; margin-bottom: 12px; }
    .p .a {}
    .p .a div span { background-color: #fff; display: flex; width: 64px; height: 64px; border-radius: 32px; color: #111; font-size: 32px; font-weight: bold; justify-content: center; align-items: center; border: 1px outset #f0f0f0; }
    .p .b div { background-color: #fff; padding: 12px; height: 64px; border: 1px solid #f5f5f0; }
    .p .b div b { display: block; padding-bottom: 6px; font-size: 13px; font-weight: 600 }
    .p .b div span { display: block; font-size: 11px; }

    .q div div { background-color: #f5f5f0; padding: 12px; }
    .q { display: grid; grid-template-columns: 33% 34% 33% }
    .q div div b { display: block; font-size: 12px; margin-bottom: 4px; font-weight: 600 }
    .q div div span { display: block; font-size: 11px; }
</style>
