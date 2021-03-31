<template>
    <div class="load-i">
        <div class="name">
            <v-icon name="leaf" style="left: 60px; top: 40px; z-index: 1000"/>
            <v-icon name="leaf" style="left: 100px; top: 80px; z-index: 1002"/>
            <span>system_enr</span>
        </div>
        <div class="stat" v-if="isLoading">
            <span><b></b></span>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/leaf';

    export default {
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            initializeSetup() {
                this.isLoading = true;
                let vm = this;
                window.setTimeout(function(){
                    vm.$router.push({ name: 'usr-signin'});
                }, 4000);
            }
        },
        mounted() {
            window.setTimeout(this.initializeSetup, 2000);
        }
    }
</script>

<style scoped>
    .load-i { position: absolute; top: calc((100vh - 300px)/2); left: calc((100vw - 300px)/2); width: 300px; height: 300px; background: linear-gradient(to left bottom, #478ba2, #de5b6d); border-radius: 20px; box-shadow: 0 5px 11px rgba(0,0,0,0.2); z-index: 9999; }

    .name { height: 286px; position: relative; }
    .name svg { height: 128px; width: 128px; display: block; color: #fff; margin: 0 auto; position: absolute; }
    .name span { font-size: 18px; font-family: "Open Sans"; text-transform: uppercase; font-weight: bold; color: #fff; display: block; text-align: center; text-shadow: 0 2px 2px rgba(0,0,0,0.2); position: absolute; top: 208px; left: 60px; right: 60px; }

    .stat { height: 14px; }
    .stat span {  display: block; margin-left: 260px; position: relative; background-color: transparent; height: 6px; width: 16px; }
    .stat span b { background-color: #fff; height: 4px; top: 0;  width: 4px; display: block; position: absolute; -webkit-animation-name: loaderer;  -webkit-animation-duration: 800ms;  -webkit-animation-iteration-count: infinite;  -webkit-animation-direction: forward; }
    @-webkit-keyframes loaderer { from { left: 100% } to { left: 0; } }
</style>
