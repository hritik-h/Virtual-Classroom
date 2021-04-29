import User from '../models/userModel.js';
import Post from "../models/postMessage.js";
import express from 'express'
import bcrypt from 'bcrypt'


// Use router for express server
const router = express.Router()

// Import user model and bind it




router.post('/register', async (req, res) => {
    console.log(req.body)

    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            res.status(422).json({ message: "Plz fill all the fields" })
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
/*
router.post('/post', async (req, res) => {
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

router.put('/like/:id', async (req, res) => {
    referencePost = await Post.findById(req.params.id)
    if (referencePost) {
        try {
            referencePost.likeCount = referencePost.likeCount + 1
            await referencePost.save()
            res.status(202).json(referencePost)
        }
        catch (err) {
            console.log(err);
            res.status(409).json({ message: err.message })
        }

    }
    else {
        res.status(422).json({ message: "Post not Found" })
    }
})

router.delete('/post/:id', async (req, res) => {
    Post.deleteOne({ _id: req.params.id }, err => {
        if (err) {
            console.log(err.message)
            res.status(422).json({ message: err.message })
        }
        else {
            console.log("Successfully Deleted");
            res.status(202).json({ message: `Post with ID : ${req.params.id} has been deleted successfully` })
        }
    })
})
*/
export default router;