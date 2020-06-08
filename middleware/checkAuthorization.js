const Story = require('../models/Story');
module.exports = async (req, res, next) => {
    if(req.isAuthenticated()){
        try{
            const story = await Story.findById(req.params.id);
            if(story.user.equals(req.user._id)){
                next();
            }else{
                res.redirect('back');
            }
        }catch(e){
            console.log(e);
            res.redirect('back');
        }
    }else{
         res.redirect('/');
    }
};