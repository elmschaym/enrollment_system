<template>
    <div class="find-c">
        <div class="find">
            <input v-model="query" :placeholder="'Subject '+ queryType"/>
            <button @click="switchQueryType()"><v-icon v-show="false" name="coffee"></v-icon> {{ queryType }}</button>
        </div>
        <div class="rslt">
            <div class="tabs">
                <div>Code</div>
                <div>Name</div>
                <div style="text-align: right;">Sections</div>
            </div>
            <div class="list">
                <div :class="['l', {'active': selectedId == l.id}]" :key="l.id" v-for="l in subjects" @click="setSelected(l)">
                    <div class="i">
                        <div style="font-size: 11px" :title="l.section.length +' Sections'">{{ l.code }}</div>
                        <div style="font-size: 11px; font-weight: normal">{{ l.name }}</div>
                        <div style="text-align: right;">{{ l.section.length > 0 ? l.section.length : '' }}</div>
                    </div>
                </div>
                 <ui-loader v-if="isFetching"></ui-loader>
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
        data() {
            return {
                query: '',
                queryType: 'code',
                queryAction: 'lister',
                isFetching: false,
                isErrorConnect: false,
                userDepartment: 0,
                selectedId: 0,
                subjects: []
            }
        },
        methods: {
            fetchSubjects() {
                this.isFetching = true;
                this.$http.get('subject/?action='+ this.queryAction +'&type='+ this.queryType +'&query='+ this.query +'&referr=department&depid='+ this.userDepartment +'&subject_fields=id,name,code,units,section&section_fields=name').then(res => {
                    this.subjects = res.data;
                }).then(() => {
                    this.isErrorConnect = true;
                    this.isFetching = false;
                }).finally( () => {
                    this.isFetching = false;
                });
            },
            setSelected(v) {
                this.selectedId = v.id;
                this.$emit('setValue', v);
            },
            switchQueryType() {
                this.queryType = this.queryType == 'name' ? 'code' : 'name';
            }
        },
        watch: {
            query(n) {
                if (n.length == 0)
                    this.queryAction = 'lister';
                else
                    this.queryAction = 'finder';
                this.fetchSubjects();
            }
        },
        created() {
            this.userDepartment = this.$storageGet('user_info').department.id;
            this.fetchSubjects();
        }
    }
</script>

<style scoped>
    .find-c { background-color: #fff; box-shadow:  0 1px 1px rgba(0,0,0,0.24); }
    .find { display: grid; grid-template-columns: auto 60px; }
    .find input { display: block; height: 30px; color: #391e22; padding: 5px 10px; border: none; background-color: #fefefe; font-size: 11px; outline: none; border-radius: 5px 0 0 0; }
    .find button { display: block; height: 30px; color: #391e22; padding: 4px 8px 4px 2px; border: none; border-left: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; background-color: #fafafa; font-size: 11px; outline: none; cursor: pointer; border-radius: 0 5px 0 0; }
    .find button svg { width: 12px; height: 12px; float: right; }

    .rslt {  position: relative; }
    .head { font-size: 8px; text-transform: uppercase; padding: 4px 12px; background-color: #f8f8f2; border-radius: 5px 5px 0 0 }

    .tabs, .list .l .i { display: grid; grid-template-columns: 50px auto 37px }
    .tabs { padding: 6px 12px; font-size: 10px; color: #333; border-top: 1px solid #f0f0f0; background-color: #fafaf9 }

    .list { height: 380px; overflow-y: scroll; position: relative; }
    .list::-webkit-scrollbar { width: 4px; display: block; }
    .list::-webkit-scrollbar-track { background: transparent; }
    .list::-webkit-scrollbar-thumb { background-color: #b0b0b0; }

    .list .l { border-bottom: 1px solid #f9f9f9; cursor: pointer; }
    .list .l:hover, .l.active { background-color: #fbfbf7; }
    .list .l .i { padding: 4px 12px; }
    .list .l .i div { color: #000; white-space: nowrap; text-overflow: clip; overflow-x: hidden; padding: 5px 0; }
    .list .l.active .b span{ background-color: #ececec; }
</style>
