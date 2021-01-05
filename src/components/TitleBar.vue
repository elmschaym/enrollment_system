<template>
    <div class="t-bar">
        <div class="icon">
            <span @click="winClose()" tooltip="close"><b style="background-color: #FE6254;"></b></span><span @click="winMaximize()"><b style="background-color: #28D33F;"></b></span><span @click="winMinimize()"><b style="background-color: #FDC92D;"></b></span>
        </div>
        <div class="name" ref="tbName">{{ moduleName }}</div>
        <div class="link"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFullScreen: false
            }
        },
        computed: {
            moduleName() {
                return this.$store.state.module.name;
            }
        },
        methods: {
            winClose() {
                this.$sleep(500).then(() => {
                    window.nwWin.hide();
                    window.nwWin.close(true);
                });
            },
            winMinimize() {
                window.nwWin.minimize();
            },
            winMaximize() {
                if (this.isFullScreen) {
                    window.nwWin.restore();
                    this.$store.commit('setAppWidth', window.nwWin.min_width);
                    this.$store.commit('setAppHeight', window.nwWin.min_height);
                }
                else {
                    this.$store.commit('setAppWidth', window.nwWin.max_width);
                    this.$store.commit('setAppHeight', window.nwWin.max_height);
                    window.nwWin.maximize();
                }
                this.isFullScreen = !this.isFullScreen;
            }
        },
        mounted() {
            //console.log(this.$refs.tbName.style);
        }
    }
</script>

<style scoped>
    .t-bar { display: grid; grid-template-columns: 82px auto 82px; width: 100vw; background: #f8f8f2; height: 24px; border-radius: 5px 5px 0 0; }
    .t-bar .name { padding: 6px; text-align: center; -webkit-app-region: drag; font-weight: 100; font-size: 11px; }
    .t-bar .name span { font-size: 11px; color: #40403a; font-weight: bold; line-height: 12px; }
    .t-bar .icon { padding: 0 5px; display: grid; grid-template-columns: 24px 24px 24px; }
    .t-bar .icon span { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px;}
    .t-bar .icon span b { display: block; width: 14px; height: 14px; border-radius: 100%; font-size: 10px; color: #444; text-align: center; }
    .t-bar .icon span b:hover { color: #fff; }
    .t-bar .link { -webkit-app-region: drag; }
</style>
