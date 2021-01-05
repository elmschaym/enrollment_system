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
            this.$store.commit('setModuleName', 'Subjects – Assign Requisites');
        }
    }
</script>

<style scoped>
</style>
