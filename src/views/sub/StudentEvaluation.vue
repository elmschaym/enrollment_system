<template>
    <div>
    </div>
</template>

<script>
    export default {
        emits: ['setViewName'],
        data() {
            return {
            }
        },
        mounted() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Subjects – Student Evaluation');
        }
    }
</script>

<style scoped>
</style>
