<template>
    <div class="wrap-f">
        <div class="head">
            <div class="cate-o">
                <div class="link">
                    <ul>
                        <li @click="goName('fin-matriculation')" :class="viewName == 'fin-matriculation' ? 'active' : ''"><div>Matriculation</div></li>
                        <li @click="goName('fin-transcript')" :class="viewName == 'fin-transcript' ? 'active' : ''"><div>Transcript</div></li>
                        <li @click="goName('fin-breakdown')" :class="viewName == 'fin-breakdown' ? 'active' : ''"><div>Breakdown</div></li>
                        <li @click="goName('fin-misc')" :class="viewName == 'fin-misc' ? 'active' : ''"><div>Miscellaneous</div></li>
                    </ul>
                </div>
                <div class="make">
                    <span v-show="false" @click="goMake()">
                        <v-icon name="plus"></v-icon> Create Invoice
                    </span>
                </div>
            </div>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
        <status-bar></status-bar>
    </div>
</template>

<script>
    import StatusBar from '@/components/StatusBar.vue';

    import 'vue-awesome/icons/plus';

    export default {
        components: {
            StatusBar
        },
        data() {
            return {
                viewName: 'fin-matriculation'
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
    .wrap-f { height: calc(100vh - 24px); background-color: #fff; position: relative; display: grid; grid-template-rows: 32px auto 24px }
    .head {}
    .view {}

    .cate-o { background-color: #fbfbfb; height: 32px; display: grid; grid-template-columns: auto 300px; border-bottom: 1px solid #eaeaea; }
    .link ul { display: block; margin: 0 16px; }
    .link ul li { display: inline-block; font-size: 11px; padding: 10px 12px; cursor: pointer; }
    .link ul li.active { border-bottom: 2px solid #290e12; font-weight: bold; }
    .link ul li.active div {  }

    .make { text-align: right; }
    .make span { display: inline-block; background-color: #fff; font-size: 11px; padding: 10px 10px 9px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; }
    .make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>
