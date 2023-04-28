const mongoose = require('mongoose');
require('dotenv').config();
const Products = require('./products');
const Users = require('./users');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));;
const jwt = require('jsonwebtoken');

const login = async (data, res) => {
    const { email, password } = data.body;
    Users.findOne({ email }).then((user) => {
        if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email, role: user.role };
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: '24h'
                    });
                    res.cookie('token', token, { httpOnly: false }).send({ token: token });
                }
            });
        }
    }).catch((err) => {
        console.error(err);
        res.status(500)
            .json({
                error: 'Internal error please try again'
            });
    })
}

const save = (Model) => async (data, res) => {
    console.warn({ first: 'test' })
    const item = Model({ ...data.body, deleted: false })
    console.warn({ second: item })
    try {
        const itemToSave = await item.save();
        console.warn(itemToSave)
        res.status(200).json(itemToSave)
    }
    catch (error) {
        console.warn({ third: error })
        res.status(400).json({ message: error.message })
    }
}

const get_one = (Model) => async (data, res) => {
    try {
        const item = await Model.findById(data.params.id)
        res.status(200).json(item)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const get_all = (Model) => async (data, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = (Model) => async (data, res) => {
    try {
        const id = data.params.id;
        const updatedData = { ...data.body, deleted: false };
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const delete_item = (Model) => async (data, res) => {
    try {
        const id = data.params.id;
        const updatedData = { deleted: true };
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const POST = {
    Products: save(Products),
    Users: save(Users)
}

const GET_ONE = {
    Products: get_one(Products),
    Users: save(Users)
}

const GET_ALL = {
    Products: get_all(Products),
    Users: save(Users)
}

const UPDATE = {
    Products: update(Products),
    Users: save(Users)
}

const DELETE = {
    Products: delete_item(Products),
    Users: save(Users)
}


module.exports = { POST, GET_ONE, GET_ALL, UPDATE, DELETE, login }
