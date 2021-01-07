<template>
    <div class="find-c">
        <div class="find">
            <input v-model="query" :placeholder="'Student '+ queryType" :disabled="disableInput"/>
            <button @click="switchQueryType()"><v-icon v-show="false" name="coffee"></v-icon> {{ queryType }}</button>
        </div>
        <div class="rslt">
            <div class="head">
                Select Student
            </div>
            <div v-if="list.length > 0" class="list">
                <div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in list" @click="setSelectedStud(l)">
                    <div class="i">
                        <div class="stu">{{ l.lastname }}, {{ l.firstname }} {{ l.middlename }}</div>
                        <div class="own"><span>{{ l.school_id }}</span></div>
                    </div>
                    <div class="b">
                        <span></span>
                    </div>
                </div>
                <ui-loader v-if="isFetching"></ui-loader>
            </div>
            <div v-else class="list">
                <div class="n">No Results Found</div>
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
            disableInput: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                query: '',
                isFetching: false,
                isErrorConnect: false,
                selectedId: 0,
                list: [],
                queryType: 'id'
            }
        },
        methods: {
            fetchList() {
                this.isFetching = true;
                this.$http.get('student/?action=finder&student_fields=id,school_id,firstname,middlename,lastname&query='+ this.query +'&type='+ this.queryType).then(res => {
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
            setSelectedStud(v) {
                this.selectedId = v.id;
                this.$emit('setValue', v);
            },
            switchQueryType() {
                this.queryType = this.queryType == 'name' ? 'id' : 'name';
            }
        },
        watch: {
            query(n) {
                if (n.length > 0)
                    this.$sleep(250).then(this.fetchList);
            }
        }
    }
</script>

<style scoped>
    .find-c { background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
    .find { display: grid; grid-template-columns: auto 60px; }
    .find input { display: block; color: #391e22; padding: 2px 10px; border: none; background-color: #fefefe; font-size: 12px; outline: none; border-radius: 5px 0 0 0; }
    .find button { display: block; color: #391e22; padding: 8px 8px 8px 2px; border: none; border-left: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; background-color: #fafafa; font-size: 11px; outline: none; cursor: pointer; border-radius: 0 5px 0 0; }
    .find button svg { width: 12px; height: 12px; float: right; }

    .rslt {  position: relative; }
    .head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #f8f8f5; border-radius: 5px 5px 0 0 }

    .list { height: 320px; overflow-y: scroll; position: relative; }
    .list::-webkit-scrollbar { width: 4px; display: block; }
    .list::-webkit-scrollbar-track { background: transparent; }
    .list::-webkit-scrollbar-thumb { background-color: #bbb; }

    .list .l { border-bottom: 1px solid #f5f5f5; display: grid; grid-template-columns: auto 26px; cursor: pointer; }
    .l:hover, .l.active { background-color: #fbfbfb; }
    .l .i { height: 32px; }
    .l .i .stu { font-size: 11px; color: #000; padding: 5px 2px 2px 12px; text-overflow: clip; white-space: nowrap; color: #222; }
    .l .i .stu span {  }
    .l .i .own { font-size: 11px; color: #808080; padding: 1px 2px 2px 12px; }
    .l .i .own span { color: #222; }
    .l .b {}
    .l .b span { display: block; height: 32px; width: 26px; border-left: 1px solid #f0f0f0; }
    .l.active .b span{ background-color: #ececec; }

    .list .n { text-align: center; padding: 12px 7px; color: #404040; font-size: 11px; }

    .dsbd { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7) }
</style>
