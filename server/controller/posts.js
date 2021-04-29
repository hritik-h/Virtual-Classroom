import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, members, tags } = req.body;
    /*console.log({members});*/
    const newPostMessage = new PostMessage({ title, message, selectedFile, members, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, members, selectedFile, tags } = req.body;
    console.log({members});
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { members, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    /*
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    console.log("Successfully Deleted");
    res.status(202).json({ message: `Post with ID : ${req.params.id} has been deleted successfully` })
    */
    PostMessage.deleteOne({ _id: req.params.id }, err => {
        if (err) {
            console.log(err.message)
            res.status(422).json({ message: err.message })
        }
        else {
            console.log("Successfully Deleted");
            res.status(202).json({ message: `Post with ID : ${req.params.id} has been deleted successfully` })
        }
    })
}

export const likePost = async (req, res) => {
    /*const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
    */
    const referencePost = await PostMessage.findById(req.params.id)
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
}


export default router;