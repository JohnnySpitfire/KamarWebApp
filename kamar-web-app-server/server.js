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



const UpdateNCEAOverview = (nsn) => {
    db.select('*').from('users_submittedassesments').where('nsn', '=', nsn)
    .then(user => {
        const nsn = user[0].nsn;
        const submittedAssesmentsJSON = JSON.parse(user[0].submittedassesmentsserialised);

        const level3Assesments = submittedAssesmentsJSON[0]
        const level2Assesments = submittedAssesmentsJSON[1]
        const level1Assesments = submittedAssesmentsJSON[2]

        let credits = [[0, 0, 0, 0],
                       [0, 0, 0, 0],
                       [0, 0, 0, 0]]


        const getCredits = (assesmentArray, credits) =>{
            assesmentArray.forEach((assesment) => {
                switch(assesment.value){
                    case 'E':
                        credits[0] += assesment.number
                        break
                    case 'M':
                        credits[1] += assesment.number
                        break
                    case 'A':
                        credits[2] += assesment.number
                        break
                    case 'N':
                        credits[3] += assesment.number
                        break
                    default:
                        throw new error
                }
            })
        }

        getCredits(level3Assesments, credits[0])
        getCredits(level2Assesments, credits[1])
        getCredits(level1Assesments, credits[2])

        console.log('credits', credits)

        db('users_nceaoverview').where('nsn', '=', nsn).update({
           credits: credits,
           lastsubmittedassessment: [level3Assesments[0].title, level3Assesments[0].number, level3Assesments[0].value]
        })
        .catch(err => console.log(err.message))
    })
}

app.post('/updateuser', (req, res) => {
    db('users_nceaoverview').where('nsn', '=', req.body.nsn).update({
        creditgoals: req.body.creditGoals
     }).catch(err => res.status(500).json(err))
     .then(res.status(200).json('success'))
     .catch(err => res.status(500).json(err))
 })


app.post('/signin', (req, res) => {
      db.select('username', 'hash').from('login').where('username','=', req.body.username)
      .then(data =>{
        console.log(data);
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
         if (isValid){
             return db.select('*').from('users')
             .where('username', '=', req.body.username)
             .then(user => {
                UpdateNCEAOverview(user[0].nsn)
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
    // bcrypt.hash("Ben1", 10, function(err, hash) {
    //     console.log(hash);
    // });
    //  console.log(bcrypt.compareSync('Ben1', '$2b$10$nBvu/OAV5X4JmZpSvntYW.ELnz7z8vEtQxDiT9xWOu8D3yreG1Tca'));
});