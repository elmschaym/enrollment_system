<template>
    <span :title="currentDate">
        {{ currentDate }}
    </span>
</template>

<script>
    export default {
        props: {
            refreshDate: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                dater: ""
            }
        },
        computed: {
            currentDate() {
                return this.dater;
            }
        },
        methods: {
            checkDate() {
                this.dater = new Date().toDateString();
            }
        },
        watch: {
            refreshDate() {
                this.checkDate();
            }
        },
        mounted() {
            this.checkDate();
        }
    }
</script>

<style scoped>
</style>
