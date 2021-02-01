<template>
    <div class="wrap-i">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created() {
            if (this.$route.query.hasOwnProperty('set_dimen')) {
                this.$sleep(1500).then(() => {
                    window.nwWin.show();
                });
            }
            this.$store.commit('setModuleName', 'College of Engineering Deparrment');
        }
    }
</script>

<style scoped>
    .wrap-i { height: inherit; }
</style>
