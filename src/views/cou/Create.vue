<template>
    <div class="wrap-m">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Courses – Create New');
        }
    }
</script>

<style scoped>
    .wrap-m {}
</style>
