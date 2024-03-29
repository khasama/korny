const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const UserModel = require("../models/user.model");

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:3345/auth/google/callback`,
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            const defaultUser = {
                username: profile.displayName,
                email: profile.email,
                avatar: profile.picture,
                role: 'normal',
                googleId: profile.id,
            }
            const user = await UserModel.findOne({ email: profile.email });
            if (!user) {
                const newUser = new UserModel(defaultUser);
                await newUser.save();
                return done(null, newUser);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});