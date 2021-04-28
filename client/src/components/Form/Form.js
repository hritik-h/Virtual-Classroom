import React, {useState} from "react";
import {textField, Button, Typography, Paper, TextField} from "@material-ui/core"
import FileBase from "react-file-base64"
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import { createPost } from "../../actions/posts";

const Form = () =>{
    const classes = useStyles();
    const [postData,setPostData]= useState({creator: '', title: '', tags:'', selectedFile: ''});
    const dispatch = useDispatch();

    const handleSubmit= (e) =>{
        e.preventDefault();
        dispatch(createPost(postData));
    }
    const clear = () =>{

    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Memory</Typography>
            <TextField name = "creator" varient="outlined" label="Creator" fullWidth value = {postData.creator} onChange={(e)=>setPostData({...postData,creator: e.target.value})}/>
            <TextField name = "title" varient="outlined" label="Title" fullWidth value = {postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>
            <TextField name = "message" varient="outlined" label="Meaasge" fullWidth value = {postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>
            <TextField name = "tags" varient="outlined" label="Tags" fullWidth value = {postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value})}/>
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={(base64) => setPostData({...postData, selectedFile: base64})}/></div>
            <Button className={classes.buttonSubmit} varient="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button varient="container" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;