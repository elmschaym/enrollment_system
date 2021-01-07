<template>
    <div class="wrap-a">
        <div class="p">
            <div class="a">
                <list-e-dep-subject @setValue="setSubjectFromSearch"></list-e-dep-subject>
            </div>
        </div>
        <div class="q">
            <div class="h">
                <div class="code">
                    {{ subject.code }}
                </div>
                <div class="name">
                    <div class="n">{{ subject.name }}</div>
                    <div class="m">{{ subject.units }} Units</div>
                </div>
                <div class="butt">
                    <button>Change</button>
                </div>
            </div>
            <div class="blur-w0" v-if="!subject.hasOwnProperty('id')"></div>
        </div>
    </div>
</template>

<script>
    import ListEDepSubject from '@/components/ListEDepSubject.vue';

    import 'vue-awesome/icons/square';
    import 'vue-awesome/icons/trash';

    export default {
        emits: ['setViewName'],
        components: {
            ListEDepSubject
        },
        data() {
            return {
                subject: {}
            }
        },
        methods: {
            setSubjectFromSearch(v) {
                this.subject = v;
            }
        },
        mounted() {
            this.$emit('setViewName', this.$route.name);
            this.$store.commit('setModuleName', 'Subjects – Assign Requisites');
        }
    }
</script>

<style scoped>
    .wrap-a { height: 100%; position: relative; display: grid; grid-template-columns: 320px auto; }
    .p { height: 100%; padding: 0 16px; background-color: #fbfbf7; }
    .q { height: 100%; border-left: 1px solid #f0f0f0; background: #fff; position: relative; }

    .p .a { height: 100%; padding: 12px 0; }

    .q .h { padding: 12px; border-bottom: 1px solid #f0f0f0; display: grid; grid-template-columns: 72px auto 80px; margin-bottom: 0px; }
    .q .h .code { height: 32px; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #444; font-weight: 600; background-color: #f5f5f0; white-space: nowrap; overflow-x: hidden; padding-top: 6px; padding-bottom: 6px; box-shadow: 0 1px 1px rgba(0,0,0,0.24); }
    .q .h .name { padding: 2px 0 0 12px; }
    .q .h .name .n { font-size: 13px; font-weight: 600; margin: 2px 0; }
    .q .h .name .m { font-size: 11px;  }
    .q .h .butt { padding: 8px 0; }
    .q .h .butt button { width: 100%; border-radius: 2px; color: #808080; padding: 3px 8px 2px 8px; border: none; background-color: #f0f0ea; font-size: 11px; outline: none; cursor: pointer; color: #000; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24); }
</style>
