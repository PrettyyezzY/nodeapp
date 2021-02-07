const express = require('express'); //Routes
const morgan = require('morgan'); //Dev

const path = require("path"); //auth0
const expressSession = require("express-session"); //auth0
const passport = require("passport"); //auth0
const Auth0Strategy = require("passport-auth0"); //auth0
var userInViews = require('./lib/middleware/userInViews');//access to user info for views

require("dotenv").config(); //hidden conf 

const mongoose = require('mongoose'); //db
const itemRoutes = require('./routes/itemRoutes'); //Routes for items
const authRoutes = require("./routes/authRoutes"); //Routes for auth0  
const shopRoutes = require("./routes/shopRoutes"); //Routes for shop 


// db connection 
const dbURI = 'mongodb+srv://vii-node-user:chzh9FB2Lf3U6CM@viiapp.7pgmd.mongodb.net/viinodeapp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('skrrrt')) 
    .catch((err) => console.log('err'));

//passport strategy
const strategy = new Auth0Strategy(
        {  
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: process.env.AUTH0_CALLBACK_URL},
            function(accessToken, refreshToken, extraParams, profile, done) 
          /**
         * Access tokens are used to authorize users to an API
         * (resource server)
         * accessToken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
            { return done(null, profile); 
        });

//Run app
const app = express(); 
//settings    
app.set('view engine', 'ejs'); //front setted to ejs
app.set("views", path.join(__dirname, "views"));//views setted as default front folder
app.use(express.static(path.join(__dirname, "public")));//set public as public dir
app.use(morgan('dev'));//dev
app.use(express.urlencoded({ extended: true }));
//Auth0 passport 
const session = { 
    secret: process.env.SESSION_SECRET, //auth0 session ID 
    cookie: {}, //obiekt dla cookies
    resave: false, //auth0 default
    saveUninitialized: false //auth0 default
  };
  
  if (app.get("env") === "production") { //auth0 requires https
    session.cookie.secure = true;
  }
  
passport.use(strategy);//passport <- auth0
app.use(expressSession(session)); //auth0 session
app.use(passport.initialize());
app.use(passport.session());
//middleware? 
app.use((req, res, next) => { 
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

//Routes
app.use(userInViews());
app.use("/", authRoutes);
app.get('/', (req, res) => { res.redirect('/items') });
app.use('/items', itemRoutes);
app.use('/shops', shopRoutes);
app.get('/about', (req, res) => { res.render('about', {title: 'About'}); });
//Default Route
app.use((req, res) => { res.status(404).render('404', {title: '404'}); } );

const runServer = (port) => {
  app.listen(port,() => {
      console.log(`Server is listening at port :${port}`);
  });
}
module.exports = {
  runServer
}