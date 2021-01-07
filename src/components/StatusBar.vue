<template>
    <div class="stat-s">
        <div class="o">
            <span title="Go Back" @click="goPrev()"><v-icon name="angle-left"></v-icon></span>
        </div>
        <div class="p">
            <ui-time class="b" @updateDate="updateDate"></ui-time>
            <ui-date :refreshDate="refreshDate"></ui-date>
        </div>
        <div class="q">
            <span>Connected</span>
            <span title="Secure Connection">
                <v-icon name="lock"></v-icon>
            </span>
        </div>
    </div>
</template>

<script>
    import UITime from '@/components/UITime.vue';
    import UIDate from '@/components/UIDate.vue';

    import 'vue-awesome/icons/lock';
    import 'vue-awesome/icons/angle-left';

    export default {
        components: {
            UiTime: UITime,
            UiDate: UIDate
        },
        data() {
            return {
                refreshDate: false
            }
        },
        computed: {
        },
        methods: {
            updateDate() {
                this.refreshDate = !this.refreshDate;
            },
            refreshView() {
                this.$store.commit('setReloadView');
            },
            goPrev() {
                this.$router.go(-1);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .stat-s {  height: 24px; display: grid; grid-template-columns: 350px auto 350px; background-color: #f5f5f5; border-top: 1px solid #f0f0f0; font-size: 9px; font-weight: 100 }
    .stat-s .o { text-align: left; }
    .stat-s .o span { padding: 6px 12px; display: inline-block; border-right: 1px solid #eaeaea; cursor: pointer; }
    .stat-s .o span svg { height: 10px; width: 10px; }
    .stat-s .p { text-align: center; }
    .stat-s .p span { padding: 6px 12px; display: inline-block; border-right: 1px solid #eaeaea; }
    .stat-s .p span.b { border-left: 1px solid #eaeaea; }
    .stat-s .q { text-align: right;  }
    .stat-s .q span { padding: 6px 8px; display: inline-block; border-left: 1px solid #eaeaea; }
    .stat-s svg { height: 9px; width: 9px; color: #505050; }
</style>
