<template>
    <div class="wrap-z">
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
    .wrap-z { height: 100% }
</style>
