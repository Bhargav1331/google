const passport = require('passport')
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: '788018381369-fgmu73s1qosd1oc060dscj15kp8t9sa6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {

    /* console.log(profile) */
    return done(null, profile)
}));
