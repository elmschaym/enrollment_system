<template>
    <div class="_cmp_lec">
        <div class="form">
            <ui-select @setValue="setDepartment" :options="departments" :styles="['border-radius: 0; padding: 7px 10px;']"></ui-select>
            <button @click="fetchCourses()"><v-icon name="book-reader"></v-icon></button>
        </div>
        <div class="rslt">
            <div class="tabs">
                <div></div>
                <div>Name</div>
            </div>
            <div class="list" v-if="isFetchingList">
                <ui-loader></ui-loader>
            </div>
            <div class="list" v-else-if="courses.length > 0">
                <div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in courses" @click="setSelected(l)">
                    <div class="i">
                        <div style="text-align: center;"><v-icon name="square"></v-icon></div>
                        <div style="font-size: 11px;">{{ l.program_type }} &nbsp; {{ l.name }} ({{ l.name_alias }})</div>
                    </div>
                </div>
            </div>
            <div class="list" v-else>
            </div>
        </div>
    </div>
</template>

<script>
    import UILoader from './UILoader.vue';
    import UISelect from './UISelect.vue';

    import 'vue-awesome/icons/book-reader';
    import 'vue-awesome/icons/square';

    export default {
        emits: ['setValue', 'hasChangedDept'],
        props: {
            departments:  {
                type: Array,
                required: true
            },
            fieldIncludes: {
                type: String,
                required: false
            }
        },
        components: {
            UiLoader: UILoader,
            UiSelect: UISelect
        },
        data() {
            return {
                isFetchingList: false,
                isErrorConnect: false,
                selectedId: 0,
                courses: [],
                departmentId: 0,
            }
        },
        methods: {
            fetchCourses() {
                this.isFetchingList = true;
                let dep = this.departmentId == 0 ? 'department-all' : 'department-any';
                this.$http.get('course/?action=lister&refer='+ dep +'&depid='+ this.departmentId +'&course_fields=id,name,name_alias,program_type,total_units,department,acadprogram&department_fields=id,name,name_alias&acadprogram_fields=id,name').then(res => {
                    this.courses = res.data;
                }).finally( () => {
                    this.$sleep(500).then( () => { this.isFetchingList = false; });
                });
                this.$emit('hasChangedDept');
            },
            setSelected(v) {
                this.selectedId = v.id;
                this.$emit('setValue', v);
            },
            setDepartment(v) {
                this.departmentId = v;
            }
        },
        mounted() {
            this.fetchCourses()
        }
    }
</script>

<style scoped>
    ._cmp_lec { height: inherit; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); display: grid; grid-template-rows: 26px auto 28px }

    .form { display: grid; grid-template-columns: auto 32px; }
    .form button { display: block; height: 27px; color: #000; padding: 2px 8px 2px 8px; border: none; background-color: #f5f5ed; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: #f0f0f0 transparent #d0d0d0 transparent; }
    .form button svg { width: 10px; height: 10px; }

    .rslt { position: relative; }
    .head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #fafafa; }

    .tabs, .list .l .i { display: grid; grid-template-columns: 28px auto }
    .tabs { margin: 2px 0 0 0; padding: 6px 0; font-size: 10px; color: #333; background-color: #fafaf9 }
    .list { height: inherit; min-height: 300px; overflow-y: scroll; }
    .list::-webkit-scrollbar { width: 4px; display: block; }
    .list::-webkit-scrollbar-track { background: transparent; }
    .list::-webkit-scrollbar-thumb { background-color: #56373c; }

    .list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; }
    .list .l:hover, .l.active { background-color: #f7f7f5; }
    .list .l .i { padding: 0; }
    .list .l .i div { color: #000; white-space: nowrap; text-overflow: clip; overflow-x: hidden; padding: 7px 0; }
    .list .l .i div svg { width: 10px; height: 10px; color: #e0e0e0; margin-bottom: 2px; }
    .list .l.active .b span{ background-color: #ececec; }

    .find { display: grid; grid-template-columns: auto 60px; border-top: 1px solid #e0e0da; }
    .find .i { background-color: #fefefe; position: relative; }
    .find .i span { position: absolute;; top: 2px; right: 5px; padding: 5px; cursor: pointer; }
    .find .i input { width: 100%; height: 28px; display: block; color: #111; padding: 2px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; }
    .find button { height: 28px; display: block; color: #111; padding: 8px 8px 8px 2px; border: none; border-left: 1px solid #f0f0f0; background-color: #fafafa; font-size: 11px; outline: none; cursor: pointer; }
    .find button svg { width: 12px; height: 12px; float: right; }
</style>
