<template>
  <div class="chat">
    <Message
      v-for="message in messages.slice().reverse()"
      :key="message.date"
      v-bind:text="message.text"
      v-bind:userMessage="ownId === message.senderId"
    />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Message from './Message.vue';

    export default Vue.extend({
        name: 'Messages',
        props: {
            messages: Array,
            ownId: String,
        },
        components: {
            Message,
        },
    });
</script>