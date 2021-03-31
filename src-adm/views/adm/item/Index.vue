<template>
    <div class="wrap-i">
        <button @click="refreshView()">T</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            refreshView() {
                this.$store.commit('setReloadView');
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .wrap-i { height: inherit; }
</style>
