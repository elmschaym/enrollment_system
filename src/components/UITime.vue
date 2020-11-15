<template>
    <span>
        {{ currentTime.hh +":"+ currentTime.mm }}
    </span>
</template>

<script>
    export default {
        data() {
            return {
                timer: { hh: "12", mm: "00" }
            }
        },
        computed: {
            currentTime() {
                return this.timer;
            }
        },
        methods: {
            _tick() {
                let t = new Date();
                this.timer.hh = t.getHours() < 10 ? "0"+ t.getHours() : t.getHours();
                this.timer.mm = t.getMinutes() < 10 ? "0"+ t.getMinutes() : t.getMinutes();
                if ((this.timer.hh == "00" && this.timer.mm == "00"))
                    this.$emit("updateDate");
            }
        },
        mounted() {
            window.setInterval(this._tick, 1000);
        }
    }
</script>

<style scoped>
</style>
