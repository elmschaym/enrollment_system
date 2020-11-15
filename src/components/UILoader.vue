<template>
    <div class="load-w" :style="styles">
        <div class="load-o"></div>
    </div>
</template>

<script>
    export default {
        props: {
            styles: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped>
    .load-w { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.7); display: flex; justify-content: center; align-items: center; }

    .load-o, .load-o:before, .load-o:after { border-radius: 100%; width: 12px; height: 12px; -webkit-animation-fill-mode: both; animation-fill-mode: both; -webkit-animation: load7 1.8s infinite ease-in-out; animation: load7 1.8s infinite ease-in-out; }
    .load-o { color: #391e22; font-size: 12px; margin: 80px auto; position: relative; text-indent: -9999em; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); -webkit-animation-delay: -0.16s; animation-delay: -0.16s; }
    .load-o:before, .load-o:after { content: ''; position: absolute; top: 0; }
    .load-o:before { left: -18px; -webkit-animation-delay: -0.32s; animation-delay: -0.32s; }
    .load-o:after { left: 18px; }
    @-webkit-keyframes load7 { 0%, 80%, 100% { box-shadow: 12px 0 -6px; } 40% { box-shadow: 0 12px 0 0; }}
    @keyframes load7 { 0%, 80%, 100% { box-shadow: 0 12px 0 -6px; } 40% { box-shadow: 0 12px 0 0; }}
</style>
