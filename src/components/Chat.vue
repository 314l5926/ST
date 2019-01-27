<template>
  <main class="main">
    <div class="container">
      <div class="row">
        <div class="col-9">
          <div class="chat-wrap">
            <Contacts
              v-bind:users="users"
              v-bind:active="active"
              v-on:change-chat="changeChat"
            />
            <div v-bind:class="active.length === 0 ? 'chat-block blocked' : 'chat-block'">
              <div class="blocked-wrap">
                <div style="position: relative">
                  <Messages
                    v-bind:messages="messages"
                    v-bind:ownId="ownId"
                  />
                </div>
                <div class="chat-form">
                  <ChatInput
                    v-on:send-message="sendMessage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3" style="color: white;">
          <img
            src="https://static.wixstatic.com/media/803fd3_60fb86fb945a4b7bab2d88f9624fbac5~mv2.png/v1/fill/w_586,h_114,al_c,q_80,usm_0.66_1.00_0.01/803fd3_60fb86fb945a4b7bab2d88f9624fbac5~mv2.webp"
            alt="" style="width: 100%; padding: 5px">
          Тестовое задание на позицию: <br>
          <b style="float:right">Middle Frontend Developer</b>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Contacts from './contacts/Contacts.vue';
    import Messages from './messages/Messages.vue';
    import ChatInput from './ChatInput.vue';

    export default Vue.extend({
        name: 'Chat',
        methods: {
            changeChat(login: string) {
                this.active = login;
                let id = '';

                this.users.forEach((user: {login: string, id: string}) => {
                    if (user.login === login) {
                        id = user.id;
                    }
                });

                this.activeId = id;
                this.loadConversation();
            },
            loadUsers() {
                const self = this;

                fetch('http://localhost:3000/api/users')
                    .then((users) => users.json())
                    .then((usersJson) => self.users = usersJson);
            },
            loadConversation() {
                const self = this;

                if (self.ownId && self.activeId) {
                    fetch(`http://localhost:3000/api/chat/${self.ownId}-${self.activeId}`)
                        .then((messages) => messages.json())
                        .then((messagesJson) => self.messages = messagesJson);
                }
            },
            receiveMessage(e: {data: string}) {
                this.messages.push(JSON.parse(e.data));
            },
            sendMessage(msg: string) {
                const payload = {
                    receiverId: this.activeId,
                    senderId: this.ownId,
                    text: msg,
                };
                this.socket.send(JSON.stringify(payload));
            },
        },
        mounted() {
            this.loadUsers();
            this.socket = new WebSocket('ws://localhost:3000');
            this.socket.onmessage = this.receiveMessage;
        },
        data() {
            return {
                ownId: 'C8nrHPajtXR18hNl0TeX',
                socket: {},
                blocked: false,
                active: '',
                activeId: '',
                users: [],
                messages: [],
            };
        },
        components: {
            Contacts,
            Messages,
            ChatInput,
        },
    });
</script>
