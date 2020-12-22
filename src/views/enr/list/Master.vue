<template>
    <div>
        <enr-list></enr-list>
    </div>
</template>

<script>
    import EnrList from '@/components/EnrList.vue';

    export default {
        components: {
            EnrList
        },
        mounted() {
            this.$store.commit('setModuleName', 'Enrollee - Master List');
        }
    }
</script>

<style scoped>
</style>
