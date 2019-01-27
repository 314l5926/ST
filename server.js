const admin = require('firebase-admin');
const serviceAccount = require('./st-fe-a3aff-2098336e643b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000;

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/users', (req, res) => sendUser(res));
app.get('/api/chat/:id1-:id2', (req, res) => getConversation(req, res));

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    const _msg = JSON.parse(msg);

    saveMessage(_msg);

    ws.send(JSON.stringify(_msg));

    reply(ws, _msg);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function getConversation(req, res) {
  const _conversationLink = getConversationId(req.params.id1, req.params.id2);
  const conversation = await loadConversation(_conversationLink);
  res.send(JSON.stringify(conversation));
}

function loadConversation(_conversationLink) {
  return new Promise(function (resolve, reject) {
    db.collection('chat').doc('conversations').collection(_conversationLink).get()
      .then((snapshot) => {
        let messages = [];

        snapshot.forEach((doc) => {
          let _d = doc.data();
          messages.push(_d);
        });

        resolve(messages);
      })
      .catch((err) => {
        reject(console.log('Error getting documents', err));
      });
  })
}

function getConversationId(id1, id2) {
  let _conversationLink = '';

  if (id1 > id2) {
    _conversationLink = id1 + id2;
  } else {
    _conversationLink = id2 + id1;
  }

  return _conversationLink;
}

function saveMessage(_msg) {
  let _d = (+new Date()).toString();
  let _conversationLink = getConversationId(_msg.receiverId, _msg.senderId);

  db.collection('chat').doc('conversations').collection(_conversationLink).doc(_d).set(_msg);
}

async function sendUser(res) {
  const users = await getUsers();
  res.send(JSON.stringify(users));
}

function getUsers() {
  return new Promise(function (resolve, reject) {
    db.collection('users').get()
      .then((snapshot) => {
        let users = [];

        snapshot.forEach((doc) => {
          let _d = doc.data();

          users.push({
            login: _d.login,
            id: _d.id,
            name: _d.name
          });
        });

        resolve(users);
      })
      .catch((err) => {
        reject(console.log('Error getting documents', err));
      });
  })
}

function reply(ws, _msg) {
  let message = {
    receiverId: _msg.senderId,
    senderId: _msg.receiverId,
    text: `${_msg.receiverId} receive message - "${_msg.text}"`,
  };

  saveMessage(message);

  setTimeout(() => {
    ws.send(JSON.stringify(message));
  }, 5000);
}