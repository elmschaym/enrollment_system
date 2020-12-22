<template>
    <div>
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
</style>
