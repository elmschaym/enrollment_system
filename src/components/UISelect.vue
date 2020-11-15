<template>
    <div class="sele">
        <div class="name" @click="isSelect = !isSelect" :style="styles ? styles : 'width: 100%; border-radius: 20px;'"><span>{{ selected }}</span> <v-icon name="caret-down"></v-icon></div>
        <div class="opti" v-show="isSelect">
            <span v-for="(o,i) in options" :key="i" @click="hasSelected(i)">{{ o.name }}</span>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/caret-down';

    export default {
        props: {
            options: {
                type: Array,
                required: true
            },
            styles: {
                type: String,
                required: false
            },
            setValue: {
                type: Function,
                required: true
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
                this.setValue((this.options[i]).id);
                this.isSelect = false;
            }
        },
        mounted() {
            this.selected = "- - - - - -";
            this.setValue(0);
        }
    }
</script>

<style scoped>
    .sele { position: relative; }
    .name { color: #391e22; padding: 8px 10px; border: 1px solid #f0f0f0;  background-color: #fdfdfd; border-width: 1px; border-style: solid; border-color: #f0f0f0 #e0e0e0 #d0d0d0 #e0e0e0; outline: none; box-shadow: 1px 1px 8px #e0e0e0 ; cursor: pointer; }
    .name span { font-size: 11px; color: #555; }
    .name svg { float: right; height: 10px; width: 10px; }

    .opti { position: absolute; top: 100%; width: 100%; background-color: #fbfbfb; border: 1px solid #eaeaea; box-shadow: 0px 4px 9px rgba(0,0,0,0.15); overflow-y: scroll; max-height: 160px; z-index: 5000; }
    .opti span { display: block; padding: 7px 8px; border-bottom: 1px solid #f5f5f5; border-top: 1px solid #f8f8f8; color: #111; font-size: 11px; }
    .opti span:hover { background-color: #f0f0f0 }
</style>
