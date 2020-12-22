<template>
    <div class="wrap-z">
    </div>
</template>

<script>
    export default {
        props: {
            setViewName: {
                type: Function
            }
        },
        data() {
            return {
            }
        },
        mounted() {
            this.setViewName(this.$route.name);
            this.$store.commit('setModuleName', 'Department – Teaching Load');
            console.log(this.$route.query.faculty_id);
        }
    }
</script>

<style scoped>

</style>
