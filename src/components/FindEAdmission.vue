<template>
    <div class="wrap-f">
        <div class="x" v-if="filters.hasOwnProperty('stat') && filters.stat">
            <div @click="queryFilter = 'dep'" :class="queryFilter == 'dep' ? 'a' : ''" style="border-right: 1px solid #f0f0f0"><span>{{ queryFilter == 'dep' ? "√" : "□" }}</span> Department</div>
            <div @click="queryFilter = 'all'" :class="queryFilter == 'all' ? 'a' : ''" ><span>{{ queryFilter == 'all' ? "√" : "□" }}</span> All</div>
        </div>
        <div class="y">
            <div class="find">
                <input v-model="queryString" :placeholder="'Find Student \\' + queryType" :disabled="disableInput"/>
                <button @click="switchQueryType()"><v-icon v-show="false" name="coffee"></v-icon> {{ queryType }}</button>
            </div>
            <div class="rslt">
                <div class="head">
                    Select Admission
                </div>
                <div class="list">
                    <div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in list" @click="setSelectedAdm(l)">
                        <div class="i">
                            <div class="stu">{{ l.student.lastname }}, {{ l.student.firstname }} {{ l.student.middlename }}</div>
                            <div class="own"><span>{{ l.student.school_id }}</span></div>
                        </div>
                        <div class="b">
                            <span></span>
                        </div>
                    </div>
                    <ui-loader v-if="isFetching"></ui-loader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UILoader from './UILoader.vue';

    import 'vue-awesome/icons/coffee';

    export default {
        emits: ['setValue'],
        components: {
            UiLoader: UILoader
        },
        props: {
            filters: {
                type: Object,
                required: false,
                default: function() {
                    return { stat: true, mode: 'dep' }
                }
            },
            fields: {
                type: String,
                default: function() {
                    return '';
                }
            },
            disableInput: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                queryString: '',
                isFetching: false,
                isErrorConnect: false,
                selectedId: 0,
                list: [],
                queryType: 'id',
                queryFilter: 'dep'
            }
        },
        methods: {
            fetchList() {
                this.isFetching = true;
                this.$http.get('admission/?action=finder&query='+ this.queryString +'&type='+ this.queryType +'&filter='+ this.queryFilter +'&admission_fields=id,status,date_admitted,student,course,academic_program&student_fields=id,school_id,firstname,middlename,lastname&course_fields=id,name,name_alias&acadprogram_fields=id,name&'+ this.fields).then(res => {
                    if (res.status == 200)
                        this.list = res.data;
                    else
                        this.list = [];
                }).catch(() => {
                    this.list = [];
                    this.isErrorConnect = true;
                }).finally( () => {
                    this.isFetching = false;
                }); 
            },
            setSelectedAdm(v) {
                this.selectedId = v.id;
                this.$emit('setValue', v);
            },
            switchQueryType() {
                this.queryType = this.queryType == 'name' ? 'id' : 'name';
            }
        },
        watch: {
            queryString(n) {
                if (n.length > 0)
                    this.$sleep(250).then(this.fetchList);
            },
            queryType(n) {
                if (this.queryString.length > 0)
                    this.$sleep(250).then(this.fetchList);
            }
        }
    }
</script>

<style scoped>
    .wrap-f { height: inherit; }

    .x { display: grid; grid-template-columns: 50% 50%; margin-bottom: 12px; box-shadow: 0 1px 1px rgba(0,0,0,0.15); }
    .x div { background-color: #fff; padding: 7px 8px; font-size: 11px; }
    .x div span { display: inline-block; margin-right: 8px; width: 10px; }
    .x div.a { background-color: #fbfbfb }

    .y { background-color: #fff; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
    .y .find { display: grid; grid-template-columns: auto 60px; }
    .y .find input { display: block; color: #391e22; padding: 2px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; border-radius: 5px 0 0 0; }
    .y .find button { display: block; color: #391e22; padding: 8px 8px 8px 2px; border: none; border-left: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; background-color: #fafafa; font-size: 11px; outline: none; cursor: pointer; border-radius: 0 5px 0 0; }
    .y .find button svg { width: 12px; height: 12px; float: right; }

    .y .rslt {  position: relative; }
    .y .head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #f8f8f5; border-radius: 5px 5px 0 0 }

    .y .list { height: 280px; overflow-y: scroll; position: relative; }
    .y .list::-webkit-scrollbar { width: 4px; display: block; }
    .y .list::-webkit-scrollbar-track { background: transparent; }
    .y .list::-webkit-scrollbar-thumb { background-color: #d0d0d0; border-radius: 2px }

    .y .list .l { border-bottom: 1px solid #f5f5f5; display: grid; grid-template-columns: auto 26px; cursor: pointer; }
    .l:hover, .l.active { background-color: #fbfbfb; }
    .l .i { height: 32px; }
    .l .i .stu { font-size: 11px; padding: 5px 2px 2px 12px; text-overflow: clip; white-space: nowrap; color: #000; font-weight: normal; }
    .l .i .stu span {}
    .l .i .own { font-size: 11px; color: #222; padding: 1px 2px 2px 12px; text-transform: uppercase; text-overflow: clip; white-space: nowrap; }
    .l .i .own span { color: #444; display: inline-block; }
    .l .b {}
    .l .b span { display: block; height: 32px; width: 26px; border-left: 1px solid #f0f0f0; }
    .l.active .b span{ background-color: #ecece7; }

    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>
