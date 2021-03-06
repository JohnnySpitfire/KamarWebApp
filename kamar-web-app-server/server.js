const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

//start database connection
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

//updates values in the users_nceaoverview table using the scraped data from users_submittedassesments - 
//the data in users_nceaoverview is what get displayed to the user
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

        //gets sum of grades for each level by submitted assesments
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

        console.log(`updated: ${nsn} with:`, credits )

        //updates users_nceaoverview with new values
        db('users_nceaoverview').where('nsn', '=', nsn).update({
           credits: credits,
           lastsubmittedassessment: [level3Assesments[0].title, level3Assesments[0].number, level3Assesments[0].value]
        })
        .catch(err => console.log(err.message))
    })
}

app.post('/updateusercreditgoals', (req, res) => {
    db('users_nceaoverview').where('nsn', '=', req.body.nsn).update({
        creditgoals: req.body.creditGoals
     }).catch(err => res.status(418).json(err))
     .then(res.status(200).json('success'))
     .catch(err => res.status(500).json(err))
 })

//gets data from sign in form and compares hash from login table
//returns data from users table and users_nceaoverview where username = login username, and nsn = nsn from users
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
      .catch(err => res.status(418).json(err.message))
})

app.get('/getsubjectlist', (req, res) => {
    db.select('*').from('subjects')
    .then(data => {
        res.json(data)
    }).catch(err => res.status(500).json(err))
})

app.post('/getstandards', (req, res) => {
    db.select('standards').from('subjects').where({name: req.body.name})
    .then(data => {
        const standardsJSON = JSON.parse(data[0].standards);
        res.json(standardsJSON)
    }).catch(err => res.status(400).json(err))
})

app.post('/getresourcesbystandard', (req, res) => {
    db.select('*').from('resources').where({'standardnumber' : req.body.standardNumber})
    .then(data =>{
            res.json(data)
        })
    .catch(err => res.status(400).json(err.message))
})

app.post('/getresourcesbysubject', (req, res) => {
    db.select('*').from('resources').where({'subject' : req.body.subject})
    .then(data =>{
            res.json(data)
        })
    .catch(err => res.status(400).json(err.message))
})

app.post('/getsubmittedassesments', (req, res) => {
    db.select("*").from('users_submittedassesments').where({'nsn' : req.body.nsn})
    .then(data =>{
        res.json(data)
    })
})

//dev tool posting JS array to database
app.post('/postsubjects', (req, res) => {
    const fieldsToInsert = req.body.map(subject => 
        ({ name: subject.name, title: subject.title, standards: subject.standards })); 
        db('subjects').insert(fieldsToInsert)
        .catch(err => res.status(500).json(err))
        .then(res.status(200).json('success'))
        .catch(err => res.status(400).json(err))
})

app.post('/postcontactresponse', (req, res) => {
    db('contact_responses').insert({
        email: req.body.email, 
        subject: req.body.subject, 
        body: req.body.body
    })
    .then(res.status(200).json('success'))
    .catch(err =>{
        console.log(err.message);
        res.status(400).json('an error has occoured')
    })
})

app.listen(3000, ()=>{
    console.log('I\'m listening! :)');
    //update useroverview for all users -- not usable for production
    db.select('nsn').from('users').then(res=> {
        res.forEach(user =>{
            UpdateNCEAOverview(user.nsn);
        })
    })
})