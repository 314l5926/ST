<template>
  <div v-bind:class="userMessage ? 'chat-message user-message' : 'chat-message'">
    <div class="chat-message-foto">
      <a href=""><img src="" alt=""></a>
    </div>
    <div class="chat-message-text">
      {{ text }}
    </div>
    <div class="chat-message-time">2 hours ago</div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Message',
        props: {
            text: String,
            userMessage: Boolean,
        },
    });
</script>