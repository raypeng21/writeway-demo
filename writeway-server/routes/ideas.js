import express from "express";
import Idea from "../models/Idea.js";
import User from "../models/User.js";


var router = express.Router();

//create a Idea
router.post("/", async(req,res) => {
    const newIdea = new Idea(req.body)

    try{
        const savedIdea = await newIdea.save();
        res.status(200).json(savedIdea);
    }catch(err){
        res.status(500).json(err)
    }
})
//update a Idea 

router.put("/:id", async(req, res)=> {
    try{
        const idea = await Idea.findById(req.params.id);  //find the Idea
        if(idea.userId === req.body.userId){     // if the Idea creater's userId is sam as current userId 
            await idea.updateOne({$set:req.body})
            res.status(200).json("The Idea has been updated")   
        }else{
    
            res.status(403).json("You can only update your own idea")
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})
//delete a Idea
router.delete("/:id", async(req, res)=> {
    try{
        const idea = await Idea.findById(req.params.id);  //find the Idea
        if(idea.userId === req.body.userId){     // if the Idea creater's userId is sam as current userId
            await idea.deleteOne();
            res.status(200).json("The Idea has been deleted")   
        }else{
    
            res.status(403).json("You can only delete your own Idea")
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})

//like a Idea
router.put("/:id/likes", async(req, res)=> {
    try{
        const idea = await Idea.findById(req.params.id);  //find the Idea
        if(!idea.likes.includes(req.body.userId)){
            await idea.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The Idea has been Liked")
        }else{
            await idea.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The Idea has been disLiked")
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})
//get a Idea
router.get("/:id", async (req,res) => {
    try{
        const idea =await Idea.findById(req.params.id)
        res.status(200).json(idea)
    }catch(err){
        res.status(500).json(err)
    }
})

//get timeline Idea
router.get("/timeline/:userId", async (req,res) =>{
    try{
        const currentUser = await User.findById(req.params.userId);  //get current user's info
        const userIdeas = await Idea.find({userId:currentUser._id} );  //get current user's ideas
        const friendIdea = await Promise.all(
            currentUser.following.map(friendId =>{
                 return Idea.find({userId : friendId})
            })    //get user's friends's ideas 
        )

        res.status(200).json(userIdeas.concat(...friendIdea));
    }catch(err){
        res.status(500).json(err)
        console.log(err)

    }

})




export default router;
