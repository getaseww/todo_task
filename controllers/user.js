require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.register = (req, res) => {
    const { name, password, email } = req.body;
    // check if there is empty field
    if (!(email && password &&name)) {
        res.status(400).json({ message: 'All inputs are required' });
    }
    User.findOne({
        where: {
            email: email,
        }
    }).then(result => {
        if (result) {
            res.status(409).json({
                message: 'Email already Exists',
            });
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    const user = User.create(
                        {
                            name: name,
                            password: hash,
                            email: email.toLowerCase(),
                        })
                        .then(data => {
                            if (data) {
                                const token = jwt.sign({
                                    id: user.id,
                                    email: user.email
                                }, process.env.TOKEN_KEY, function (err, token) {
                                    res.status(200).json({
                                        token: token
                                    });
                                });
                            } else {
                                res.status(500).json({
                                    message: 'Something went wrong',
                                });
                            }
                        })
                        .catch(error => res.status(501).json({
                            error: true,
                            error: error
                        }));
                });
            });


        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
        });
    });

};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).json({
            message: 'All fileds are required'
        });
    }

    User.findOne({
        Where: {
            email: email,
        }
    }).then(user => {
        if (!user) {
            res.status(401).json({
                message: 'Invalid credential!',
            })
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else if (result) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, process.env.TOKEN_KEY, function (err, token) {
                        res.status(200).json({
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        data: user.password,
                        message: 'Invalid password',
                    });
                }

            });
        }

    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong!',
        });
    });
};

