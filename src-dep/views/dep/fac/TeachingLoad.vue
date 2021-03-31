<template>
    <div class="wrap-t">
        <div class="p">
        </div>
        <div class="q">
        </div>        
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
            this.$store.commit('setModuleName', 'Department – Teaching Load');
        }
    }
</script>

<style scoped>
    .wrap-t { height: auto; display: grid; grid-template-columns: auto 270px; }
    .wrap-t .p { height: 100%; padding: 16px; position: relative; background-color: #fff }
    .wrap-t .q { height: 100%; border-left: 1px solid #f0f0f0; background: #f8f8f0 }
</style>
