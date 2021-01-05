<template>
    <div class="wrap-i">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created() {
            this.$store.commit('setModuleName', 'College of Engineering Deparrment');
        }
    }
</script>

<style scoped>
    .wrap-i { height: inherit; }
</style>
