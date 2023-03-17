require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const path = require('path');

module.exports = {
    verifyAdmin: (req, res, next) => {
        const user = req.user || req.session.user || req.session.passport?.user;
        if (!user) {
            return res.redirect("/login");
        }

        if (user.role === "admin") {
            next();
        } else {
            return res.redirect("/");
        }
    },
    checkRefererEmbed: (req, res, next) => {
        const regex = new RegExp('^(?:https?:\\/\\/)?(?:[^@\\/\\n]+@)?(?:www\\.)?([^:\\/\\n]+)', 'igm');
        const headers = req.headers;
        const referer = headers.referer;
        const whitelist = ['kervice.tk', 'scats.tk', 'localhost'];
        if (referer) {
            const origin = regex.exec(referer)[1];
            if (whitelist.indexOf(origin) !== -1) {
                next();
            } else {
                return res.sendFile(path.resolve(__dirname, '../public/img/f.jpg'));
            }
        }
        next();
    },
};
