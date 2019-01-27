<template>
  <div class="contacts-wrap">
    <div class="contact">
      <User
        v-for="user in users"
        :key="user.login"
        v-bind:name="user.name"
        v-bind:login="user.login"
        v-bind:id="user.id"
        v-bind:active="active"
        v-on:change-chat="clickHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import User from './User.vue';

    export default Vue.extend({
        name: 'Contacts',
        methods: {
            clickHandler(login: string, id: string) {
                this.$emit('change-chat', login, id);
            },
        },
        props: {
            users: Array,
            active: String,
        },
        components: {
            User,
        },
    });
</script>