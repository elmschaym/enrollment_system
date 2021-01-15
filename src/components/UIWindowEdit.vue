<template>
    <div :class="['wrap-m', hasBG ? 'has-bg' : '']">
        <div class="moda">
            <div class="head">
                <div class="icon" @click="isClosed()">
                    <span><v-icon name="times"></v-icon></span>
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
    import 'vue-awesome/icons/times';

    export default {
        emits: ['modalClose'],
        props: {
            hasBG: {
                type: Boolean,
                default: function() {
                    return true;
                }
            }
        },
        methods: {
            isClosed() {
                this.$emit('modalClose', true);
            }
        }
    }
</script>

<style scoped>
    .wrap-m { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; }
    .wrap-m.has-bg { background-color: rgba(255,255,255,0.95); }

    .moda { width: 280px; height: 200px; background-color: #fff; box-shadow: 0 6px 14px rgba(0,0,0,0.2); z-index: 9999; }
    .moda .head { display: grid; grid-template-columns: 24px auto; background: #f5f5f0; border-bottom: 1px solid #f0f0f0; height: 24px; }
    .moda .head .icon { display: block; width: 24px; height: 24px; cursor: pointer; padding: 5px 5px; }
    .moda .head .icon span { display: block; font-size: 10px; color: #444; }
    .moda .head .icon span svg { width: 11px; height: 11px }
    .moda .head .name { padding: 6px; text-align: center; }
    .moda .head .name span { margin-right: 24px; font-size: 11px }

    .moda .body { position: relative; background-color: #fff; height: 176px; overflow-y: hidden;  }
    .moda .body .text { height: 136px; padding: 12px;  font-size: 12px; line-height: 16px; word-break: break-all; }
    .moda .body .okay { height: 40px; background-color: #fafaf9; text-align: center; padding: 8px 0; }
    .moda .body .okay button { height: 24px; padding: 0px 12px; background: #ffffff; border-radius: 2px; font-size: 11px; color: #888; border: 1px solid #e0e0d0; color: #000; }
</style>
