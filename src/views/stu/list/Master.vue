<template>
    <div>
        <stu-list></stu-list>
    </div>
</template>

<script>
    import StuList from '@/components/StuList.vue';

    export default {
        components: {
            StuList
        },
        mounted() {
            this.$store.commit('setModuleName', 'Students - Master List');
        }
    }
</script>

<style scoped>
</style>
