<template>
    <div class="wrap-m">
        <div class="moda">
            <div class="head">
                <div class="icon" @click="isClosed()">
                    <b style="background-color: #FE6254;"></b>
                </div>
                <div class="name">
                    <slot name="name"><span>Modal</span></slot>
                </div>
            </div>
            <div class="body">
                <div class="text">
                    <slot name="body-text"></slot>
                </div>
                <div class="okay">
                    <slot name="body-okay"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/caret-down';

    export default {
        props: {
            modalClose: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
            }
        },
        methods: {
            isClosed() {
                this.modalClose(true);
            }
        }
    }
</script>

<style scoped>
    .wrap-m { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); display: flex; justify-content: center; align-items: center; }
    .moda { width: 280px; height: 200px; background-color: #fff; box-shadow: 0 6px 14px rgba(0,0,0,0.2); z-index: 9999; border-radius: 5px 5px 0 0; }
    .moda .head { display: grid; grid-template-columns: 24px auto; background: linear-gradient(to bottom, #eaeaea, #e4e4e4); border-bottom: 1px solid #f0f0f0; height: 24px; border-radius: 5px 5px 0 0; }
    .moda .head .icon { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px; }
    .moda .head .icon b { display: block; width: 14px; height: 14px; border-radius: 100%; font-size: 10px; color: #444; text-align: center  }
    .moda .head .name { padding: 6px; text-align: center; }
    .moda .head .name span { margin-right: 24px; font-size: 11px }

    .moda .body { position: relative; background-color: #fff; height: 176px; overflow-y: hidden;  }
    .moda .body .text { height: 136px; padding: 12px;  font-size: 12px; line-height: 16px; word-break: break-all; }
    .moda .body .okay { height: 40px; background-color: #fafaf9; text-align: center; padding: 8px 0; }
    .moda .body .okay button { height: 24px; border: 1px solid #dadad7; background: linear-gradient(to bottom, #f0f0f0, #e4e4e4); font-size: 11px; border-radius: 2px; padding: 2px 10px 2px 10px; }
</style>
