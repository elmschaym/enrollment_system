<template>
    <div class="_wrp_cas">
        <title-bar-cas></title-bar-cas>
        <div class="_wrp_cas_view">
            <sidecon-cas></sidecon-cas>
            <div class="view">
                <div class="view_wrap">
                    <router-view></router-view>
                    <status-bar></status-bar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TitleBarCas from '@/components/TitleBarCas.vue';
    import SideconCas from '@/components/SideconCas.vue';
    import StatusBar from '@/components/StatusBar.vue';

    export default {
        components: {
            TitleBarCas,
            StatusBar,
            SideconCas
        },
        data() {
            return {
            }
        },
        methods: {
        }
    } 
</script>

<style scoped>
    ._wrp_cas { height: inherit; background-color: #fff }

    ._wrp_cas_view { height: 100%; display: grid; grid-template-columns: 28px auto; }

    .view { height: inherit; position: relative; }
    .view_wrap { height: calc(100% - 28px); display: grid; grid-template-rows: auto 24px; }
</style>
