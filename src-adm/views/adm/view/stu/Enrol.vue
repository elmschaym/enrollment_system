<template>
    <div class="list">
        <div class="list-o">
            <div class="data">
                <div class="tbl">
                    <div class="thd">
                        <div class="tth">Academic Year</div>
                        <div class="tth">Year Level</div>
                        <div class="tth">Course<v-icon class="s" name="sort"></v-icon></div>
                        <div class="tth">Academic Status</div>
                        <div class="tth">Units Enrolled</div>
                        <div class="tth">Date Confirmed</div>
                    </div>
                    <div class="tbd" v-if="isFetching">
                        <ui-loader></ui-loader>
                    </div>
                    <div class="tbd" v-else-if="enrollees.length > 0">
                        <div class="ttr" @click="$router.push({ name: 'enr-view-enrol', params: { enrol_id : l.id}})" :key="l.id" v-for="l in enrollees">
                            <div class="ttd">{{ l.academic_year }}</div>
                            <div class="ttd">{{ l.year_level }}</div>
                            <div class="ttd">{{ l.course.name_alias }}</div>
                            <div class="ttd">{{ l.academic_status }}</div> 
                            <div class="ttd">{{ l.units_enrolled }}</div>    
                            <div class="ttd">{{ l.date_confirmed }}</div>
                        </div>
                    </div>
                    <div class="tbd x" v-else>
                        <div class="tno" style="text-align: center">{{ isErrorConnect ? 'Server Error Occured' : 'No Enrollment Available'}}</div>
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
        data() {
            return {
                isErrorConnect: false,
                isFetching: false,
                admission: {},
                enrollees: [
                ]
            }
        },
        methods: {
            fetchAdm() {
                let vm = this;
                this.$http.post('AdmView', { admid: vm.$route.params.admid }, { timeout: 10000, before() { vm.isFetching = true } }).then(
                    res => {
                        vm.isFetching = true;
                        let data = res.body;
                        if (data.stat == 1) {
                            this.pet = data.data.pet;
                            this.own = data.data.own;
                            this.adm = data.data.adm;
                        } else {
                            vm.isErrorConnect = true;
                        }
                        vm.isFetching = false
                    },
                    () => {
                        vm.isErrorConnect = true;
                        vm.isFetching = false
                    }
                );
            }
        },
        mounted() {
            this.$store.commit('setModuleName', 'Student – '+ this.$route.params.stude_id);
        }
    }
</script>

<style scoped>
    .list { margin: 32px 16px; background-color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); min-height: 140px; }

    .list-o {}
    .list-o .data .tbl { position: relative; }
    .list-o .data .tbl .thd, .list-o .data .tbl .ttr { display: grid; grid-template-columns: 100px 80px auto 130px 100px 100px }
    .list-o .data .tbl .tbd { height: 130px; overflow-y: scroll; }
    .list-o .data .tbl .tth { padding: 7px 10px; color: #111; text-align: left; font-size: 11px; background-color: #f5f5f0 }
    .list-o .data .tbl .ttd { padding: 7px 0 7px 10px; font-size: 10px; text-overflow: clip; overflow-x: hidden; white-space: nowrap; color: #000; }
    .list-o .data .tbl .tbd .ttr { border-bottom: 1px solid #f5f5f5; cursor: pointer; }
    .list-o .data .tbl .tbd .ttr:hover { background-color: #f6f6f0; }
    .list-o .data .tbl .ttd b {}
    .list-o .data .tbl svg { width: 12px; height: 12px; color: #404040; margin-bottom: -3px; }
    .list-o .data .tbl svg.s { float: right; width: 10px; height: 10px; color: #404040; margin-bottom: -2px; }

    .list-o .data .tbl .tbd.x { display: flex; justify-content: center; align-items: center; flex-direction: column; }
    .list-o .data .tbl .tno { background-color: #f8f8f8; padding: 5px; font-size: 10px; color: #a0a090; text-transform: uppercase; }
    .list-o .data .tbl .rel { display: block; cursor: pointer; font-size: 9px; text-transform: uppercase; padding: 7px 12px;  }
    .list-o .data .tbl .rel svg { width: 9px; height: 9px; color: #404040; margin-bottom: -2px; }

</style>
