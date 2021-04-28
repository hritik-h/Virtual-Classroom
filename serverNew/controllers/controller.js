const express = require('express')
const bcrypt = require('bcrypt')

// Use router for express server
const router = express.Router()

// Import user model and bind it
const User = require('../models/userModel')
const Post = require('../models/postsModel')



router.post('/register', async (req, res) => {
    console.log(req.body)

    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(422).json({ error: "Plz fill all the fields" })
        }
        else if (await User.findOne({ email: req.body.email })) {
            res.status(422).json({ message: "User already registered. Pls try a different email id." })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            await newUser.save()
            res.status(201).json({ message: "User Registered Successfully" })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ message: "Data insufficient" })
        }

        const userLogin = await User.findOne({ email })
        console.log(userLogin)

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (isMatch) {
                res.status(202).json({ message: "Login Successful" })
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" })
            }

        } else {
            res.status(422).json({ message: "User not Found" })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/posts', async (req, res) => {
    const allPosts = await Post.find()
    res.json(allPosts)
    console.log(allPosts);
})

router.post('/posts', async (req, res) => {
    const newPost = new Post({
        creator: req.body.creator,
        title: req.body.title,
        message: req.body.message,
    })
    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

module.exports = router