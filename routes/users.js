const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/checkAuthentication');
const checkAuthorization = require('../middleware/checkAuthorization');
const Story = require('../models/Story');
const moment = require('moment');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Dashboard
router.get('/dashboard', checkAuthentication, async(req, res) => {
    const stories = await Story.find({user: req.user}).sort({dbDate: -1});
    res.render('dashboard', {user: req.user, stories});
});

// Story Create GET 
router.get('/story/new', checkAuthentication ,(req, res) => {
    res.render('story-new', {user: req.user});
});

// Story Create POST
router.post('/story/new', checkAuthentication , async (req, res) => {
    let {title, status, allowComments, details} = req.body;
    if(typeof allowComments === 'undefined'){
        allowComments = false;
    }else{
        allowComments = true;
    }
    const newStory = {
        title,
        status,
        details,
        allowComments,
        user: req.user,
        createdAt: moment(new Date()).format("MMMM Do YYYY")
    };
    try{
        let story = new Story(newStory);
        story = await story.save();
        res.redirect(`/users/story-view/${story._id}`);
    }catch(e){
        console.log(e);
        res.redirect('back');
    }
});
// Story Edit GET
router.get('/story/edit/:id', checkAuthorization , async(req, res) => {
    const story = await Story.findById(req.params.id);
    res.render('story-edit', {story, user: req.user});
});

// Story Edit 
router.put('/story/edit/:id', checkAuthorization , async (req, res) => {
    let {title, status, allowComments, details} = req.body;
    if(typeof allowComments === 'undefined'){
        allowComments = false;
    }else{
        allowComments = true;
    }
    const editedStory = {
        title,
        status,
        details,
        allowComments,
    };
    try{
        let story = await Story.findByIdAndUpdate(req.params.id, editedStory);
        await story.save();
        res.redirect(`/users/story-view/${story._id}`);
    }catch(e){
        console.log(e);
        res.redirect('back');
    }
});

// Story Delete
router.delete('/story/delete/:id', async (req, res) => {
    try{
        await Story.findByIdAndDelete(req.params.id);
         res.redirect('/users/dashboard');
    }catch(e){
        console.log(e);
        res.redirect('back');
    }
});

// Story View
router.get('/story-view/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('user');
        const comments = await Comment.find({story: story._id}).populate('author').sort({dbDate: -1});
        if((story && story.status === 'public') || (story.status === 'private' && story.user.equals(req.user._id))){
            res.render('story-view', {story, comments, user: req.user}); 
        }else{
            res.redirect('back');
        }
    } catch (e) {
        console.log(e);
        res.redirect('back');
    }
    
});

// Public Stories
router.get('/stories', async (req, res) => {
    try{
        const stories = await Story.find().populate('user').sort({dbDate: -1});
        res.render('public-stories', {user: req.user, stories, view: 'public'});
    }catch(e){
         res.redirect('back');
    }
});

// User Specific Stories
router.get('/stories/:id', async (req, res) => {
    try{
        const stories = await Story.find({user: req.params.id}).populate('user').sort({dbDate: -1});
        const user = await User.findById(req.params.id);
        res.render('public-stories', {user: req.user, stories, owner: user });
    }catch(e){
         res.redirect('back');
    }
});

// Add Comment
router.post('/stories/comments/:id', checkAuthentication, async (req, res) => {
    const newComment = {
        author: req.user._id,
        comment: req.body.comment,
        createdAt: moment(new Date()).format("MMMM Do YYYY"),
        story: req.params.id
    }
    try{
        let comment = new Comment(newComment);
        comment = await comment.save();
        res.redirect(`/users/story-view/${story._id}`);
    }catch(e){
        res.redirect('back');
    } 
});

module.exports = router;