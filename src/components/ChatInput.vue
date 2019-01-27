<template>
  <form action="">
    <div class="textarea-wrap">
      <textarea placeholder="Text" v-on:keydown.ctrl.enter="submitHandler"></textarea>
    </div>
    <div class="textarea-count-wrap">
      <div class="checkbox-wrap">
        <label>Press Ctr+Enter to send</label>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'ChatInput',
        methods: {
            submitHandler(e: {target: {value: string}}) {
                if (e.target.value.replace(/\s/g, '').length) {
                    this.$emit('send-message', e.target.value);
                    e.target.value = '';
                }
            },
        },
        props: {
            'user-message': Boolean,
        },
    });
</script>