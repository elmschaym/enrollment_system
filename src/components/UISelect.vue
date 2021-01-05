<template>
    <div class="wrap-o">
        <div class="sele" :style="styles[0] ? styles[0] : 'width: 100%;'">
            <div class="name" @click="isSelect = !isSelect"><span>{{ selected }}</span> <v-icon name="caret-down"></v-icon></div>
            <div class="opti" v-show="isSelect">
                <span :style="styles[1] ? styles[1] : 'padding: 7px 8px'" v-for="(o,i) in options" :key="i" @click="hasSelected(i)">{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/caret-down';

    export default {
        emits: ['setValue'],
        props: {
            options: {
                type: Array,
                required: true
            },
            styles: {
                type: Array,
                required: false
            },
            presets: {
                type: Object,
                default: () => ({ id: 0, name: '------' })
            }
        },
        data() {
            return {
                selected: '',
                isSelect: false
            }
        },
        methods: {
            hasSelected(i) {
                this.selected = (this.options[i]).name;
                this.$emit('setValue', (this.options[i]).id);
                this.isSelect = false;
            }
        },
        mounted() {
            this.selected = this.presets.name;
            this.$emit('setValue', this.presets.id);
        }
    }
</script>

<style scoped>
    .wrap-o { position: relative; }
    .sele { color: #391e22; background-color: #fdfdfd; border: none; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; position: relative; border-radius: 2px; padding: 6px 10px 6px 10px; height: 27px; }

    .name { height: 100%; }
    .name span { font-size: 11px; color: #111; }
    .name svg { float: right; height: 10px; width: 10px; }

    .opti { position: absolute; top: 0; left: 0; right: 0; background-color: #fff; box-shadow: 0 4px 9px rgba(0,0,0,0.12); overflow-y: scroll; max-height: 160px; z-index: 5000; }
    .opti::-webkit-scrollbar { width: 4px; display: block; }
    .opti::-webkit-scrollbar-track { background: transparent; }
    .opti::-webkit-scrollbar-thumb { background-color: #d0d0d0; border-radius: 4px; }

    .opti span { display: block; border-top: 1px solid #f8f8f8; color: #111; font-size: 11px; }
    .opti span:hover { background-color: #f0f0f0 }
</style>
