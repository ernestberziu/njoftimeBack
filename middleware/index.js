var config = {
    apiKey: 'd96e88bc-f1b8-4b11-9d7a-19e83ab1cf3e',
};

const jwt = require('jsonwebtoken');
var ma = require('mojoauth-sdk')(config);
const isPunemarres = function (req, res, next) {
    console.log(ma)
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.SECRET, function (_, decoded) {
            console.log(decoded.role)
            if (decoded?.role === 'punemarres' || decoded?.role === 'admin') {
                next();
            } else if (decoded?.role === 'punedhenes') {
                res.status(402).send('Unauthorized')
            } else {
                res.status(401).send('Unauthorized: Invalid token');
            }
        });
    }
}

const isPunedhenes = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.SECRET, function (_, decoded) {
            if (decoded?.role === 'punedhenes' || decoded?.role === 'admin') {
                next();
            } else if (decoded?.role === 'punemarres') {
                res.status(402).send('Unauthorized')
            } else {
                res.status(401).send('Unauthorized: Invalid token');
            }
        });
    }
}

const isAdmin = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.SECRET, function (_, decoded) {
            if (decoded?.role === 'admin') {
                next();
            } else if (decoded?.role === 'punemarres' || decoded?.role === 'punedhenes') {
                res.status(402).send('Unauthorized')
            }
            else {
                res.status(401).send('Unauthorized: Invalid token');
            }
        });
    }
}



module.exports = { isPunedhenes, isPunemarres, isAdmin };