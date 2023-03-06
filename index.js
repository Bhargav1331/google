//MODULES
const express = require('express');
const app = express();
const passport = require('passport')

// SESSION
const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla'
}));
app.use(passport.initialize());
app.use(passport.session());

//MN FILE REQUIRE
require('./passport-setup')

//ENV 
require('dotenv').config()


// SET EJS
app.set('view engine', 'ejs');



// SET STATIC FILES
app.use(express.static('public'));

// SET ROUTES
app.get('/', (req, res) => {
    if (req.user) {
        res.render('profile.ejs', {
            name: req.user.displayName,
            email: req.user.emails[0].value,
            pic: req.user.photos[0].value,
        })
    }
    else {
        res.render('index', { title: 'Welcome' });
    }

});


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), function (req, res) {
    res.redirect('/')
})


//LOGOUT
app.use('/logout', (req, res) => {
    delete req.session.passport;
    res.redirect('/')
})



// START THE SERVER
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
