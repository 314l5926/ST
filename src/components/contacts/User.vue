<template>
  <div
    v-bind:class="active === login ? 'contact-user active' : 'contact-user'"
    v-on:click="clickHandler(login, id)"
  >
    <div class="contact-user-foto">
      <a v-on:click.prevent href=""><img src="" alt=""></a>
    </div>
    <div class="contact-user-info">
      <div class="contact-user-top">
        <a v-on:click.prevent href="" class="contact-user-name">
          {{ name }}
        </a>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'User',
        methods: {
            clickHandler(login: string, id: string) {
                this.$emit('change-chat', login, id);
            },
        },
        props: {
            name: String,
            login: String,
            id: String,
            active: String,
        },
    });
</script>