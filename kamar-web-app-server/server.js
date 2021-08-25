const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'l1Thyrus',
      database : 'kamar_web_app'
    }
  });

  
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    db.select("*").from('users')
    .then(data => {
        res.json(data);
    })
});


app.post('/signin', (req, res) => {
      db.select('username', 'hash').from('login').where('username','=', req.body.username)
      .then(data =>{
        console.log(data);
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
         if (isValid){
             return db.select('*').from('users')
             .where('username', '=', req.body.username)
             .then(user => {
                db.select('*').from('users_nceaoverview')
                .where('nsn', '=', user[0].nsn)
                .then(userncea => {
                    console.log(userncea);
                    res.json([user[0], userncea[0]])
                })
             .catch(err => res.status(404).json(err.message))
            })
        } 
         res.status(400).json('wrong credentials')
      })
      .catch(err => res.status(400).json(err.message))
})

// app.post('/register', (req, res) => {z
//   const {name, email, password} = req.body
//   const hash = bcrypt.hashSync(password);
  
//   db.transaction(trx => {
//       trx.insert({
//           hash: hash,
//           email : email
//       })
//       .into('login')
//       .returning('email')
//       .then(loginEmail =>{
//           return trx('users')
//           . returning('*')
//           .insert({
//               name: name,
//               email: loginEmail[0],
//               joined: new Date()
//           })
//           .then(user => {
//               res.json(user);
//           })
//       })
//       .then(trx.commit)
//       .catch(trx.rollback)
//   })
// .catch(err => res.status(400).json('unable to register'));
  
// });

app.get('/profile/:username', (req, res) =>{
  
  const { username } = req.params;

  db.select('*').from('users').where({username}).then(user =>{
      if(user.length){
          res.json(user[0]);
      } else {
          res.status(404).json('no such user')
      }
  })
});

app.listen(3000, ()=>{
    console.log('I\'m listening! :)');
    bcrypt.hash("Logan1", 10, function(err, hash) {
        console.log(err, hash);
    });
});