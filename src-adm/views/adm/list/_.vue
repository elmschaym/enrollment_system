<template>
    <div class="wrap-z">
        <router-view></router-view>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus';

    export default {
        data() {
            return {
                viewName: 'adm-list-adm-master'
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
                this.$router.push({ name: 'adm-new-admittee' });
            }
        }
    }
</script>

<style scoped>
    .wrap-z { height: 100%;  background-color: #fbfbf7; }

    .cate-o { background-color: #f8f8f8; height: 32px; display: grid; grid-template-columns: auto 300px; border-bottom: 1px solid #eaeaea; }
    .link ul { display: block; margin: 0 16px; }
    .link ul li { display: inline-block; padding: 0  12px; }
    .link ul li div { font-size: 11px; padding: 10px 0; cursor: pointer; }
    .link ul li.active div { border-bottom: 1px solid #290e12; }

    .make { text-align: right; }
    .make span { display: inline-block; background-color: transparent; padding: 10px 10px 9px 10px; border-left: 1px solid #e9e9e9; cursor: pointer; font-size: 11px; }
    .make span.active { border-bottom: 1px solid #777; }
    .make span svg { width: 12px; height: 12px; margin-bottom: -2px; }
</style>
