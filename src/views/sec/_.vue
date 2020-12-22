<template>
    <div>
        <div class="cate-o">
            <div class="link">
                <ul>
                    <li @click="goName('sub-index')" :class="viewName == 'sub-index' || viewName == 'adm-index'? 'active' : ''"><div>Assigned</div></li>
                    <li @click="goName('adm-inpatient')" :class="viewName == 'adm-inpatient' ? 'active' : ''"><div>Schedule</div></li>
                    <li @click="goName('adm-discharged')" :class="viewName == 'adm-discharged' ? 'active' : ''"><div>Understaff</div></li>
                    <li @click="goName('adm-discharged')" :class="viewName == 'adm-discharged' ? 'active' : ''"><div>Override</div></li>
                </ul>
            </div>
            <div class="make">
                <span @click="goMake()">
                    <v-icon name="plus"></v-icon> New Section
                </span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus';

    export default {
        data() {
            return {
                viewName: 'sub-index'
            }
        },
        methods: {
            goName(name) {
                if( name != this.$route.name ) {
                    this.viewName = name;
                    this.$router.push({ name });
                }
            },
            goMake() {
                this.$router.push({ name: 'adm-new' });
            }
        }
    }
</script>

<style scoped>
    .cate-o { background-color: #f8f8f8; height: 32px; display: grid; grid-template-columns: 712px 300px; border-bottom: 1px solid #eaeaea; }
    .link ul { display: block; margin: 0 16px; }
    .link ul li { display: inline-block; font-size: 11px; padding: 10px 12px; cursor: pointer; }
    .link ul li.active { border-bottom: 2px solid #290e12; font-weight: bold; }
    .link ul li.active div {  }

    .make { text-align: right; }
    .make span { display: inline-block; background-color: #f0f0f0; font-size: 11px; padding: 10px 10px 9px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; }
    .make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>
