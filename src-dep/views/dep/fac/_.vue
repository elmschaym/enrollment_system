<template>
    <div class="wrap-z">
        <div class="cate-o">
            <div class="link">
                <ul>
                    <li @click="goName('dep-fac-master-list')" :class="viewName == 'dep-fac-master-list' ? 'active' : 'click'"><div>Master List</div></li>
                    <li :class="viewName == 'dep-fac-assign-section' ? 'active' : ''"><div style="cursor: default;">Assign Section</div></li>
                    <li :class="viewName == 'dep-fac-teaching-load' ? 'active' : ''"><div style="cursor: default;">Teaching Load</div></li>
                    <li @click="goName('dep-fac-enter-grades')" :class="viewName == 'dep-fac-enter-grades' ? 'active' : ''"><div>Enter Grades</div></li>
                </ul>
            </div>
            <div class="make">
                <span @click="goMake()" v-show="false">
                    <v-icon name="plus"></v-icon> New Student
                </span>
            </div>
        </div>
        <router-view @setViewName="setViewName"></router-view>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus';

    export default {
        data() {
            return {
                viewName: 'dep-fac-master-list'
            }
        },
        methods: {
            goName(name) {
                if( name != this.$route.name ) {
                    this.viewName = name;
                    this.$router.push({ name });
                }
            },
            setViewName(v) {
                this.viewName = v;
            }
        }
    }
</script>

<style scoped>
    .wrap-z { height: 100%; display: grid; grid-template-rows: 32px auto; }

    .cate-o { background-color: #fbfbf7; height: 32px; display: grid; grid-template-columns: auto 300px; border-bottom: 1px solid #eaeaea; }
    .link ul { display: block; margin: 0 16px; }
    .link ul li { display: inline-block; padding: 0  12px; }
    .link ul li div { font-size: 11px; padding: 10px 0; cursor: pointer; }
    .link ul li.active div { border-bottom: 1px solid #290e12; }

    .make { text-align: right; }
    .make span { display: inline-block; background-color: #f8f8f8; font-size: 11px; padding: 10px 10px 9px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; }
    .make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>
