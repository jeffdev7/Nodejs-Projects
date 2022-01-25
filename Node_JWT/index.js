const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "Hey there",
    });
});

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err)
        {
            res.sendStatus(403)
        }
        else
        {
            res.json({
                message:"Posts created....",
                authData
            });
        }
    });
})
app.post('/api/login', (req, res) => {
    const user = {
        id:1,
        username: 'John',
        email: 'john@gmail.com'
    };
    jwt.sign({user: user}, "secretkey", (err, token) => {
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'underfined')
    {
        const bearerToken = bearerHeader;
        req.token = bearerToken
        next()
    }
    else
    {
        res.sendStatus(403)
    }
}

app.listen(3001, (req, res) => {
    console.log('Server started on port 3001')
})