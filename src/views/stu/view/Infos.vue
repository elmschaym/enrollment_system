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
        methods: {
        },
        mounted() {
            this.$store.commit('setModuleName', 'Student – '+ this.$route.params.stude_id);
        }
    }
</script>

<style scoped>
</style>
