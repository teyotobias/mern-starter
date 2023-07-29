//server
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
    create,
    login,
    checkToken
};

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}

async function create(req,res){
    try {
        //add user to database
        const user = await User.create(req.body);
        //token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
    } catch (err) {
        //client will check for non-2xx status code
        // 400 - bad request
        //probably a duplicate email
        res.status(400).json(err);
    }
}

async function login(req,res) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) throw new Error();
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json('Bad Credentials');
    }
}

function createJWT(user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'}
    );
}