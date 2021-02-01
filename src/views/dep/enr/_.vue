<template>
    <div class="wrap-z">
        <router-view @setViewName="setViewName"></router-view>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus';

    export default {
        data() {
            return {
                viewName: 'dep-enr-master-list'
            }
        },
        methods: {
            goName(name) {
                if( name != this.$route.name ) {
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
    .wrap-z { height: 100%; }
</style>
