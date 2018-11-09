const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const ranking = require('./controllers/ranking');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json('server is ready!') })
app.get('/ranking', (req, res) => { ranking.handleRanking(req, res, db) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id',  (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 4000, () => {
    console.log(`app is working on port ${process.env.PORT}`);
})

/*

/ --> res = this is working
/signin --> POST = success/fail  /uzywamy POST, a nie GET zeby bylo bezpieczniej dla hasla
/register --> POST = user 
/profile/:userId --> GET = user
/image --> PUT --> user

*/